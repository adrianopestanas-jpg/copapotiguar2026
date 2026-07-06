import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const API_BASE = (process.env.API_BASE || process.argv[2] || "http://localhost").replace(/\/$/, "");
const MATCH_IDS = (process.env.MATCH_IDS || "")
  .split(",")
  .map(item => Number(String(item).trim()))
  .filter(Number.isFinite);

const fixedStores = [
  "Centro",
  "Cohama",
  "Forquilha",
  "Cohafuma",
  "Africanos",
  "Olho Dagua",
  "Maiobão",
  "Santa Inês",
  "Bacabal",
  "Imperatriz",
];

const textKey = value => String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^A-Z0-9]/gi, "")
  .toUpperCase();

const normalizeStore = store => ({
  CENTRO: "Centro",
  COHAMA: "Cohama",
  FORQUILHA: "Forquilha",
  COHAFUMA: "Cohafuma",
  AFRICANOS: "Africanos",
  OLHODAGUA: "Olho Dagua",
  OLHODAGUA1: "Olho Dagua",
  MAIOBAO: "Maiobão",
  SANTAINES: "Santa Inês",
  BACABAL: "Bacabal",
  IMPERATRIZ: "Imperatriz",
  REDEPOTIGUAR: "Rede Potiguar",
}[textKey(store)] || String(store || "").trim());

const digits = value => String(value || "").replace(/\D/g, "");
const maskCpf = value => {
  const cpf = digits(value).padStart(11, "0");
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
};

const roleFromJob = (job, explicitProfile) => {
  if (explicitProfile === "Administrador") return "Administrador";
  if (explicitProfile === "Liderança") return "Liderança";
  if (explicitProfile === "Vendedor") return "Vendedor";
  if (/(GERENTE|SUBGERENTE)/.test(textKey(job))) return "Liderança";
  return "Vendedor";
};

const titleCase = value => String(value || "").toLowerCase().replace(/(^|\s)\S/g, char => char.toUpperCase());

