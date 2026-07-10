const { useEffect, useMemo, useState } = React;

if (typeof Object.fromEntries !== "function") {
  Object.fromEntries = entries => {
    const result = {};
    entries.forEach(([key, value]) => {
      result[key] = value;
    });
    return result;
  };
}

const scrollToTopSafely = () => {
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    window.scrollTo(0, 0);
  }
};

const Icon = ({ name, size = 20, className = "" }) => {
  const paths = {
    home: <><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5M9 20v-6h6v6"/></>,
    ball: <><circle cx="12" cy="12" r="9"/><path d="m12 8 3 2.2-1.2 3.6h-3.6L9 10.2 12 8ZM5.1 9l3.9 1.2M15 10.2 18.9 9M10.2 13.8 8 17.5M13.8 13.8l2.2 3.7"/></>,
    ranking: <><path d="M5 21v-8h4v8M10 21V8h4v13M15 21V3h4v18"/><path d="M3 21h18"/></>,
    store: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6"/><path d="M8 20v-6h4v6M3 10c0 1.3 1 2 2.3 2S8 11.3 8 10c0 1.3 1 2 2.7 2s2.6-.7 2.6-2c0 1.3 1 2 2.7 2s2.7-.7 2.7-2"/></>,
    megaphone: <><path d="M4 13h3l9 4V5L7 9H4v4Z"/><path d="m7 13 1.5 5h3L10 14M19 8v6"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    fire: <path d="M13 3s1 3-2 5c-2.5 1.7-4 3.8-4 6.2A5 5 0 0 0 17 14c0-2-1-4-3-5 0 2-1 3-2 3 1-3-1-6-1-6"/>,
    trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 12v5M8 21h8M9 17h6v4"/></>,
    bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    shield: <path d="M12 3 5 6v5c0 4.6 3 8 7 10 4-2 7-5.4 7-10V6l-7-3Z"/>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    play: <path d="m8 5 11 7-11 7V5Z"/>,
  };
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

const PILOT_STORE = "Imperatriz";

const onlyDigits = value => String(value ?? "").replace(/\D/g, "");

const formatCpfValue = value => {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};

const toTitleCase = value => String(value ?? "")
  .toLowerCase()
  .replace(/(^|\s)(\S)/g, (_, space, char) => `${space}${char.toUpperCase()}`)
  .replace(/\bDe\b/g, "de")
  .replace(/\bDa\b/g, "da")
  .replace(/\bDas\b/g, "das")
  .replace(/\bDo\b/g, "do")
  .replace(/\bDos\b/g, "dos");

const textKey = value => String(value ?? "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f']/g, "")
  .trim()
  .toUpperCase();

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

const normalizeStore = store => ({
  CENTRO: "Centro",
  COHAMA: "Cohama",
  FORQUILHA: "Forquilha",
  COHAFUMA: "Cohafuma",
  AFRICANOS: "Africanos",
  "OLHO DAGUA": "Olho Dagua",
  MAIOBAO: "Maiobão",
  "SANTA INES": "Santa Inês",
  BACABAL: "Bacabal",
  IMPERATRIZ: "Imperatriz",
  "REDE POTIGUAR": "Rede Potiguar",
}[textKey(store)] || toTitleCase(store));

const resolveProfile = (job, explicitProfile) => {
  if (explicitProfile === "Administrador") return "Administrador";
  if (explicitProfile === "Liderança") return "Liderança";
  return /(GERENTE|SUBGERENTE)/.test(textKey(job)) ? "Liderança" : "Vendedor";
};

const resolveJob = (job, explicitProfile) => {
  if (explicitProfile === "Administrador") return toTitleCase(job);
  if (explicitProfile === "Liderança") return "Líder de loja";
  return /(GERENTE|SUBGERENTE)/.test(textKey(job)) ? "Líder de loja" : "Vendedor";
};

const makeInitials = name => String(name ?? "")
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(part => part[0]?.toUpperCase())
  .join("");

const participantRows = (typeof window !== "undefined" && window.COPA_PARTICIPANTS) || [];

const normalizeParticipantUser = ([name, cpf, job, store, explicitProfile]) => {
    const profile = resolveProfile(job, explicitProfile);
    return {
      name: toTitleCase(name),
      cpf: formatCpfValue(cpf),
      email: "",
      job: resolveJob(job, explicitProfile),
      originalJob: toTitleCase(job),
      profile,
      store: normalizeStore(store),
      status: "Ativo",
    };
  };

const normalizeCustomUser = user => {
  const profile = user.profile || resolveProfile(user.job, user.explicitProfile);
  return {
    name: toTitleCase(user.name),
    cpf: formatCpfValue(user.cpf),
    email: user.email || "",
    job: user.job || resolveJob(user.originalJob, profile),
    originalJob: user.originalJob || user.job || resolveJob(user.job, profile),
    profile,
    store: normalizeStore(user.store),
    status: user.status || "Ativo",
  };
};

const mergeUsers = (baseUsers, customUsers = [], deletedUsers = []) => {
  const deletedCpfs = new Set((Array.isArray(deletedUsers) ? deletedUsers : []).map(onlyDigits));
  const byCpf = {};
  baseUsers.forEach(user => {
    const cpf = onlyDigits(user.cpf);
    if (!deletedCpfs.has(cpf)) byCpf[cpf] = user;
  });
  customUsers.map(normalizeCustomUser).forEach(user => {
    const cpf = onlyDigits(user.cpf);
    if (cpf.length === 11 && !deletedCpfs.has(cpf)) byCpf[cpf] = user;
  });
  return Object.values(byCpf);
};

const buildDemoUsers = users => users.reduce((acc, participant) => {
  const document = onlyDigits(participant.cpf);
  acc[document] = {
    name: participant.name,
    firstName: participant.name.split(" ")[0],
    role: participant.profile,
    originalRole: participant.originalJob || participant.job,
    accessRole: participant.profile === "Administrador" ? "admin" : participant.profile === "Liderança" ? "leadership" : "seller",
    store: participant.store,
    cpf: participant.cpf,
    points: 0,
    position: null,
    initials: makeInitials(participant.name),
  };
  return acc;
}, {});

const registeredUsers = participantRows.map(normalizeParticipantUser);

const rankedSellers = registeredUsers.filter(user => user.profile === "Vendedor");
const ranking = rankedSellers.slice(0, 10).map((user, index) => ({
  name: user.name,
  store: user.store,
  role: user.job,
  points: 0,
  trend: "—",
}));

const demoUsers = buildDemoUsers(registeredUsers);

const focusProducts = [
  { id: "qualiz-18", sku: "10001", name: "Tinta Qualiz Fosco Completo 18L", brand: "Qualiz", price: "R$ 289,90", description: "Tinta acrílica fosca para ambientes internos e externos.", imageUrl: "" },
  { id: "coral-18", sku: "10002", name: "Tinta Coral Rende Muito 18L", brand: "Coral", price: "R$ 359,90", description: "Tinta acrílica de alto rendimento e cobertura.", imageUrl: "" },
  { id: "suvinil-18", sku: "10003", name: "Tinta Suvinil Fosco Completo 18L", brand: "Suvinil", price: "R$ 499,90", description: "Tinta fosca completa para paredes internas e externas.", imageUrl: "" },
  { id: "argamassa-ac3", sku: "10004", name: "Argamassa AC3 20kg", brand: "Quartzolit", price: "R$ 54,90", description: "Argamassa colante AC3 para áreas internas e externas.", imageUrl: "" },
  { id: "piso-house-color-formigres", sku: "2708", name: "Piso 60x60 TPA House Color CZ RT Formigres", brand: "Formigres", price: "Preço a confirmar", description: "Desafio da semana cadastrado manualmente para teste da loja Imperatriz.", imageUrl: "", unit: "m²" },
  { id: "baston-limpa-air-fryer", sku: "3278", name: "Limpa Air Fryer 250ml Super Dom Baston", brand: "Baston", price: "Preço a confirmar", description: "Desafio da semana para a loja Maiobão.", imageUrl: "", unit: "un." },
  { id: "camesa-pano-prato-chef", sku: "499870", name: "Pano de Prato do Chef Camesa", brand: "Camesa", price: "Preço a confirmar", description: "Desafio da semana para a loja Centro.", imageUrl: "", unit: "un." },
  { id: "oxford-linha-completa", sku: "Vários", name: "Toda linha de produtos da marca Oxford", brand: "Oxford", price: "Preço a confirmar", description: "Desafio da semana: qualquer produto da linha Oxford conta para a loja.", imageUrl: "", unit: "un." },
  { id: "coala-essencia-algas-mar", sku: "470872", name: "Essência Concentrada Algas Mar 120ml Coala", brand: "Coala", price: "Preço a confirmar", description: "Desafio da semana para a loja Africanos.", imageUrl: "", unit: "un." },
  { id: "casa-ok-kit-cabide", sku: "2639", name: "Kit 3pcs Cabide Madeira BR Casa OK", brand: "Casa OK/UD", price: "Preço a confirmar", description: "Desafio da semana para Bacabal e Olho Dagua.", imageUrl: "", unit: "un." },
  { id: "genco-tablete-multipla-acao", sku: "638749", name: "Tablete Múltipla Ação 3 em 1 T200 Genco", brand: "Genco", price: "Preço a confirmar", description: "Desafio da semana para Santa Inês.", imageUrl: "", unit: "un." },
];

const siteProductDemo = {
  sku: "219134",
  name: "Manta Líquida Impermeabilizante Branca 18Kg Quartzolit",
  brand: "Quartzolit",
  price: "R$ 319,90",
  description: "Impermeabilizante acrílico pronto para uso, ideal para lajes e coberturas expostas. Forma uma película elástica e resistente, ajudando a impedir infiltrações e refletir os raios solares.",
  imageUrl: "https://apotiguar.fbitsstatic.net/img/p/manta-liquida-impermeabilizante-branca-18kg-quartzolit-89313/274806-8.jpg?v=202504030911",
  siteUrl: "https://www.apotiguar.com.br/produto/manta-liquida-impermeabilizante-branca-18kg-quartzolit-89313",
};

const initialProductAssignments = [
  { store: "Maiobão", productId: "baston-limpa-air-fryer", goal: 40 },
  { store: "Centro", productId: "camesa-pano-prato-chef", goal: 50 },
  { store: "Cohama", productId: "oxford-linha-completa", goal: 200 },
  { store: "Forquilha", productId: "oxford-linha-completa", goal: 200 },
  { store: "Cohafuma", productId: "oxford-linha-completa", goal: 200 },
  { store: "Imperatriz", productId: "oxford-linha-completa", goal: 200 },
  { store: "Africanos", productId: "coala-essencia-algas-mar", goal: 30 },
  { store: "Bacabal", productId: "casa-ok-kit-cabide", goal: 30 },
  { store: "Olho Dagua", productId: "casa-ok-kit-cabide", goal: 50 },
  { store: "Santa Inês", productId: "genco-tablete-multipla-acao", goal: 50 },
];

const initialSalesEntries = [];

const stores = fixedStores.map(name => ({ name, score: 0, sold: 0, goal: 200 }));

const getStoreStats = storeName => {
  const stats = stores.find(store => store.name === storeName) || stores.find(store => store.name === PILOT_STORE) || stores[0];
  const sorted = [...stores].sort((a, b) => (b.sold / b.goal) - (a.sold / a.goal));
  return {
    ...stats,
    percent: Math.round((stats.sold / stats.goal) * 100),
    networkPosition: sorted.findIndex(store => store.name === stats.name) + 1,
  };
};

const getProductCatalog = settings => Array.isArray(settings?.productCatalog) ? settings.productCatalog : focusProducts;
const getProductAssignments = settings => Array.isArray(settings?.productAssignments) ? settings.productAssignments : initialProductAssignments;

const getStoreFocus = (storeName, settings) => {
  const assignments = getProductAssignments(settings);
  const catalog = getProductCatalog(settings);
  const assignment = assignments.find(item => item.store === storeName) || assignments[0] || initialProductAssignments[0];
  const product = catalog.find(item => item.id === assignment.productId) || focusProducts.find(item => item.id === assignment.productId) || catalog[0] || focusProducts[0];
  const stats = getStoreStats(storeName);
  const goal = assignment.goal || stats.goal;
  const sold = stats.sold;
  const remaining = Math.max(goal - sold, 0);
  return {
    ...assignment,
    product,
    sold,
    goal,
    remaining,
    percent: Math.round((sold / goal) * 100),
  };
};

const isProductFocusEnabled = settings => {
  const round = settings?.round || defaultRoundConfig;
  return round.official !== false && !/16\s*avos/i.test(String(round.phase || round.name || ""));
};

const sellerPoints = () => 0;

const getStoreRanking = (storeName, limit = 10) => rankedSellers
  .filter(user => user.store === storeName)
  .map(user => {
    const globalIndex = rankedSellers.findIndex(seller => seller.cpf === user.cpf);
    return {
      name: user.name,
      store: user.store,
      role: user.job,
      points: sellerPoints(user, globalIndex),
    };
  })
  .sort((a, b) => b.points - a.points)
  .slice(0, limit);

const games = [
  { id: 101, time: "17:00", group: "Quartas de final", home: "A definir", away: "A definir", homeFlag: "🌐", awayFlag: "🌐", venue: "A definir", kickoffAt: "2026-07-09T17:00:00-03:00", status: "scheduled" },
  { id: 102, time: "21:00", group: "Quartas de final", home: "A definir", away: "A definir", homeFlag: "🌐", awayFlag: "🌐", venue: "A definir", kickoffAt: "2026-07-10T21:00:00-03:00", status: "scheduled" },
  { id: 103, time: "17:00", group: "Quartas de final", home: "A definir", away: "A definir", homeFlag: "🌐", awayFlag: "🌐", venue: "A definir", kickoffAt: "2026-07-11T17:00:00-03:00", status: "scheduled" },
  { id: 104, time: "21:00", group: "Quartas de final", home: "A definir", away: "A definir", homeFlag: "🌐", awayFlag: "🌐", venue: "A definir", kickoffAt: "2026-07-11T21:00:00-03:00", status: "scheduled" },
  { id: 201, time: "21:00", group: "Semifinal", home: "A definir", away: "A definir", homeFlag: "🌐", awayFlag: "🌐", venue: "A definir", kickoffAt: "2026-07-14T21:00:00-03:00", status: "scheduled" },
  { id: 202, time: "21:00", group: "Semifinal", home: "A definir", away: "A definir", homeFlag: "🌐", awayFlag: "🌐", venue: "A definir", kickoffAt: "2026-07-15T21:00:00-03:00", status: "scheduled" },
  { id: 301, time: "17:00", group: "Disputa de terceiro lugar", home: "A definir", away: "A definir", homeFlag: "🌐", awayFlag: "🌐", venue: "A definir", kickoffAt: "2026-07-18T17:00:00-03:00", status: "scheduled" },
  { id: 401, time: "17:00", group: "Final", home: "A definir", away: "A definir", homeFlag: "🌐", awayFlag: "🌐", venue: "A definir", kickoffAt: "2026-07-19T17:00:00-03:00", status: "scheduled" },
];

const teamFlags = {
  "A definir": "🌐",
  Brasil: "🇧🇷",
  Brazil: "🇧🇷",
  Argentina: "🇦🇷",
  França: "🇫🇷",
  France: "🇫🇷",
  Espanha: "🇪🇸",
  Spain: "🇪🇸",
  Alemanha: "🇩🇪",
  Germany: "🇩🇪",
  Portugal: "🇵🇹",
  Inglaterra: "🏴",
  England: "🏴",
  Itália: "🇮🇹",
  Italy: "🇮🇹",
  Holanda: "🇳🇱",
  Netherlands: "🇳🇱",
  Japão: "🇯🇵",
  Japan: "🇯🇵",
  "Estados Unidos": "🇺🇸",
  USA: "🇺🇸",
};

const formatGameTime = value => new Date(value).toLocaleTimeString("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

const normalizeSyncedMatch = match => ({
  id: Number(match.id || match.externalMatchId),
  time: formatGameTime(match.kickoffAt || match.utcDate),
  group: match.phase || match.roundName || "Copa do Mundo",
  home: match.home || match.homeTeam || "A definir",
  away: match.away || match.awayTeam || "A definir",
  homeFlag: teamFlags[match.home] || teamFlags[match.homeTeam] || "🌐",
  awayFlag: teamFlags[match.away] || teamFlags[match.awayTeam] || "🌐",
  venue: match.venue || "A definir",
  kickoffAt: match.kickoffAt || match.utcDate,
  roundId: match.roundId,
  roundName: match.roundName,
  phase: match.phase,
  status: match.status || "scheduled",
  homeScore: match.homeScore,
  awayScore: match.awayScore,
});

const getActiveGames = (syncedMatches = [], round = defaultRoundConfig) => {
  const normalized = syncedMatches.map(normalizeSyncedMatch).filter(match => match.id && match.kickoffAt);
  if (!normalized.length) return games;
  if (round?.id === "quartas-final") {
    const startsAt = new Date("2026-07-09T00:00:00-03:00");
    const endsAt = new Date("2026-07-19T23:59:59-03:00");
    const finalStretch = normalized.filter(match => {
      const date = new Date(match.kickoffAt);
      return date >= startsAt && date <= endsAt;
    });
    return (finalStretch.length ? finalStretch : normalized)
      .filter(match => ["scheduled", "live", "finished"].includes(match.status))
      .sort((a, b) => new Date(a.kickoffAt) - new Date(b.kickoffAt));
  }
  const sameRound = normalized.filter(match => match.roundId === round.id || match.phase === round.phase || match.roundName === round.name);
  return (sameRound.length ? sameRound : normalized)
    .filter(match => ["scheduled", "live", "finished"].includes(match.status))
    .sort((a, b) => new Date(a.kickoffAt) - new Date(b.kickoffAt));
};

const getMatchResultsFromGames = activeGames => activeGames.reduce((acc, match) => {
  if (Number.isInteger(match.homeScore) && Number.isInteger(match.awayScore)) {
    acc[match.id] = { homeScore: match.homeScore, awayScore: match.awayScore };
  }
  return acc;
}, {});

const predictionRules = [
  "Acertou vencedor ou empate: +2 pts",
  "Placar exato: +6 pts no total",
  "Em pênaltis, vale o placar antes das cobranças",
  "Palpites fecham 10 minutos antes do jogo",
];

const formatDateTime = value => new Date(value).toLocaleString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const getGreeting = (date = new Date()) => {
  const hour = date.getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

const formatDateTimeInput = value => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = number => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const isAnnouncementActive = (announcement = {}, date = new Date()) => {
  const startsAt = announcement.startsAt ? new Date(announcement.startsAt) : null;
  const endsAt = announcement.endsAt ? new Date(announcement.endsAt) : null;
  if (startsAt && date < startsAt) return false;
  if (endsAt && date > endsAt) return false;
  return true;
};

const knockoutRounds = [
  { id: "quartas-final", phase: "Fase final", name: "Quartas de final até a Final", official: true, kickoffAt: "2026-07-09T17:00:00" },
  { id: "oitavas-dia-1", phase: "Oitavas", name: "Oitavas de final • Dia 1", official: true, kickoffAt: "2026-07-04T17:00:00" },
  { id: "oitavas-dia-2", phase: "Oitavas", name: "Oitavas de final • Dia 2", official: true, kickoffAt: "2026-07-05T17:00:00" },
  { id: "oitavas-dia-3", phase: "Oitavas", name: "Oitavas de final • Dia 3", official: true, kickoffAt: "2026-07-06T17:00:00" },
  { id: "oitavas-dia-4", phase: "Oitavas", name: "Oitavas de final • Dia 4", official: true, kickoffAt: "2026-07-07T17:00:00" },
  { id: "quartas-dia-1", phase: "Quartas", name: "Quartas de final • Dia 1", official: true, kickoffAt: "2026-07-09T17:00:00" },
  { id: "quartas-dia-2", phase: "Quartas", name: "Quartas de final • Dia 2", official: true, kickoffAt: "2026-07-10T17:00:00" },
  { id: "quartas-dia-3", phase: "Quartas", name: "Quartas de final • Dia 3", official: true, kickoffAt: "2026-07-11T17:00:00" },
  { id: "semi-1", phase: "Semifinais", name: "Semifinal 1", official: true, kickoffAt: "2026-07-14T21:00:00" },
  { id: "semi-2", phase: "Semifinais", name: "Semifinal 2", official: true, kickoffAt: "2026-07-15T21:00:00" },
  { id: "terceiro-lugar", phase: "Terceiro lugar", name: "Disputa de terceiro lugar", official: true, kickoffAt: "2026-07-18T17:00:00" },
  { id: "final", phase: "Final", name: "Final da Copa", official: true, kickoffAt: "2026-07-19T17:00:00" },
];

const getPredictionWindow = round => {
  const kickoffAt = round.kickoffAt ? new Date(round.kickoffAt) : null;
  const closeAt = kickoffAt
    ? new Date(kickoffAt.getTime() - 10 * 60 * 1000)
    : new Date(round.predictionsCloseAt || defaultRoundConfig.predictionsCloseAt);
  const rawOpenAt = new Date(closeAt.getTime() - 48 * 60 * 60 * 1000);
  return { openAt: rawOpenAt, closeAt };
};

const getPredictionAccess = (round, now = new Date()) => {
  const { openAt, closeAt } = getPredictionWindow(round || defaultRoundConfig);
  if ((round?.status || "open") !== "open") return { open: false, reason: "Rodada não está aberta para palpites.", openAt, closeAt };
  if (now < openAt) return { open: false, reason: `Palpites abrem em ${formatDateTime(openAt)}.`, openAt, closeAt };
  if (now > closeAt) return { open: false, reason: "Palpites encerrados 10 minutos antes do jogo.", openAt, closeAt };
  return { open: true, reason: `Aberto até ${formatDateTime(closeAt)}.`, openAt, closeAt };
};

const getGamePredictionAccess = (game, now = new Date()) => {
  const kickoffAt = new Date(game.kickoffAt);
  const closeAt = new Date(kickoffAt.getTime() - 10 * 60 * 1000);
  const openAt = new Date(closeAt.getTime() - 48 * 60 * 60 * 1000);
  if (now < openAt) return { open: false, reason: `Abre em ${formatDateTime(openAt)}.`, openAt, closeAt };
  if (now > closeAt) return { open: false, reason: "Encerrado 10 minutos antes do jogo.", openAt, closeAt };
  return { open: true, reason: `Aberto até ${formatDateTime(closeAt)}.`, openAt, closeAt };
};
const defaultAnnouncement = {
  id: "endomarketing-quartas-produto-em-foco-17",
  title: "Giro Potiguar edição 26",
  body: "Confira o Giro Potiguar edição 26!!!",
  videoUrl: "https://youtube.com/shorts/_zhzrgEL9T8",
  minimumSeconds: 30,
  publishedAt: "QUARTAS • ativo",
  startsAt: "",
  endsAt: "",
  attachments: [],
};
const defaultScoringStartAt = "2026-07-09T00:00:00-03:00";
const defaultMatchResults = {
  1: { homeScore: 0, awayScore: 3 },
};
const defaultRoundConfig = {
  id: "quartas-final",
  phase: "Fase final",
  name: "Quartas de final até a Final",
  official: true,
  status: "open",
  kickoffAt: "2026-07-09T17:00:00",
  predictionsCloseAt: "2026-07-09T16:50:00",
};
const defaultAward = {
  name: "Premiação da Fase Final",
  criterion: "Desafio da semana + endomarketing + palpites",
  description: "1º vendedor de cada loja ganha uma Mochila Potiguar. 1º vendedor geral ganha um Robô Aspirador Potiguar. Os 2 primeiros líderes geral ganham Robô Aspirador somente se a loja atingir pelo menos 90% da meta do desafio e 80% de aderência aos palpites.",
  storeSellerPrize: "Mochila Potiguar",
  storeSellerPrizeUrl: "https://www.apotiguar.com.br/produto/mochila-reforcada-preta-potiguar-105635",
  overallSellerPrize: "Robô Aspirador Potiguar",
  leadershipPrize: "Robô Aspirador Potiguar",
  mainPrizeUrl: "https://www.apotiguar.com.br/produto/robo-aspirador-de-po-preto-potiguar-105639",
};
const defaultAppSettings = {
  announcement: defaultAnnouncement,
  round: defaultRoundConfig,
  award: defaultAward,
  scoringStartAt: defaultScoringStartAt,
  matchResults: defaultMatchResults,
  productCatalog: focusProducts,
  productAssignments: initialProductAssignments,
  deletedUsers: [],
};

const getEntryDate = entry => new Date(entry.submitted_at || entry.submittedAt || entry.readAt || entry.createdAt || entry.created_at || 0);

const isAfterScoringStart = (entry, settings = defaultAppSettings) => {
  const startAt = new Date(settings.scoringStartAt || defaultScoringStartAt);
  return getEntryDate(entry) >= startAt;
};

const youtubeEmbedUrl = url => {
  const text = String(url || "");
  const match = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([^?&/]+)/);
  const id = match?.[1] || "7EzZjpmw6FQ";
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`;
};

const getPredictionPoints = (entry, matchResults = defaultMatchResults) => {
  const result = matchResults[entry.match_id];
  if (!result) return 0;
  const predictedHome = Number(entry.home_score);
  const predictedAway = Number(entry.away_score);
  const exact = predictedHome === result.homeScore && predictedAway === result.awayScore;
  if (exact) return 6;
  const predictedOutcome = Math.sign(predictedHome - predictedAway);
  const resultOutcome = Math.sign(result.homeScore - result.awayScore);
  return predictedOutcome === resultOutcome ? 2 : 0;
};

const getPredictionStats = (entry, matchResults = defaultMatchResults) => {
  const points = getPredictionPoints(entry, matchResults);
  const result = matchResults[entry.match_id];
  if (!result) return { points, hit: false, exact: false };
  const exact = Number(entry.home_score) === result.homeScore && Number(entry.away_score) === result.awayScore;
  return { points, hit: points > 0, exact };
};

const getTieTime = value => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.getTime() : Number.POSITIVE_INFINITY;
};

const compareRankingRows = (a, b) => (
  b.points - a.points ||
  b.exactPredictions - a.exactPredictions ||
  b.predictionHits - a.predictionHits ||
  b.soldQuantity - a.soldQuantity ||
  (b.storeGoalHit ? 1 : 0) - (a.storeGoalHit ? 1 : 0) ||
  b.storeGoalPercent - a.storeGoalPercent ||
  b.storeActiveSellers - a.storeActiveSellers ||
  b.storeSellerPoints - a.storeSellerPoints ||
  getTieTime(a.firstReadAt) - getTieTime(b.firstReadAt) ||
  getTieTime(a.firstPredictionAt) - getTieTime(b.firstPredictionAt) ||
  getTieTime(a.firstSaleAt) - getTieTime(b.firstSaleAt) ||
  a.name.localeCompare(b.name)
);

const compareStoreTopSellerTie = (a, b) => (
  b.soldQuantity - a.soldQuantity ||
  b.predictionPoints - a.predictionPoints ||
  b.exactPredictions - a.exactPredictions ||
  b.predictionHits - a.predictionHits ||
  getTieTime(a.firstSaleAt) - getTieTime(b.firstSaleAt) ||
  a.name.localeCompare(b.name)
);

const LEADER_PRIZE_MIN_GOAL_PERCENT = 90;
const LEADER_PRIZE_MIN_ADHERENCE_PERCENT = 80;

const buildPilotRanking = (users, predictionEntries, salesEntries, readEntries, profilePhotos = {}, settings = defaultAppSettings) => {
  const activeRound = settings.round || defaultRoundConfig;
  const activeMatchResults = settings.matchResults || defaultMatchResults;
  const productFocusEnabled = isProductFocusEnabled(settings);
  const participants = users.filter(user => user.profile !== "Administrador");
  const rows = participants.map(user => ({
    name: user.name,
    cpf: onlyDigits(user.cpf),
    photoUrl: profilePhotos[onlyDigits(user.cpf)] || "",
    store: user.store,
    role: user.profile,
    points: 0,
    announcementPoints: 0,
    announcementRead: false,
    predictionPoints: 0,
    predictionHits: 0,
    exactPredictions: 0,
    salesPoints: 0,
    topSellerPoints: 0,
    storeGoalPoints: 0,
    soldQuantity: 0,
    isTopSeller: false,
    firstReadAt: "",
    firstPredictionAt: "",
    firstSaleAt: "",
    storeGoalHit: false,
    storeGoalPercent: 0,
    storeAdherencePercent: 0,
    leaderPrizeEligible: false,
    storeActiveSellers: 0,
    storeSellerPoints: 0,
  }));
  const byCpf = Object.fromEntries(rows.map(row => [row.cpf, row]));

  readEntries.filter(entry => isAfterScoringStart(entry, settings)).forEach(entry => {
    const row = byCpf[onlyDigits(entry.cpf)];
    if (!row || entry.roundId !== activeRound.id || row.announcementRead) return;
    row.announcementRead = true;
    row.firstReadAt = entry.readAt || entry.read_at || "";
    row.announcementPoints += 1;
    row.points += 1;
  });

  predictionEntries.filter(entry => isAfterScoringStart(entry, settings)).forEach(entry => {
    const row = byCpf[onlyDigits(entry.cpf)];
    if (!row) return;
    const { points, hit, exact } = getPredictionStats(entry, activeMatchResults);
    row.predictionPoints += points;
    row.predictionHits += hit ? 1 : 0;
    row.exactPredictions += exact ? 1 : 0;
    const submittedAt = entry.submitted_at || entry.submittedAt || "";
    if (submittedAt && getTieTime(submittedAt) < getTieTime(row.firstPredictionAt)) row.firstPredictionAt = submittedAt;
    row.points += points;
  });

  const salesByCpf = productFocusEnabled ? salesEntries.filter(entry => isAfterScoringStart(entry, settings)).reduce((acc, entry) => {
    const cpf = onlyDigits(entry.sellerCpf || "");
    if (!cpf) return acc;
    acc[cpf] = (acc[cpf] || 0) + Number(entry.quantity || 0);
    return acc;
  }, {}) : {};

  const salesByStore = productFocusEnabled ? salesEntries.filter(entry => isAfterScoringStart(entry, settings)).reduce((acc, entry) => {
    const store = normalizeStore(entry.store);
    acc[store] = (acc[store] || 0) + Number(entry.quantity || 0);
    return acc;
  }, {}) : {};

  const predictionCpfsByStore = predictionEntries.filter(entry => isAfterScoringStart(entry, settings)).reduce((acc, entry) => {
    const row = byCpf[onlyDigits(entry.cpf)];
    if (!row) return acc;
    if (!acc[row.store]) acc[row.store] = new Set();
    acc[row.store].add(row.cpf);
    return acc;
  }, {});

  Object.entries(salesByCpf).forEach(([cpf, quantity]) => {
    const row = byCpf[cpf];
    if (!row || quantity <= 0) return;
    row.soldQuantity = quantity;
    row.salesPoints += 5;
    row.points += 5;
  });

  if (productFocusEnabled) {
    salesEntries.filter(entry => isAfterScoringStart(entry, settings)).forEach(entry => {
      const row = byCpf[onlyDigits(entry.sellerCpf || "")];
      const createdAt = entry.createdAt || entry.created_at || "";
      if (row && createdAt && getTieTime(createdAt) < getTieTime(row.firstSaleAt)) row.firstSaleAt = createdAt;
    });
  }

  fixedStores.forEach(store => {
    const storeSellers = rows.filter(row => row.store === store && row.role === "Vendedor" && row.soldQuantity > 0);
    const maxSold = Math.max(0, ...storeSellers.map(row => row.soldQuantity));
    if (maxSold > 0) {
      storeSellers
        .filter(row => row.soldQuantity === maxSold)
        .sort(compareStoreTopSellerTie)
        .slice(0, 1)
        .forEach(row => {
          row.isTopSeller = true;
          row.topSellerPoints += 8;
          row.points += 8;
        });
    }
  });

  const scoringAssignments = getProductAssignments(settings);
  const primaryStoreAssignments = fixedStores
    .map(store => scoringAssignments.find(item => item.store === store) || initialProductAssignments.find(item => item.store === store))
    .filter(Boolean);

  primaryStoreAssignments.forEach(assignment => {
    const storeGoal = Number(assignment.goal || 0);
    if (!storeGoal || Number(salesByStore[assignment.store] || 0) < storeGoal) return;
    rows.filter(row => row.store === assignment.store).forEach(row => {
      row.storeGoalPoints += row.role === "Liderança" ? 4 : 2;
      row.points += row.role === "Liderança" ? 4 : 2;
    });
  });

  fixedStores.forEach(store => {
    const assignment = primaryStoreAssignments.find(item => item.store === store);
    const goal = Number(assignment?.goal || 0);
    const sold = Number(salesByStore[store] || 0);
    const storeRows = rows.filter(row => row.store === store);
    const storeSellers = storeRows.filter(row => row.role === "Vendedor");
    const storeGoalHit = goal > 0 && sold >= goal;
    const storeGoalPercent = goal > 0 ? Math.round((sold / goal) * 100) : 0;
    const storeAdherencePercent = storeRows.length ? Math.round(((predictionCpfsByStore[store]?.size || 0) / storeRows.length) * 100) : 0;
    const storeActiveSellers = storeSellers.filter(row => row.soldQuantity > 0).length;
    const storeSellerPoints = storeSellers.reduce((sum, row) => sum + row.points, 0);
    storeRows.forEach(row => {
      row.storeGoalHit = storeGoalHit;
      row.storeGoalPercent = storeGoalPercent;
      row.storeAdherencePercent = storeAdherencePercent;
      row.leaderPrizeEligible = row.role === "Liderança" && storeGoalPercent >= LEADER_PRIZE_MIN_GOAL_PERCENT && storeAdherencePercent >= LEADER_PRIZE_MIN_ADHERENCE_PERCENT;
      row.storeActiveSellers = storeActiveSellers;
      row.storeSellerPoints = storeSellerPoints;
    });
  });

  return rows.sort(compareRankingRows);
};

const getRoundClosingSummary = rankingRows => {
  const eligibleRows = rankingRows.filter(row => row.role !== "Administrador");
  const sellers = eligibleRows.filter(row => row.role === "Vendedor");
  const leaders = eligibleRows.filter(row => row.role === "Liderança");
  const prizeEligibleLeaders = leaders.filter(row => row.leaderPrizeEligible);
  return {
    overallWinner: eligibleRows[0] || null,
    topOverall: eligibleRows.slice(0, 3),
    topSellerOverall: sellers[0] || null,
    topLeaders: prizeEligibleLeaders.slice(0, 2),
    leaderCandidates: leaders.slice(0, 5),
    storeWinners: fixedStores
      .map(store => ({
        store,
        winner: sellers.filter(row => row.store === store)[0] || null,
      }))
      .filter(item => item.winner),
  };
};

const getStoreSummaries = (rankingRows, predictionEntries = [], readEntries = []) => fixedStores
  .map(store => {
    const people = rankingRows.filter(person => person.store === store);
    const sellers = people.filter(person => person.role === "Vendedor");
    const leaders = people.filter(person => person.role === "Liderança");
    const points = people.reduce((sum, person) => sum + person.points, 0);
    const predictionCount = predictionEntries.filter(entry => entry.store === store).length;
    const readCount = readEntries.filter(entry => entry.store === store).length;
    const topSeller = sellers[0] || null;
    return {
      store,
      people,
      sellers,
      leaders,
      participants: people.length,
      sellerCount: sellers.length,
      leaderCount: leaders.length,
      points,
      predictionCount,
      readCount,
      topSeller,
    };
  })
  .sort((a, b) => b.points - a.points || b.predictionCount - a.predictionCount || a.store.localeCompare(b.store));

const getPredictionEngagement = (users = [], predictionEntries = []) => {
  const eligibleUsers = users.filter(user => user.profile !== "Administrador" && fixedStores.includes(user.store));
  const predictionMap = predictionEntries.reduce((acc, entry) => {
    const cpf = onlyDigits(entry.cpf);
    if (!cpf) return acc;
    const current = acc[cpf] || { count: 0, matches: new Set(), latest: "" };
    current.count += 1;
    current.matches.add(entry.match_id || entry.matchId);
    if (!current.latest || new Date(entry.submitted_at || entry.submittedAt) > new Date(current.latest)) current.latest = entry.submitted_at || entry.submittedAt;
    acc[cpf] = current;
    return acc;
  }, {});
  const totals = {
    eligible: eligibleUsers.length,
    participated: eligibleUsers.filter(user => predictionMap[onlyDigits(user.cpf)]).length,
  };
  totals.missing = totals.eligible - totals.participated;
  totals.adherence = totals.eligible ? Math.round((totals.participated / totals.eligible) * 100) : 0;
  const stores = fixedStores.map(store => {
    const people = eligibleUsers.filter(user => user.store === store);
    const participatedPeople = people.filter(user => predictionMap[onlyDigits(user.cpf)]);
    const missingPeople = people.filter(user => !predictionMap[onlyDigits(user.cpf)]).sort((a, b) => a.name.localeCompare(b.name));
    const sellers = people.filter(user => user.profile === "Vendedor");
    const leaders = people.filter(user => user.profile === "Liderança");
    const sellerParticipated = participatedPeople.filter(user => user.profile === "Vendedor").length;
    const leaderParticipated = participatedPeople.filter(user => user.profile === "Liderança").length;
    const guesses = participatedPeople.reduce((sum, user) => sum + (predictionMap[onlyDigits(user.cpf)]?.matches.size || 0), 0);
    const adherence = people.length ? Math.round((participatedPeople.length / people.length) * 100) : 0;
    return {
      store,
      people,
      total: people.length,
      participated: participatedPeople.length,
      missing: missingPeople.length,
      adherence,
      sellers: sellers.length,
      leaders: leaders.length,
      sellerParticipated,
      leaderParticipated,
      guesses,
      missingPeople,
    };
  });
  return {
    totals,
    stores,
    bestStores: [...stores].sort((a, b) => b.adherence - a.adherence || b.participated - a.participated || a.store.localeCompare(b.store)),
    worstStores: [...stores].sort((a, b) => a.adherence - b.adherence || b.missing - a.missing || a.store.localeCompare(b.store)),
  };
};

function Brand({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${compact ? "h-10 w-10" : "h-12 w-12"} grid place-items-center rounded-2xl bg-potiguar-lime text-potiguar-950 shadow-lg shadow-black/10`}>
        <Icon name="trophy" size={compact ? 22 : 26} />
      </div>
      <div>
        <p className={`${compact ? "text-[10px]" : "text-xs"} font-extrabold uppercase tracking-[0.22em] text-potiguar-lime`}>Copa Potiguar</p>
        <p className={`${compact ? "text-lg" : "text-xl"} font-display font-extrabold leading-none text-white`}>2026</p>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, userMap }) {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCpf = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const submit = async (event) => {
    event.preventDefault();
    const cpfDigits = cpf.replace(/\D/g, "");
    const user = userMap[cpfDigits];
    if (!user) {
      setError("CPF ou senha inválidos.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    const result = await onLogin(user, password);
    if (!result?.ok) setError(result?.error || "CPF ou senha inválidos.");
    setIsSubmitting(false);
  };

  return (
    <div className="login-bg min-h-screen p-4 sm:grid sm:place-items-center sm:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-2xl shadow-potiguar-950/20 sm:min-h-0 lg:grid-cols-[1.05fr_.95fr]">
        <section className="hero-pattern pitch-lines hidden p-10 text-white lg:flex lg:flex-col">
          <Brand />
          <div className="my-auto max-w-md">
            <span className="inline-flex rounded-full bg-potiguar-lime/15 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.18em] text-potiguar-lime">Campanha oficial 2026</span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02]">Leu.<br/>Palpitou.<br/><span className="text-potiguar-lime">Vendeu.</span></h1>
            <p className="mt-5 text-sm leading-6 text-white/60">Uma disputa única entre vendedores, com liderança acompanhando o resultado da própria loja.</p>
          </div>
          <p className="text-xs text-white/35">Acesso Potiguar • Todas as lojas</p>
        </section>
        <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <div className="mb-9 lg:hidden"><Brand compact /></div>
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-potiguar-700">Bem-vindo</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-potiguar-950">Entre na Copa Potiguar</h2>
          <p className="mt-2 text-sm text-slate-400">Use seu CPF. No primeiro acesso, a senha temporária é o próprio CPF.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-potiguar-950">CPF</span>
              <input aria-label="CPF" inputMode="numeric" autoComplete="username" value={cpf} onChange={e => setCpf(formatCpf(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-potiguar-500 focus:bg-white" />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-extrabold text-potiguar-950">Senha</span>
              <input aria-label="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-potiguar-500 focus:bg-white" />
            </label>
            {error && <p className="rounded-xl bg-red-50 p-3 text-xs font-bold text-red-600">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-potiguar-900/15 disabled:opacity-60"><Icon name="lock" size={17}/> {isSubmitting ? "Entrando..." : "Entrar"}</button>
          </form>
          <p className="mt-4 text-center text-xs font-semibold text-slate-400">Esqueceu a senha? Solicite a redefinição ao administrador.</p>
        </section>
      </div>
    </div>
  );
}

function ChangePasswordScreen({ user, currentPassword, onChanged, onCancel }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (newPassword.length < 6) {
      setError("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("A confirmação precisa ser igual à nova senha.");
      return;
    }
    if (onlyDigits(newPassword) === onlyDigits(user.cpf)) {
      setError("Escolha uma senha diferente do CPF.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    const result = await onChanged(newPassword);
    if (!result?.ok) setError(result?.error || "Não foi possível alterar a senha.");
    setIsSubmitting(false);
  };

  return (
    <div className="login-bg min-h-screen p-4 sm:grid sm:place-items-center sm:p-8">
      <div className="mx-auto w-full max-w-md rounded-[30px] bg-white p-6 shadow-2xl shadow-potiguar-950/20 sm:p-8">
        <div className="mb-8 rounded-3xl bg-potiguar-950 p-5 text-white">
          <Brand compact />
          <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[.16em] text-potiguar-lime">Primeiro acesso</p>
          <h1 className="mt-2 font-display text-2xl font-extrabold">Crie sua senha</h1>
          <p className="mt-2 text-sm text-white/60">{user.name}, por segurança você precisa trocar a senha temporária antes de continuar.</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-potiguar-950">Nova senha</span>
            <input aria-label="Nova senha" type="password" autoComplete="new-password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-potiguar-500 focus:bg-white" />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-potiguar-950">Confirmar nova senha</span>
            <input aria-label="Confirmar nova senha" type="password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-potiguar-500 focus:bg-white" />
          </label>
          {error && <p className="rounded-xl bg-red-50 p-3 text-xs font-bold text-red-600">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-potiguar-900/15 disabled:opacity-60"><Icon name="lock" size={17}/> {isSubmitting ? "Salvando..." : "Salvar nova senha"}</button>
          <button type="button" onClick={onCancel} className="w-full rounded-xl px-5 py-3 text-xs font-extrabold text-slate-400">Voltar ao login</button>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, user, onLogout, profilePhotos }) {
  const isAdmin = user.accessRole === "admin";
  const items = isAdmin ? [
    ["shield", "Painel admin", "admin"],
  ] : [
    ["home", "Início", "home"],
    ["ball", "Palpites", "guesses"],
    ["ranking", "Ranking", "ranking"],
    ["store", "Minha loja", "store"],
  ];
  return (
    <aside className="desktop-nav fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col bg-potiguar-950 p-6 lg:flex">
      <Brand />
      <nav className="mt-12 space-y-2">
        {items.map(([icon, label, value]) => (
          <button key={value} onClick={() => setPage(value)} className={`nav-item ${page === value ? "active bg-potiguar-lime text-potiguar-950 shadow-lg shadow-potiguar-lime/10" : "text-white/65 hover:bg-white/8 hover:text-white"} flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left text-sm font-extrabold`}>
            <Icon name={icon} />
            {label}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="flex items-center gap-3 border-t border-white/10 pt-5">
          <Avatar initials={user.initials} photoUrl={profilePhotos[onlyDigits(user.cpf)]} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">{user.name}</p>
            <p className="truncate text-[11px] text-white/50">{user.accessRole === "seller" ? "Vendedor" : user.originalRole} • {user.store}</p>
          </div>
          <button onClick={onLogout} aria-label="Sair"><Icon name="logout" className="text-white/35" size={18} /></button>
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ page, setPage, user }) {
  if (user.accessRole === "admin") return null;
  const items = [
    ["home", "Início", "home"],
    ["ball", "Palpites", "guesses"],
    ["ranking", "Ranking", "ranking"],
    ["store", "Loja", "store"],
  ];
  return (
    <nav className="mobile-bottom-nav fixed inset-x-3 z-40 flex items-center justify-around rounded-2xl border border-black/5 bg-white/95 px-2 py-2 shadow-2xl shadow-potiguar-950/20 backdrop-blur lg:hidden">
      {items.map(([icon, label, value]) => (
        <button key={value} onClick={() => setPage(value)} className={`nav-item ${page === value ? "active text-potiguar-900" : "text-slate-400"} flex min-w-[66px] flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-extrabold`}>
          <Icon name={icon} size={20} />
          {label}
        </button>
      ))}
    </nav>
  );
}

function Avatar({ initials, size = "normal", rank, photoUrl }) {
  const cls = size === "large" ? "h-14 w-14 text-base" : "h-10 w-10 text-xs";
  return (
    <div className="relative shrink-0">
      <div className={`${cls} grid place-items-center overflow-hidden rounded-full border-2 border-white/70 bg-gradient-to-br from-potiguar-lime to-potiguar-yellow font-extrabold text-potiguar-950 shadow-sm`}>
        {photoUrl ? <img src={photoUrl} alt="" className="h-full w-full object-cover" /> : initials}
      </div>
      {rank && <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-potiguar-900 text-[9px] font-extrabold text-white">{rank}</span>}
    </div>
  );
}

function ProfilePhotoUploader({ user, photoUrl, onSaveProfilePhoto, setToast }) {
  const [saving, setSaving] = useState(false);

  const resizeImage = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const size = 360;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const ratio = Math.max(size / image.width, size / image.height);
        const width = image.width * ratio;
        const height = image.height * ratio;
        canvas.width = size;
        canvas.height = size;
        context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleFile = async event => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast("Escolha um arquivo de imagem.");
      return;
    }
    setSaving(true);
    try {
      const photoData = await resizeImage(file);
      const ok = await onSaveProfilePhoto(user, photoData);
      if (ok) setToast("Foto de perfil atualizada.");
    } catch (error) {
      console.error(error);
      setToast("Não foi possível carregar a foto.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-potiguar-900 px-3 py-2 text-[10px] font-extrabold text-white shadow-sm">
      <Icon name={photoUrl ? "check" : "users"} size={13} />
      {saving ? "Enviando..." : photoUrl ? "Trocar foto" : "Colocar foto"}
      <input type="file" accept="image/*" onChange={handleFile} disabled={saving} className="hidden" />
    </label>
  );
}

function Topbar({ page, user, onLogout, profilePhotos, isImpersonating = false, onStopImpersonation }) {
  const labels = { home: "Visão geral", guesses: "Palpites", ranking: "Rankings", store: "Minha loja", admin: "Painel administrativo" };
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-black/5 bg-[#f4f7f4]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="lg:hidden"><Brand compact /></div>
      <div className="hidden lg:block">
        <p className="text-xs font-semibold text-slate-400">Copa Potiguar 2026</p>
        <h1 className="font-display text-xl font-bold text-potiguar-950">{labels[page]}</h1>
      </div>
      <div className="flex items-center gap-3">
        {isImpersonating && (
          <button onClick={onStopImpersonation} className="hidden rounded-full bg-potiguar-lime px-4 py-2 text-xs font-extrabold text-potiguar-950 shadow-sm sm:inline-flex">
            Voltar ao admin
          </button>
        )}
        <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-potiguar-800 shadow-sm sm:flex">
          <span className="pulse-dot h-2 w-2 rounded-full bg-potiguar-lime"></span>
          Dados ao vivo
        </div>
        <button onClick={onLogout} className="grid h-10 w-10 place-items-center rounded-full bg-potiguar-900 text-white shadow-lg shadow-potiguar-900/15 lg:hidden" aria-label="Sair">
          <Icon name="logout" size={19} />
        </button>
        <div className="hidden items-center gap-3 lg:flex">
          <Avatar initials={user.initials} photoUrl={profilePhotos[onlyDigits(user.cpf)]} />
          <div>
            <p className="text-sm font-extrabold text-potiguar-950">{user.name}</p>
            <p className="text-[11px] text-slate-400">{user.accessRole === "seller" ? "Vendedor" : user.originalRole} • {user.store}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ icon, label, value, detail, accent = "green" }) {
  const themes = {
    green: "bg-potiguar-900 text-white",
    lime: "bg-potiguar-lime text-potiguar-950",
    white: "bg-white text-potiguar-950",
  };
  return (
    <div className={`${themes[accent]} lift rounded-2xl p-5 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs font-bold ${accent === "green" ? "text-white/55" : "text-potiguar-900/55"}`}>{label}</p>
          <p className="mt-2 font-display text-3xl font-extrabold">{value}</p>
          <p className={`mt-1 text-[11px] font-semibold ${accent === "green" ? "text-potiguar-lime" : "text-potiguar-700"}`}>{detail}</p>
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${accent === "green" ? "bg-white/10" : "bg-potiguar-900/10"}`}><Icon name={icon} /></div>
      </div>
    </div>
  );
}

function ProductCard({ user, totalSold, pilotRanking, settings }) {
  const leadership = user.accessRole === "leadership";
  const focus = getStoreFocus(user.store, settings);
  const percent = Math.round((totalSold / focus.goal) * 100);
  const remaining = Math.max(focus.goal - totalSold, 0);
  const width = `${Math.min(percent, 100)}%`;
  const unit = focus.product.unit || "un.";
  const topSeller = pilotRanking
    .filter(person => person.store === user.store && person.role === "Vendedor" && person.soldQuantity > 0)
    .sort((a, b) => b.soldQuantity - a.soldQuantity || b.points - a.points)[0];
  return (
    <section className="hero-pattern pitch-lines rounded-[28px] p-6 text-white shadow-xl shadow-potiguar-900/15 sm:p-8">
      <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-potiguar-lime">
            <Icon name="fire" size={16} /> {leadership ? "Resultado dos vendedores" : "Desafio da Semana"}
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{focus.product.name}</h2>
          <p className="mt-2 text-sm text-white/60">{leadership ? `Desempenho consolidado da equipe ${user.store}` : `Todos os vendedores competem em igualdade • SKU ${focus.product.sku} • Marca ${focus.product.brand}`}</p>
          <div className="mt-6">
            <div className="mb-2 flex items-end justify-between">
              <span className="text-xs font-bold text-white/55">Meta da {user.store}</span>
              <span className="font-display text-xl font-extrabold">{totalSold} <small className="text-xs font-semibold text-white/55">/ {focus.goal} {unit}</small></span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-black/20">
              <div className="h-full rounded-full bg-potiguar-lime" style={{ width }}></div>
            </div>
            <p className="mt-2 text-xs font-bold text-potiguar-lime">{leadership ? `Meta da equipe: ${percent}% atingida.` : remaining > 0 ? `Faltam só ${remaining} ${unit} para bater a meta!` : "Meta batida! Agora é ampliar a vantagem."}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-extrabold">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/75">{percent}% atingido</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-white/75">{topSeller ? `Destaque: ${topSeller.name.split(" ")[0]} • ${topSeller.soldQuantity} ${unit}` : "Aguardando vendas"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-potiguar-lime/10 blur-xl"></div>
            <div className="paint-can"></div>
            <div className="absolute -right-5 -top-5 grid h-14 w-14 rotate-6 place-items-center rounded-2xl bg-potiguar-yellow font-display text-lg font-extrabold text-potiguar-950 shadow-xl">{leadership ? "+4" : "+5"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChallengeReminder({ user, totalSold, pilotRanking, setPage, roundId, settings }) {
  const focus = getStoreFocus(user.store, settings);
  const unit = focus.product.unit || "un.";
  const percent = Math.round((totalSold / focus.goal) * 100);
  const storageKey = `copaChallengeReminder:${onlyDigits(user.cpf)}:${roundId || defaultRoundConfig.id}`;
  const [open, setOpen] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) !== "1";
    } catch (error) {
      return true;
    }
  });
  const topSeller = pilotRanking
    .filter(person => person.store === user.store && person.role === "Vendedor" && person.soldQuantity > 0)
    .sort((a, b) => b.soldQuantity - a.soldQuantity || b.points - a.points)[0];
  const close = () => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch (error) {}
    setOpen(false);
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-potiguar-950/55 p-4 backdrop-blur-sm sm:place-items-center">
      <div className="w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-potiguar-950/35">
        <div className="hero-pattern pitch-lines p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-potiguar-lime">Lembrete comercial</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold">Desafio da Semana</h3>
              <p className="mt-2 text-sm text-white/65">{user.store} • meta {focus.goal} {unit}</p>
            </div>
            <button onClick={close} className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white/70">
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Produto foco da loja</p>
          <h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">{focus.product.name}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-500">SKU {focus.product.sku} • Marca {focus.product.brand}. Cada venda ajuda sua loja a bater a meta e movimenta o ranking.</p>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400">Atingimento da loja</p>
                <p className="font-display text-3xl font-extrabold text-potiguar-950">{percent}%</p>
              </div>
              <p className="text-right text-xs font-extrabold text-potiguar-800">{totalSold} / {focus.goal} {unit}</p>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-potiguar-lime" style={{ width: `${Math.min(percent, 100)}%` }}></div>
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">{topSeller ? `Destaque atual: ${topSeller.name} com ${topSeller.soldQuantity} ${unit}.` : "Ainda não há venda lançada para este desafio."}</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button onClick={() => { close(); setPage("store"); }} className="rounded-2xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white">Ver desafio e ranking</button>
            <button onClick={close} className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3 text-xs font-extrabold text-potiguar-900">Continuar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Announcement({ acknowledged, setToast, user, onAcknowledge, announcement }) {
  const [secondsViewed, setSecondsViewed] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);
  const activeAnnouncement = announcement || defaultAnnouncement;
  const readyToConfirm = secondsViewed >= Number(activeAnnouncement.minimumSeconds || 30);
  const remainingSeconds = Math.max(Number(activeAnnouncement.minimumSeconds || 30) - secondsViewed, 0);
  const attachments = Array.isArray(activeAnnouncement.attachments) ? activeAnnouncement.attachments : [];

  useEffect(() => {
    if (!videoStarted || acknowledged || readyToConfirm) return;
    const timer = setInterval(() => setSecondsViewed(value => value + 1), 1000);
    return () => clearInterval(timer);
  }, [videoStarted, acknowledged, readyToConfirm]);

  const confirmRead = async () => {
    if (!readyToConfirm || acknowledged) return;
    const ok = await onAcknowledge(user, secondsViewed);
    if (ok) setToast("+1 ponto! Comunicado registrado.");
  };

  return (
    <section className="soft-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-potiguar-yellow/30 text-amber-700"><Icon name="megaphone" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-600">Comunicado obrigatório</p>
              <h3 className="mt-1 font-display text-lg font-extrabold text-potiguar-950">{activeAnnouncement.title}</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">{activeAnnouncement.publishedAt || "ATIVO"}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">{activeAnnouncement.body}</p>
          {attachments.length > 0 && (
            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <strong className="block text-xs font-extrabold text-potiguar-950">Arquivos do comunicado</strong>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {attachments.map(file => (
                  <a key={file.id || file.name} href={file.dataUrl || file.url} download={file.name} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-xs font-bold text-potiguar-800 transition hover:bg-potiguar-lime/10">
                    <span className="truncate">{file.name}</span>
                    <Icon name="chevron" size={14} />
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            <strong className="block font-extrabold">Como participar hoje</strong>
            Assista ao vídeo → confirme a leitura da rodada → envie seu palpite até 10 minutos antes do jogo → acompanhe o ranking da rodada.
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-potiguar-950 p-3">
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-lime">Vídeo da campanha</p>
                <p className="mt-0.5 text-xs font-semibold text-white/65">Clique em iniciar para começar a validação</p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-white/70">
                <Icon name="play" size={11} /> {acknowledged ? "Concluído" : readyToConfirm ? "Liberado" : videoStarted ? `${remainingSeconds}s` : "Aguardando"}
              </span>
            </div>
            {!videoStarted && !acknowledged ? (
              <button onClick={() => setVideoStarted(true)} className="mx-auto grid aspect-[9/16] w-full max-w-[260px] place-items-center overflow-hidden rounded-xl bg-black text-center text-white shadow-xl">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-potiguar-lime text-potiguar-950"><Icon name="play" size={30} /></span>
                <span className="-mt-20 px-6 text-xs font-extrabold text-white/75">Iniciar vídeo e validação de {activeAnnouncement.minimumSeconds || 30} segundos</span>
              </button>
            ) : (
              <div className="mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-xl bg-black shadow-xl">
                <iframe
                  className="h-full w-full"
                  src={youtubeEmbedUrl(activeAnnouncement.videoUrl)}
                  title="Vídeo da Copa Potiguar 2026"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <a
              href={activeAnnouncement.videoUrl || defaultAnnouncement.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-[11px] font-extrabold text-white transition hover:bg-white/15"
            >
              Abrir vídeo no YouTube <Icon name="chevron" size={14} />
            </a>
          </div>
          {!acknowledged && (
            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-500">
              {!videoStarted ? "Clique em “Iniciar vídeo” para começar a contar o tempo mínimo." : readyToConfirm ? "Pronto: agora você pode confirmar ciência e liberar o palpite." : `Assista/permaneça no vídeo por mais ${remainingSeconds} segundo(s) para liberar o botão.`}
            </div>
          )}
          <button
            disabled={acknowledged || !readyToConfirm}
            onClick={confirmRead}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold transition sm:w-auto ${acknowledged ? "bg-emerald-50 text-potiguar-700" : readyToConfirm ? "bg-potiguar-900 text-white shadow-lg shadow-potiguar-900/15 hover:bg-potiguar-800" : "cursor-not-allowed bg-slate-100 text-slate-400"}`}
          >
            <Icon name={acknowledged ? "check" : "megaphone"} size={17} />
            {acknowledged ? "Lido e registrado" : readyToConfirm ? "Li e estou ciente" : `Liberando em ${remainingSeconds}s`}
          </button>
        </div>
      </div>
    </section>
  );
}

function MiniRanking({ pilotRanking }) {
  return (
    <section className="soft-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Disputa geral</p>
          <h3 className="mt-1 font-display text-lg font-extrabold text-potiguar-950">Pódio da rodada</h3>
        </div>
        <Icon name="trophy" className="text-amber-500" />
      </div>
      <div className="mt-5 space-y-4">
        {pilotRanking.slice(0, 3).map((person, idx) => (
          <div key={person.name} className="flex items-center gap-3">
            <span className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-extrabold ${idx === 0 ? "bg-amber-100 text-amber-700" : idx === 1 ? "bg-slate-100 text-slate-500" : "bg-orange-100 text-orange-700"}`}>{idx + 1}</span>
            <Avatar initials={person.name.split(" ").map(x => x[0]).slice(0,2).join("")} photoUrl={person.photoUrl} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold text-potiguar-950">{person.name}</p>
              <p className="text-[10px] text-slate-400">{person.store}</p>
            </div>
            <strong className="font-display text-lg text-potiguar-900">{person.points}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function StoreMiniRanking({ user, pilotRanking, settings }) {
  const localRanking = pilotRanking.filter(person => person.store === user.store && person.role === "Vendedor").slice(0, 4);
  const myPosition = pilotRanking.filter(person => person.store === user.store && person.role === "Vendedor").findIndex(person => person.name === user.name) + 1;
  const unit = getStoreFocus(user.store, settings).product.unit || "un.";
  return (
    <section className="soft-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Minha loja • {user.store}</p>
          <h3 className="mt-1 font-display text-lg font-extrabold text-potiguar-950">Ranking dos vendedores</h3>
        </div>
        <span className="rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800">VOCÊ: {myPosition || "—"}º</span>
      </div>
      <div className="mt-5 space-y-3">
        {localRanking.map((person, idx) => {
          const isMe = person.name === user.name;
          return (
            <div key={person.name} className={`flex items-center gap-3 rounded-xl p-3 ${isMe ? "bg-potiguar-lime/15" : "bg-slate-50"}`}>
              <span className="w-5 text-center text-xs font-extrabold text-slate-400">{idx === 0 ? "🥇" : idx + 1}</span>
              <Avatar initials={person.name.split(" ").map(x => x[0]).slice(0, 2).join("")} photoUrl={person.photoUrl} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-potiguar-950">{person.name}{isMe && <span className="ml-1 text-[9px] text-potiguar-700">(VOCÊ)</span>}</p>
                <p className="text-[10px] text-slate-400">{person.soldQuantity} {unit} • {person.predictionHits} acerto(s){person.isTopSeller ? " • destaque" : ""}</p>
              </div>
              <strong className="font-display text-lg text-potiguar-900">{person.points}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LeaderPrizeRanking({ user, pilotRanking, award = defaultAward }) {
  const leaders = pilotRanking.filter(person => person.role === "Liderança" && person.leaderPrizeEligible).slice(0, 2);
  const myRow = pilotRanking.find(person => person.cpf === onlyDigits(user.cpf));
  const myLeaderPosition = pilotRanking.filter(person => person.role === "Liderança").findIndex(person => person.cpf === onlyDigits(user.cpf)) + 1;
  const eligibleText = myRow?.leaderPrizeEligible
    ? "Sua loja já cumpre os critérios de premiação."
    : `Para concorrer: meta da loja ≥ ${LEADER_PRIZE_MIN_GOAL_PERCENT}% e aderência ≥ ${LEADER_PRIZE_MIN_ADHERENCE_PERCENT}%. Hoje: meta ${myRow?.storeGoalPercent || 0}% • aderência ${myRow?.storeAdherencePercent || 0}%.`;
  return (
    <section className="soft-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Premiação liderança</p>
          <h3 className="mt-1 font-display text-lg font-extrabold text-potiguar-950">Top 2 líderes elegíveis</h3>
          <p className="mt-1 text-xs text-slate-400">Sua posição: {myLeaderPosition || "—"}º entre líderes • prêmio: {award.leadershipPrize}</p>
          <p className={`mt-2 text-xs font-bold ${myRow?.leaderPrizeEligible ? "text-emerald-600" : "text-amber-600"}`}>{eligibleText}</p>
        </div>
        <Icon name="trophy" className="text-potiguar-red" />
      </div>
      <div className="mt-5 space-y-3">
        {leaders.map((person, index) => (
          <div key={person.cpf} className={`flex items-center gap-3 rounded-xl p-3 ${person.cpf === onlyDigits(user.cpf) ? "bg-potiguar-lime/15" : "bg-slate-50"}`}>
            <span className="w-7 text-center text-xs">{index === 0 ? "🥇" : "🥈"}</span>
            <Avatar initials={person.name.split(" ").map(part => part[0]).slice(0, 2).join("")} photoUrl={person.photoUrl} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold text-potiguar-950">{person.name}</p>
              <p className="text-[10px] text-slate-400">{person.store} • {person.predictionHits} acerto(s)</p>
            </div>
            <strong className="font-display text-lg text-potiguar-900">{person.points}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home({ acknowledged, setPage, setToast, user, pilotRanking, totalSold, profilePhotos, settings, activeGames, onAcknowledge, onSaveProfilePhoto }) {
  const leadership = user.accessRole === "leadership";
  const round = settings.round || defaultRoundConfig;
  const productFocusEnabled = isProductFocusEnabled(settings);
  const now = new Date();
  const gameAccess = activeGames.map(game => getGamePredictionAccess(game, now));
  const firstOpenAccess = gameAccess.find(access => access.open);
  const nextAccess = firstOpenAccess || gameAccess.find(access => now < access.closeAt);
  const predictionsClosed = !firstOpenAccess;
  const storeFocus = getStoreFocus(user.store, settings);
  const storeFocusUnit = storeFocus.product.unit || "unidades";
  const storeSellers = pilotRanking.filter(person => person.store === user.store && person.role === "Vendedor");
  const activeSellers = storeSellers.filter(person => person.soldQuantity > 0).length;
  const userRanking = pilotRanking.find(row => row.cpf === onlyDigits(user.cpf));
  const userPhotoUrl = profilePhotos[onlyDigits(user.cpf)] || userRanking?.photoUrl || "";
  const userPosition = pilotRanking.findIndex(row => row.cpf === onlyDigits(user.cpf)) + 1;
  const storeGoal = storeFocus.goal;
  const storePercent = Math.round((totalSold / storeGoal) * 100);
  const totalPredictionHits = pilotRanking.reduce((sum, person) => sum + person.predictionHits, 0);
  const award = settings.award || defaultAward;
  const greeting = getGreeting(now);
  const announcementActive = isAnnouncementActive(settings.announcement || defaultAnnouncement, now);
  return (
    <div className="space-y-6">
      {productFocusEnabled && <ChallengeReminder user={user} totalSold={totalSold} pilotRanking={pilotRanking} setPage={setPage} roundId={round.id} settings={settings} />}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-400">{round.name} • {firstOpenAccess ? `palpites até ${formatDateTime(firstOpenAccess.closeAt)}` : "sem jogo aberto para palpite"}</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-potiguar-950">{greeting}, {user.firstName}! <span className="inline-block origin-bottom-right animate-[wave_1.6s_ease-in-out_infinite]">👋</span></h2>
          <p className="mt-1 text-sm text-slate-500">{leadership ? "Acompanhe o desempenho dos vendedores da sua loja." : predictionsClosed ? productFocusEnabled ? "Palpites encerrados. Agora vamos acompanhar as vendas do desafio da semana." : "Palpites encerrados. Acompanhe o ranking da rodada." : "A janela de palpites está aberta para os jogos disponíveis."}</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-sm">
          <Avatar initials={user.initials} size="large" rank={user.position} photoUrl={userPhotoUrl} />
          <div>
            <p className="text-xs font-semibold text-slate-400">{user.accessRole === "seller" ? "Vendedor" : user.originalRole}</p>
            <p className="text-sm font-extrabold text-potiguar-950">{user.store} • {leadership ? "Liderança" : `${userPosition || "—"}º geral`}</p>
            <div className="mt-2">
              <ProfilePhotoUploader user={user} photoUrl={userPhotoUrl} onSaveProfilePhoto={onSaveProfilePhoto} setToast={setToast} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard icon="bolt" label={leadership ? "Pontos da liderança" : "Seus pontos"} value={userRanking?.points || 0} detail={productFocusEnabled ? leadership ? `Comunicado ${userRanking?.announcementPoints || 0} • Meta ${userRanking?.storeGoalPoints || 0}` : `Comunicado ${userRanking?.announcementPoints || 0} • Palpite ${userRanking?.predictionPoints || 0} • Venda ${(userRanking?.salesPoints || 0) + (userRanking?.topSellerPoints || 0)}` : `Comunicado ${userRanking?.announcementPoints || 0} • Palpite ${userRanking?.predictionPoints || 0}`} accent="green" />
        <StatCard icon="ranking" label="Posição geral" value={`${userPosition || "—"}º`} detail={userRanking?.isTopSeller ? "Destaque do desafio da semana" : "Ranking atualizado automaticamente"} accent="lime" />
        <StatCard icon="target" label={leadership && productFocusEnabled ? "Vendedores com venda" : "Palpites certos"} value={leadership && productFocusEnabled ? `${activeSellers}/${storeSellers.length}` : userRanking?.predictionHits || 0} detail={leadership && productFocusEnabled ? "Com pelo menos 1 venda lançada" : `${userRanking?.exactPredictions || 0} placar exato • ${totalPredictionHits} acertos na rodada`} accent="white" />
        <StatCard icon={productFocusEnabled ? "fire" : "ball"} label={productFocusEnabled ? "Meta da loja" : "Fase final"} value={productFocusEnabled ? `${storePercent}%` : "Finais"} detail={productFocusEnabled ? `${totalSold} de ${storeFocus.goal} ${storeFocusUnit}` : "Somente palpites nesta etapa"} accent="white" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_.8fr]">
        {productFocusEnabled ? <ProductCard user={user} totalSold={totalSold} pilotRanking={pilotRanking} settings={settings} /> : (
          <section className="hero-pattern pitch-lines rounded-[28px] p-6 text-white shadow-xl shadow-potiguar-900/15 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-lime"><Icon name="ball" size={16} /> Fase final</div>
            <h3 className="mt-3 font-display text-3xl font-extrabold">Disputa oficial em andamento</h3>
            <p className="mt-2 text-sm leading-6 text-white/65">Acompanhe os palpites, o endomarketing e o desafio da semana da sua loja.</p>
          </section>
        )}
        <div className="space-y-6">
          <MiniRanking pilotRanking={pilotRanking} />
          <section className="soft-card rounded-2xl p-5 sm:p-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-amber-600">Prêmio da rodada</p>
            <h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">{award.name}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{award.criterion} • {award.description}</p>
            <div className="mt-4 grid gap-2">
              <a href={award.storeSellerPrizeUrl || defaultAward.storeSellerPrizeUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-50 px-3 py-2 text-[11px] font-extrabold text-potiguar-800 transition hover:bg-potiguar-lime/15">1º vendedor por loja: {award.storeSellerPrize || defaultAward.storeSellerPrize}</a>
              <a href={award.mainPrizeUrl || defaultAward.mainPrizeUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-50 px-3 py-2 text-[11px] font-extrabold text-potiguar-800 transition hover:bg-potiguar-lime/15">1º vendedor geral e Top 2 líderes elegíveis: {award.overallSellerPrize || defaultAward.overallSellerPrize}</a>
            </div>
          </section>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_.8fr]">
        {announcementActive ? (
          <Announcement acknowledged={acknowledged} setToast={setToast} user={user} onAcknowledge={onAcknowledge} announcement={settings.announcement} />
        ) : (
          <section className="soft-card rounded-2xl p-5 sm:p-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Endomarketing</p>
            <h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Nenhum comunicado ativo agora</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">Quando o RH liberar o próximo comunicado dentro do horário agendado, ele aparecerá aqui para leitura e confirmação.</p>
          </section>
        )}
        <button onClick={() => setPage(predictionsClosed && productFocusEnabled ? "store" : "guesses")} className="group hero-pattern rounded-2xl p-5 text-left text-white shadow-lg sm:p-6">
          <div className="flex h-full items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-potiguar-lime"><Icon name={predictionsClosed ? "lock" : acknowledged ? "ball" : "lock"} size={16} /> {predictionsClosed ? "Palpites encerrados" : acknowledged ? "Área liberada" : "Ação necessária"}</div>
              <h3 className="mt-2 font-display text-xl font-extrabold">{predictionsClosed ? productFocusEnabled ? "Acompanhar desafio da semana" : "Ver jogos da rodada" : acknowledged ? "Faça seus palpites" : "Leia para desbloquear"}</h3>
              <p className="mt-1 text-xs text-white/55">{nextAccess?.reason || "Aguardando jogos da rodada."}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 transition group-hover:translate-x-1"><Icon name="chevron" /></span>
          </div>
        </button>
      </div>
      {leadership && <LeaderPrizeRanking user={user} pilotRanking={pilotRanking} award={award} />}
      {user.accessRole !== "admin" && <StoreMiniRanking user={user} pilotRanking={pilotRanking} settings={settings} />}
    </div>
  );
}

function Guesses({ acknowledged, setPage, setToast, user, settings, activeGames, onSavePrediction }) {
  const [scores, setScores] = useState({ 1: ["", ""] });
  const [saved, setSaved] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [filter, setFilter] = useState("open");
  const round = settings.round || defaultRoundConfig;
  const gameAccess = Object.fromEntries(activeGames.map(game => [game.id, getGamePredictionAccess(game, now)]));
  const openGames = activeGames.filter(game => gameAccess[game.id]?.open);
  const upcomingGames = activeGames.filter(game => !gameAccess[game.id]?.open && now < gameAccess[game.id]?.openAt);
  const closedGames = activeGames.filter(game => !gameAccess[game.id]?.open && now >= gameAccess[game.id]?.closeAt);
  const filteredGames = filter === "open" ? openGames : filter === "upcoming" ? upcomingGames : closedGames;
  const firstOpenAccess = openGames.length ? gameAccess[openGames[0].id] : null;
  const nextGameAccess = activeGames.map(game => gameAccess[game.id]).find(access => access && new Date() < access.closeAt);
  const predictionsClosed = openGames.length === 0;
  const complete = openGames.length > 0 && openGames.every(game => {
    const pair = scores[game.id] || ["", ""];
    return pair[0] !== "" && pair[1] !== "";
  });

  useEffect(() => {
    setScores(current => Object.fromEntries(activeGames.map(game => [game.id, current[game.id] || ["", ""]])));
    setSaved(false);
  }, [activeGames.map(game => game.id).join("|")]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (openGames.length) setFilter("open");
    else if (upcomingGames.length) setFilter("upcoming");
    else setFilter("closed");
  }, [openGames.length, upcomingGames.length]);

  const updateScore = (id, side, value) => {
    if (value === "" || (/^\d$/.test(value) && Number(value) <= 9)) {
      setScores({ ...scores, [id]: (scores[id] || ["", ""]).map((v, i) => i === side ? value : v) });
      setSaved(false);
    }
  };

  if (!acknowledged && !predictionsClosed) return (
    <div className="mx-auto max-w-2xl py-8 sm:py-16">
      <div className="soft-card overflow-hidden rounded-[28px] text-center">
        <div className="hero-pattern pitch-lines px-6 py-12 text-white">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white/10 text-potiguar-lime"><Icon name="lock" size={38} /></div>
          <h2 className="mt-6 font-display text-3xl font-extrabold">Palpites bloqueados</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/60">Para acessar os jogos, você precisa ler e confirmar a informação de endomarketing desta rodada.</p>
        </div>
        <div className="p-6 sm:p-8">
          <div className="rounded-2xl bg-amber-50 p-4 text-left text-sm text-amber-800">
            <strong className="block">Regra da rodada</strong>
            {firstOpenAccess?.reason || nextGameAccess?.reason || "Nenhum jogo aberto para palpite nesta rodada."}
          </div>
          <button onClick={() => setPage("home")} className="mt-6 w-full rounded-xl bg-potiguar-900 px-5 py-3.5 text-sm font-extrabold text-white">Voltar e confirmar a rodada</button>
        </div>
      </div>
    </div>
  );

  if (predictionsClosed && !upcomingGames.length) return (
    <div className="mx-auto max-w-2xl py-8 sm:py-16">
      <div className="soft-card overflow-hidden rounded-[28px] text-center">
        <div className="hero-pattern pitch-lines px-6 py-12 text-white">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white/10 text-potiguar-lime"><Icon name="lock" size={38} /></div>
          <h2 className="mt-6 font-display text-3xl font-extrabold">Palpites encerrados</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/60">{nextGameAccess?.reason || "Não há jogos abertos para palpite nesta rodada."}</p>
        </div>
        <div className="p-6 sm:p-8">
          <div className="rounded-2xl bg-potiguar-lime/15 p-4 text-left text-sm text-potiguar-900">
            <strong className="block">Regra de horário</strong>
            {predictionRules.join(" • ")}
          </div>
          <button onClick={() => setPage("store")} className="mt-6 w-full rounded-xl bg-potiguar-900 px-5 py-3.5 text-sm font-extrabold text-white">Ver ranking da loja</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-potiguar-lime"><span className="pulse-dot h-2 w-2 rounded-full bg-potiguar-lime"></span> Rodada oficial • {round.phase}</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold">{round.name}</h2>
            <p className="mt-2 text-sm text-white/60">Digite o placar nos campos vermelhos. Placar exato vale 6 pontos no total; vencedor ou empate vale 2. Cada jogo fecha 10 minutos antes de começar.</p>
          </div>
          <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
            <Icon name="clock" className="text-potiguar-lime" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">Janela de palpites</p>
              <p className="font-display text-lg font-extrabold">{firstOpenAccess ? `até ${formatDateTime(firstOpenAccess.closeAt)}` : "sem jogo aberto"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="soft-card rounded-2xl p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["open", "Para palpitar", openGames.length],
            ["upcoming", "Próximos", upcomingGames.length],
            ["closed", "Realizados", closedGames.length],
          ].map(([value, label, count]) => (
            <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-xl px-2 py-3 text-center text-[11px] font-extrabold transition ${filter === value ? "bg-potiguar-900 text-white" : "bg-slate-50 text-slate-400"}`}>
              {label}
              <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[9px] ${filter === value ? "bg-white/15 text-white" : "bg-white text-slate-400"}`}>{count}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        {filteredGames.length === 0 && (
          <div className="soft-card rounded-2xl p-6 text-center text-sm font-semibold text-slate-400">
            Nenhum jogo nesta aba agora.
          </div>
        )}
        {filteredGames.map(game => {
          const access = gameAccess[game.id];
          const closed = !access?.open;
          const finished = game.status === "finished" || (Number.isInteger(game.homeScore) && Number.isInteger(game.awayScore));
          return (
          <article key={game.id} className="soft-card rounded-2xl p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-potiguar-900/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">{game.group}</span>
              <div className="text-right">
                <span className="flex items-center justify-end gap-1.5 text-xs font-bold text-slate-500"><Icon name="clock" size={14} /> {game.time}</span>
                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-wide text-slate-300">{finished ? `FINAL ${game.homeScore} × ${game.awayScore}` : closed ? "PALPITE FECHADO" : `FECHA ${formatDateTime(access.closeAt)}`} • {game.venue}</span>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-end">
                <span className="text-3xl">{game.homeFlag}</span>
                <strong className="text-center text-sm text-potiguar-950 sm:text-base">{game.home}</strong>
              </div>
              <div className="rounded-2xl border-2 border-potiguar-red/25 bg-potiguar-red/5 p-2 text-center shadow-lg shadow-red-500/10">
                <p className="mb-1 text-[9px] font-extrabold uppercase tracking-wider text-potiguar-red">Digite seu palpite</p>
                <div className="flex items-center gap-2">
                  <input aria-label={`Gols ${game.home}`} disabled={closed} placeholder="0" className="score-input h-14 w-14 rounded-xl border-2 border-potiguar-red bg-white text-center font-display text-2xl font-extrabold text-potiguar-950 outline-none transition focus:border-potiguar-lime focus:ring-4 focus:ring-potiguar-lime/30 disabled:border-slate-200 disabled:opacity-40 sm:h-16 sm:w-16" type="number" min="0" max="9" value={(scores[game.id] || ["", ""])[0]} onChange={e => updateScore(game.id, 0, e.target.value)} />
                  <span className="font-extrabold text-potiguar-red">×</span>
                  <input aria-label={`Gols ${game.away}`} disabled={closed} placeholder="0" className="score-input h-14 w-14 rounded-xl border-2 border-potiguar-red bg-white text-center font-display text-2xl font-extrabold text-potiguar-950 outline-none transition focus:border-potiguar-lime focus:ring-4 focus:ring-potiguar-lime/30 disabled:border-slate-200 disabled:opacity-40 sm:h-16 sm:w-16" type="number" min="0" max="9" value={(scores[game.id] || ["", ""])[1]} onChange={e => updateScore(game.id, 1, e.target.value)} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <span className="text-3xl sm:order-2">{game.awayFlag}</span>
                <strong className="text-center text-sm text-potiguar-950 sm:text-base">{game.away}</strong>
              </div>
            </div>
          </article>
          );
        })}
      </div>
      <div className="rounded-2xl border border-potiguar-900/10 bg-white/95 p-3 shadow-2xl backdrop-blur lg:sticky lg:bottom-5">
        <button disabled={!complete || saved} onClick={async () => {
          const ok = await onSavePrediction(user, scores, openGames);
          if (ok) {
            setSaved(true);
            setToast("Palpites salvos e enviados para o admin.");
          }
        }} className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-extrabold transition ${complete && !saved ? "bg-potiguar-900 text-white hover:bg-potiguar-800" : saved ? "bg-emerald-50 text-potiguar-700" : "cursor-not-allowed bg-slate-100 text-slate-400"}`}>
          <Icon name={saved ? "check" : "ball"} />
          {saved ? "Palpites salvos" : complete ? "Salvar palpites" : "Preencha todos os placares"}
        </button>
      </div>
    </div>
  );
}

function RankingPage({ user, pilotRanking }) {
  const [tab, setTab] = useState("geral");
  const localRanking = pilotRanking.filter(person => person.store === user.store);
  const data = tab === "geral" ? pilotRanking : localRanking;
  const podium = [pilotRanking[1], pilotRanking[0], pilotRanking[2]].filter(Boolean);
  return (
    <div className="space-y-6">
      <section className="hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-potiguar-lime">Temporada 2026</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">Quem está voando?</h2>
            <p className="mt-2 text-sm text-white/60">{tab === "geral" ? "Classificação geral da campanha." : `Classificação apenas da loja ${user.store}.`}</p>
          </div>
          <div className="flex items-end justify-center gap-3">
            {podium.map((p, i) => {
              const rank = [2, 1, 3][i];
              return <div key={p.name} className={`text-center ${rank === 1 ? "-translate-y-3" : ""}`}>
                <Avatar initials={p.name.split(" ").map(x=>x[0]).slice(0,2).join("")} size={rank === 1 ? "large" : "normal"} rank={rank} photoUrl={p.photoUrl} />
                <p className="mt-2 max-w-[82px] truncate text-[10px] font-bold">{p.name.split(" ")[0]}</p>
                <p className="text-xs font-extrabold text-potiguar-lime">{p.points} pts</p>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section className="soft-card overflow-hidden rounded-2xl">
        <div className="flex gap-2 border-b border-slate-100 p-4 sm:p-5">
          <button onClick={() => setTab("geral")} className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${tab === "geral" ? "bg-potiguar-900 text-white" : "text-slate-400 hover:bg-slate-50"}`}>Top 10 geral</button>
            <button onClick={() => setTab("loja")} className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${tab === "loja" ? "bg-potiguar-900 text-white" : "text-slate-400 hover:bg-slate-50"}`}>Minha loja: {user.store}</button>
        </div>
        <div className="divide-y divide-slate-100">
          {data.map((person, idx) => {
            const isMe = person.name === user.name;
            return (
              <div key={person.name} className={`flex items-center gap-3 p-4 sm:gap-4 sm:px-6 ${isMe ? "bg-potiguar-lime/10" : ""}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold ${idx === 0 ? "bg-amber-100 text-amber-700" : idx === 1 ? "bg-slate-100 text-slate-500" : idx === 2 ? "bg-orange-100 text-orange-700" : "text-slate-400"}`}>{idx < 3 ? ["🥇","🥈","🥉"][idx] : idx + 1}</span>
                <Avatar initials={person.name.split(" ").map(x=>x[0]).slice(0,2).join("")} photoUrl={person.photoUrl} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-potiguar-950">{person.name} {isMe && <span className="ml-1 text-[9px] text-potiguar-700">(VOCÊ)</span>}</p>
                  <p className="truncate text-[10px] text-slate-400">{person.role} • {person.store || user.store} • Comunicado {person.announcementPoints} • Palpite {person.predictionPoints} pts{(person.salesPoints + person.topSellerPoints || person.storeGoalPoints) ? ` • Venda ${person.salesPoints + person.topSellerPoints} pts${person.storeGoalPoints ? ` • Meta ${person.storeGoalPoints} pts` : ""}` : ""}</p>
                </div>
                {person.trend && <span className={`hidden text-[10px] font-bold sm:block ${person.trend.startsWith("+") ? "text-emerald-600" : person.trend.startsWith("-") ? "text-red-400" : "text-slate-300"}`}>{person.trend}</span>}
                <div className="text-right">
                  <strong className="font-display text-lg text-potiguar-900">{person.points}</strong>
                  <p className="text-[9px] font-bold text-slate-300">PONTOS</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StorePage({ user, pilotRanking, totalSold, settings }) {
  const productFocusEnabled = isProductFocusEnabled(settings);
  const storeFocus = getStoreFocus(user.store, settings);
  const storeUnit = storeFocus.product.unit || "unidades";
  const storeGoal = storeFocus.goal || 1;
  const storePercent = Math.round((totalSold / storeGoal) * 100);
  const localRanking = pilotRanking.filter(person => person.store === user.store);
  const localPoints = localRanking.reduce((sum, person) => sum + person.points, 0);
  const localReads = localRanking.reduce((sum, person) => sum + person.announcementPoints, 0);
  const localHits = localRanking.reduce((sum, person) => sum + person.predictionHits, 0);
  const networkRanking = stores.map(store => store.name === user.store ? { ...store, sold: totalSold, goal: storeGoal } : { ...store, sold: 0, goal: storeGoal }).sort((a, b) => (b.sold / b.goal) - (a.sold / a.goal));
  const dayChampion = networkRanking[0];
  if (!productFocusEnabled) return (
    <div className="space-y-6">
      <section className="hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-potiguar-lime"><Icon name="store" size={16}/> Loja {user.store}</div>
        <h2 className="mt-3 font-display text-3xl font-extrabold">Fase final: foco total na disputa</h2>
        <p className="mt-2 text-sm leading-6 text-white/65">Acompanhe a equipe, os palpites, leituras e o ranking comercial da loja.</p>
      </section>
      {user.accessRole === "leadership" && (
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon="users" label="Equipe" value={localRanking.length} detail="Participantes da loja" accent="green" />
          <StatCard icon="megaphone" label="Leituras" value={localReads} detail="Endomarketing confirmado" accent="lime" />
          <StatCard icon="ranking" label="Pontos da loja" value={localPoints} detail={`${localHits} acerto(s) em palpites`} accent="white" />
        </div>
      )}
      <section className="soft-card rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Nosso time</p><h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Ranking {user.store}</h3></div>
          <span className="rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800">{localRanking.length} PARTICIPANTES</span>
        </div>
        <div className="mt-5 space-y-3">
          {localRanking.map((p, i) => (
            <div key={p.name} className={`flex items-center gap-3 rounded-xl p-3 ${p.name === user.name ? "bg-potiguar-lime/15" : "bg-slate-50"}`}>
              <span className="w-5 text-center text-xs font-extrabold text-slate-400">{i === 0 ? "🥇" : i + 1}</span>
              <Avatar initials={p.name.split(" ").map(x=>x[0]).slice(0,2).join("")} photoUrl={p.photoUrl} />
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold text-potiguar-950">{p.name}{p.name === user.name && <span className="ml-1 text-[9px] text-potiguar-700">(VOCÊ)</span>}</p><p className="truncate text-[10px] text-slate-400">{p.role} • {p.predictionHits} acerto(s)</p></div>
              <strong className="font-display text-lg text-potiguar-900">{p.points}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
  return (
    <div className="space-y-6">
      <section className="hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-potiguar-lime"><Icon name="store" size={16}/> Loja {user.store}</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold">Juntos até a meta!</h2>
            <p className="mt-2 text-sm text-white/60">Campanha ativa em {user.store} • ranking atualizado pelas vendas</p>
          </div>
          <div className="glass rounded-2xl px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">Atingimento hoje</p>
            <p className="font-display text-4xl font-extrabold text-potiguar-lime">{storePercent}%</p>
          </div>
        </div>
        <div className="mt-7">
          <div className="mb-2 flex justify-between text-xs font-bold"><span>{totalSold} {storeUnit} vendidos</span><span>Meta: {storeGoal} {storeUnit}</span></div>
          <div className="h-3 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-potiguar-lime" style={{width: `${Math.min(storePercent, 100)}%`}}></div></div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_.82fr]">
        <section className="soft-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Nosso time</p><h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Ranking {user.store}</h3></div>
            <span className="rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800">{localRanking.length} PARTICIPANTES</span>
          </div>
          <div className="mt-5 space-y-3">
            {localRanking.map((p, i) => (
              <div key={p.name} className={`flex items-center gap-3 rounded-xl p-3 ${p.name === user.name ? "bg-potiguar-lime/15" : "bg-slate-50"}`}>
                <span className="w-5 text-center text-xs font-extrabold text-slate-400">{i === 0 ? "🥇" : i + 1}</span>
	                <Avatar initials={p.name.split(" ").map(x=>x[0]).slice(0,2).join("")} photoUrl={p.photoUrl} />
	                <div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold text-potiguar-950">{p.name}{p.name === user.name && <span className="ml-1 text-[9px] text-potiguar-700">(VOCÊ)</span>}</p><p className="truncate text-[10px] text-slate-400">{p.role} • {p.soldQuantity} {storeUnit} • {p.predictionHits} acerto(s){p.isTopSeller ? " • destaque" : ""}</p></div>
                <strong className="font-display text-lg text-potiguar-900">{p.points}</strong>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="soft-card rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-100 text-3xl">🏆</div>
              <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-amber-600">Loja campeã do dia</p><h3 className="font-display text-xl font-extrabold text-potiguar-950">{dayChampion.name}</h3><p className="text-xs text-slate-400">{Math.round(dayChampion.sold / dayChampion.goal * 100)}% da meta • {dayChampion.sold} {storeUnit}</p></div>
            </div>
          </section>
          <section className="soft-card rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between"><h3 className="font-display text-lg font-extrabold text-potiguar-950">Ranking da rede</h3><Icon name="ranking" className="text-potiguar-700"/></div>
            <div className="mt-5 space-y-4">
              {networkRanking.slice(0,4).map((s,i) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex justify-between text-xs"><span className="font-bold text-potiguar-950">{i+1}. {s.name}</span><span className="font-extrabold text-potiguar-700">{Math.round(s.sold/s.goal*100)}%</span></div>
                  <div className="progress-track h-2 rounded-full"><div className="progress-fill h-full rounded-full" style={{width: `${Math.min(s.sold/s.goal*100,100)}%`}}></div></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AdminPage({ adminUser, users: allUsers, customUsers, setToast, predictionEntries, readEntries, salesEntries, setSalesEntries, pilotRanking, totalSold, profilePhotos, settings, activeGames, worldCupMatches, onSaveSetting, onRefreshData, onAccessAs }) {
  const [module, setModule] = useState("dashboard");
  const [userSearch, setUserSearch] = useState("");
  const [storeFilter, setStoreFilter] = useState("Todas");
  const [users, setUsers] = useState(allUsers);
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", cpf: "", job: "Vendedor", profile: "Vendedor", store: PILOT_STORE });
  const [editingCpf, setEditingCpf] = useState("");
  const [assignments, setAssignments] = useState(getProductAssignments(settings));
  const [productCatalog, setProductCatalog] = useState(getProductCatalog(settings));
  const [newProduct, setNewProduct] = useState({ sku: "", name: "", brand: "", price: "", description: "", imageUrl: "", siteUrl: "" });
  const [newAssignment, setNewAssignment] = useState({ store: "Centro", productId: "camesa-pano-prato-chef", goal: "50" });
  const [announcementForm, setAnnouncementForm] = useState(settings.announcement || defaultAnnouncement);
  const [awardForm, setAwardForm] = useState(settings.award || defaultAward);
  const [roundForm, setRoundForm] = useState(settings.round || defaultRoundConfig);
  const currentAdminGame = activeGames[0] || games[0];
  const [resultForm, setResultForm] = useState(() => {
    const result = (settings.matchResults || defaultMatchResults)[currentAdminGame.id] || defaultMatchResults[1] || {};
    return { homeScore: String(result.homeScore), awayScore: String(result.awayScore) };
  });
  const [newSale, setNewSale] = useState(() => {
    const firstSeller = registeredUsers.find(user => user.profile === "Vendedor") || {};
    const firstAssignment = initialProductAssignments.find(item => item.store === (firstSeller.store || PILOT_STORE)) || initialProductAssignments[0];
    return { store: firstSeller.store || PILOT_STORE, seller: firstSeller.name || "", productId: firstAssignment?.productId || "", quantity: "1" };
  });

  useEffect(() => {
    setUsers(allUsers);
    setAnnouncementForm(settings.announcement || defaultAnnouncement);
    setAwardForm(settings.award || defaultAward);
    setRoundForm(settings.round || defaultRoundConfig);
    setAssignments(getProductAssignments(settings));
    setProductCatalog(getProductCatalog(settings));
    const result = (settings.matchResults || defaultMatchResults)[currentAdminGame.id] || defaultMatchResults[1] || {};
    setResultForm({ homeScore: String(result.homeScore), awayScore: String(result.awayScore) });
  }, [allUsers, settings, currentAdminGame.id]);
  const actions = [
    ["bolt", "Aderência", "Quem participou e quem falta", "engagement"],
    ["megaphone", "Comunicados", "Criar textos e inserir vídeos", "announcements"],
    ["fire", "Desafios", "Cadastrar desafio da semana", "products"],
    ["target", "Metas", "Definir objetivos por loja", "goals"],
    ["ball", "Palpites", "Visualizar palpites enviados", "predictions"],
    ["chart", "Vendas", "Lançar quantidade por vendedor", "sales"],
    ["users", "Colaboradores", "Cadastrar acessos elegíveis", "users"],
    ["trophy", "Premiações", "Administrar reconhecimentos", "awards"],
    ["ranking", "Rankings", "Acompanhar classificação", "rankings"],
    ["chart", "Dashboards", "Visualizar indicadores", "dashboard"],
    ["shield", "Rodadas", "Controlar e encerrar rodadas", "rounds"],
  ];

  const formModule = null;
  const visibleUsers = users.filter(user => {
    const search = userSearch.trim().toLowerCase();
    const matchesSearch = !search || `${user.name} ${user.cpf} ${user.email} ${user.job}`.toLowerCase().includes(search);
    const matchesStore = storeFilter === "Todas" || user.store === storeFilter;
    return matchesSearch && matchesStore;
  });
  const sellersForSale = users.filter(user => user.profile === "Vendedor" && user.store === newSale.store);
  const productsForSale = assignments.filter(item => item.store === newSale.store);
  const salesRanking = Object.values(salesEntries.reduce((acc, entry) => {
    if (!acc[entry.seller]) acc[entry.seller] = { name: entry.seller, store: entry.store, quantity: 0 };
    acc[entry.seller].quantity += Number(entry.quantity);
    return acc;
  }, {})).sort((a, b) => b.quantity - a.quantity);
  const networkGoal = fixedStores.reduce((sum, store) => {
    const assignment = assignments.find(item => item.store === store);
    return sum + Number(assignment?.goal || 0);
  }, 0) || 1;
  const sellerCount = users.filter(user => user.profile === "Vendedor").length;
  const leaderCount = users.filter(user => user.profile === "Liderança").length;
  const adminCount = users.filter(user => user.profile === "Administrador").length;
  const participantCount = sellerCount + leaderCount;
  const roundWindow = getPredictionWindow(roundForm || defaultRoundConfig);
  const roundClosingSummary = getRoundClosingSummary(pilotRanking);
  const productFocusEnabled = isProductFocusEnabled(settings);
  const storeSummaries = getStoreSummaries(pilotRanking, predictionEntries, readEntries);
  const predictionEngagement = getPredictionEngagement(users, predictionEntries);

  const formatCpf = value => value.replace(/\D/g, "").slice(0, 11)
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");

  const startEditUser = user => {
    const cpf = onlyDigits(user.cpf);
    setEditingCpf(cpf);
    setNewUser({
      name: user.name,
      cpf: user.cpf,
      job: user.profile === "Administrador" ? "Administrador" : user.profile === "Liderança" ? "Líder de loja" : "Vendedor",
      profile: user.profile,
      store: user.store,
    });
    setShowUserForm(true);
    setModule("users");
  };

  const cancelUserForm = () => {
    setShowUserForm(false);
    setEditingCpf("");
    setNewUser({ name: "", cpf: "", job: "Vendedor", profile: "Vendedor", store: PILOT_STORE });
  };

  const createUser = async event => {
    event.preventDefault();
    if (!newUser.name || newUser.cpf.replace(/\D/g, "").length !== 11) {
      setToast("Informe o nome e um CPF com 11 dígitos.");
      return;
    }
    const cpfDigits = onlyDigits(newUser.cpf);
    if (!editingCpf && users.some(user => onlyDigits(user.cpf) === cpfDigits)) {
      setToast("Já existe um colaborador cadastrado com este CPF.");
      return;
    }
    if (editingCpf && cpfDigits !== editingCpf && users.some(user => onlyDigits(user.cpf) === cpfDigits)) {
      setToast("Já existe outro colaborador cadastrado com este CPF.");
      return;
    }
    const created = normalizeCustomUser({ ...newUser, email: "", status: "Ativo" });
    const nextCustomUsers = [
      ...(Array.isArray(customUsers) ? customUsers : []).filter(user => onlyDigits(user.cpf) !== (editingCpf || onlyDigits(created.cpf))),
      created,
    ];
    const ok = await onSaveSetting("customUsers", nextCustomUsers);
    if (ok) {
      const deletedUsers = Array.isArray(settings.deletedUsers) ? settings.deletedUsers : [];
      const nextDeletedUsers = deletedUsers.filter(cpf => onlyDigits(cpf) !== onlyDigits(created.cpf));
      if (nextDeletedUsers.length !== deletedUsers.length) await onSaveSetting("deletedUsers", nextDeletedUsers);
    }
    if (!ok) {
      setToast("Não foi possível salvar o colaborador no banco.");
      return;
    }
    setUsers(mergeUsers(registeredUsers, nextCustomUsers, (settings.deletedUsers || []).filter(cpf => onlyDigits(cpf) !== onlyDigits(created.cpf))));
    cancelUserForm();
    setToast(editingCpf ? `${created.name} atualizado com sucesso.` : `${created.name} cadastrado. Senha inicial: CPF.`);
  };

  const deleteUser = async targetUser => {
    const cpf = onlyDigits(targetUser.cpf);
    if (cpf === onlyDigits(adminUser?.cpf)) {
      setToast("Você não pode excluir o próprio usuário logado.");
      return;
    }
    if (!window.confirm(`Excluir ${targetUser.name} da campanha? Ele deixará de acessar a plataforma e sairá dos rankings.`)) return;
    const nextCustomUsers = (Array.isArray(customUsers) ? customUsers : []).filter(user => onlyDigits(user.cpf) !== cpf);
    const nextDeletedUsers = Array.from(new Set([...(Array.isArray(settings.deletedUsers) ? settings.deletedUsers : []).map(onlyDigits), cpf])).filter(item => item.length === 11);
    const customOk = await onSaveSetting("customUsers", nextCustomUsers);
    const deletedOk = await onSaveSetting("deletedUsers", nextDeletedUsers);
    if (!customOk || !deletedOk) {
      setToast("Não foi possível excluir o colaborador no servidor.");
      return;
    }
    setUsers(mergeUsers(registeredUsers, nextCustomUsers, nextDeletedUsers));
    setToast(`${targetUser.name} foi removido da campanha.`);
  };

  const resetUserPassword = async (targetUser) => {
    if (!window.confirm(`Redefinir a senha de ${targetUser.name} para o CPF do usuário?`)) return;
    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminCpf: adminUser?.cpf,
          targetCpf: targetUser.cpf,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Falha ao redefinir senha.");
      setToast(`Senha de ${targetUser.name} redefinida para o CPF. No próximo login, ele deverá criar nova senha.`);
    } catch (error) {
      console.error(error);
      setToast("Não foi possível redefinir a senha no servidor.");
    }
  };

  const assignProduct = async event => {
    event.preventDefault();
    const exists = assignments.some(item => item.store === newAssignment.store && item.productId === newAssignment.productId);
    if (exists) {
      setToast("Este desafio já está definido para a loja.");
      return;
    }
    const nextAssignments = [...assignments, { ...newAssignment, goal: Number(newAssignment.goal) }];
    setAssignments(nextAssignments);
    const ok = await onSaveSetting("productAssignments", nextAssignments);
    setToast(ok ? "Desafio da semana vinculado à loja." : "Desafio vinculado na tela, mas não foi salvo no servidor.");
  };

  const lookupProduct = () => {
    const code = newProduct.sku.trim();
    if (!code) {
      setToast("Informe o código interno para consultar.");
      return;
    }
    if (code === "219134") {
      setNewProduct(siteProductDemo);
      setToast("Produto localizado no site e campos preenchidos.");
      return;
    }
    setToast("Produto não encontrado na consulta demonstrativa.");
  };

  const createProduct = async event => {
    event.preventDefault();
    if (!newProduct.sku || !newProduct.name) {
      setToast("Informe o código/SKU e o nome do produto.");
      return;
    }
    if (productCatalog.some(product => product.sku === newProduct.sku)) {
      setToast("Já existe um produto com este código/SKU.");
      return;
    }
    const id = `${newProduct.sku}-${Date.now()}`;
    const nextCatalog = [...productCatalog, { ...newProduct, id }];
    setProductCatalog(nextCatalog);
    await onSaveSetting("productCatalog", nextCatalog);
    setNewProduct({ sku: "", name: "", brand: "", price: "", description: "", imageUrl: "", siteUrl: "" });
    setToast("Produto cadastrado na campanha.");
  };

  const addSale = async event => {
    event.preventDefault();
    if (!newSale.seller || !newSale.productId || Number(newSale.quantity) <= 0) {
      setToast("Selecione vendedor, produto e quantidade.");
      return;
    }
    const seller = users.find(user => user.name === newSale.seller && user.store === newSale.store);
    const product = productCatalog.find(product => product.id === newSale.productId);
    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerCpf: seller?.cpf,
          seller: newSale.seller,
          store: newSale.store,
          productId: newSale.productId,
          productSku: product?.sku,
          productName: product?.name,
          quantity: Number(newSale.quantity),
        }),
      });
      if (!response.ok) throw new Error("Falha ao registrar venda.");
      const data = await response.json();
      setSalesEntries(data.sales || []);
      setToast("Venda do desafio da semana registrada no servidor.");
    } catch (error) {
      console.error(error);
      setToast("Não foi possível registrar a venda no servidor.");
    }
  };

  const saveAnnouncement = async event => {
    event.preventDefault();
    const next = {
      ...announcementForm,
      id: announcementForm.id || `comunicado-${Date.now()}`,
      minimumSeconds: Number(announcementForm.minimumSeconds || 30),
      publishedAt: announcementForm.publishedAt || "ATIVO",
      attachments: Array.isArray(announcementForm.attachments) ? announcementForm.attachments : [],
    };
    const ok = await onSaveSetting("announcement", next);
    if (ok) setToast("Comunicado publicado e disponível na Home.");
  };

  const attachAnnouncementFiles = async event => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;
    const currentAttachments = Array.isArray(announcementForm.attachments) ? announcementForm.attachments : [];
    if (currentAttachments.length + files.length > 5) {
      setToast("Inclua no máximo 5 arquivos por comunicado.");
      return;
    }
    const tooLarge = files.find(file => file.size > 900 * 1024);
    if (tooLarge) {
      setToast(`Arquivo muito grande: ${tooLarge.name}. Use até 900 KB por arquivo nesta fase.`);
      return;
    }
    try {
      const attachments = await Promise.all(files.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
          id: `arquivo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size,
          dataUrl: reader.result,
        });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })));
      setAnnouncementForm({
        ...announcementForm,
        attachments: [...currentAttachments, ...attachments],
      });
      setToast(`${attachments.length} arquivo(s) anexado(s) ao comunicado.`);
    } catch (error) {
      console.error(error);
      setToast("Não foi possível anexar os arquivos.");
    }
  };

  const removeAnnouncementAttachment = attachmentId => {
    setAnnouncementForm({
      ...announcementForm,
      attachments: (announcementForm.attachments || []).filter(file => file.id !== attachmentId),
    });
  };

  const saveAward = async event => {
    event.preventDefault();
    const ok = await onSaveSetting("award", awardForm);
    if (ok) setToast("Prêmio da rodada salvo e exibido aos participantes.");
  };

  const saveRound = async event => {
    event.preventDefault();
    const next = {
      ...roundForm,
      predictionsCloseAt: roundWindow.closeAt.toISOString(),
    };
    const ok = await onSaveSetting("round", next);
    if (ok && next.id === "quartas-final") await onSaveSetting("scoringStartAt", defaultScoringStartAt);
    if (ok) setToast("Rodada atualizada.");
  };

  const applyCalendarRound = round => {
    const { openAt, closeAt } = getPredictionWindow(round);
    setRoundForm({
      ...round,
      status: "open",
      openAt: openAt.toISOString(),
      predictionsCloseAt: closeAt.toISOString(),
    });
    setToast(`${round.name} carregada. Revise e clique em Salvar rodada.`);
  };

  const saveResult = async event => {
    event.preventDefault();
    const next = {
      ...(settings.matchResults || defaultMatchResults),
      [currentAdminGame.id]: { homeScore: Number(resultForm.homeScore), awayScore: Number(resultForm.awayScore) },
    };
    const ok = await onSaveSetting("matchResults", next);
    if (ok) setToast("Resultado salvo. Ranking recalculado.");
  };

  const syncWorldCupMatches = async () => {
    try {
      const response = await fetch("/api/world-cup/sync", { method: "POST" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || data.details || "Falha ao sincronizar.");
      await onRefreshData();
      setToast(`${data.synced || 0} jogos sincronizados com football-data.org.`);
    } catch (error) {
      console.error(error);
      setToast(error.message || "Não foi possível sincronizar jogos da Copa.");
    }
  };

  const closeRound = async () => {
    const next = {
      ...roundForm,
      status: "closed",
      predictionsCloseAt: roundWindow.closeAt.toISOString(),
      closedAt: new Date().toISOString(),
      winners: roundClosingSummary,
    };
    const ok = await onSaveSetting("round", next);
    if (ok) setToast(productFocusEnabled ? "Rodada encerrada com vendedor geral, vendedores por loja e top 2 líderes elegíveis." : "Rodada encerrada com top geral, líderes e vendedores por loja.");
  };

  const exportReport = () => {
    const rows = [
      ["posicao","nome","cpf","loja","perfil","pontos","comunicado","palpite_pts","acertos","placar_exato","venda_pts","quantidade","meta_pts"],
      ...pilotRanking.map((person, index) => [
        index + 1,
        person.name,
        person.cpf,
        person.store,
        person.role,
        person.points,
        person.announcementPoints,
        person.predictionPoints,
        person.predictionHits,
        person.exactPredictions,
        person.salesPoints + person.topSellerPoints,
        person.soldQuantity,
        person.storeGoalPoints,
      ]),
    ];
    const csv = rows.map(row => row.map(value => `"${String(value ?? "").replace(/"/g, '""')}"`).join(";")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio-copa-potiguar-${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setToast("Relatório CSV exportado.");
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold text-slate-400">Copa Potiguar • acesso administrativo</p><h2 className="font-display text-3xl font-extrabold text-potiguar-950">Central de administração</h2></div>
        <div className="flex gap-2">
          <button onClick={() => { onRefreshData(); setToast("Dados atualizados."); }} className="flex items-center justify-center gap-2 rounded-xl border border-potiguar-900/10 bg-white px-4 py-3 text-xs font-extrabold text-potiguar-900"><Icon name="clock" size={17}/> Atualizar</button>
          <button onClick={exportReport} className="flex items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white"><Icon name="chart" size={17}/> Exportar relatório</button>
        </div>
      </section>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard icon="users" label="Participantes da campanha" value={participantCount} detail={`${sellerCount} vendedores • ${leaderCount} líderes • ${adminCount} admins`} accent="green"/>
        <StatCard icon="megaphone" label="Leituras" value={readEntries.length} detail={readEntries.length ? "Comunicados confirmados" : "Aguardando confirmações"} accent="lime"/>
        <StatCard icon="ball" label="Aderência aos palpites" value={`${predictionEngagement.totals.adherence}%`} detail={`${predictionEngagement.totals.participated}/${predictionEngagement.totals.eligible} participaram • faltam ${predictionEngagement.totals.missing}`} accent="white"/>
        <StatCard icon={productFocusEnabled ? "store" : "trophy"} label={productFocusEnabled ? "Meta da rede" : "Fase final"} value={productFocusEnabled ? `${Math.round(totalSold / networkGoal * 100)}%` : "Finais"} detail={productFocusEnabled ? `${totalSold} de ${networkGoal}` : "Somente endomarketing e palpites"} accent="white"/>
      </div>
      <section className="soft-card rounded-2xl p-5 sm:p-6">
        <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Ações rápidas</p><h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">O que vamos movimentar?</h3></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden">
          {actions.map(([icon,title,,value]) => (
            <button key={title} onClick={() => setModule(value)} className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-left transition ${module === value ? "border-potiguar-500 bg-potiguar-lime text-potiguar-950 shadow-sm" : "border-slate-100 bg-slate-50 text-potiguar-900"}`}>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl ${module === value ? "bg-potiguar-950 text-potiguar-lime" : "bg-white text-potiguar-900"}`}><Icon name={icon} size={15}/></span>
              <span className="truncate text-[11px] font-extrabold">{title}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 hidden gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-4">
          {actions.map(([icon,title,desc,value]) => <button key={title} onClick={() => setModule(value)} className={`lift rounded-2xl border p-4 text-left ${module === value ? "border-potiguar-500 bg-potiguar-lime/10" : "border-slate-100 bg-slate-50"}`}><span className="grid h-10 w-10 place-items-center rounded-xl bg-potiguar-900 text-potiguar-lime"><Icon name={icon} size={19}/></span><strong className="mt-4 block text-sm text-potiguar-950">{title}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-400">{desc}</span></button>)}
        </div>
      </section>
      {module === "engagement" && (
        <section className="space-y-6">
          <div className="hero-pattern pitch-lines overflow-hidden rounded-3xl p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-potiguar-lime">Aderência em tempo real</p>
                <h3 className="mt-2 font-display text-3xl font-extrabold">Quem já entrou no jogo?</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">Acompanhe por loja quem já enviou palpite e quem ainda precisa ser acionado pelo líder.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-[10px] text-white/45">Aderência</p><p className="font-display text-3xl font-extrabold text-potiguar-lime">{predictionEngagement.totals.adherence}%</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-[10px] text-white/45">Participaram</p><p className="font-display text-3xl font-extrabold">{predictionEngagement.totals.participated}</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-[10px] text-white/45">Faltam</p><p className="font-display text-3xl font-extrabold text-potiguar-red">{predictionEngagement.totals.missing}</p></div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="soft-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-emerald-600">Melhor aderência</p><h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Lojas mais engajadas</h4></div>
                <Icon name="trophy" className="text-potiguar-700" />
              </div>
              <div className="mt-5 space-y-3">
                {predictionEngagement.bestStores.slice(0, 5).map((store, index) => (
                  <div key={store.store} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div><p className="text-xs font-extrabold text-potiguar-950">{index + 1}. {store.store}</p><p className="mt-1 text-[10px] text-slate-400">{store.participated}/{store.total} participantes • {store.guesses} palpites</p></div>
                      <strong className="font-display text-2xl text-potiguar-900">{store.adherence}%</strong>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white"><div className="h-full rounded-full bg-potiguar-lime" style={{width: `${Math.min(store.adherence, 100)}%`}}></div></div>
                  </div>
                ))}
              </div>
            </section>
            <section className="soft-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-red">Ponto de atenção</p><h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Lojas para acionar agora</h4></div>
                <Icon name="megaphone" className="text-potiguar-red" />
              </div>
              <div className="mt-5 space-y-3">
                {predictionEngagement.worstStores.slice(0, 5).map((store, index) => (
                  <button key={store.store} onClick={() => setStoreFilter(store.store)} className="w-full rounded-2xl border border-red-100 bg-red-50 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-center justify-between gap-3">
                      <div><p className="text-xs font-extrabold text-potiguar-950">{index + 1}. {store.store}</p><p className="mt-1 text-[10px] text-red-500">Faltam {store.missing} de {store.total} • vendedores {store.sellerParticipated}/{store.sellers} • líderes {store.leaderParticipated}/{store.leaders}</p></div>
                      <strong className="font-display text-2xl text-potiguar-red">{store.adherence}%</strong>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
          <section className="soft-card overflow-hidden rounded-2xl">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Relação por loja</p>
                  <h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Quem falta participar dos palpites</h4>
                  <p className="mt-1 text-xs text-slate-400">Lista nominal comparando usuários elegíveis com palpites gravados no servidor.</p>
                </div>
                <select value={storeFilter} onChange={event => setStoreFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-potiguar-900 outline-none focus:border-potiguar-500">
                  <option>Todas</option>
                  {fixedStores.map(store => <option key={store}>{store}</option>)}
                </select>
              </div>
            </div>
            <div className="grid gap-4 p-5 sm:p-6 xl:grid-cols-2">
              {predictionEngagement.stores.filter(store => storeFilter === "Todas" || store.store === storeFilter).map(store => (
                <div key={store.store} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">{store.store}</p>
                      <h5 className="mt-1 font-display text-lg font-extrabold text-potiguar-950">{store.adherence}% de aderência</h5>
                      <p className="mt-1 text-[10px] text-slate-400">{store.participated}/{store.total} participaram • {store.guesses} palpites gravados</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold ${store.missing ? "bg-red-100 text-potiguar-red" : "bg-potiguar-lime/25 text-potiguar-800"}`}>{store.missing ? `${store.missing} faltam` : "100%"}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-xl bg-white p-3"><p className="text-[9px] font-bold text-slate-400">Vendedores</p><p className="text-sm font-extrabold text-potiguar-800">{store.sellerParticipated}/{store.sellers}</p></div>
                    <div className="rounded-xl bg-white p-3"><p className="text-[9px] font-bold text-slate-400">Líderes</p><p className="text-sm font-extrabold text-potiguar-800">{store.leaderParticipated}/{store.leaders}</p></div>
                  </div>
                  <div className="mt-4 max-h-56 overflow-auto rounded-xl bg-white p-3">
                    {store.missingPeople.length ? store.missingPeople.map(person => (
                      <div key={person.cpf} className="flex items-center justify-between gap-3 border-b border-slate-50 py-2 last:border-0">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-extrabold text-potiguar-950">{person.name}</p>
                          <p className="text-[10px] text-slate-400">{person.profile} • CPF {formatCpf(person.cpf)}</p>
                        </div>
                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-extrabold text-potiguar-red">Pendente</span>
                      </div>
                    )) : <div className="rounded-xl bg-potiguar-lime/15 p-4 text-center text-xs font-extrabold text-potiguar-900">Todos os elegíveis da loja já participaram 🎯</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      )}
      {module === "announcements" && (
        <section className="soft-card overflow-hidden rounded-2xl">
          <div className="hero-pattern pitch-lines p-6 text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-potiguar-lime">RH • Endomarketing</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold">Central de comunicados</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">Cadastre o comunicado da rodada, inclua vídeo/anexos e agende quando ele deve aparecer para os participantes.</p>
          </div>
          <form onSubmit={saveAnnouncement} className="grid gap-5 p-5 sm:p-6">
            <div className="rounded-2xl bg-potiguar-lime/10 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-700">1. Conteúdo principal</p>
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_.45fr]">
                <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Título que aparecerá para o colaborador</span><input value={announcementForm.title || ""} onChange={e=>setAnnouncementForm({...announcementForm,title:e.target.value})} placeholder="Ex.: Vídeo obrigatório da rodada" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
                <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Tempo mínimo do vídeo</span><input type="number" min="0" value={announcementForm.minimumSeconds || 30} onChange={e=>setAnnouncementForm({...announcementForm,minimumSeconds:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
              </div>
              <label className="mt-4 block"><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Texto do comunicado</span><textarea rows="5" value={announcementForm.body || ""} onChange={e=>setAnnouncementForm({...announcementForm,body:e.target.value})} placeholder="Escreva aqui a orientação que o colaborador precisa ler antes de palpitar." className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs leading-5 outline-none focus:border-potiguar-500"></textarea></label>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-700">2. Vídeo e arquivos</p>
                <label className="mt-4 block"><span className="mb-2 block text-xs font-extrabold text-potiguar-950">URL do vídeo</span><input value={announcementForm.videoUrl || ""} onChange={e=>setAnnouncementForm({...announcementForm,videoUrl:e.target.value})} placeholder="Cole o link do YouTube" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
                <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-potiguar-700/25 bg-white p-5 text-center transition hover:border-potiguar-lime">
                  <Icon name="plus" className="text-potiguar-700" />
                  <span className="mt-2 text-xs font-extrabold text-potiguar-950">Adicionar arquivos</span>
                  <span className="mt-1 text-[10px] text-slate-400">PDF, imagem ou documento • até 5 arquivos • 900 KB cada</span>
                  <input type="file" multiple onChange={attachAnnouncementFiles} className="hidden" />
                </label>
                <div className="mt-4 space-y-2">
                  {(announcementForm.attachments || []).map(file => (
                    <div key={file.id} className="flex items-center justify-between gap-3 rounded-xl bg-white p-3">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-extrabold text-potiguar-950">{file.name}</p>
                        <p className="text-[10px] text-slate-400">{Math.round((file.size || 0) / 1024)} KB</p>
                      </div>
                      <button type="button" onClick={() => removeAnnouncementAttachment(file.id)} className="rounded-lg bg-red-50 px-3 py-2 text-[10px] font-extrabold text-potiguar-red">Remover</button>
                    </div>
                  ))}
                  {!(announcementForm.attachments || []).length && <p className="text-xs text-slate-400">Nenhum arquivo anexado.</p>}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-700">3. Agendamento</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Iniciar em</span><input type="datetime-local" value={formatDateTimeInput(announcementForm.startsAt)} onChange={e=>setAnnouncementForm({...announcementForm,startsAt:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
                  <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Finalizar em</span><input type="datetime-local" value={formatDateTimeInput(announcementForm.endsAt)} onChange={e=>setAnnouncementForm({...announcementForm,endsAt:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
                </div>
                <label className="mt-4 block"><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Status visível</span><input value={announcementForm.publishedAt || ""} onChange={e=>setAnnouncementForm({...announcementForm,publishedAt:e.target.value})} placeholder="Ex.: ATIVO, Programado, Fase final" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
                <label className="mt-4 block"><span className="mb-2 block text-xs font-extrabold text-potiguar-950">ID interno</span><input value={announcementForm.id || ""} onChange={e=>setAnnouncementForm({...announcementForm,id:e.target.value})} placeholder="Pode deixar automático" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
                <div className="mt-4 rounded-xl bg-white p-3 text-xs leading-5 text-slate-500">
                  Dica para o RH: ao mudar o ID do comunicado, a leitura será exigida novamente para a rodada.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setAnnouncementForm(settings.announcement || defaultAnnouncement)} className="rounded-xl px-5 py-3 text-xs font-extrabold text-slate-400">Desfazer alterações</button>
              <button type="submit" className="rounded-xl bg-potiguar-900 px-6 py-3 text-xs font-extrabold text-white">Salvar comunicado</button>
            </div>
          </form>
        </section>
      )}
      {module === "awards" && (
        <section className="soft-card rounded-2xl p-5 sm:p-6">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-amber-600">Premiação</p><h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Prêmio da rodada</h3><p className="mt-1 text-xs text-slate-400">Este prêmio aparece na Home dos participantes.</p></div>
          <form onSubmit={saveAward} className="mt-5 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Prêmio</span><input value={awardForm.name || ""} onChange={e=>setAwardForm({...awardForm,name:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
              <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Critério</span><input value={awardForm.criterion || ""} onChange={e=>setAwardForm({...awardForm,criterion:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
            </div>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Descrição</span><textarea rows="3" value={awardForm.description || ""} onChange={e=>setAwardForm({...awardForm,description:e.target.value})} className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs leading-5 outline-none focus:border-potiguar-500"></textarea></label>
            <div className="flex justify-end"><button type="submit" className="rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white">Salvar premiação</button></div>
          </form>
        </section>
      )}
      {module === "rounds" && (
        <section className="soft-card rounded-2xl p-5 sm:p-6">
          <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Rodada</p><h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Controle da rodada e resultado</h3><p className="mt-1 text-xs text-slate-400">Use o status para comunicar o momento da rodada. O resultado recalcula os pontos de palpite.</p></div>
          <div className="mt-5 rounded-2xl border border-potiguar-500/15 bg-potiguar-lime/5 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Calendário automático</p>
                <h4 className="font-display text-lg font-extrabold text-potiguar-950">Fases finais da Copa</h4>
                <p className="mt-1 text-xs text-slate-500">A rodada atual pode cobrir todos os jogos da fase final. Os palpites ficam liberados em qualquer horário e encerram 10 minutos antes de cada jogo.</p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-extrabold text-potiguar-800">Até 10 min antes</span>
                <button type="button" onClick={syncWorldCupMatches} className="rounded-xl bg-potiguar-900 px-4 py-2.5 text-[10px] font-extrabold text-white">Sincronizar Copa</button>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-white bg-white/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">football-data.org</p>
                  <h5 className="text-sm font-extrabold text-potiguar-950">Jogos sincronizados</h5>
                </div>
                <span className="rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800">{worldCupMatches.length} jogos</span>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {(activeGames || []).slice(0, 6).map(match => {
                  const access = getGamePredictionAccess(match);
                  return (
                    <div key={match.id} className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">{match.group}</p>
                      <p className="mt-1 truncate text-xs font-extrabold text-potiguar-950">{match.home} x {match.away}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{formatDateTime(match.kickoffAt)} • fecha {formatDateTime(access.closeAt)}</p>
                    </div>
                  );
                })}
                {worldCupMatches.length === 0 && <p className="text-xs text-slate-400">Nenhum jogo sincronizado ainda. Configure a API key e clique em Sincronizar Copa.</p>}
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {knockoutRounds.map(round => {
                const access = getPredictionAccess(round);
                return (
                  <button key={round.id} type="button" onClick={() => applyCalendarRound(round)} className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${round.official ? "border-potiguar-500/20 bg-white" : "border-amber-200 bg-amber-50"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">{round.phase}</p>
                        <p className="mt-1 text-sm font-extrabold text-potiguar-950">{round.name}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold ${round.official ? "bg-potiguar-lime/25 text-potiguar-800" : "bg-amber-100 text-amber-700"}`}>{round.official ? "OFICIAL" : "TESTE"}</span>
                    </div>
                    <p className="mt-3 text-[10px] leading-4 text-slate-500">Jogo: {formatDateTime(round.kickoffAt)} • Palpites até {formatDateTime(access.closeAt)}</p>
                    <p className="mt-1 text-[10px] font-bold text-potiguar-700">Abertura sugerida: {formatDateTime(access.openAt)}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl bg-white p-3 text-xs leading-5 text-slate-500">
              <strong className="text-potiguar-950">Regra dos palpites:</strong> {predictionRules.join(" • ")}
            </div>
          </div>
          <form onSubmit={saveRound} className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_.7fr_.8fr_.8fr_auto] md:items-end">
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Nome da rodada</span><input value={roundForm.name || ""} onChange={e=>setRoundForm({...roundForm,name:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Status</span><select value={roundForm.status || "open"} onChange={e=>setRoundForm({...roundForm,status:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"><option value="open">Aberta</option><option value="predictions_closed">Palpites encerrados</option><option value="results">Resultado lançado</option><option value="closed">Rodada encerrada</option></select></label>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Horário do jogo</span><input type="datetime-local" value={(roundForm.kickoffAt || "").slice(0,16)} onChange={e=>setRoundForm({...roundForm,kickoffAt:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Fecha automaticamente</span><input type="text" readOnly value={formatDateTime(roundWindow.closeAt)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold text-potiguar-800 outline-none"/></label>
            <button type="submit" className="rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white">Salvar rodada</button>
          </form>
          <form onSubmit={saveResult} className="mt-5 grid gap-4 rounded-2xl bg-potiguar-950 p-4 text-white md:grid-cols-[1fr_.4fr_.4fr_auto] md:items-end">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-lime">Resultado do jogo</p><p className="mt-1 text-sm font-extrabold">{currentAdminGame.home} x {currentAdminGame.away}</p></div>
            <label><span className="mb-2 block text-xs font-extrabold text-white/70">{currentAdminGame.home}</span><input type="number" min="0" value={resultForm.homeScore} onChange={e=>setResultForm({...resultForm,homeScore:e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-xs text-white outline-none focus:border-potiguar-lime"/></label>
            <label><span className="mb-2 block text-xs font-extrabold text-white/70">{currentAdminGame.away}</span><input type="number" min="0" value={resultForm.awayScore} onChange={e=>setResultForm({...resultForm,awayScore:e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-xs text-white outline-none focus:border-potiguar-lime"/></label>
            <button type="submit" className="rounded-xl bg-potiguar-lime px-5 py-3 text-xs font-extrabold text-potiguar-950">Salvar resultado</button>
          </form>
          <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-amber-700">Fechamento da rodada</p>
                <h4 className="mt-1 font-display text-lg font-extrabold text-potiguar-950">Ganhadores da {roundForm.phase || "rodada"}</h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">{productFocusEnabled ? `Ao encerrar, o sistema registra o 1º vendedor geral, o 1º vendedor de cada loja e os 2 primeiros líderes elegíveis: meta mínima ${LEADER_PRIZE_MIN_GOAL_PERCENT}% e aderência mínima ${LEADER_PRIZE_MIN_ADHERENCE_PERCENT}%.` : "Na rodada, contam leitura do endomarketing, palpites e desafio quando ativo."}</p>
              </div>
              <button type="button" onClick={closeRound} className="rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white">Encerrar e registrar ganhadores</button>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">Top 3 geral</p>
                <div className="mt-3 space-y-2">
                  {roundClosingSummary.topOverall.length ? roundClosingSummary.topOverall.map((person, index) => (
                    <div key={person.cpf} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2">
                      <span className="w-6 text-center text-xs">{["🥇","🥈","🥉"][index]}</span>
                      <div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-potiguar-950">{person.name}</p><p className="text-[10px] text-slate-400">{person.store} • {person.role}</p></div>
                      <strong className="text-xs text-potiguar-900">{person.points}</strong>
                    </div>
                  )) : <p className="text-xs text-slate-400">Sem pontuação registrada ainda.</p>}
                </div>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">Top 2 líderes elegíveis</p>
                <div className="mt-3 space-y-2">
                  {roundClosingSummary.topLeaders.length ? roundClosingSummary.topLeaders.map((person, index) => (
                    <div key={person.cpf} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2">
                      <span className="w-6 text-center text-xs">{["🥇","🥈","🥉"][index]}</span>
                      <div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-potiguar-950">{person.name}</p><p className="text-[10px] text-slate-400">{person.store} • meta {person.storeGoalPercent}% • aderência {person.storeAdherencePercent}%</p></div>
                      <strong className="text-xs text-potiguar-900">{person.points}</strong>
                    </div>
                  )) : <p className="text-xs text-slate-400">Nenhum líder elegível ainda. Critérios: 90% da meta e 80% de aderência.</p>}
                </div>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">Vendedor por loja</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {roundClosingSummary.storeWinners.length ? roundClosingSummary.storeWinners.map(item => (
                    <div key={item.store} className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-extrabold text-potiguar-800">{item.store}</p>
                      <p className="mt-1 truncate text-xs font-extrabold text-potiguar-950">{item.winner.name}</p>
                      <p className="text-[10px] text-slate-400">{item.winner.points} pts • {item.winner.role}</p>
                    </div>
                  )) : <p className="text-xs text-slate-400">Sem lojas com pontuação registrada ainda.</p>}
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
      {module === "rankings" && (
        <section className="space-y-6">
          <div className="hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-potiguar-lime">Classificação consolidada</p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-3xl font-extrabold">Rankings da campanha</h3>
                <p className="mt-2 text-sm text-white/60">Ranking calculado com dados gravados no banco: leituras, palpites e vendas. Atualização automática a cada 15 segundos.</p>
              </div>
              <div className="glass rounded-2xl px-5 py-3">
                <p className="text-[10px] font-bold uppercase text-white/45">Atualização</p>
                <p className="font-display text-lg font-extrabold">Automática</p>
              </div>
            </div>
          </div>
          <section className="soft-card rounded-2xl p-5 sm:p-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Premiação da fase final</p>
              <h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Ganhadores previstos da rodada</h4>
              <p className="mt-1 text-xs text-slate-400">Acompanhamento ao vivo: 1º vendedor geral, 1º vendedor de cada loja e os 2 primeiros líderes elegíveis.</p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <a href={(settings.award || defaultAward).storeSellerPrizeUrl || defaultAward.storeSellerPrizeUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-potiguar-lime">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">Prêmio por loja</p>
                <p className="mt-1 text-sm font-extrabold text-potiguar-950">{(settings.award || defaultAward).storeSellerPrize || defaultAward.storeSellerPrize}</p>
                <p className="mt-1 text-[10px] text-slate-400">Para o 1º vendedor de cada loja</p>
              </a>
              <a href={(settings.award || defaultAward).mainPrizeUrl || defaultAward.mainPrizeUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-potiguar-lime">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">Prêmio geral/liderança</p>
                <p className="mt-1 text-sm font-extrabold text-potiguar-950">{(settings.award || defaultAward).overallSellerPrize || defaultAward.overallSellerPrize}</p>
                <p className="mt-1 text-[10px] text-slate-400">Para 1º vendedor geral e top 2 líderes elegíveis</p>
              </a>
            </div>
            <div className="mt-5 grid gap-4 xl:grid-cols-3">
              <div className="rounded-2xl bg-potiguar-lime/15 p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">1º vendedor geral</p>
                {roundClosingSummary.topSellerOverall ? (
                  <div className="mt-3 flex items-center gap-3">
                    <Avatar initials={roundClosingSummary.topSellerOverall.name.split(" ").map(part => part[0]).slice(0,2).join("")} photoUrl={roundClosingSummary.topSellerOverall.photoUrl} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold text-potiguar-950">{roundClosingSummary.topSellerOverall.name}</p>
                      <p className="text-[10px] text-slate-500">{roundClosingSummary.topSellerOverall.store}</p>
                    </div>
                    <strong className="font-display text-lg text-potiguar-900">{roundClosingSummary.topSellerOverall.points}</strong>
                  </div>
                ) : <p className="mt-3 text-xs text-slate-400">Aguardando pontuação.</p>}
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">Top 2 líderes elegíveis</p>
                <div className="mt-3 space-y-2">
                  {roundClosingSummary.topLeaders.length ? roundClosingSummary.topLeaders.map((person, index) => (
                    <div key={person.cpf} className="flex items-center gap-2 rounded-xl bg-white p-2">
                      <span className="w-6 text-center text-xs">{["🥇","🥈"][index]}</span>
                      <div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-potiguar-950">{person.name}</p><p className="text-[10px] text-slate-400">{person.store}</p></div>
                      <strong className="text-xs text-potiguar-900">{person.points}</strong>
                    </div>
                  )) : <p className="text-xs text-slate-400">Aguardando líderes cumprirem meta mínima de 90% e aderência de 80%.</p>}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">1º vendedor por loja</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                  {roundClosingSummary.storeWinners.length ? roundClosingSummary.storeWinners.map(item => (
                    <div key={item.store} className="rounded-xl bg-white p-2">
                      <p className="text-[10px] font-extrabold text-potiguar-800">{item.store}</p>
                      <p className="truncate text-xs font-extrabold text-potiguar-950">{item.winner?.name || "—"}</p>
                    </div>
                  )) : <p className="text-xs text-slate-400">Aguardando lojas pontuarem.</p>}
                </div>
              </div>
            </div>
          </section>
          <div className="grid gap-6 xl:grid-cols-2">
            <section className="soft-card overflow-hidden rounded-2xl">
              <div className="border-b border-slate-100 p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Pontuação geral</p>
                <h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Ranking geral de participantes</h4>
                <p className="mt-1 text-xs text-slate-400">Fonte: leituras, palpites e vendas registradas no servidor.</p>
              </div>
              <div className="divide-y divide-slate-100">
	                {pilotRanking.slice(0, 10).map((person, index) => (
	                  <div key={person.name} className="flex items-center gap-3 px-5 py-3">
	                    <span className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-extrabold ${index < 3 ? "bg-potiguar-lime/20 text-potiguar-800" : "text-slate-400"}`}>{index < 3 ? ["🥇","🥈","🥉"][index] : index + 1}</span>
	                    <Avatar initials={person.name.split(" ").map(part => part[0]).slice(0,2).join("")} photoUrl={person.photoUrl}/>
	                    <div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-potiguar-950">{person.name}</p><p className="text-[10px] text-slate-400">{person.store} • {person.role} • Comunicado {person.announcementPoints} pt • Palpite {person.predictionPoints} pts/{person.predictionHits} acerto(s){(person.salesPoints + person.topSellerPoints || person.storeGoalPoints) ? ` • Venda ${person.salesPoints + person.topSellerPoints} pts/${person.soldQuantity} m²${person.storeGoalPoints ? ` • Meta ${person.storeGoalPoints} pts` : ""}` : ""}</p></div>
	                    <strong className="font-display text-lg text-potiguar-900">{person.points} pts</strong>
	                  </div>
	                ))}
              </div>
            </section>
            {productFocusEnabled && <section className="soft-card overflow-hidden rounded-2xl">
              <div className="border-b border-slate-100 p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Desafio da semana</p>
                <h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Quantidade por vendedor</h4>
              </div>
              <div className="divide-y divide-slate-100">
                {salesRanking.map((person, index) => (
                  <div key={person.name} className="flex items-center gap-3 px-5 py-4">
                    <span className="w-7 text-center text-xs font-extrabold text-slate-400">{index + 1}</span>
                    <div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-potiguar-950">{person.name}</p><p className="text-[10px] text-slate-400">{person.store}</p></div>
                    <span className="rounded-xl bg-potiguar-lime/20 px-3 py-2 font-display text-lg font-extrabold text-potiguar-800">{person.quantity} {productCatalog.find(product => assignments.some(item => item.productId === product.id))?.unit || "un."}</span>
                  </div>
                ))}
              </div>
            </section>}
          </div>
          <section className="soft-card rounded-2xl p-5 sm:p-6">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Desempenho acumulado</p><h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Ranking das lojas</h4></div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {storeSummaries.map((store, index) => (
                <div key={store.store} className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-xs font-extrabold text-potiguar-900">{index + 1}º</span>
                  <div className="min-w-0 flex-1"><div className="flex justify-between text-xs"><strong className="text-potiguar-950">{store.store}</strong><strong className="text-potiguar-700">{store.points} pts</strong></div><div className="mt-1 text-[10px] text-slate-400">{store.readCount} leituras • {store.predictionCount} palpites • {store.participants} participantes</div></div>
                </div>
              ))}
            </div>
          </section>
          <section className="soft-card overflow-hidden rounded-2xl">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Detalhamento por loja</p>
              <h4 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Ranking interno de cada loja</h4>
              <p className="mt-1 text-xs text-slate-400">Mostra a composição dos pontos por colaborador: comunicado, palpites, acertos e vendas/metas quando estiverem ativas.</p>
            </div>
            <div className="divide-y divide-slate-100">
              {storeSummaries.map(summary => (
                <div key={summary.store} className="p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">{summary.sellerCount} vendedores • {summary.leaderCount} líderes</p>
                      <h5 className="mt-1 font-display text-lg font-extrabold text-potiguar-950">{summary.store}</h5>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] font-extrabold">
                      <span className="rounded-full bg-potiguar-lime/20 px-3 py-1 text-potiguar-800">{summary.points} pts</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{summary.readCount} leituras</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">{summary.predictionCount} palpites</span>
                    </div>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[840px] text-left">
                      <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        <tr>
                          <th className="px-4 py-3">#</th>
                          <th className="px-4 py-3">Colaborador</th>
                          <th className="px-4 py-3">Perfil</th>
                          <th className="px-4 py-3 text-center">Comunicado</th>
                          <th className="px-4 py-3 text-center">Palpite</th>
                          <th className="px-4 py-3 text-center">Acertos</th>
                          <th className="px-4 py-3 text-center">Placar exato</th>
                          <th className="px-4 py-3 text-center">Venda/meta</th>
                          <th className="px-4 py-3 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {summary.people.map((person, index) => (
                          <tr key={person.cpf} className={index === 0 ? "bg-potiguar-lime/10" : ""}>
                            <td className="px-4 py-3 text-xs font-extrabold text-slate-400">{index === 0 ? "🥇" : index + 1}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <Avatar initials={person.name.split(" ").map(part => part[0]).slice(0,2).join("")} photoUrl={person.photoUrl}/>
                                <div className="min-w-0">
                                  <p className="truncate text-xs font-extrabold text-potiguar-950">{person.name}</p>
                                  <p className="text-[10px] text-slate-400">CPF {person.cpf}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold ${person.role === "Liderança" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{person.role}</span></td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-potiguar-900">{person.announcementPoints}</td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-potiguar-900">{person.predictionPoints}</td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-potiguar-900">{person.predictionHits}</td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-potiguar-900">{person.exactPredictions}</td>
                            <td className="px-4 py-3 text-center text-xs font-bold text-potiguar-900">{person.salesPoints + person.topSellerPoints + person.storeGoalPoints}</td>
                            <td className="px-4 py-3 text-right font-display text-lg font-extrabold text-potiguar-900">{person.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      )}
      {module === "predictions" && (
        <section className="soft-card overflow-hidden rounded-2xl">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Palpites enviados</p>
              <h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Jogos da rodada</h3>
              <p className="mt-1 text-xs text-slate-400">Lista consolidada dos palpites gravados no servidor.</p>
            </div>
            <span className="rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800">{predictionEntries.length} PALPITES</span>
          </div>
          {predictionEntries.length === 0 ? (
            <div className="p-6 text-sm text-slate-400">Nenhum palpite gravado ainda. Os palpites feitos antes desta atualização não foram armazenados no servidor.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  <tr><th className="px-5 py-3">Vendedor</th><th className="px-4 py-3">Loja</th><th className="px-4 py-3">Jogo</th><th className="px-4 py-3">Palpite</th><th className="px-4 py-3">Resultado</th><th className="px-4 py-3">Pontos</th><th className="px-5 py-3 text-right">Enviado em</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
	                  {predictionEntries.map(entry => {
	                    const result = (settings.matchResults || defaultMatchResults)[entry.match_id];
	                    const points = getPredictionPoints(entry, settings.matchResults || defaultMatchResults);
                    return (
                      <tr key={`${entry.cpf}-${entry.match_id}-${entry.submitted_at}`}>
                        <td className="px-5 py-4"><p className="text-xs font-extrabold text-potiguar-950">{entry.full_name}</p><p className="text-[10px] text-slate-400">CPF {formatCpf(entry.cpf)}</p></td>
                        <td className="px-4 py-4 text-xs font-bold text-potiguar-800">{entry.store}</td>
                        <td className="px-4 py-4 text-xs text-slate-500">{entry.home_team} x {entry.away_team}</td>
                        <td className="px-4 py-4 font-display text-lg font-extrabold text-potiguar-900">{entry.home_score} × {entry.away_score}</td>
                        <td className="px-4 py-4 font-display text-lg font-extrabold text-potiguar-900">{result ? `${result.homeScore} × ${result.awayScore}` : "—"}</td>
                        <td className="px-4 py-4"><span className={`rounded-xl px-3 py-2 text-xs font-extrabold ${points === 4 ? "bg-potiguar-lime/25 text-potiguar-800" : points === 2 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"}`}>{points} pts</span></td>
                        <td className="px-5 py-4 text-right text-xs text-slate-400">{new Date(entry.submitted_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
      {module === "dashboard" && (
        <section className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
            <section className="soft-card rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Evolução da campanha</p><h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Participação em apuração</h3></div><Icon name="chart" className="text-potiguar-700"/></div>
              <div className="mt-8 flex h-48 items-end justify-between gap-3 border-b border-slate-100 px-2">
                {[0,0,0,0,0,0,0].map((value,index)=><div key={index} className="flex h-full flex-1 flex-col justify-end gap-2 text-center"><span className="text-[9px] font-bold text-potiguar-700">{value}%</span><div className="mx-auto w-full max-w-10 rounded-t-lg bg-gradient-to-t from-potiguar-900 to-potiguar-lime" style={{height:`${Math.max(value, 4)}%`}}></div><span className="text-[9px] font-bold text-slate-400">{["S","T","Q","Q","S","S","D"][index]}</span></div>)}
              </div>
            </section>
            <section className="hero-pattern pitch-lines rounded-2xl p-6 text-white">
              <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-lime">Resumo comercial</p>
              <h3 className="mt-1 font-display text-xl font-extrabold">Desafios da semana</h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-white/10 p-4"><p className="text-[10px] text-white/45">Desafios ativos</p><p className="mt-1 font-display text-3xl font-extrabold">{assignments.length}</p></div>
                <div className="rounded-xl bg-white/10 p-4"><p className="text-[10px] text-white/45">Quantidade lançada</p><p className="mt-1 font-display text-3xl font-extrabold">{salesEntries.reduce((sum,item)=>sum+Number(item.quantity),0)}</p></div>
                <div className="rounded-xl bg-white/10 p-4"><p className="text-[10px] text-white/45">Lojas com produto configurado</p><p className="mt-1 font-display text-3xl font-extrabold">{new Set(assignments.map(item=>item.store)).size}/{fixedStores.length}</p></div>
              </div>
            </section>
          </div>
        </section>
      )}
      {module === "products" && (
        <section className="soft-card rounded-2xl p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Configuração comercial</p>
            <h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Cadastro e desafios da semana</h3>
            <p className="mt-1 text-xs text-slate-400">Informe o código/SKU usado pela Potiguar para preencher os dados do produto pelo site.</p>
          </div>
          <form onSubmit={createProduct} className="mt-5 rounded-2xl border border-potiguar-500/15 bg-potiguar-lime/5 p-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
              <label className="xl:w-44"><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Código/SKU</span><input aria-label="Código SKU do produto" value={newProduct.sku} onChange={e=>setNewProduct({...newProduct,sku:e.target.value.replace(/\D/g,"")})} placeholder="Ex.: 219134" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
              <button type="button" onClick={lookupProduct} className="rounded-xl border border-potiguar-900/15 bg-white px-4 py-3 text-xs font-extrabold text-potiguar-800">Buscar no site</button>
              <label className="min-w-0 flex-1"><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Nome do produto</span><input aria-label="Nome do produto" value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
              <label className="xl:w-40"><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Marca</span><input aria-label="Marca do produto" value={newProduct.brand} onChange={e=>setNewProduct({...newProduct,brand:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
              <label className="xl:w-36"><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Preço</span><input aria-label="Preço do produto" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
              <button type="submit" className="rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white">Cadastrar produto</button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[120px_1fr]">
              <div className="grid aspect-square place-items-center overflow-hidden rounded-xl border border-slate-100 bg-white">
                {newProduct.imageUrl ? <img src={newProduct.imageUrl} alt={newProduct.name} className="h-full w-full object-contain p-2"/> : <Icon name="fire" className="text-slate-200" size={32}/>}
              </div>
              <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Descrição</span><textarea aria-label="Descrição do produto" value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})} rows="4" className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs leading-5 outline-none focus:border-potiguar-500"></textarea></label>
            </div>
            <p className="mt-3 text-[10px] text-slate-400">Teste da consulta: informe o SKU <strong>219134</strong>. Preço e disponibilidade devem ser atualizados sempre no momento da consulta.</p>
          </form>
          <div className="mt-5">
            <p className="text-xs font-extrabold text-potiguar-950">Vincular desafio à loja</p>
          </div>
          <form onSubmit={assignProduct} className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_1.5fr_.7fr_auto] md:items-end">
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Loja</span><select aria-label="Loja do desafio da semana" value={newAssignment.store} onChange={e=>setNewAssignment({...newAssignment,store:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs">{[...fixedStores, "Rede Potiguar"].map(store=><option key={store}>{store}</option>)}</select></label>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Produto</span><select aria-label="Desafio da semana" value={newAssignment.productId} onChange={e=>setNewAssignment({...newAssignment,productId:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs">{productCatalog.map(product=><option key={product.id} value={product.id}>{product.sku} • {product.name}</option>)}</select></label>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Meta</span><input aria-label="Meta do desafio da semana" type="number" min="1" value={newAssignment.goal} onChange={e=>setNewAssignment({...newAssignment,goal:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"/></label>
            <button type="submit" className="rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white">Vincular produto</button>
          </form>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {assignments.map((item,index)=>{
              const product=productCatalog.find(product=>product.id===item.productId);
              return <div key={`${item.store}-${item.productId}-${index}`} className="rounded-2xl border border-slate-100 p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">{item.store}</p><p className="mt-1 text-sm font-extrabold text-potiguar-950">{product?.name}</p><p className="mt-1 text-[10px] text-slate-400">SKU {product?.sku} • {product?.brand} • {product?.price}</p></div><span className="rounded-lg bg-potiguar-lime/20 px-2.5 py-1 text-[10px] font-extrabold text-potiguar-800">META {item.goal}</span></div></div>;
            })}
          </div>
        </section>
      )}
      {module === "sales" && (
        <section className="soft-card rounded-2xl p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Apuração do desafio da semana</p>
            <h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Vendas do desafio por vendedor</h3>
            <p className="mt-1 text-xs text-slate-400">{productFocusEnabled ? "O lançamento identifica loja, vendedor, desafio da semana e quantidade." : "Desafio da semana temporariamente desativado. Ative a rodada oficial para lançar vendas."}</p>
          </div>
          {!productFocusEnabled && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
              Nesta fase vamos medir apenas palpites e endomarketing. Não lance vendas de desafio da semana agora.
            </div>
          )}
          {productFocusEnabled && <form onSubmit={addSale} className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_1.2fr_1.6fr_.7fr_auto] md:items-end">
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Loja</span><select aria-label="Loja da venda" value={newSale.store} onChange={e=>{const store=e.target.value; const sellers=users.filter(user=>user.profile==="Vendedor"&&user.store===store); const products=assignments.filter(item=>item.store===store); setNewSale({...newSale,store,seller:sellers[0]?.name||"",productId:products[0]?.productId||""});}} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs">{fixedStores.map(store=><option key={store}>{store}</option>)}</select></label>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Vendedor</span><select aria-label="Vendedor da venda" value={newSale.seller} onChange={e=>setNewSale({...newSale,seller:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"><option value="">Selecione</option>{sellersForSale.map(user=><option key={user.cpf}>{user.name}</option>)}</select></label>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Desafio da semana</span><select aria-label="Desafio vendido" value={newSale.productId} onChange={e=>setNewSale({...newSale,productId:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"><option value="">Selecione</option>{productsForSale.map(item=>{const product=productCatalog.find(product=>product.id===item.productId);return <option key={item.productId} value={item.productId}>{product?.sku} • {product?.name}</option>;})}</select></label>
            <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Quantidade</span><input aria-label="Quantidade vendida" type="number" min="0.01" step="0.01" value={newSale.quantity} onChange={e=>setNewSale({...newSale,quantity:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"/></label>
            <button type="submit" className="rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white">Registrar venda</button>
          </form>}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"><tr><th className="px-4 py-3">Vendedor</th><th className="px-4 py-3">Loja</th><th className="px-4 py-3">Produto</th><th className="px-4 py-3 text-right">Quantidade</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{salesEntries.map(entry=>{const product=productCatalog.find(product=>product.id===entry.productId);return <tr key={entry.id}><td className="px-4 py-3 text-xs font-extrabold text-potiguar-950">{entry.seller}</td><td className="px-4 py-3 text-xs text-slate-500">{entry.store}</td><td className="px-4 py-3 text-xs text-slate-500">{entry.productSku || product?.sku} • {entry.productName || product?.name}</td><td className="px-4 py-3 text-right font-display text-lg font-extrabold text-potiguar-800">{entry.quantity}</td></tr>;})}</tbody>
            </table>
          </div>
        </section>
      )}
      {module === "users" && (
        <section className="soft-card overflow-hidden rounded-2xl">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Controle de acesso</p>
                <h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Usuários cadastrados</h3>
                <p className="mt-1 text-xs text-slate-400">{users.length} usuários • {fixedStores.length} lojas fixas</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label>
                  <span className="sr-only">Pesquisar usuários</span>
                  <input aria-label="Pesquisar usuários" value={userSearch} onChange={event => setUserSearch(event.target.value)} placeholder="Buscar nome ou CPF" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs outline-none focus:border-potiguar-500 sm:w-60"/>
                </label>
                <label>
                  <span className="sr-only">Filtrar por loja</span>
                  <select aria-label="Filtrar por loja" value={storeFilter} onChange={event => setStoreFilter(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-potiguar-900 outline-none focus:border-potiguar-500 sm:w-48">
                    <option>Todas</option>
                    {fixedStores.map(store => <option key={store}>{store}</option>)}
                    <option>Rede Potiguar</option>
                  </select>
                </label>
                <button onClick={() => { if (showUserForm) cancelUserForm(); else setShowUserForm(true); }} className="flex items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white"><Icon name="plus" size={15}/> Novo usuário</button>
              </div>
            </div>
          </div>
          {showUserForm && (
            <form onSubmit={createUser} className="grid gap-4 border-b border-slate-100 bg-potiguar-lime/5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-5">
              <div className="sm:col-span-2 xl:col-span-5">
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-700">{editingCpf ? "Editando colaborador" : "Novo colaborador"}</p>
              </div>
              <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Nome completo</span><input aria-label="Nome do novo colaborador" value={newUser.name} onChange={e => setNewUser({...newUser,name:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
              <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">CPF</span><input aria-label="CPF do novo colaborador" inputMode="numeric" value={newUser.cpf} onChange={e => setNewUser({...newUser,cpf:formatCpf(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"/></label>
              <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Cargo</span><select aria-label="Cargo do novo colaborador" value={newUser.job} onChange={e => {const job=e.target.value; setNewUser({...newUser,job,profile:job==="Administrador"?"Administrador":job==="Líder de loja"?"Liderança":"Vendedor",store:job==="Administrador"?"Rede Potiguar":newUser.store});}} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"><option>Vendedor</option><option>Líder de loja</option><option>Administrador</option></select></label>
              <label><span className="mb-2 block text-xs font-extrabold text-potiguar-950">Loja</span><select aria-label="Loja do novo colaborador" value={newUser.store} onChange={e => setNewUser({...newUser,store:e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs">{[...fixedStores, "Rede Potiguar"].map(store=><option key={store}>{store}</option>)}</select></label>
              <div className="flex items-end gap-2"><button type="button" onClick={cancelUserForm} className="rounded-xl px-4 py-3 text-xs font-bold text-slate-400">Cancelar</button><button type="submit" className="flex-1 rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white">{editingCpf ? "Salvar" : "Cadastrar"}</button></div>
            </form>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                <tr><th className="px-6 py-3">Colaborador</th><th className="px-4 py-3">Cargo original</th><th className="px-4 py-3">Perfil na campanha</th><th className="px-4 py-3">Loja</th><th className="px-4 py-3">Status</th><th className="px-6 py-3 text-right">Ações</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleUsers.map(user => (
                  <tr key={user.cpf} className="hover:bg-potiguar-lime/5">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><Avatar initials={user.name.split(" ").map(x => x[0]).slice(0,2).join("")} photoUrl={profilePhotos[onlyDigits(user.cpf)]}/><div><p className="text-xs font-extrabold text-potiguar-950">{user.name}</p><p className="mt-0.5 text-[10px] font-semibold text-slate-400">CPF {user.cpf}</p></div></div></td>
                    <td className="px-4 py-4 text-xs font-semibold text-slate-500">{user.job}</td>
                    <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold ${user.profile === "Administrador" ? "bg-purple-50 text-purple-700" : user.profile === "Liderança" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{user.profile}</span></td>
                    <td className="px-4 py-4 text-xs font-bold text-potiguar-800">{user.store}</td>
                    <td className="px-4 py-4"><span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{user.status}</span></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {user.profile !== "Administrador" && <button onClick={() => onAccessAs(user)} className="rounded-lg bg-potiguar-lime px-3 py-2 text-[10px] font-extrabold text-potiguar-950">Acessar como</button>}
                        <button onClick={() => resetUserPassword(user)} className="rounded-lg bg-amber-50 px-3 py-2 text-[10px] font-extrabold text-amber-700">Resetar senha</button>
                        <button onClick={() => startEditUser(user)} className="rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-extrabold text-slate-500">Editar</button>
                        <button onClick={() => deleteUser(user)} className="rounded-lg bg-red-50 px-3 py-2 text-[10px] font-extrabold text-potiguar-red">Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visibleUsers.length === 0 && <div className="p-10 text-center text-sm font-semibold text-slate-400">Nenhum usuário encontrado.</div>}
          </div>
        </section>
      )}
      {formModule && (
        <section className="soft-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Cadastro e manutenção</p><h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">{formModule.title}</h3></div>
            <button onClick={() => setModule("dashboard")} className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-500"><Icon name="close" size={16}/></button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {formModule.fields.map((field, index) => (
              <label key={field} className="block">
                <span className="mb-2 block text-xs font-extrabold text-potiguar-950">{field}</span>
                <input aria-label={field} type={field.includes("Data") || field.includes("Abertura") || field.includes("Encerramento") ? "datetime-local" : field.includes("Meta") ? "number" : "text"} placeholder={index === 0 ? "Preencha aqui" : ""} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-potiguar-500 focus:bg-white"/>
              </label>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button onClick={() => setModule("dashboard")} className="rounded-xl px-5 py-3 text-xs font-extrabold text-slate-400">Cancelar</button>
            <button onClick={() => setToast(`${formModule.button}: registro preparado. A persistência será feita no PostgreSQL.`)} className="rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white">{formModule.button}</button>
          </div>
        </section>
      )}
      {module === "dashboard" && <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
	        <section className="soft-card rounded-2xl p-5 sm:p-6">
	          <div className="flex items-center justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">{productFocusEnabled ? "Desempenho por loja" : "Fase final"}</p><h3 className="mt-1 font-display text-xl font-extrabold text-potiguar-950">Acompanhamento das lojas</h3></div><span className="text-xs font-bold text-slate-400">Atualização automática</span></div>
	          <div className="mt-6 grid gap-3 md:grid-cols-2">
	            {storeSummaries.map((summary, index) => {
                const maxPoints = Math.max(1, ...storeSummaries.map(item => item.points));
                return (
                  <div key={summary.store} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700">{index + 1}º lugar</p>
                        <h4 className="mt-1 text-sm font-extrabold text-potiguar-950">{summary.store}</h4>
                        <p className="mt-1 text-[10px] text-slate-400">{summary.sellerCount} vendedores • {summary.leaderCount} líderes</p>
                      </div>
                      <strong className="font-display text-xl text-potiguar-900">{summary.points} pts</strong>
                    </div>
                    <div className="mt-3 progress-track h-2.5 rounded-full"><div className="progress-fill h-full rounded-full" style={{width:`${Math.min(summary.points / maxPoints * 100, 100)}%`}}></div></div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-white p-2"><p className="text-[9px] font-bold text-slate-400">Leituras</p><p className="text-sm font-extrabold text-potiguar-800">{summary.readCount}</p></div>
                      <div className="rounded-xl bg-white p-2"><p className="text-[9px] font-bold text-slate-400">Palpites</p><p className="text-sm font-extrabold text-potiguar-800">{summary.predictionCount}</p></div>
                      <div className="rounded-xl bg-white p-2"><p className="text-[9px] font-bold text-slate-400">Top vendedor</p><p className="truncate text-[10px] font-extrabold text-potiguar-800">{summary.topSeller?.name?.split(" ")[0] || "—"}</p></div>
                    </div>
                  </div>
                );
              })}
	          </div>
	        </section>
        <section className="hero-pattern pitch-lines rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-lime">Rodada atual</p><h3 className="mt-1 font-display text-xl font-extrabold">Status operacional</h3></div><Icon name="shield" className="text-potiguar-lime"/></div>
          <div className="mt-6 space-y-4">
            {[[ "Comunicado publicado", true ], [ productFocusEnabled ? "Desafio da semana ativo" : "Desafio da semana nas oitavas", productFocusEnabled ], [ productFocusEnabled ? "Metas configuradas" : "Metas comerciais pausadas", productFocusEnabled ], [ "Resultados dos jogos", false ]].map(([label,ok])=><div key={label} className="flex items-center justify-between rounded-xl bg-white/7 p-3"><span className="text-xs font-bold">{label}</span><span className={`grid h-6 w-6 place-items-center rounded-full ${ok?"bg-potiguar-lime text-potiguar-950":"bg-white/10 text-white/40"}`}><Icon name={ok?"check":"clock"} size={13}/></span></div>)}
          </div>
          <button onClick={() => setToast("Encerramento simulado. Em produção, a ação será auditada e impedirá novos palpites.")} className="mt-6 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-extrabold hover:bg-white/15">Encerrar rodada</button>
        </section>
      </div>}
    </div>
  );
}

function App() {
  const savedSessionCpf = (() => {
    try {
      localStorage.removeItem("copaPotiguarSessionCpf");
      localStorage.removeItem("copaPotiguarSessionCpfV2");
      sessionStorage.removeItem("copaPotiguarSessionCpf");
      return onlyDigits(sessionStorage.getItem("copaPotiguarTabSessionCpf"));
    } catch (error) {
      return "";
    }
  })();
  const restoredUser = (() => {
    try {
      return savedSessionCpf ? demoUsers[savedSessionCpf] || null : null;
    } catch (error) {
      return null;
    }
  })();
  const [page, setPage] = useState(restoredUser?.accessRole === "admin" ? "admin" : "home");
  const [acknowledgedRoundId, setAcknowledgedRoundId] = useState("");
  const [acknowledgedAccessKey, setAcknowledgedAccessKey] = useState("");
  const [user, setUser] = useState(restoredUser);
  const [impersonatedCpf, setImpersonatedCpf] = useState("");
  const [pendingPasswordUser, setPendingPasswordUser] = useState(null);
  const [pendingCurrentPassword, setPendingCurrentPassword] = useState("");
  const [toast, setToast] = useState("");
  const [predictionEntries, setPredictionEntries] = useState([]);
  const [salesEntries, setSalesEntries] = useState([]);
  const [readEntries, setReadEntries] = useState([]);
  const [profilePhotos, setProfilePhotos] = useState({});
  const [appSettings, setAppSettings] = useState(defaultAppSettings);
  const [worldCupMatches, setWorldCupMatches] = useState([]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => scrollToTopSafely(), [page]);

  const loadPredictions = async () => {
    try {
      const response = await fetch("/api/predictions", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setPredictionEntries(data.predictions || []);
    } catch (error) {
      console.warn("Não foi possível carregar palpites.", error);
    }
  };

  const loadSales = async () => {
    try {
      const response = await fetch("/api/sales", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setSalesEntries(data.sales || []);
    } catch (error) {
      console.warn("Não foi possível carregar vendas.", error);
    }
  };

  const loadAnnouncementReads = async () => {
    try {
      const response = await fetch("/api/announcement-reads", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setReadEntries(data.reads || []);
    } catch (error) {
      console.warn("Não foi possível carregar leituras do comunicado.", error);
    }
  };

  const loadProfilePhotos = async () => {
    try {
      const response = await fetch("/api/profile-photos", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      const photos = Object.fromEntries((data.photos || []).map(item => [onlyDigits(item.cpf), item.photoData]));
      setProfilePhotos(photos);
    } catch (error) {
      console.warn("Não foi possível carregar fotos de perfil.", error);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch("/api/settings", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setAppSettings({ ...defaultAppSettings, ...(data.settings || {}) });
    } catch (error) {
      console.warn("Não foi possível carregar configurações da rodada.", error);
    }
  };

  const loadWorldCupMatches = async () => {
    try {
      const response = await fetch("/api/world-cup/matches", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setWorldCupMatches(data.matches || []);
    } catch (error) {
      console.warn("Não foi possível carregar jogos da Copa.", error);
    }
  };

  const refreshData = async () => {
    await Promise.all([loadPredictions(), loadSales(), loadAnnouncementReads(), loadProfilePhotos(), loadSettings(), loadWorldCupMatches()]);
  };

  useEffect(() => {
    refreshData();
    const timer = setInterval(refreshData, 15000);
    return () => clearInterval(timer);
  }, []);

  const activeRound = appSettings.round || defaultRoundConfig;
  const customUsers = Array.isArray(appSettings.customUsers) ? appSettings.customUsers : [];
  const deletedUsers = Array.isArray(appSettings.deletedUsers) ? appSettings.deletedUsers : [];
  const allRegisteredUsers = useMemo(() => mergeUsers(registeredUsers, customUsers, deletedUsers), [appSettings.customUsers, appSettings.deletedUsers]);
  const dynamicDemoUsers = useMemo(() => buildDemoUsers(allRegisteredUsers), [allRegisteredUsers]);
  const activeGames = getActiveGames(worldCupMatches, activeRound);
  const syncedMatchResults = getMatchResultsFromGames(activeGames);
  const scoringSettings = {
    ...appSettings,
    matchResults: { ...(appSettings.matchResults || defaultMatchResults), ...syncedMatchResults },
  };
  const activePredictionEntries = predictionEntries.filter(entry => isAfterScoringStart(entry, scoringSettings));
  const activeSalesEntries = salesEntries.filter(entry => isAfterScoringStart(entry, scoringSettings));
  const activeReadEntries = readEntries.filter(entry => isAfterScoringStart(entry, scoringSettings));
  const pilotRanking = buildPilotRanking(allRegisteredUsers, activePredictionEntries, activeSalesEntries, activeReadEntries, profilePhotos, scoringSettings);
  const totalSold = isProductFocusEnabled(scoringSettings) ? activeSalesEntries.reduce((sum, item) => sum + Number(item.quantity || 0), 0) : 0;
  const loggedUser = user ? dynamicDemoUsers[onlyDigits(user.cpf)] || user : savedSessionCpf ? dynamicDemoUsers[savedSessionCpf] || null : null;
  const viewedUser = impersonatedCpf ? dynamicDemoUsers[impersonatedCpf] || null : null;
  const effectiveUser = viewedUser || loggedUser;
  const effectiveUserStoreSold = effectiveUser && isProductFocusEnabled(scoringSettings)
    ? activeSalesEntries.filter(entry => normalizeStore(entry.store) === effectiveUser.store).reduce((sum, item) => sum + Number(item.quantity || 0), 0)
    : 0;
  const isImpersonating = Boolean(viewedUser && loggedUser?.accessRole === "admin");
  const activeAnnouncement = appSettings.announcement || defaultAnnouncement;
  const announcementActive = isAnnouncementActive(activeAnnouncement);
  const currentAcknowledgedAccessKey = effectiveUser ? `${onlyDigits(effectiveUser.cpf)}:${activeRound.id}` : "";
  const currentUserRead = effectiveUser ? activeReadEntries.some(entry => onlyDigits(entry.cpf) === onlyDigits(effectiveUser.cpf) && entry.roundId === activeRound.id) : false;
  const announcementAcknowledged = !announcementActive || acknowledgedAccessKey === currentAcknowledgedAccessKey || acknowledgedRoundId === activeRound.id || currentUserRead;
  const activePage = effectiveUser?.accessRole === "admin" ? "admin" : page === "admin" ? "home" : page;

  useEffect(() => {
    if (!effectiveUser) return;
    if (!user && savedSessionCpf) setUser(effectiveUser);
    if (effectiveUser.accessRole === "admin" && page !== "admin") {
      setPage("admin");
    }
    if (effectiveUser.accessRole !== "admin" && page === "admin") {
      setPage("home");
    }
  }, [effectiveUser?.accessRole, page, savedSessionCpf]);

  const savePrediction = async (currentUser, scores, gamesToSave = activeGames) => {
    if (isImpersonating) {
      setToast("Modo validação: palpite não foi gravado para este colaborador.");
      return false;
    }
    try {
      const predictions = gamesToSave.map(game => ({
        matchId: game.id,
        homeTeam: game.home,
        awayTeam: game.away,
        homeScore: Number(scores[game.id]?.[0]),
        awayScore: Number(scores[game.id]?.[1]),
      }));
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf: currentUser.cpf,
          fullName: currentUser.name,
          accessRole: currentUser.accessRole,
          store: currentUser.store,
          predictions,
        }),
      });
      if (!response.ok) throw new Error("Falha ao salvar palpite.");
      await loadPredictions();
      return true;
    } catch (error) {
      console.error(error);
      setToast("Não foi possível enviar o palpite para o servidor.");
      return false;
    }
  };

  const saveAnnouncementRead = async (currentUser, watchedSeconds) => {
    if (isImpersonating) {
      setToast("Modo validação: leitura não foi gravada para este colaborador.");
      return false;
    }
    try {
      const response = await fetch("/api/announcement-reads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf: currentUser.cpf,
          fullName: currentUser.name,
          accessRole: currentUser.accessRole,
          store: currentUser.store,
          roundId: activeRound.id,
          roundName: activeRound.name,
          announcementId: activeAnnouncement.id,
          announcementTitle: activeAnnouncement.title,
          watchedSeconds,
        }),
      });
      if (!response.ok) throw new Error("Falha ao registrar comunicado.");
      const data = await response.json();
      setReadEntries(data.reads || []);
      setAcknowledgedRoundId(activeRound.id);
      setAcknowledgedAccessKey(`${onlyDigits(currentUser.cpf)}:${activeRound.id}`);
      return true;
    } catch (error) {
      console.error(error);
      setToast("Não foi possível registrar a leitura do comunicado.");
      return false;
    }
  };

  const saveProfilePhoto = async (currentUser, photoData) => {
    if (isImpersonating) {
      setToast("Modo validação: foto não foi alterada para este colaborador.");
      return false;
    }
    try {
      const response = await fetch("/api/profile-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf: currentUser.cpf,
          fullName: currentUser.name,
          store: currentUser.store,
          photoData,
        }),
      });
      if (!response.ok) throw new Error("Falha ao salvar foto.");
      const data = await response.json();
      setProfilePhotos(photos => ({ ...photos, [onlyDigits(data.photo.cpf)]: data.photo.photoData }));
      return true;
    } catch (error) {
      console.error(error);
      setToast("Não foi possível salvar a foto de perfil.");
      return false;
    }
  };

  const saveSetting = async (key, value) => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (!response.ok) throw new Error("Falha ao salvar configuração.");
      const data = await response.json();
      setAppSettings({ ...defaultAppSettings, ...(data.settings || {}) });
      return true;
    } catch (error) {
      console.error(error);
      setToast("Não foi possível salvar a configuração.");
      return false;
    }
  };

  const completeLogin = (nextUser) => {
    try {
      localStorage.removeItem("copaPotiguarSessionCpf");
      localStorage.removeItem("copaPotiguarSessionCpfV2");
      sessionStorage.removeItem("copaPotiguarSessionCpf");
      sessionStorage.setItem("copaPotiguarTabSessionCpf", onlyDigits(nextUser.cpf));
    } catch (error) {
      console.warn("Não foi possível salvar a sessão local.", error);
    }
    setUser(nextUser);
    setImpersonatedCpf("");
    setPendingPasswordUser(null);
    setPendingCurrentPassword("");
    setPage(nextUser.accessRole === "admin" ? "admin" : "home");
    setAcknowledgedRoundId("");
    setAcknowledgedAccessKey("");
  };

  const login = async (nextUser, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: nextUser.cpf, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, error: data.error || "CPF ou senha inválidos." };
      if (data.mustChangePassword) {
        setPendingPasswordUser(nextUser);
        setPendingCurrentPassword(password);
        return { ok: true, mustChangePassword: true };
      }
      completeLogin(nextUser);
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error: "Não foi possível validar o acesso no servidor." };
    }
  };

  const changeInitialPassword = async (newPassword) => {
    if (!pendingPasswordUser) return { ok: false, error: "Sessão de primeiro acesso não encontrada." };
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf: pendingPasswordUser.cpf,
          currentPassword: pendingCurrentPassword,
          newPassword,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, error: data.error || "Não foi possível alterar a senha." };
      completeLogin(pendingPasswordUser);
      setToast("Senha criada com sucesso.");
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error: "Não foi possível salvar a nova senha no servidor." };
    }
  };

  const accessAsUser = (targetUser) => {
    const target = dynamicDemoUsers[onlyDigits(targetUser.cpf)];
    if (!target) {
      setToast("Usuário não encontrado para simulação.");
      return;
    }
    if (target.accessRole === "admin") {
      setToast("Acesso como administrador não precisa de simulação.");
      return;
    }
    setImpersonatedCpf(onlyDigits(target.cpf));
    setPage("home");
    setAcknowledgedRoundId("");
    setAcknowledgedAccessKey("");
    setToast(`Visualizando como ${target.name}.`);
  };

  const stopAccessAsUser = () => {
    setImpersonatedCpf("");
    setPage("admin");
    setAcknowledgedRoundId("");
    setAcknowledgedAccessKey("");
    setToast("Você voltou para a visão de administrador.");
  };

  const logout = () => {
    try {
      localStorage.removeItem("copaPotiguarSessionCpf");
      sessionStorage.removeItem("copaPotiguarSessionCpf");
      localStorage.removeItem("copaPotiguarSessionCpfV2");
      sessionStorage.removeItem("copaPotiguarTabSessionCpf");
    } catch (error) {
      console.warn("Não foi possível limpar a sessão local.", error);
    }
    setUser(null);
    setImpersonatedCpf("");
    setPendingPasswordUser(null);
    setPendingCurrentPassword("");
    setPage("home");
    setAcknowledgedRoundId("");
    setAcknowledgedAccessKey("");
    setToast("");
  };

  if (pendingPasswordUser) return <ChangePasswordScreen user={pendingPasswordUser} currentPassword={pendingCurrentPassword} onChanged={changeInitialPassword} onCancel={logout} />;
  if (!effectiveUser) return <LoginScreen onLogin={login} userMap={dynamicDemoUsers} />;

  return (
    <div className="app-shell">
      <Sidebar page={activePage} setPage={setPage} user={effectiveUser} onLogout={logout} profilePhotos={profilePhotos} />
      <div className="main-column">
        <Topbar page={activePage} user={effectiveUser} onLogout={logout} profilePhotos={profilePhotos} isImpersonating={isImpersonating} onStopImpersonation={stopAccessAsUser} />
        <main className="mobile-safe mx-auto max-w-[1440px] p-4 sm:p-8 lg:p-10">
          {isImpersonating && (
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-potiguar-lime/40 bg-potiguar-lime/15 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700">Modo validação</p>
                <p className="text-sm font-extrabold text-potiguar-950">Você está vendo o sistema como {effectiveUser.name} • {effectiveUser.store} • {effectiveUser.accessRole === "leadership" ? "Liderança" : "Vendedor"}</p>
              </div>
              <button onClick={stopAccessAsUser} className="rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white">Voltar ao admin</button>
            </div>
          )}
          {activePage === "home" && <Home acknowledged={announcementAcknowledged} setPage={setPage} setToast={setToast} user={effectiveUser} pilotRanking={pilotRanking} totalSold={effectiveUserStoreSold} profilePhotos={profilePhotos} settings={appSettings} activeGames={activeGames} onAcknowledge={saveAnnouncementRead} onSaveProfilePhoto={saveProfilePhoto} />}
          {activePage === "guesses" && <Guesses acknowledged={announcementAcknowledged} setPage={setPage} setToast={setToast} user={effectiveUser} settings={appSettings} activeGames={activeGames} onSavePrediction={savePrediction} />}
          {activePage === "ranking" && <RankingPage user={effectiveUser} pilotRanking={pilotRanking} />}
          {activePage === "store" && <StorePage user={effectiveUser} pilotRanking={pilotRanking} totalSold={effectiveUserStoreSold} settings={appSettings} />}
          {activePage === "admin" && <AdminPage adminUser={effectiveUser} users={allRegisteredUsers} customUsers={customUsers} setToast={setToast} predictionEntries={activePredictionEntries} readEntries={activeReadEntries} salesEntries={activeSalesEntries} setSalesEntries={setSalesEntries} pilotRanking={pilotRanking} totalSold={totalSold} profilePhotos={profilePhotos} settings={scoringSettings} activeGames={activeGames} worldCupMatches={worldCupMatches} onSaveSetting={saveSetting} onRefreshData={refreshData} onAccessAs={accessAsUser} />}
        </main>
      </div>
      <MobileNav page={activePage} setPage={setPage} user={effectiveUser} />
      {toast && <div className="toast fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-potiguar-950 px-5 py-3 text-xs font-bold text-white shadow-2xl lg:bottom-8"><span className="grid h-5 w-5 place-items-center rounded-full bg-potiguar-lime text-potiguar-950"><Icon name="check" size={12}/></span>{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
