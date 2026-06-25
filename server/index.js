import http from "node:http";
import { Pool } from "pg";

const port = Number(process.env.PORT || 3000);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const sendJson = (response, status, payload) => {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
};

const readBody = request => new Promise((resolve, reject) => {
  let body = "";
  request.on("data", chunk => {
    body += chunk;
    if (body.length > 1024 * 1024) {
      reject(new Error("Payload muito grande"));
      request.destroy();
    }
  });
  request.on("end", () => resolve(body));
  request.on("error", reject);
});

const ensureSchema = async () => {
  await pool.query(`
    create table if not exists prediction_submissions (
      id bigserial primary key,
      cpf varchar(11) not null,
      full_name text not null,
      access_role text not null,
      store text not null,
      match_id integer not null,
      home_team text not null,
      away_team text not null,
      home_score integer not null check (home_score >= 0),
      away_score integer not null check (away_score >= 0),
      submitted_at timestamptz not null default now(),
      unique (cpf, match_id)
    );

    create table if not exists sales_entries (
      id bigserial primary key,
      seller_cpf varchar(11) not null,
      seller_name text not null,
      store text not null,
      product_id text not null,
      product_sku text not null,
      product_name text not null,
      quantity numeric(12,2) not null check (quantity > 0),
      created_at timestamptz not null default now()
    );

    create table if not exists announcement_read_entries (
      id bigserial primary key,
      cpf varchar(11) not null,
      full_name text not null,
      access_role text not null,
      store text not null,
      announcement_id text not null,
      announcement_title text not null,
      watched_seconds integer not null default 0 check (watched_seconds >= 0),
      read_at timestamptz not null default now(),
      unique (cpf, announcement_id)
    );

    create table if not exists profile_photo_entries (
      cpf varchar(11) primary key,
      full_name text not null,
      store text not null,
      photo_data text not null,
      updated_at timestamptz not null default now()
    );

    create table if not exists app_settings (
      key text primary key,
      value jsonb not null,
      updated_at timestamptz not null default now()
    );
  `);
};