const loadBaseUsers = () => {
  const source = fs.readFileSync(path.join(ROOT, "participants-data.js"), "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context);
  return (context.window.COPA_PARTICIPANTS || []).map(([name, cpf, job, store, explicitProfile]) => ({
    name: String(name || "").trim(),
    cpf: digits(cpf),
    job: String(job || "").trim(),
    store: normalizeStore(store),
    profile: roleFromJob(job, explicitProfile),
  }));
};

const fetchJson = async pathName => {
  const response = await fetch(`${API_BASE}${pathName}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Falha ao carregar ${pathName}: HTTP ${response.status}`);
  return response.json();
};

const normalizeCustomUser = user => {
  const profile = user.profile || (user.accessRole === "leadership" ? "Liderança" : user.accessRole === "admin" ? "Administrador" : "Vendedor");
  return {
    name: String(user.name || user.fullName || "").trim(),
    cpf: digits(user.cpf),
    job: String(user.job || user.originalRole || profile || "").trim(),
    store: normalizeStore(user.store),
    profile,
  };
};

const uniqueByCpf = users => {
  const map = new Map();
  users.forEach(user => {
    if (!user.cpf || user.cpf.length !== 11 || !user.name) return;
    map.set(user.cpf, { ...map.get(user.cpf), ...user });
  });
  return [...map.values()];
};

const formatPercent = value => `${Math.round(value)}%`;

const main = async () => {
  const baseUsers = loadBaseUsers();
  const [{ predictions }, settingsResponse] = await Promise.all([
    fetchJson("/api/predictions"),
    fetchJson("/api/settings").catch(() => ({ settings: {} })),
  ]);

  const customUsers = Array.isArray(settingsResponse?.settings?.customUsers)
    ? settingsResponse.settings.customUsers.map(normalizeCustomUser)
    : [];

  const users = uniqueByCpf([...baseUsers, ...customUsers])
    .filter(user => user.profile !== "Administrador" && fixedStores.includes(user.store));

  const filteredPredictions = (predictions || [])
    .filter(entry => !MATCH_IDS.length || MATCH_IDS.includes(Number(entry.match_id ?? entry.matchId)))
    .map(entry => ({
      cpf: digits(entry.cpf),
      store: normalizeStore(entry.store),
      fullName: entry.full_name || entry.fullName,
      matchId: Number(entry.match_id ?? entry.matchId),
      submittedAt: entry.submitted_at || entry.submittedAt,
    }));

  const predictionByCpf = filteredPredictions.reduce((acc, entry) => {
    if (!entry.cpf) return acc;
    const current = acc.get(entry.cpf) || { count: 0, matchIds: new Set(), latest: null };
    current.count += 1;
    if (Number.isFinite(entry.matchId)) current.matchIds.add(entry.matchId);
    if (!current.latest || new Date(entry.submittedAt) > new Date(current.latest)) current.latest = entry.submittedAt;
    acc.set(entry.cpf, current);
    return acc;
  }, new Map());

  const reportRows = fixedStores.map(store => {
    const people = users.filter(user => user.store === store);
    const participants = people.filter(user => predictionByCpf.has(user.cpf));
    const missing = people.filter(user => !predictionByCpf.has(user.cpf));
    const sellerTotal = people.filter(user => user.profile === "Vendedor").length;
    const leaderTotal = people.filter(user => user.profile === "Liderança").length;
    const sellerParticipated = participants.filter(user => user.profile === "Vendedor").length;
    const leaderParticipated = participants.filter(user => user.profile === "Liderança").length;
    const totalPredictions = participants.reduce((sum, user) => sum + (predictionByCpf.get(user.cpf)?.matchIds.size || 0), 0);
    const adherence = people.length ? (participants.length / people.length) * 100 : 0;
    return {
      store,
      total: people.length,
      participants: participants.length,
      missing: missing.length,
      adherence,
      sellerTotal,
      leaderTotal,
      sellerParticipated,
      leaderParticipated,
      totalPredictions,
      missingPeople: missing.sort((a, b) => a.name.localeCompare(b.name)),
    };
  });

  const byBest = [...reportRows].sort((a, b) => b.adherence - a.adherence || b.participants - a.participants || a.store.localeCompare(b.store));
  const byWorst = [...reportRows].sort((a, b) => a.adherence - b.adherence || b.missing - a.missing || a.store.localeCompare(b.store));

  const now = new Date();
  const lines = [];
  lines.push(`# Relatório de aderência aos palpites`);
  lines.push("");
  lines.push(`Gerado em: ${now.toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })}`);
  lines.push(`Base: ${API_BASE}`);
  if (MATCH_IDS.length) lines.push(`Filtro de jogos: ${MATCH_IDS.join(", ")}`);
  lines.push("");
  lines.push(`Total elegível: ${users.length}`);
  lines.push(`Participaram: ${users.filter(user => predictionByCpf.has(user.cpf)).length}`);
  lines.push(`Faltam participar: ${users.filter(user => !predictionByCpf.has(user.cpf)).length}`);
  lines.push("");
  lines.push(`## Melhor aderência por loja`);
  lines.push("");
  byBest.forEach((row, index) => {
    lines.push(`${index + 1}. ${row.store}: ${formatPercent(row.adherence)} (${row.participants}/${row.total})`);
  });
  lines.push("");
  lines.push(`## Pior aderência por loja`);
  lines.push("");
  byWorst.forEach((row, index) => {
    lines.push(`${index + 1}. ${row.store}: ${formatPercent(row.adherence)} (${row.participants}/${row.total}) — faltam ${row.missing}`);
  });
  lines.push("");
  lines.push(`## Resumo por loja`);
  reportRows.forEach(row => {
    lines.push("");
    lines.push(`### ${row.store}`);
    lines.push(`- Aderência: ${formatPercent(row.adherence)} (${row.participants}/${row.total})`);
    lines.push(`- Vendedores: ${row.sellerParticipated}/${row.sellerTotal}`);
    lines.push(`- Líderes: ${row.leaderParticipated}/${row.leaderTotal}`);
    lines.push(`- Palpites gravados: ${row.totalPredictions}`);
    lines.push(`- Faltam: ${row.missing}`);
    if (row.missingPeople.length) {
      row.missingPeople.forEach(person => {
        lines.push(`  - ${titleCase(person.name)} — ${person.profile} — CPF ${maskCpf(person.cpf)}`);
      });
    } else {
      lines.push(`  - Ninguém pendente.`);
    }
  });

  const output = lines.join("\n");
  const outDir = path.join(ROOT, "outputs");
  fs.mkdirSync(outDir, { recursive: true });
  const outputPath = path.join(outDir, "relatorio-aderencia-palpites.md");
  fs.writeFileSync(outputPath, output);
  console.log(output);
  console.error(`\nArquivo salvo em: ${outputPath}`);
};

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
