import http from "node:http";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { Pool } from "pg";

const port = Number(process.env.PORT || 3000);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const footballDataToken = process.env.FOOTBALL_DATA_API_TOKEN || "";
const footballDataCompetition = process.env.FOOTBALL_DATA_COMPETITION || "WC";

const sendJson = (response, status, payload) => {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
};

const onlyDigits = value => String(value || "").replace(/\D/g, "");

const hashPassword = (password, salt = randomBytes(16).toString("hex")) => {
  const hash = scryptSync(String(password || ""), salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
};

const verifyPassword = (password, storedHash) => {
  const [algorithm, salt, hash] = String(storedHash || "").split("$");
  if (algorithm !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const candidate = scryptSync(String(password || ""), salt, 64);
  return expected.length === candidate.length && timingSafeEqual(expected, candidate);
};

const getOrCreateCredential = async (cpf) => {
  const existing = await pool.query(`
    select cpf, password_hash, must_change_password, updated_at
      from user_credentials
     where cpf = $1
  `, [cpf]);
  if (existing.rows[0]) return existing.rows[0];

  const created = await pool.query(`
    insert into user_credentials (cpf, password_hash, must_change_password, updated_at)
    values ($1,$2,true,now())
    on conflict (cpf) do update set cpf = excluded.cpf
    returning cpf, password_hash, must_change_password, updated_at
  `, [cpf, hashPassword(cpf)]);
  return created.rows[0];
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

const mapFootballDataStatus = status => ({
  SCHEDULED: "scheduled",
  TIMED: "scheduled",
  IN_PLAY: "live",
  PAUSED: "live",
  FINISHED: "finished",
  POSTPONED: "postponed",
  SUSPENDED: "suspended",
  CANCELED: "canceled",
}[String(status || "").toUpperCase()] || "scheduled");

const mapFootballDataStage = stage => ({
  LAST_32: { id: "fase-32", phase: "16 avos", name: "16 avos" },
  ROUND_OF_32: { id: "fase-32", phase: "16 avos", name: "16 avos" },
  LAST_16: { id: "oitavas", phase: "Oitavas", name: "Oitavas de final" },
  ROUND_OF_16: { id: "oitavas", phase: "Oitavas", name: "Oitavas de final" },
  QUARTER_FINALS: { id: "quartas", phase: "Quartas", name: "Quartas de final" },
  SEMI_FINALS: { id: "semifinais", phase: "Semifinais", name: "Semifinais" },
  THIRD_PLACE: { id: "terceiro-lugar", phase: "Terceiro lugar", name: "Disputa de terceiro lugar" },
  FINAL: { id: "final", phase: "Final", name: "Final" },
}[String(stage || "").toUpperCase()] || { id: "copa-2026", phase: String(stage || "Copa"), name: String(stage || "Copa 2026") });

const mapMatchRow = row => ({
  id: Number(row.external_match_id),
  externalMatchId: Number(row.external_match_id),
  competition: row.competition,
  source: row.source,
  roundId: row.round_id,
  roundName: row.round_name,
  phase: row.phase,
  stage: row.stage,
  status: row.status,
  utcDate: row.utc_date,
  kickoffAt: row.utc_date,
  home: row.home_team,
  away: row.away_team,
  homeTeam: row.home_team,
  awayTeam: row.away_team,
  homeScore: row.home_score === null ? null : Number(row.home_score),
  awayScore: row.away_score === null ? null : Number(row.away_score),
  winner: row.winner,
  venue: row.venue,
  updatedAt: row.updated_at,
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
      round_id text not null,
      round_name text not null,
      announcement_id text not null,
      announcement_title text not null,
      watched_seconds integer not null default 0 check (watched_seconds >= 0),
      read_at timestamptz not null default now(),
      unique (cpf, round_id)
    );

    alter table announcement_read_entries add column if not exists round_id text;
    alter table announcement_read_entries add column if not exists round_name text;
    update announcement_read_entries
       set round_id = coalesce(round_id, announcement_id, 'legacy'),
           round_name = coalesce(round_name, announcement_title, 'Rodada anterior')
     where round_id is null or round_name is null;
    alter table announcement_read_entries alter column round_id set not null;
    alter table announcement_read_entries alter column round_name set not null;
    alter table announcement_read_entries drop constraint if exists announcement_read_entries_cpf_announcement_id_key;
    do $$
    begin
      if not exists (
        select 1
          from pg_constraint
         where conname = 'announcement_read_entries_cpf_round_id_key'
           and conrelid = 'announcement_read_entries'::regclass
      ) then
        alter table announcement_read_entries add constraint announcement_read_entries_cpf_round_id_key unique (cpf, round_id);
      end if;
    end $$;

    create table if not exists profile_photo_entries (
      cpf varchar(11) primary key,
      full_name text not null,
      store text not null,
      photo_data text not null,
      updated_at timestamptz not null default now()
    );

    create table if not exists user_credentials (
      cpf varchar(11) primary key,
      password_hash text not null,
      must_change_password boolean not null default true,
      updated_at timestamptz not null default now(),
      check (cpf ~ '^[0-9]{11}$')
    );

    create table if not exists app_settings (
      key text primary key,
      value jsonb not null,
      updated_at timestamptz not null default now()
    );

    create table if not exists world_cup_matches (
      external_match_id integer primary key,
      competition text not null default 'WC',
      source text not null default 'football-data.org',
      round_id text not null,
      round_name text not null,
      phase text not null,
      stage text,
      status text not null,
      utc_date timestamptz not null,
      home_team text not null,
      away_team text not null,
      home_score integer,
      away_score integer,
      winner text,
      venue text,
      raw jsonb,
      updated_at timestamptz not null default now()
    );
  `);
};

await ensureSchema();

const listWorldCupMatches = async () => {
  const result = await pool.query(`
    select external_match_id, competition, source, round_id, round_name, phase, stage, status,
           utc_date, home_team, away_team, home_score, away_score, winner, venue, updated_at
      from world_cup_matches
     order by utc_date asc, external_match_id asc
  `);
  return result.rows.map(mapMatchRow);
};

const syncFootballDataMatches = async () => {
  if (!footballDataToken) {
    const error = new Error("FOOTBALL_DATA_API_TOKEN não configurado no servidor.");
    error.statusCode = 400;
    error.hint = "Crie uma conta no football-data.org, gere a API key e configure a variável no Docker.";
    throw error;
  }

  const apiUrl = `https://api.football-data.org/v4/competitions/${encodeURIComponent(footballDataCompetition)}/matches`;
  const apiResponse = await fetch(apiUrl, {
    headers: { "X-Auth-Token": footballDataToken },
  });
  const apiPayload = await apiResponse.json().catch(() => ({}));

  if (!apiResponse.ok) {
    const error = new Error(apiPayload?.message || apiPayload?.error || "Erro externo.");
    error.statusCode = apiResponse.status;
    throw error;
  }

  const matches = Array.isArray(apiPayload.matches) ? apiPayload.matches : [];
  const client = await pool.connect();
  try {
    await client.query("begin");
    for (const match of matches) {
      const stageInfo = mapFootballDataStage(match.stage);
      const homeTeam = match.homeTeam?.shortName || match.homeTeam?.name || match.homeTeam?.tla || "A definir";
      const awayTeam = match.awayTeam?.shortName || match.awayTeam?.name || match.awayTeam?.tla || "A definir";
      const score = match.score?.fullTime || {};
      const winner = match.score?.winner || null;
      await client.query(`
        insert into world_cup_matches
          (external_match_id, competition, source, round_id, round_name, phase, stage, status,
           utc_date, home_team, away_team, home_score, away_score, winner, venue, raw, updated_at)
        values ($1,$2,'football-data.org',$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15::jsonb,now())
        on conflict (external_match_id) do update set
          competition = excluded.competition,
          round_id = excluded.round_id,
          round_name = excluded.round_name,
          phase = excluded.phase,
          stage = excluded.stage,
          status = excluded.status,
          utc_date = excluded.utc_date,
          home_team = excluded.home_team,
          away_team = excluded.away_team,
          home_score = excluded.home_score,
          away_score = excluded.away_score,
          winner = excluded.winner,
          venue = excluded.venue,
          raw = excluded.raw,
          updated_at = now()
      `, [
        Number(match.id),
        footballDataCompetition,
        stageInfo.id,
        stageInfo.name,
        stageInfo.phase,
        match.stage || "",
        mapFootballDataStatus(match.status),
        match.utcDate,
        homeTeam,
        awayTeam,
        Number.isInteger(score.home) ? score.home : null,
        Number.isInteger(score.away) ? score.away : null,
        winner,
        match.venue || "",
        JSON.stringify(match),
      ]);
    }
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }

  return {
    synced: matches.length,
    competition: footballDataCompetition,
    matches: await listWorldCupMatches(),
  };
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/auth/login") {
      const payload = JSON.parse(await readBody(request) || "{}");
      const cpf = onlyDigits(payload.cpf);
      const password = String(payload.password || "");

      if (cpf.length !== 11 || !password) {
        sendJson(response, 400, { error: "CPF e senha são obrigatórios." });
        return;
      }

      const credential = await getOrCreateCredential(cpf);
      if (!verifyPassword(password, credential.password_hash)) {
        sendJson(response, 401, { error: "CPF ou senha inválidos." });
        return;
      }

      sendJson(response, 200, {
        ok: true,
        cpf,
        mustChangePassword: credential.must_change_password,
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/auth/change-password") {
      const payload = JSON.parse(await readBody(request) || "{}");
      const cpf = onlyDigits(payload.cpf);
      const currentPassword = String(payload.currentPassword || "");
      const newPassword = String(payload.newPassword || "");

      if (cpf.length !== 11 || !currentPassword || newPassword.length < 6) {
        sendJson(response, 400, { error: "Informe a senha atual e uma nova senha com pelo menos 6 caracteres." });
        return;
      }

      const credential = await getOrCreateCredential(cpf);
      if (!verifyPassword(currentPassword, credential.password_hash)) {
        sendJson(response, 401, { error: "Senha atual inválida." });
        return;
      }

      await pool.query(`
        update user_credentials
           set password_hash = $2,
               must_change_password = false,
               updated_at = now()
         where cpf = $1
      `, [cpf, hashPassword(newPassword)]);

      sendJson(response, 200, { ok: true, cpf, mustChangePassword: false });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/admin/reset-password") {
      const payload = JSON.parse(await readBody(request) || "{}");
      const targetCpf = onlyDigits(payload.targetCpf);
      const temporaryPassword = String(payload.temporaryPassword || targetCpf);

      if (targetCpf.length !== 11 || temporaryPassword.length < 6) {
        sendJson(response, 400, { error: "CPF do usuário inválido." });
        return;
      }

      await pool.query(`
        insert into user_credentials (cpf, password_hash, must_change_password, updated_at)
        values ($1,$2,true,now())
        on conflict (cpf) do update set
          password_hash = excluded.password_hash,
          must_change_password = true,
          updated_at = now()
      `, [targetCpf, hashPassword(temporaryPassword)]);

      sendJson(response, 200, {
        ok: true,
        targetCpf,
        mustChangePassword: true,
        temporaryPasswordHint: "Senha redefinida para o CPF do usuário.",
      });
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

    if (request.method === "GET" && url.pathname === "/api/world-cup/matches") {
      sendJson(response, 200, { matches: await listWorldCupMatches() });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/world-cup/sync") {
      try {
        sendJson(response, 200, await syncFootballDataMatches());
      } catch (error) {
        sendJson(response, error.statusCode || 500, {
          error: "Não foi possível sincronizar com football-data.org.",
          details: error.message,
          hint: error.hint,
        });
      }
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
        select id, cpf, full_name, access_role, store, round_id, round_name, announcement_id, announcement_title, watched_seconds, read_at
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
          roundId: row.round_id,
          roundName: row.round_name,
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
      const roundId = String(payload.roundId || "").trim();
      const roundName = String(payload.roundName || "").trim();
      const announcementId = String(payload.announcementId || "").trim();
      const announcementTitle = String(payload.announcementTitle || "").trim();
      const watchedSeconds = Math.max(0, Math.floor(Number(payload.watchedSeconds || 0)));

      if (cpf.length !== 11 || !fullName || !store || !roundId || !roundName || !announcementId || !announcementTitle) {
        sendJson(response, 400, { error: "Dados da leitura incompletos." });
        return;
      }

      const result = await pool.query(`
        insert into announcement_read_entries
          (cpf, full_name, access_role, store, round_id, round_name, announcement_id, announcement_title, watched_seconds, read_at)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,now())
        on conflict (cpf, round_id) do update set
          full_name = excluded.full_name,
          access_role = excluded.access_role,
          store = excluded.store,
          round_name = excluded.round_name,
          announcement_id = excluded.announcement_id,
          announcement_title = excluded.announcement_title,
          watched_seconds = greatest(announcement_read_entries.watched_seconds, excluded.watched_seconds),
          read_at = announcement_read_entries.read_at
        returning id, cpf, full_name, access_role, store, round_id, round_name, announcement_id, announcement_title, watched_seconds, read_at
      `, [cpf, fullName, accessRole, store, roundId, roundName, announcementId, announcementTitle, watchedSeconds]);

      const readsResult = await pool.query(`
        select id, cpf, full_name, access_role, store, round_id, round_name, announcement_id, announcement_title, watched_seconds, read_at
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
          roundId: result.rows[0].round_id,
          roundName: result.rows[0].round_name,
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
            roundId: row.round_id,
            roundName: row.round_name,
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

if (footballDataToken) {
  const syncIntervalMs = Number(process.env.FOOTBALL_DATA_SYNC_INTERVAL_MS || 5 * 60 * 1000);
  const runAutomaticSync = async () => {
    try {
      const result = await syncFootballDataMatches();
      console.log(`football-data.org sincronizado: ${result.synced} jogos.`);
    } catch (error) {
      console.warn(`Falha na sincronização automática football-data.org: ${error.message}`);
    }
  };
  setTimeout(runAutomaticSync, 10 * 1000);
  setInterval(runAutomaticSync, syncIntervalMs);
} else {
  console.warn("FOOTBALL_DATA_API_TOKEN não configurado. Sincronização automática da Copa desativada.");
}