await ensureSchema();

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/predictions") {
      const result = await pool.query(`
        select id, cpf, full_name, access_role, store, match_id, home_team, away_team,
               home_score, away_score, submitted_at
          from prediction_submissions
         order by submitted_at desc, id desc
      `);
      sendJson(response, 200, { predictions: result.rows });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/settings") {
      const result = await pool.query(`
        select key, value, updated_at
          from app_settings
      `);
      sendJson(response, 200, {
        settings: Object.fromEntries(result.rows.map(row => [row.key, row.value])),
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/settings") {
      const payload = JSON.parse(await readBody(request) || "{}");
      const key = String(payload.key || "").trim();
      const value = payload.value;

      if (!key || typeof value !== "object" || value === null || Array.isArray(value)) {
        sendJson(response, 400, { error: "Configuração inválida." });
        return;
      }

      const result = await pool.query(`
        insert into app_settings (key, value, updated_at)
        values ($1, $2::jsonb, now())
        on conflict (key) do update set
          value = excluded.value,
          updated_at = now()
        returning key, value, updated_at
      `, [key, JSON.stringify(value)]);

      const allSettings = await pool.query(`select key, value from app_settings`);
      sendJson(response, 200, {
        setting: result.rows[0],
        settings: Object.fromEntries(allSettings.rows.map(row => [row.key, row.value])),
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/predictions") {
      const payload = JSON.parse(await readBody(request) || "{}");
      const cpf = String(payload.cpf || "").replace(/\D/g, "");
      const fullName = String(payload.fullName || "").trim();
      const accessRole = String(payload.accessRole || "").trim();
      const store = String(payload.store || "").trim();
      const predictions = Array.isArray(payload.predictions) ? payload.predictions : [];

      if (cpf.length !== 11 || !fullName || !store || predictions.length === 0) {
        sendJson(response, 400, { error: "Dados do palpite incompletos." });
        return;
      }

      const client = await pool.connect();
      try {
        await client.query("begin");
        const saved = [];
        for (const prediction of predictions) {
          const matchId = Number(prediction.matchId);
          const homeScore = Number(prediction.homeScore);
          const awayScore = Number(prediction.awayScore);
          const homeTeam = String(prediction.homeTeam || "").trim();
          const awayTeam = String(prediction.awayTeam || "").trim();

          if (!matchId || !homeTeam || !awayTeam || !Number.isInteger(homeScore) || !Number.isInteger(awayScore) || homeScore < 0 || awayScore < 0) {
            throw new Error("Palpite inválido.");
          }

          const result = await client.query(`
            insert into prediction_submissions
              (cpf, full_name, access_role, store, match_id, home_team, away_team, home_score, away_score, submitted_at)
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,now())
            on conflict (cpf, match_id) do update set
              full_name = excluded.full_name,
              access_role = excluded.access_role,
              store = excluded.store,
              home_team = excluded.home_team,
              away_team = excluded.away_team,
              home_score = excluded.home_score,
              away_score = excluded.away_score,
              submitted_at = now()
            returning id, cpf, full_name, access_role, store, match_id, home_team, away_team, home_score, away_score, submitted_at
          `, [cpf, fullName, accessRole, store, matchId, homeTeam, awayTeam, homeScore, awayScore]);
          saved.push(result.rows[0]);
        }
        await client.query("commit");
        sendJson(response, 200, { predictions: saved });
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/sales") {
      const result = await pool.query(`
        select id, seller_cpf, seller_name, store, product_id, product_sku, product_name, quantity, created_at
          from sales_entries
         order by created_at desc, id desc
      `);
      sendJson(response, 200, {
        sales: result.rows.map(row => ({
          id: row.id,
          sellerCpf: row.seller_cpf,
          seller: row.seller_name,
          store: row.store,
          productId: row.product_id,
          productSku: row.product_sku,
          productName: row.product_name,
          quantity: Number(row.quantity),
          createdAt: row.created_at,
        })),
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/announcement-reads") {
      const result = await pool.query(`
        select id, cpf, full_name, access_role, store, announcement_id, announcement_title, watched_seconds, read_at
          from announcement_read_entries
         order by read_at desc, id desc
      `);
      sendJson(response, 200, {
        reads: result.rows.map(row => ({
          id: row.id,
          cpf: row.cpf,
          fullName: row.full_name,
          accessRole: row.access_role,
          store: row.store,
          announcementId: row.announcement_id,
          announcementTitle: row.announcement_title,
          watchedSeconds: Number(row.watched_seconds),
          readAt: row.read_at,
        })),
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/announcement-reads") {
      const payload = JSON.parse(await readBody(request) || "{}");
      const cpf = String(payload.cpf || "").replace(/\D/g, "");
      const fullName = String(payload.fullName || "").trim();
      const accessRole = String(payload.accessRole || "").trim();
      const store = String(payload.store || "").trim();
      const announcementId = String(payload.announcementId || "").trim();
      const announcementTitle = String(payload.announcementTitle || "").trim();
      const watchedSeconds = Math.max(0, Math.floor(Number(payload.watchedSeconds || 0)));

      if (cpf.length !== 11 || !fullName || !store || !announcementId || !announcementTitle) {
        sendJson(response, 400, { error: "Dados da leitura incompletos." });
        return;
      }

      const result = await pool.query(`
        insert into announcement_read_entries
          (cpf, full_name, access_role, store, announcement_id, announcement_title, watched_seconds, read_at)
        values ($1,$2,$3,$4,$5,$6,$7,now())
        on conflict (cpf, announcement_id) do update set
          full_name = excluded.full_name,
          access_role = excluded.access_role,
          store = excluded.store,
          announcement_title = excluded.announcement_title,
          watched_seconds = greatest(announcement_read_entries.watched_seconds, excluded.watched_seconds),
          read_at = announcement_read_entries.read_at
        returning id, cpf, full_name, access_role, store, announcement_id, announcement_title, watched_seconds, read_at
      `, [cpf, fullName, accessRole, store, announcementId, announcementTitle, watchedSeconds]);

      const readsResult = await pool.query(`
        select id, cpf, full_name, access_role, store, announcement_id, announcement_title, watched_seconds, read_at
          from announcement_read_entries
         order by read_at desc, id desc
      `);

      sendJson(response, 200, {
        read: {
          id: result.rows[0].id,
          cpf: result.rows[0].cpf,
          fullName: result.rows[0].full_name,
          accessRole: result.rows[0].access_role,
          store: result.rows[0].store,
          announcementId: result.rows[0].announcement_id,
          announcementTitle: result.rows[0].announcement_title,
          watchedSeconds: Number(result.rows[0].watched_seconds),
          readAt: result.rows[0].read_at,
        },
        reads: readsResult.rows.map(row => ({
          id: row.id,
          cpf: row.cpf,
          fullName: row.full_name,
          accessRole: row.access_role,
          store: row.store,
          announcementId: row.announcement_id,
          announcementTitle: row.announcement_title,
          watchedSeconds: Number(row.watched_seconds),
          readAt: row.read_at,
        })),
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/profile-photos") {
      const result = await pool.query(`
        select cpf, full_name, store, photo_data, updated_at
          from profile_photo_entries
         order by updated_at desc
      `);
      sendJson(response, 200, {
        photos: result.rows.map(row => ({
          cpf: row.cpf,
          fullName: row.full_name,
          store: row.store,
          photoData: row.photo_data,
          updatedAt: row.updated_at,
        })),
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/profile-photos") {
      const payload = JSON.parse(await readBody(request) || "{}");
      const cpf = String(payload.cpf || "").replace(/\D/g, "");
      const fullName = String(payload.fullName || "").trim();
      const store = String(payload.store || "").trim();
      const photoData = String(payload.photoData || "").trim();

      if (cpf.length !== 11 || !fullName || !store || !photoData.startsWith("data:image/")) {
        sendJson(response, 400, { error: "Dados da foto incompletos." });
        return;
      }

      if (photoData.length > 700000) {
        sendJson(response, 413, { error: "Foto muito grande." });
        return;
      }

      const result = await pool.query(`
        insert into profile_photo_entries
          (cpf, full_name, store, photo_data, updated_at)
        values ($1,$2,$3,$4,now())
        on conflict (cpf) do update set
          full_name = excluded.full_name,
          store = excluded.store,
          photo_data = excluded.photo_data,
          updated_at = now()
        returning cpf, full_name, store, photo_data, updated_at
      `, [cpf, fullName, store, photoData]);

      sendJson(response, 200, {
        photo: {
          cpf: result.rows[0].cpf,
          fullName: result.rows[0].full_name,
          store: result.rows[0].store,
          photoData: result.rows[0].photo_data,
          updatedAt: result.rows[0].updated_at,
        },
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/sales") {
      const payload = JSON.parse(await readBody(request) || "{}");
      const sellerCpf = String(payload.sellerCpf || "").replace(/\D/g, "");
      const sellerName = String(payload.seller || "").trim();
      const store = String(payload.store || "").trim();
      const productId = String(payload.productId || "").trim();
      const productSku = String(payload.productSku || "").trim();
      const productName = String(payload.productName || "").trim();
      const quantity = Number(payload.quantity);

      if (sellerCpf.length !== 11 || !sellerName || !store || !productId || !productSku || !productName || !Number.isFinite(quantity) || quantity <= 0) {
        sendJson(response, 400, { error: "Dados da venda incompletos." });
        return;
      }

      const result = await pool.query(`
        insert into sales_entries
          (seller_cpf, seller_name, store, product_id, product_sku, product_name, quantity, created_at)
        values ($1,$2,$3,$4,$5,$6,$7,now())
        returning id, seller_cpf, seller_name, store, product_id, product_sku, product_name, quantity, created_at
      `, [sellerCpf, sellerName, store, productId, productSku, productName, quantity]);

      const salesResult = await pool.query(`
        select id, seller_cpf, seller_name, store, product_id, product_sku, product_name, quantity, created_at
          from sales_entries
         order by created_at desc, id desc
      `);
      sendJson(response, 200, {
        sale: result.rows[0],
        sales: salesResult.rows.map(row => ({
          id: row.id,
          sellerCpf: row.seller_cpf,
          seller: row.seller_name,
          store: row.store,
          productId: row.product_id,
          productSku: row.product_sku,
          productName: row.product_name,
          quantity: Number(row.quantity),
          createdAt: row.created_at,
        })),
      });
      return;
    }

    sendJson(response, 404, { error: "Rota não encontrada." });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Erro interno da API." });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Copa Potiguar API ouvindo na porta ${port}`);
});
