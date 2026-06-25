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

    sendJson(response, 404, { error: "Rota não encontrada." });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Erro interno da API." });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Copa Potiguar API ouvindo na porta ${port}`);
});
