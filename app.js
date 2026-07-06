const {
  useEffect,
  useMemo,
  useState
} = React;
const Icon = ({
  name,
  size = 20,
  className = ""
}) => {
  const paths = {
    home: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 11.5 12 4l9 7.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 10.5V20h14v-9.5M9 20v-6h6v6"
    })),
    ball: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m12 8 3 2.2-1.2 3.6h-3.6L9 10.2 12 8ZM5.1 9l3.9 1.2M15 10.2 18.9 9M10.2 13.8 8 17.5M13.8 13.8l2.2 3.7"
    })),
    ranking: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 21v-8h4v8M10 21V8h4v13M15 21V3h4v18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 21h18"
    })),
    store: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 10v10h16V10M3 10l2-6h14l2 6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 20v-6h4v6M3 10c0 1.3 1 2 2.3 2S8 11.3 8 10c0 1.3 1 2 2.7 2s2.6-.7 2.6-2c0 1.3 1 2 2.7 2s2.7-.7 2.7-2"
    })),
    megaphone: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 13h3l9 4V5L7 9H4v4Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m7 13 1.5 5h3L10 14M19 8v6"
    })),
    lock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "10",
      width: "14",
      height: "11",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 10V7a4 4 0 0 1 8 0v3"
    })),
    clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v5l3 2"
    })),
    check: /*#__PURE__*/React.createElement("path", {
      d: "m5 12 4 4L19 6"
    }),
    fire: /*#__PURE__*/React.createElement("path", {
      d: "M13 3s1 3-2 5c-2.5 1.7-4 3.8-4 6.2A5 5 0 0 0 17 14c0-2-1-4-3-5 0 2-1 3-2 3 1-3-1-6-1-6"
    }),
    trophy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M8 4h8v4a4 4 0 0 1-8 0V4Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 12v5M8 21h8M9 17h6v4"
    })),
    bolt: /*#__PURE__*/React.createElement("path", {
      d: "m13 2-8 12h7l-1 8 8-12h-7l1-8Z"
    }),
    target: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1"
    })),
    user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 21a8 8 0 0 1 16 0"
    })),
    shield: /*#__PURE__*/React.createElement("path", {
      d: "M12 3 5 6v5c0 4.6 3 8 7 10 4-2 7-5.4 7-10V6l-7-3Z"
    }),
    logout: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M10 5H5v14h5M14 8l4 4-4 4M8 12h10"
    })),
    chevron: /*#__PURE__*/React.createElement("path", {
      d: "m9 18 6-6-6-6"
    }),
    close: /*#__PURE__*/React.createElement("path", {
      d: "m6 6 12 12M18 6 6 18"
    }),
    users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"
    })),
    chart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M4 20V10M10 20V4M16 20v-7M22 20H2"
    })),
    plus: /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    }),
    play: /*#__PURE__*/React.createElement("path", {
      d: "m8 5 11 7-11 7V5Z"
    })
  };
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, paths[name]);
};
const PILOT_STORE = "Imperatriz";
const onlyDigits = value => String(value ?? "").replace(/\D/g, "");
const formatCpfValue = value => {
  const digits = onlyDigits(value).slice(0, 11);
  return digits.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
};
const toTitleCase = value => String(value ?? "").toLowerCase().replace(/(^|\s)(\S)/g, (_, space, char) => `${space}${char.toUpperCase()}`).replace(/\bDe\b/g, "de").replace(/\bDa\b/g, "da").replace(/\bDas\b/g, "das").replace(/\bDo\b/g, "do").replace(/\bDos\b/g, "dos");
const textKey = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f']/g, "").trim().toUpperCase();
const fixedStores = ["Centro", "Cohama", "Forquilha", "Cohafuma", "Africanos", "Olho Dagua", "Maiobão", "Santa Inês", "Bacabal", "Imperatriz"];
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
  "REDE POTIGUAR": "Rede Potiguar"
})[textKey(store)] || toTitleCase(store);
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
const makeInitials = name => String(name ?? "").trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join("");
const participantRows = typeof window !== "undefined" && window.COPA_PARTICIPANTS || [];
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
    status: "Ativo"
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
    status: user.status || "Ativo"
  };
};
const mergeUsers = (baseUsers, customUsers = []) => {
  const byCpf = {};
  baseUsers.forEach(user => {
    byCpf[onlyDigits(user.cpf)] = user;
  });
  customUsers.map(normalizeCustomUser).forEach(user => {
    const cpf = onlyDigits(user.cpf);
    if (cpf.length === 11) byCpf[cpf] = user;
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
    initials: makeInitials(participant.name)
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
  trend: "—"
}));
const demoUsers = buildDemoUsers(registeredUsers);
const focusProducts = [{
  id: "qualiz-18",
  sku: "10001",
  name: "Tinta Qualiz Fosco Completo 18L",
  brand: "Qualiz",
  price: "R$ 289,90",
  description: "Tinta acrílica fosca para ambientes internos e externos.",
  imageUrl: ""
}, {
  id: "coral-18",
  sku: "10002",
  name: "Tinta Coral Rende Muito 18L",
  brand: "Coral",
  price: "R$ 359,90",
  description: "Tinta acrílica de alto rendimento e cobertura.",
  imageUrl: ""
}, {
  id: "suvinil-18",
  sku: "10003",
  name: "Tinta Suvinil Fosco Completo 18L",
  brand: "Suvinil",
  price: "R$ 499,90",
  description: "Tinta fosca completa para paredes internas e externas.",
  imageUrl: ""
}, {
  id: "argamassa-ac3",
  sku: "10004",
  name: "Argamassa AC3 20kg",
  brand: "Quartzolit",
  price: "R$ 54,90",
  description: "Argamassa colante AC3 para áreas internas e externas.",
  imageUrl: ""
}, {
  id: "piso-house-color-formigres",
  sku: "2708",
  name: "Piso 60x60 TPA House Color CZ RT Formigres",
  brand: "Formigres",
  price: "Preço a confirmar",
  description: "Desafio da semana cadastrado manualmente para teste da loja Imperatriz.",
  imageUrl: "",
  unit: "m²"
}, {
  id: "baston-limpa-air-fryer",
  sku: "3278",
  name: "Limpa Air Fryer 250ml Super Dom Baston",
  brand: "Baston",
  price: "Preço a confirmar",
  description: "Desafio da semana para a loja Maiobão.",
  imageUrl: "",
  unit: "un."
}, {
  id: "camesa-pano-prato-chef",
  sku: "499870",
  name: "Pano de Prato do Chef Camesa",
  brand: "Camesa",
  price: "Preço a confirmar",
  description: "Desafio da semana para a loja Centro.",
  imageUrl: "",
  unit: "un."
}, {
  id: "oxford-linha-completa",
  sku: "Vários",
  name: "Toda linha de produtos da marca Oxford",
  brand: "Oxford",
  price: "Preço a confirmar",
  description: "Desafio da semana: qualquer produto da linha Oxford conta para a loja.",
  imageUrl: "",
  unit: "un."
}, {
  id: "coala-essencia-algas-mar",
  sku: "470872",
  name: "Essência Concentrada Algas Mar 120ml Coala",
  brand: "Coala",
  price: "Preço a confirmar",
  description: "Desafio da semana para a loja Africanos.",
  imageUrl: "",
  unit: "un."
}, {
  id: "casa-ok-kit-cabide",
  sku: "2639",
  name: "Kit 3pcs Cabide Madeira BR Casa OK",
  brand: "Casa OK/UD",
  price: "Preço a confirmar",
  description: "Desafio da semana para Bacabal e Olho Dagua.",
  imageUrl: "",
  unit: "un."
}, {
  id: "genco-tablete-multipla-acao",
  sku: "638749",
  name: "Tablete Múltipla Ação 3 em 1 T200 Genco",
  brand: "Genco",
  price: "Preço a confirmar",
  description: "Desafio da semana para Santa Inês.",
  imageUrl: "",
  unit: "un."
}];
const siteProductDemo = {
  sku: "219134",
  name: "Manta Líquida Impermeabilizante Branca 18Kg Quartzolit",
  brand: "Quartzolit",
  price: "R$ 319,90",
  description: "Impermeabilizante acrílico pronto para uso, ideal para lajes e coberturas expostas. Forma uma película elástica e resistente, ajudando a impedir infiltrações e refletir os raios solares.",
  imageUrl: "https://apotiguar.fbitsstatic.net/img/p/manta-liquida-impermeabilizante-branca-18kg-quartzolit-89313/274806-8.jpg?v=202504030911",
  siteUrl: "https://www.apotiguar.com.br/produto/manta-liquida-impermeabilizante-branca-18kg-quartzolit-89313"
};
const initialProductAssignments = [{
  store: "Maiobão",
  productId: "baston-limpa-air-fryer",
  goal: 40
}, {
  store: "Centro",
  productId: "camesa-pano-prato-chef",
  goal: 50
}, {
  store: "Cohama",
  productId: "oxford-linha-completa",
  goal: 200
}, {
  store: "Forquilha",
  productId: "oxford-linha-completa",
  goal: 200
}, {
  store: "Cohafuma",
  productId: "oxford-linha-completa",
  goal: 200
}, {
  store: "Imperatriz",
  productId: "oxford-linha-completa",
  goal: 200
}, {
  store: "Africanos",
  productId: "coala-essencia-algas-mar",
  goal: 30
}, {
  store: "Bacabal",
  productId: "casa-ok-kit-cabide",
  goal: 30
}, {
  store: "Olho Dagua",
  productId: "casa-ok-kit-cabide",
  goal: 50
}, {
  store: "Santa Inês",
  productId: "genco-tablete-multipla-acao",
  goal: 50
}];
const initialSalesEntries = [];
const stores = fixedStores.map(name => ({
  name,
  score: 0,
  sold: 0,
  goal: 200
}));
const getStoreStats = storeName => {
  const stats = stores.find(store => store.name === storeName) || stores.find(store => store.name === PILOT_STORE) || stores[0];
  const sorted = [...stores].sort((a, b) => b.sold / b.goal - a.sold / a.goal);
  return {
    ...stats,
    percent: Math.round(stats.sold / stats.goal * 100),
    networkPosition: sorted.findIndex(store => store.name === stats.name) + 1
  };
};
const getStoreFocus = storeName => {
  const assignment = initialProductAssignments.find(item => item.store === storeName) || initialProductAssignments[0];
  const product = focusProducts.find(item => item.id === assignment.productId) || focusProducts[0];
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
    percent: Math.round(sold / goal * 100)
  };
};
const isProductFocusEnabled = settings => {
  const round = settings?.round || defaultRoundConfig;
  return round.official !== false && !/16\s*avos/i.test(String(round.phase || round.name || ""));
};
const sellerPoints = () => 0;
const getStoreRanking = (storeName, limit = 10) => rankedSellers.filter(user => user.store === storeName).map(user => {
  const globalIndex = rankedSellers.findIndex(seller => seller.cpf === user.cpf);
  return {
    name: user.name,
    store: user.store,
    role: user.job,
    points: sellerPoints(user, globalIndex)
  };
}).sort((a, b) => b.points - a.points).slice(0, limit);
const games = [{
  id: 1,
  time: "19:00",
  group: "Grupo C",
  home: "Escócia",
  away: "Brasil",
  homeFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  awayFlag: "🇧🇷",
  venue: "Miami Stadium",
  kickoffAt: "2026-07-03T19:00:00-03:00",
  status: "scheduled"
}];
const teamFlags = {
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
  USA: "🇺🇸"
};
const formatGameTime = value => new Date(value).toLocaleTimeString("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo"
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
  awayScore: match.awayScore
});
const getActiveGames = (syncedMatches = [], round = defaultRoundConfig) => {
  const normalized = syncedMatches.map(normalizeSyncedMatch).filter(match => match.id && match.kickoffAt);
  if (!normalized.length) return games;
  const sameRound = normalized.filter(match => match.roundId === round.id || match.phase === round.phase || match.roundName === round.name);
  return (sameRound.length ? sameRound : normalized).filter(match => ["scheduled", "live", "finished"].includes(match.status)).sort((a, b) => new Date(a.kickoffAt) - new Date(b.kickoffAt));
};
const getMatchResultsFromGames = activeGames => activeGames.reduce((acc, match) => {
  if (Number.isInteger(match.homeScore) && Number.isInteger(match.awayScore)) {
    acc[match.id] = {
      homeScore: match.homeScore,
      awayScore: match.awayScore
    };
  }
  return acc;
}, {});
const predictionRules = ["Acertou vencedor ou empate: +2 pts", "Placar exato: +6 pts no total", "Em pênaltis, vale o placar antes das cobranças", "Palpites fecham 10 minutos antes do jogo"];
const formatDateTime = value => new Date(value).toLocaleString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit"
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
const knockoutRounds = [{
  id: "teste-16avos",
  phase: "16 avos",
  name: "Teste 16 avos",
  official: false,
  kickoffAt: "2026-07-03T21:00:00"
}, {
  id: "oitavas-dia-1",
  phase: "Oitavas",
  name: "Oitavas de final • Dia 1",
  official: true,
  kickoffAt: "2026-07-04T17:00:00"
}, {
  id: "oitavas-dia-2",
  phase: "Oitavas",
  name: "Oitavas de final • Dia 2",
  official: true,
  kickoffAt: "2026-07-05T17:00:00"
}, {
  id: "oitavas-dia-3",
  phase: "Oitavas",
  name: "Oitavas de final • Dia 3",
  official: true,
  kickoffAt: "2026-07-06T17:00:00"
}, {
  id: "oitavas-dia-4",
  phase: "Oitavas",
  name: "Oitavas de final • Dia 4",
  official: true,
  kickoffAt: "2026-07-07T17:00:00"
}, {
  id: "quartas-dia-1",
  phase: "Quartas",
  name: "Quartas de final • Dia 1",
  official: true,
  kickoffAt: "2026-07-09T17:00:00"
}, {
  id: "quartas-dia-2",
  phase: "Quartas",
  name: "Quartas de final • Dia 2",
  official: true,
  kickoffAt: "2026-07-10T17:00:00"
}, {
  id: "quartas-dia-3",
  phase: "Quartas",
  name: "Quartas de final • Dia 3",
  official: true,
  kickoffAt: "2026-07-11T17:00:00"
}, {
  id: "semi-1",
  phase: "Semifinais",
  name: "Semifinal 1",
  official: true,
  kickoffAt: "2026-07-14T21:00:00"
}, {
  id: "semi-2",
  phase: "Semifinais",
  name: "Semifinal 2",
  official: true,
  kickoffAt: "2026-07-15T21:00:00"
}, {
  id: "terceiro-lugar",
  phase: "Terceiro lugar",
  name: "Disputa de terceiro lugar",
  official: true,
  kickoffAt: "2026-07-18T17:00:00"
}, {
  id: "final",
  phase: "Final",
  name: "Final da Copa",
  official: true,
  kickoffAt: "2026-07-19T17:00:00"
}];
const getPredictionWindow = round => {
  const kickoffAt = round.kickoffAt ? new Date(round.kickoffAt) : null;
  const closeAt = kickoffAt ? new Date(kickoffAt.getTime() - 10 * 60 * 1000) : new Date(round.predictionsCloseAt || defaultRoundConfig.predictionsCloseAt);
  const rawOpenAt = new Date(closeAt.getTime() - 48 * 60 * 60 * 1000);
  return {
    openAt: rawOpenAt,
    closeAt
  };
};
const getPredictionAccess = (round, now = new Date()) => {
  const {
    openAt,
    closeAt
  } = getPredictionWindow(round || defaultRoundConfig);
  if ((round?.status || "open") !== "open") return {
    open: false,
    reason: "Rodada não está aberta para palpites.",
    openAt,
    closeAt
  };
  if (now < openAt) return {
    open: false,
    reason: `Palpites abrem em ${formatDateTime(openAt)}.`,
    openAt,
    closeAt
  };
  if (now > closeAt) return {
    open: false,
    reason: "Palpites encerrados 10 minutos antes do jogo.",
    openAt,
    closeAt
  };
  return {
    open: true,
    reason: `Aberto até ${formatDateTime(closeAt)}.`,
    openAt,
    closeAt
  };
};
const getGamePredictionAccess = (game, now = new Date()) => {
  const kickoffAt = new Date(game.kickoffAt);
  const closeAt = new Date(kickoffAt.getTime() - 10 * 60 * 1000);
  const openAt = new Date(closeAt.getTime() - 48 * 60 * 60 * 1000);
  if (now < openAt) return {
    open: false,
    reason: `Abre em ${formatDateTime(openAt)}.`,
    openAt,
    closeAt
  };
  if (now > closeAt) return {
    open: false,
    reason: "Encerrado 10 minutos antes do jogo.",
    openAt,
    closeAt
  };
  return {
    open: true,
    reason: `Aberto até ${formatDateTime(closeAt)}.`,
    openAt,
    closeAt
  };
};
const defaultAnnouncement = {
  id: "endomarketing-oitavas-produto-em-foco-17",
  title: "Produto em Foco #17: produtos versáteis",
  body: "O 17º episódio do Produto em Foco está no ar! O tema da vez são produtos versáteis (mesas dobráveis, bancos, coolers e caixas térmicas), uma categoria com enorme potencial de vendas combinadas.\n\n💡 O Valor do Rito em Grupo\nEste formato foi feito para ser assistido e debatido juntos (com todo o time ou em minigrupos). Incentive a equipe a maratonar e rever os vídeos sempre que precisar. Isso constrói o repertório técnico necessário para surpreender o consumidor e melhorar a experiência do cliente no chão de loja.\n\nFoco da liderança no rito de hoje:\n• Troca real: estimule o time a falar sobre os benefícios e a quebra de objeções.\n• Venda consultiva: provoque a oferta de soluções complementares (mesa + cooler + banquetas).\n\n📝 Checklist Rápido:\n1. Assistir em grupo e debater a aplicação imediata nas vendas.\n2. Aplicar a prova da semana.\n3. Garantir a inscrição de todos no canal para consultas frequentes.\n\n🚀 Líder: sua condução transforma o vídeo em resultado e constrói a segurança que o time precisa para vender mais.\n\nContamos com você. Excelentes vendas!",
  videoUrl: "https://www.youtube.com/shorts/vrCzG8vK6To",
  minimumSeconds: 30,
  publishedAt: "OITAVAS • ativo",
  startsAt: "",
  endsAt: "",
  attachments: []
};
const defaultScoringStartAt = "2026-07-04T00:00:00-03:00";
const defaultMatchResults = {
  1: {
    homeScore: 0,
    awayScore: 3
  }
};
const defaultRoundConfig = {
  id: "oitavas",
  phase: "Oitavas",
  name: "Oitavas de final",
  official: true,
  status: "open",
  kickoffAt: "2026-07-04T13:00:00",
  predictionsCloseAt: "2026-07-04T12:50:00"
};
const defaultAward = {
  name: "Premiação Oitavas de Final",
  criterion: "Desafio da semana + endomarketing + palpites",
  description: "1º vendedor de cada loja ganha uma Mochila Potiguar. 1º vendedor geral e os 2 primeiros líderes geral ganham um Robô Aspirador Potiguar.",
  storeSellerPrize: "Mochila Potiguar",
  storeSellerPrizeUrl: "https://www.apotiguar.com.br/produto/mochila-reforcada-preta-potiguar-105635",
  overallSellerPrize: "Robô Aspirador Potiguar",
  leadershipPrize: "Robô Aspirador Potiguar",
  mainPrizeUrl: "https://www.apotiguar.com.br/produto/robo-aspirador-de-po-preto-potiguar-105639"
};
const defaultAppSettings = {
  announcement: defaultAnnouncement,
  round: defaultRoundConfig,
  award: defaultAward,
  scoringStartAt: defaultScoringStartAt,
  matchResults: defaultMatchResults
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
  if (!result) return {
    points,
    hit: false,
    exact: false
  };
  const exact = Number(entry.home_score) === result.homeScore && Number(entry.away_score) === result.awayScore;
  return {
    points,
    hit: points > 0,
    exact
  };
};
const getTieTime = value => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.getTime() : Number.POSITIVE_INFINITY;
};
const compareRankingRows = (a, b) => b.points - a.points || b.exactPredictions - a.exactPredictions || b.predictionHits - a.predictionHits || b.soldQuantity - a.soldQuantity || (b.storeGoalHit ? 1 : 0) - (a.storeGoalHit ? 1 : 0) || b.storeGoalPercent - a.storeGoalPercent || b.storeActiveSellers - a.storeActiveSellers || b.storeSellerPoints - a.storeSellerPoints || getTieTime(a.firstReadAt) - getTieTime(b.firstReadAt) || getTieTime(a.firstPredictionAt) - getTieTime(b.firstPredictionAt) || getTieTime(a.firstSaleAt) - getTieTime(b.firstSaleAt) || a.name.localeCompare(b.name);
const compareStoreTopSellerTie = (a, b) => b.soldQuantity - a.soldQuantity || b.predictionPoints - a.predictionPoints || b.exactPredictions - a.exactPredictions || b.predictionHits - a.predictionHits || getTieTime(a.firstSaleAt) - getTieTime(b.firstSaleAt) || a.name.localeCompare(b.name);
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
    storeActiveSellers: 0,
    storeSellerPoints: 0
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
    const {
      points,
      hit,
      exact
    } = getPredictionStats(entry, activeMatchResults);
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
      storeSellers.filter(row => row.soldQuantity === maxSold).sort(compareStoreTopSellerTie).slice(0, 1).forEach(row => {
        row.isTopSeller = true;
        row.topSellerPoints += 8;
        row.points += 8;
      });
    }
  });
  initialProductAssignments.forEach(assignment => {
    const storeGoal = Number(assignment.goal || 0);
    if (!storeGoal || Number(salesByStore[assignment.store] || 0) < storeGoal) return;
    rows.filter(row => row.store === assignment.store).forEach(row => {
      row.storeGoalPoints += row.role === "Liderança" ? 4 : 2;
      row.points += row.role === "Liderança" ? 4 : 2;
    });
  });
  fixedStores.forEach(store => {
    const assignment = initialProductAssignments.find(item => item.store === store);
    const goal = Number(assignment?.goal || 0);
    const sold = Number(salesByStore[store] || 0);
    const storeRows = rows.filter(row => row.store === store);
    const storeSellers = storeRows.filter(row => row.role === "Vendedor");
    const storeGoalHit = goal > 0 && sold >= goal;
    const storeGoalPercent = goal > 0 ? Math.round(sold / goal * 100) : 0;
    const storeActiveSellers = storeSellers.filter(row => row.soldQuantity > 0).length;
    const storeSellerPoints = storeSellers.reduce((sum, row) => sum + row.points, 0);
    storeRows.forEach(row => {
      row.storeGoalHit = storeGoalHit;
      row.storeGoalPercent = storeGoalPercent;
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
  return {
    overallWinner: eligibleRows[0] || null,
    topOverall: eligibleRows.slice(0, 3),
    topSellerOverall: sellers[0] || null,
    topLeaders: leaders.slice(0, 2),
    storeWinners: fixedStores.map(store => ({
      store,
      winner: sellers.filter(row => row.store === store)[0] || null
    })).filter(item => item.winner)
  };
};
const getStoreSummaries = (rankingRows, predictionEntries = [], readEntries = []) => fixedStores.map(store => {
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
    topSeller
  };
}).sort((a, b) => b.points - a.points || b.predictionCount - a.predictionCount || a.store.localeCompare(b.store));
const getPredictionEngagement = (users = [], predictionEntries = []) => {
  const eligibleUsers = users.filter(user => user.profile !== "Administrador" && fixedStores.includes(user.store));
  const predictionMap = predictionEntries.reduce((acc, entry) => {
    const cpf = onlyDigits(entry.cpf);
    if (!cpf) return acc;
    const current = acc[cpf] || {
      count: 0,
      matches: new Set(),
      latest: ""
    };
    current.count += 1;
    current.matches.add(entry.match_id || entry.matchId);
    if (!current.latest || new Date(entry.submitted_at || entry.submittedAt) > new Date(current.latest)) current.latest = entry.submitted_at || entry.submittedAt;
    acc[cpf] = current;
    return acc;
  }, {});
  const totals = {
    eligible: eligibleUsers.length,
    participated: eligibleUsers.filter(user => predictionMap[onlyDigits(user.cpf)]).length
  };
  totals.missing = totals.eligible - totals.participated;
  totals.adherence = totals.eligible ? Math.round(totals.participated / totals.eligible * 100) : 0;
  const stores = fixedStores.map(store => {
    const people = eligibleUsers.filter(user => user.store === store);
    const participatedPeople = people.filter(user => predictionMap[onlyDigits(user.cpf)]);
    const missingPeople = people.filter(user => !predictionMap[onlyDigits(user.cpf)]).sort((a, b) => a.name.localeCompare(b.name));
    const sellers = people.filter(user => user.profile === "Vendedor");
    const leaders = people.filter(user => user.profile === "Liderança");
    const sellerParticipated = participatedPeople.filter(user => user.profile === "Vendedor").length;
    const leaderParticipated = participatedPeople.filter(user => user.profile === "Liderança").length;
    const guesses = participatedPeople.reduce((sum, user) => sum + (predictionMap[onlyDigits(user.cpf)]?.matches.size || 0), 0);
    const adherence = people.length ? Math.round(participatedPeople.length / people.length * 100) : 0;
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
      missingPeople
    };
  });
  return {
    totals,
    stores,
    bestStores: [...stores].sort((a, b) => b.adherence - a.adherence || b.participated - a.participated || a.store.localeCompare(b.store)),
    worstStores: [...stores].sort((a, b) => a.adherence - b.adherence || b.missing - a.missing || a.store.localeCompare(b.store))
  };
};
function Brand({
  compact = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: `${compact ? "h-10 w-10" : "h-12 w-12"} grid place-items-center rounded-2xl bg-potiguar-lime text-potiguar-950 shadow-lg shadow-black/10`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trophy",
    size: compact ? 22 : 26
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: `${compact ? "text-[10px]" : "text-xs"} font-extrabold uppercase tracking-[0.22em] text-potiguar-lime`
  }, "Copa Potiguar"), /*#__PURE__*/React.createElement("p", {
    className: `${compact ? "text-lg" : "text-xl"} font-display font-extrabold leading-none text-white`
  }, "2026")));
}
function LoginScreen({
  onLogin,
  userMap
}) {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formatCpf = value => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  };
  const submit = async event => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "login-bg min-h-screen p-4 sm:grid sm:place-items-center sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-2xl shadow-potiguar-950/20 sm:min-h-0 lg:grid-cols-[1.05fr_.95fr]"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines hidden p-10 text-white lg:flex lg:flex-col"
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("div", {
    className: "my-auto max-w-md"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex rounded-full bg-potiguar-lime/15 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.18em] text-potiguar-lime"
  }, "Piloto comercial 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "mt-6 font-display text-5xl font-extrabold leading-[1.02]"
  }, "Leu.", /*#__PURE__*/React.createElement("br", null), "Palpitou.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-potiguar-lime"
  }, "Vendeu.")), /*#__PURE__*/React.createElement("p", {
    className: "mt-5 text-sm leading-6 text-white/60"
  }, "Uma disputa única entre vendedores, com liderança acompanhando o resultado da própria loja.")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-white/35"
  }, "Acesso controlado • Piloto multi-lojas")), /*#__PURE__*/React.createElement("section", {
    className: "flex flex-col justify-center p-6 sm:p-10 lg:p-14"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-9 lg:hidden"
  }, /*#__PURE__*/React.createElement(Brand, {
    compact: true
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold uppercase tracking-[.16em] text-potiguar-700"
  }, "Bem-vindo"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-2 font-display text-3xl font-extrabold text-potiguar-950"
  }, "Entre na Copa Potiguar"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm text-slate-400"
  }, "Use seu CPF. No primeiro acesso, a senha temporária é o próprio CPF."), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    className: "mt-8 space-y-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "CPF"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "CPF",
    inputMode: "numeric",
    autoComplete: "username",
    value: cpf,
    onChange: e => setCpf(formatCpf(e.target.value)),
    className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-potiguar-500 focus:bg-white"
  })), /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Senha"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Senha",
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value),
    className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-potiguar-500 focus:bg-white"
  })), error && /*#__PURE__*/React.createElement("p", {
    className: "rounded-xl bg-red-50 p-3 text-xs font-bold text-red-600"
  }, error), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSubmitting,
    className: "flex w-full items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-potiguar-900/15 disabled:opacity-60"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 17
  }), " ", isSubmitting ? "Entrando..." : "Entrar")), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-center text-xs font-semibold text-slate-400"
  }, "Esqueceu a senha? Solicite a redefinição ao administrador."))));
}
function ChangePasswordScreen({
  user,
  currentPassword,
  onChanged,
  onCancel
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async event => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "login-bg min-h-screen p-4 sm:grid sm:place-items-center sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto w-full max-w-md rounded-[30px] bg-white p-6 shadow-2xl shadow-potiguar-950/20 sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8 rounded-3xl bg-potiguar-950 p-5 text-white"
  }, /*#__PURE__*/React.createElement(Brand, {
    compact: true
  }), /*#__PURE__*/React.createElement("p", {
    className: "mt-6 text-[10px] font-extrabold uppercase tracking-[.16em] text-potiguar-lime"
  }, "Primeiro acesso"), /*#__PURE__*/React.createElement("h1", {
    className: "mt-2 font-display text-2xl font-extrabold"
  }, "Crie sua senha"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm text-white/60"
  }, user.name, ", por segurança você precisa trocar a senha temporária antes de continuar.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Nova senha"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Nova senha",
    type: "password",
    autoComplete: "new-password",
    value: newPassword,
    onChange: e => setNewPassword(e.target.value),
    className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-potiguar-500 focus:bg-white"
  })), /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Confirmar nova senha"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Confirmar nova senha",
    type: "password",
    autoComplete: "new-password",
    value: confirmPassword,
    onChange: e => setConfirmPassword(e.target.value),
    className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-potiguar-500 focus:bg-white"
  })), error && /*#__PURE__*/React.createElement("p", {
    className: "rounded-xl bg-red-50 p-3 text-xs font-bold text-red-600"
  }, error), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSubmitting,
    className: "flex w-full items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-potiguar-900/15 disabled:opacity-60"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 17
  }), " ", isSubmitting ? "Salvando..." : "Salvar nova senha"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCancel,
    className: "w-full rounded-xl px-5 py-3 text-xs font-extrabold text-slate-400"
  }, "Voltar ao login"))));
}
function Sidebar({
  page,
  setPage,
  user,
  onLogout,
  profilePhotos
}) {
  const isAdmin = user.accessRole === "admin";
  const items = isAdmin ? [["shield", "Painel admin", "admin"]] : [["home", "Início", "home"], ["ball", "Palpites", "guesses"], ["ranking", "Ranking", "ranking"], ["store", "Minha loja", "store"]];
  return /*#__PURE__*/React.createElement("aside", {
    className: "desktop-nav fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col bg-potiguar-950 p-6 lg:flex"
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("nav", {
    className: "mt-12 space-y-2"
  }, items.map(([icon, label, value]) => /*#__PURE__*/React.createElement("button", {
    key: value,
    onClick: () => setPage(value),
    className: `nav-item ${page === value ? "active bg-potiguar-lime text-potiguar-950 shadow-lg shadow-potiguar-lime/10" : "text-white/65 hover:bg-white/8 hover:text-white"} flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left text-sm font-extrabold`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }), label))), /*#__PURE__*/React.createElement("div", {
    className: "mt-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 border-t border-white/10 pt-5"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: user.initials,
    photoUrl: profilePhotos[onlyDigits(user.cpf)]
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-sm font-bold text-white"
  }, user.name), /*#__PURE__*/React.createElement("p", {
    className: "truncate text-[11px] text-white/50"
  }, user.accessRole === "seller" ? "Vendedor" : user.originalRole, " • ", user.store)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    "aria-label": "Sair"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    className: "text-white/35",
    size: 18
  })))));
}
function MobileNav({
  page,
  setPage,
  user
}) {
  if (user.accessRole === "admin") return null;
  const items = [["home", "Início", "home"], ["ball", "Palpites", "guesses"], ["ranking", "Ranking", "ranking"], ["store", "Loja", "store"]];
  return /*#__PURE__*/React.createElement("nav", {
    className: "fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-2xl border border-black/5 bg-white/95 px-2 py-2 shadow-2xl shadow-potiguar-950/20 backdrop-blur lg:hidden"
  }, items.map(([icon, label, value]) => /*#__PURE__*/React.createElement("button", {
    key: value,
    onClick: () => setPage(value),
    className: `nav-item ${page === value ? "active text-potiguar-900" : "text-slate-400"} flex min-w-[66px] flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-extrabold`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20
  }), label)));
}
function Avatar({
  initials,
  size = "normal",
  rank,
  photoUrl
}) {
  const cls = size === "large" ? "h-14 w-14 text-base" : "h-10 w-10 text-xs";
  return /*#__PURE__*/React.createElement("div", {
    className: "relative shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: `${cls} grid place-items-center overflow-hidden rounded-full border-2 border-white/70 bg-gradient-to-br from-potiguar-lime to-potiguar-yellow font-extrabold text-potiguar-950 shadow-sm`
  }, photoUrl ? /*#__PURE__*/React.createElement("img", {
    src: photoUrl,
    alt: "",
    className: "h-full w-full object-cover"
  }) : initials), rank && /*#__PURE__*/React.createElement("span", {
    className: "absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-potiguar-900 text-[9px] font-extrabold text-white"
  }, rank));
}
function ProfilePhotoUploader({
  user,
  photoUrl,
  onSaveProfilePhoto,
  setToast
}) {
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
  return /*#__PURE__*/React.createElement("label", {
    className: "inline-flex cursor-pointer items-center gap-2 rounded-full bg-potiguar-900 px-3 py-2 text-[10px] font-extrabold text-white shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: photoUrl ? "check" : "users",
    size: 13
  }), saving ? "Enviando..." : photoUrl ? "Trocar foto" : "Colocar foto", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: handleFile,
    disabled: saving,
    className: "hidden"
  }));
}
function Topbar({
  page,
  user,
  onLogout,
  profilePhotos,
  isImpersonating = false,
  onStopImpersonation
}) {
  const labels = {
    home: "Visão geral",
    guesses: "Palpites",
    ranking: "Rankings",
    store: "Minha loja",
    admin: "Painel administrativo"
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-black/5 bg-[#f4f7f4]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:hidden"
  }, /*#__PURE__*/React.createElement(Brand, {
    compact: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:block"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-400"
  }, "Copa Potiguar 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-xl font-bold text-potiguar-950"
  }, labels[page])), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, isImpersonating && /*#__PURE__*/React.createElement("button", {
    onClick: onStopImpersonation,
    className: "hidden rounded-full bg-potiguar-lime px-4 py-2 text-xs font-extrabold text-potiguar-950 shadow-sm sm:inline-flex"
  }, "Voltar ao admin"), /*#__PURE__*/React.createElement("div", {
    className: "hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-potiguar-800 shadow-sm sm:flex"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot h-2 w-2 rounded-full bg-potiguar-lime"
  }), "Dados ao vivo"), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "grid h-10 w-10 place-items-center rounded-full bg-potiguar-900 text-white shadow-lg shadow-potiguar-900/15 lg:hidden",
    "aria-label": "Sair"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    className: "hidden items-center gap-3 lg:flex"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: user.initials,
    photoUrl: profilePhotos[onlyDigits(user.cpf)]
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-extrabold text-potiguar-950"
  }, user.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400"
  }, user.accessRole === "seller" ? "Vendedor" : user.originalRole, " • ", user.store)))));
}
function StatCard({
  icon,
  label,
  value,
  detail,
  accent = "green"
}) {
  const themes = {
    green: "bg-potiguar-900 text-white",
    lime: "bg-potiguar-lime text-potiguar-950",
    white: "bg-white text-potiguar-950"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `${themes[accent]} lift rounded-2xl p-5 shadow-sm`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: `text-xs font-bold ${accent === "green" ? "text-white/55" : "text-potiguar-900/55"}`
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 font-display text-3xl font-extrabold"
  }, value), /*#__PURE__*/React.createElement("p", {
    className: `mt-1 text-[11px] font-semibold ${accent === "green" ? "text-potiguar-lime" : "text-potiguar-700"}`
  }, detail)), /*#__PURE__*/React.createElement("div", {
    className: `grid h-10 w-10 place-items-center rounded-xl ${accent === "green" ? "bg-white/10" : "bg-potiguar-900/10"}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }))));
}
function ProductCard({
  user,
  totalSold,
  pilotRanking
}) {
  const leadership = user.accessRole === "leadership";
  const focus = getStoreFocus(user.store);
  const percent = Math.round(totalSold / focus.goal * 100);
  const remaining = Math.max(focus.goal - totalSold, 0);
  const width = `${Math.min(percent, 100)}%`;
  const unit = focus.product.unit || "un.";
  const topSeller = pilotRanking.filter(person => person.store === user.store && person.role === "Vendedor" && person.soldQuantity > 0).sort((a, b) => b.soldQuantity - a.soldQuantity || b.points - a.points)[0];
  return /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines rounded-[28px] p-6 text-white shadow-xl shadow-potiguar-900/15 sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fire",
    size: 16
  }), " ", leadership ? "Resultado dos vendedores" : "Desafio da Semana"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl"
  }, focus.product.name), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm text-white/60"
  }, leadership ? `Desempenho consolidado da equipe ${user.store}` : `Todos os vendedores competem em igualdade • SKU ${focus.product.sku} • Marca ${focus.product.brand}`), /*#__PURE__*/React.createElement("div", {
    className: "mt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-2 flex items-end justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-white/55"
  }, "Meta da ", user.store), /*#__PURE__*/React.createElement("span", {
    className: "font-display text-xl font-extrabold"
  }, totalSold, " ", /*#__PURE__*/React.createElement("small", {
    className: "text-xs font-semibold text-white/55"
  }, "/ ", focus.goal, " ", unit))), /*#__PURE__*/React.createElement("div", {
    className: "h-2.5 overflow-hidden rounded-full bg-black/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full bg-potiguar-lime",
    style: {
      width
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-xs font-bold text-potiguar-lime"
  }, leadership ? `Meta da equipe: ${percent}% atingida.` : remaining > 0 ? `Faltam só ${remaining} ${unit} para bater a meta!` : "Meta batida! Agora é ampliar a vantagem."), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex flex-wrap gap-2 text-[10px] font-extrabold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-white/10 px-3 py-1.5 text-white/75"
  }, percent, "% atingido"), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-white/10 px-3 py-1.5 text-white/75"
  }, topSeller ? `Destaque: ${topSeller.name.split(" ")[0]} • ${topSeller.soldQuantity} ${unit}` : "Aguardando vendas")))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-6 rounded-full bg-potiguar-lime/10 blur-xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "paint-can"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute -right-5 -top-5 grid h-14 w-14 rotate-6 place-items-center rounded-2xl bg-potiguar-yellow font-display text-lg font-extrabold text-potiguar-950 shadow-xl"
  }, leadership ? "+4" : "+5")))));
}
function Announcement({
  acknowledged,
  setToast,
  user,
  onAcknowledge,
  announcement
}) {
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
  return /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-potiguar-yellow/30 text-amber-700"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "megaphone"
  })), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-600"
  }, "Comunicado obrigatório"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-lg font-extrabold text-potiguar-950"
  }, activeAnnouncement.title)), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500"
  }, activeAnnouncement.publishedAt || "ATIVO")), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm leading-6 text-slate-500"
  }, activeAnnouncement.body), attachments.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block text-xs font-extrabold text-potiguar-950"
  }, "Arquivos do comunicado"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid gap-2 sm:grid-cols-2"
  }, attachments.map(file => /*#__PURE__*/React.createElement("a", {
    key: file.id || file.name,
    href: file.dataUrl || file.url,
    download: file.name,
    target: "_blank",
    rel: "noreferrer",
    className: "flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-xs font-bold text-potiguar-800 transition hover:bg-potiguar-lime/10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate"
  }, file.name), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 14
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs leading-5 text-amber-800"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block font-extrabold"
  }, "Como participar hoje"), "Assista ao vídeo → confirme a leitura da rodada → envie seu palpite até 10 minutos antes do jogo → acompanhe o ranking da rodada."), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-potiguar-950 p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-3 flex items-center justify-between gap-3 px-1"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-lime"
  }, "Vídeo da campanha"), /*#__PURE__*/React.createElement("p", {
    className: "mt-0.5 text-xs font-semibold text-white/65"
  }, "Clique em iniciar para começar a validação")), /*#__PURE__*/React.createElement("span", {
    className: "flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-white/70"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 11
  }), " ", acknowledged ? "Concluído" : readyToConfirm ? "Liberado" : videoStarted ? `${remainingSeconds}s` : "Aguardando")), !videoStarted && !acknowledged ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setVideoStarted(true),
    className: "mx-auto grid aspect-[9/16] w-full max-w-[260px] place-items-center overflow-hidden rounded-xl bg-black text-center text-white shadow-xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid h-16 w-16 place-items-center rounded-full bg-potiguar-lime text-potiguar-950"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 30
  })), /*#__PURE__*/React.createElement("span", {
    className: "-mt-20 px-6 text-xs font-extrabold text-white/75"
  }, "Iniciar vídeo e validação de ", activeAnnouncement.minimumSeconds || 30, " segundos")) : /*#__PURE__*/React.createElement("div", {
    className: "mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-xl bg-black shadow-xl"
  }, /*#__PURE__*/React.createElement("iframe", {
    className: "h-full w-full",
    src: youtubeEmbedUrl(activeAnnouncement.videoUrl),
    title: "Vídeo da Copa Potiguar 2026",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true
  })), /*#__PURE__*/React.createElement("a", {
    href: activeAnnouncement.videoUrl || defaultAnnouncement.videoUrl,
    target: "_blank",
    rel: "noreferrer",
    className: "mt-3 flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-[11px] font-extrabold text-white transition hover:bg-white/15"
  }, "Abrir vídeo no YouTube ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 14
  }))), !acknowledged && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-500"
  }, !videoStarted ? "Clique em “Iniciar vídeo” para começar a contar o tempo mínimo." : readyToConfirm ? "Pronto: agora você pode confirmar ciência e liberar o palpite." : `Assista/permaneça no vídeo por mais ${remainingSeconds} segundo(s) para liberar o botão.`), /*#__PURE__*/React.createElement("button", {
    disabled: acknowledged || !readyToConfirm,
    onClick: confirmRead,
    className: `mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold transition sm:w-auto ${acknowledged ? "bg-emerald-50 text-potiguar-700" : readyToConfirm ? "bg-potiguar-900 text-white shadow-lg shadow-potiguar-900/15 hover:bg-potiguar-800" : "cursor-not-allowed bg-slate-100 text-slate-400"}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: acknowledged ? "check" : "megaphone",
    size: 17
  }), acknowledged ? "Lido e registrado" : readyToConfirm ? "Li e estou ciente" : `Liberando em ${remainingSeconds}s`))));
}
function MiniRanking({
  pilotRanking
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Disputa geral"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-lg font-extrabold text-potiguar-950"
  }, "Pódio da rodada")), /*#__PURE__*/React.createElement(Icon, {
    name: "trophy",
    className: "text-amber-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-4"
  }, pilotRanking.slice(0, 3).map((person, idx) => /*#__PURE__*/React.createElement("div", {
    key: person.name,
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `grid h-7 w-7 place-items-center rounded-lg text-xs font-extrabold ${idx === 0 ? "bg-amber-100 text-amber-700" : idx === 1 ? "bg-slate-100 text-slate-500" : "bg-orange-100 text-orange-700"}`
  }, idx + 1), /*#__PURE__*/React.createElement(Avatar, {
    initials: person.name.split(" ").map(x => x[0]).slice(0, 2).join(""),
    photoUrl: person.photoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-sm font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, person.store)), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-lg text-potiguar-900"
  }, person.points)))));
}
function StoreMiniRanking({
  user,
  pilotRanking
}) {
  const localRanking = pilotRanking.filter(person => person.store === user.store && person.role === "Vendedor").slice(0, 4);
  const myPosition = pilotRanking.filter(person => person.store === user.store && person.role === "Vendedor").findIndex(person => person.name === user.name) + 1;
  const unit = getStoreFocus(user.store).product.unit || "un.";
  return /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Minha loja • ", user.store), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-lg font-extrabold text-potiguar-950"
  }, "Ranking dos vendedores")), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800"
  }, "VOCÊ: ", myPosition || "—", "º")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-3"
  }, localRanking.map((person, idx) => {
    const isMe = person.name === user.name;
    return /*#__PURE__*/React.createElement("div", {
      key: person.name,
      className: `flex items-center gap-3 rounded-xl p-3 ${isMe ? "bg-potiguar-lime/15" : "bg-slate-50"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-5 text-center text-xs font-extrabold text-slate-400"
    }, idx === 0 ? "🥇" : idx + 1), /*#__PURE__*/React.createElement(Avatar, {
      initials: person.name.split(" ").map(x => x[0]).slice(0, 2).join(""),
      photoUrl: person.photoUrl
    }), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex-1"
    }, /*#__PURE__*/React.createElement("p", {
      className: "truncate text-sm font-extrabold text-potiguar-950"
    }, person.name, isMe && /*#__PURE__*/React.createElement("span", {
      className: "ml-1 text-[9px] text-potiguar-700"
    }, "(VOCÊ)")), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-slate-400"
    }, person.soldQuantity, " ", unit, " • ", person.predictionHits, " acerto(s)", person.isTopSeller ? " • destaque" : "")), /*#__PURE__*/React.createElement("strong", {
      className: "font-display text-lg text-potiguar-900"
    }, person.points));
  })));
}
function LeaderPrizeRanking({
  user,
  pilotRanking,
  award = defaultAward
}) {
  const leaders = pilotRanking.filter(person => person.role === "Liderança").slice(0, 2);
  const myLeaderPosition = pilotRanking.filter(person => person.role === "Liderança").findIndex(person => person.cpf === onlyDigits(user.cpf)) + 1;
  return /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Premiação liderança"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-lg font-extrabold text-potiguar-950"
  }, "Top 2 líderes geral"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Sua posição: ", myLeaderPosition || "—", "º entre líderes • prêmio: ", award.leadershipPrize)), /*#__PURE__*/React.createElement(Icon, {
    name: "trophy",
    className: "text-potiguar-red"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-3"
  }, leaders.map((person, index) => /*#__PURE__*/React.createElement("div", {
    key: person.cpf,
    className: `flex items-center gap-3 rounded-xl p-3 ${person.cpf === onlyDigits(user.cpf) ? "bg-potiguar-lime/15" : "bg-slate-50"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-7 text-center text-xs"
  }, index === 0 ? "🥇" : "🥈"), /*#__PURE__*/React.createElement(Avatar, {
    initials: person.name.split(" ").map(part => part[0]).slice(0, 2).join(""),
    photoUrl: person.photoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-sm font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, person.store, " • ", person.predictionHits, " acerto(s)")), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-lg text-potiguar-900"
  }, person.points)))));
}
function Home({
  acknowledged,
  setPage,
  setToast,
  user,
  pilotRanking,
  totalSold,
  profilePhotos,
  settings,
  activeGames,
  onAcknowledge,
  onSaveProfilePhoto
}) {
  const leadership = user.accessRole === "leadership";
  const round = settings.round || defaultRoundConfig;
  const productFocusEnabled = isProductFocusEnabled(settings);
  const now = new Date();
  const gameAccess = activeGames.map(game => getGamePredictionAccess(game, now));
  const firstOpenAccess = gameAccess.find(access => access.open);
  const nextAccess = firstOpenAccess || gameAccess.find(access => now < access.closeAt);
  const predictionsClosed = !firstOpenAccess;
  const storeFocus = getStoreFocus(user.store);
  const storeFocusUnit = storeFocus.product.unit || "unidades";
  const storeSellers = pilotRanking.filter(person => person.store === user.store && person.role === "Vendedor");
  const activeSellers = storeSellers.filter(person => person.soldQuantity > 0).length;
  const userRanking = pilotRanking.find(row => row.cpf === onlyDigits(user.cpf));
  const userPhotoUrl = profilePhotos[onlyDigits(user.cpf)] || userRanking?.photoUrl || "";
  const userPosition = pilotRanking.findIndex(row => row.cpf === onlyDigits(user.cpf)) + 1;
  const storeGoal = storeFocus.goal;
  const storePercent = Math.round(totalSold / storeGoal * 100);
  const totalPredictionHits = pilotRanking.reduce((sum, person) => sum + person.predictionHits, 0);
  const award = settings.award || defaultAward;
  const greeting = getGreeting(now);
  const announcementActive = isAnnouncementActive(settings.announcement || defaultAnnouncement, now);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-slate-400"
  }, round.name, " • ", firstOpenAccess ? `palpites até ${formatDateTime(firstOpenAccess.closeAt)}` : "sem jogo aberto para palpite"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-1 font-display text-3xl font-extrabold text-potiguar-950"
  }, greeting, ", ", user.firstName, "! ", /*#__PURE__*/React.createElement("span", {
    className: "inline-block origin-bottom-right animate-[wave_1.6s_ease-in-out_infinite]"
  }, "👋")), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm text-slate-500"
  }, leadership ? "Acompanhe o desempenho dos vendedores da sua loja." : predictionsClosed ? productFocusEnabled ? "Palpites encerrados. Agora vamos acompanhar as vendas do desafio da semana." : "Palpites encerrados. Acompanhe o ranking da rodada." : "A janela de palpites está aberta para os jogos disponíveis.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-sm"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: user.initials,
    size: "large",
    rank: user.position,
    photoUrl: userPhotoUrl
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-400"
  }, user.accessRole === "seller" ? "Vendedor" : user.originalRole), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-extrabold text-potiguar-950"
  }, user.store, " • ", leadership ? "Liderança" : `${userPosition || "—"}º geral`), /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(ProfilePhotoUploader, {
    user: user,
    photoUrl: userPhotoUrl,
    onSaveProfilePhoto: onSaveProfilePhoto,
    setToast: setToast
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 xl:grid-cols-4"
  }, /*#__PURE__*/React.createElement(StatCard, {
    icon: "bolt",
    label: leadership ? "Pontos da liderança" : "Seus pontos",
    value: userRanking?.points || 0,
    detail: productFocusEnabled ? leadership ? `Comunicado ${userRanking?.announcementPoints || 0} • Meta ${userRanking?.storeGoalPoints || 0}` : `Comunicado ${userRanking?.announcementPoints || 0} • Palpite ${userRanking?.predictionPoints || 0} • Venda ${(userRanking?.salesPoints || 0) + (userRanking?.topSellerPoints || 0)}` : `Comunicado ${userRanking?.announcementPoints || 0} • Palpite ${userRanking?.predictionPoints || 0}`,
    accent: "green"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "ranking",
    label: "Posição geral",
    value: `${userPosition || "—"}º`,
    detail: userRanking?.isTopSeller ? "Destaque do desafio da semana" : "Ranking atualizado automaticamente",
    accent: "lime"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "target",
    label: leadership && productFocusEnabled ? "Vendedores com venda" : "Palpites certos",
    value: leadership && productFocusEnabled ? `${activeSellers}/${storeSellers.length}` : userRanking?.predictionHits || 0,
    detail: leadership && productFocusEnabled ? "Com pelo menos 1 venda lançada" : `${userRanking?.exactPredictions || 0} placar exato • ${totalPredictionHits} acertos no piloto`,
    accent: "white"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: productFocusEnabled ? "fire" : "ball",
    label: productFocusEnabled ? "Meta da loja" : "Fase teste",
    value: productFocusEnabled ? `${storePercent}%` : "16 avos",
    detail: productFocusEnabled ? `${totalSold} de ${storeFocus.goal} ${storeFocusUnit}` : "Somente palpites nesta etapa",
    accent: "white"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-[1.45fr_.8fr]"
  }, productFocusEnabled ? /*#__PURE__*/React.createElement(ProductCard, {
    user: user,
    totalSold: totalSold,
    pilotRanking: pilotRanking
  }) : /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines rounded-[28px] p-6 text-white shadow-xl shadow-potiguar-900/15 sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ball",
    size: 16
  }), " Fase teste"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-3 font-display text-3xl font-extrabold"
  }, "16 avos sem desafio da semana"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm leading-6 text-white/65"
  }, "Nesta etapa vamos medir adesão aos palpites e leitura do endomarketing. Desafio da semana e metas comerciais entram a partir das oitavas.")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement(MiniRanking, {
    pilotRanking: pilotRanking
  }), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-amber-600"
  }, "Prêmio da rodada"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, award.name), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-xs leading-5 text-slate-500"
  }, award.criterion, " • ", award.description), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid gap-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: award.storeSellerPrizeUrl || defaultAward.storeSellerPrizeUrl,
    target: "_blank",
    rel: "noreferrer",
    className: "rounded-xl bg-slate-50 px-3 py-2 text-[11px] font-extrabold text-potiguar-800 transition hover:bg-potiguar-lime/15"
  }, "1º vendedor por loja: ", award.storeSellerPrize || defaultAward.storeSellerPrize), /*#__PURE__*/React.createElement("a", {
    href: award.mainPrizeUrl || defaultAward.mainPrizeUrl,
    target: "_blank",
    rel: "noreferrer",
    className: "rounded-xl bg-slate-50 px-3 py-2 text-[11px] font-extrabold text-potiguar-800 transition hover:bg-potiguar-lime/15"
  }, "1º vendedor geral e Top 2 líderes: ", award.overallSellerPrize || defaultAward.overallSellerPrize))))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-[1.45fr_.8fr]"
  }, announcementActive ? /*#__PURE__*/React.createElement(Announcement, {
    acknowledged: acknowledged,
    setToast: setToast,
    user: user,
    onAcknowledge: onAcknowledge,
    announcement: settings.announcement
  }) : /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Endomarketing"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Nenhum comunicado ativo agora"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm leading-6 text-slate-500"
  }, "Quando o RH liberar o próximo comunicado dentro do horário agendado, ele aparecerá aqui para leitura e confirmação.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(predictionsClosed && productFocusEnabled ? "store" : "guesses"),
    className: "group hero-pattern rounded-2xl p-5 text-left text-white shadow-lg sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex h-full items-center justify-between gap-5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-bold text-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: predictionsClosed ? "lock" : acknowledged ? "ball" : "lock",
    size: 16
  }), " ", predictionsClosed ? "Palpites encerrados" : acknowledged ? "Área liberada" : "Ação necessária"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-2 font-display text-xl font-extrabold"
  }, predictionsClosed ? productFocusEnabled ? "Acompanhar desafio da semana" : "Ver jogos da rodada" : acknowledged ? "Faça seus palpites" : "Leia para desbloquear"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-white/55"
  }, nextAccess?.reason || "Aguardando jogos da rodada.")), /*#__PURE__*/React.createElement("span", {
    className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 transition group-hover:translate-x-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron"
  }))))), leadership && /*#__PURE__*/React.createElement(LeaderPrizeRanking, {
    user: user,
    pilotRanking: pilotRanking,
    award: award
  }), user.accessRole !== "admin" && /*#__PURE__*/React.createElement(StoreMiniRanking, {
    user: user,
    pilotRanking: pilotRanking
  }));
}
function Guesses({
  acknowledged,
  setPage,
  setToast,
  user,
  settings,
  activeGames,
  onSavePrediction
}) {
  const [scores, setScores] = useState({
    1: ["", ""]
  });
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
    if (openGames.length) setFilter("open");else if (upcomingGames.length) setFilter("upcoming");else setFilter("closed");
  }, [openGames.length, upcomingGames.length]);
  const updateScore = (id, side, value) => {
    if (value === "" || /^\d$/.test(value) && Number(value) <= 9) {
      setScores({
        ...scores,
        [id]: (scores[id] || ["", ""]).map((v, i) => i === side ? value : v)
      });
      setSaved(false);
    }
  };
  if (!acknowledged && !predictionsClosed) return /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-2xl py-8 sm:py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "soft-card overflow-hidden rounded-[28px] text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-pattern pitch-lines px-6 py-12 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white/10 text-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 38
  })), /*#__PURE__*/React.createElement("h2", {
    className: "mt-6 font-display text-3xl font-extrabold"
  }, "Palpites bloqueados"), /*#__PURE__*/React.createElement("p", {
    className: "mx-auto mt-3 max-w-md text-sm leading-6 text-white/60"
  }, "Para acessar os jogos, você precisa ler e confirmar a informação de endomarketing desta rodada.")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-amber-50 p-4 text-left text-sm text-amber-800"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block"
  }, "Regra da rodada"), firstOpenAccess?.reason || nextGameAccess?.reason || "Nenhum jogo aberto para palpite nesta rodada."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage("home"),
    className: "mt-6 w-full rounded-xl bg-potiguar-900 px-5 py-3.5 text-sm font-extrabold text-white"
  }, "Voltar e confirmar a rodada"))));
  if (predictionsClosed && !upcomingGames.length) return /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-2xl py-8 sm:py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "soft-card overflow-hidden rounded-[28px] text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-pattern pitch-lines px-6 py-12 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white/10 text-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 38
  })), /*#__PURE__*/React.createElement("h2", {
    className: "mt-6 font-display text-3xl font-extrabold"
  }, "Palpites encerrados"), /*#__PURE__*/React.createElement("p", {
    className: "mx-auto mt-3 max-w-md text-sm leading-6 text-white/60"
  }, nextGameAccess?.reason || "Não há jogos abertos para palpite nesta rodada.")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-potiguar-lime/15 p-4 text-left text-sm text-potiguar-900"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block"
  }, "Regra de horário"), predictionRules.join(" • ")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage("store"),
    className: "mt-6 w-full rounded-xl bg-potiguar-900 px-5 py-3.5 text-sm font-extrabold text-white"
  }, "Ver ranking da loja"))));
  return /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-4xl space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-potiguar-lime"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot h-2 w-2 rounded-full bg-potiguar-lime"
  }), " ", round.official ? "Rodada oficial" : "Rodada teste", " • ", round.phase), /*#__PURE__*/React.createElement("h2", {
    className: "mt-3 font-display text-3xl font-extrabold"
  }, round.name), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm text-white/60"
  }, "Digite o placar nos campos vermelhos. Placar exato vale 6 pontos no total; vencedor ou empate vale 2. Cada jogo fecha 10 minutos antes de começar.")), /*#__PURE__*/React.createElement("div", {
    className: "glass flex items-center gap-3 rounded-2xl px-4 py-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    className: "text-potiguar-lime"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-bold uppercase tracking-wider text-white/45"
  }, "Janela de palpites"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-lg font-extrabold"
  }, firstOpenAccess ? `até ${formatDateTime(firstOpenAccess.closeAt)}` : "sem jogo aberto"))))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-3 sm:p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, [["open", "Para palpitar", openGames.length], ["upcoming", "Próximos", upcomingGames.length], ["closed", "Realizados", closedGames.length]].map(([value, label, count]) => /*#__PURE__*/React.createElement("button", {
    key: value,
    type: "button",
    onClick: () => setFilter(value),
    className: `rounded-xl px-2 py-3 text-center text-[11px] font-extrabold transition ${filter === value ? "bg-potiguar-900 text-white" : "bg-slate-50 text-slate-400"}`
  }, label, /*#__PURE__*/React.createElement("span", {
    className: `ml-1 rounded-full px-1.5 py-0.5 text-[9px] ${filter === value ? "bg-white/15 text-white" : "bg-white text-slate-400"}`
  }, count))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, filteredGames.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "soft-card rounded-2xl p-6 text-center text-sm font-semibold text-slate-400"
  }, "Nenhum jogo nesta aba agora."), filteredGames.map(game => {
    const access = gameAccess[game.id];
    const closed = !access?.open;
    const finished = game.status === "finished" || Number.isInteger(game.homeScore) && Number.isInteger(game.awayScore);
    return /*#__PURE__*/React.createElement("article", {
      key: game.id,
      className: "soft-card rounded-2xl p-4 sm:p-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-5 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rounded-full bg-potiguar-900/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
    }, game.group), /*#__PURE__*/React.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center justify-end gap-1.5 text-xs font-bold text-slate-500"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 14
    }), " ", game.time), /*#__PURE__*/React.createElement("span", {
      className: "mt-1 block text-[9px] font-semibold uppercase tracking-wide text-slate-300"
    }, finished ? `FINAL ${game.homeScore} × ${game.awayScore}` : closed ? "PALPITE FECHADO" : `FECHA ${formatDateTime(access.closeAt)}`, " • ", game.venue))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center gap-2 sm:flex-row sm:justify-end"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-3xl"
    }, game.homeFlag), /*#__PURE__*/React.createElement("strong", {
      className: "text-center text-sm text-potiguar-950 sm:text-base"
    }, game.home)), /*#__PURE__*/React.createElement("div", {
      className: "rounded-2xl border-2 border-potiguar-red/25 bg-potiguar-red/5 p-2 text-center shadow-lg shadow-red-500/10"
    }, /*#__PURE__*/React.createElement("p", {
      className: "mb-1 text-[9px] font-extrabold uppercase tracking-wider text-potiguar-red"
    }, "Digite seu palpite"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("input", {
      "aria-label": `Gols ${game.home}`,
      disabled: closed,
      placeholder: "0",
      className: "score-input h-14 w-14 rounded-xl border-2 border-potiguar-red bg-white text-center font-display text-2xl font-extrabold text-potiguar-950 outline-none transition focus:border-potiguar-lime focus:ring-4 focus:ring-potiguar-lime/30 disabled:border-slate-200 disabled:opacity-40 sm:h-16 sm:w-16",
      type: "number",
      min: "0",
      max: "9",
      value: (scores[game.id] || ["", ""])[0],
      onChange: e => updateScore(game.id, 0, e.target.value)
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-extrabold text-potiguar-red"
    }, "×"), /*#__PURE__*/React.createElement("input", {
      "aria-label": `Gols ${game.away}`,
      disabled: closed,
      placeholder: "0",
      className: "score-input h-14 w-14 rounded-xl border-2 border-potiguar-red bg-white text-center font-display text-2xl font-extrabold text-potiguar-950 outline-none transition focus:border-potiguar-lime focus:ring-4 focus:ring-potiguar-lime/30 disabled:border-slate-200 disabled:opacity-40 sm:h-16 sm:w-16",
      type: "number",
      min: "0",
      max: "9",
      value: (scores[game.id] || ["", ""])[1],
      onChange: e => updateScore(game.id, 1, e.target.value)
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center gap-2 sm:flex-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-3xl sm:order-2"
    }, game.awayFlag), /*#__PURE__*/React.createElement("strong", {
      className: "text-center text-sm text-potiguar-950 sm:text-base"
    }, game.away))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "sticky bottom-24 z-10 rounded-2xl border border-potiguar-900/10 bg-white/95 p-3 shadow-2xl backdrop-blur lg:bottom-5"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: !complete || saved,
    onClick: async () => {
      const ok = await onSavePrediction(user, scores, openGames);
      if (ok) {
        setSaved(true);
        setToast("Palpites salvos e enviados para o admin.");
      }
    },
    className: `flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-extrabold transition ${complete && !saved ? "bg-potiguar-900 text-white hover:bg-potiguar-800" : saved ? "bg-emerald-50 text-potiguar-700" : "cursor-not-allowed bg-slate-100 text-slate-400"}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: saved ? "check" : "ball"
  }), saved ? "Palpites salvos" : complete ? "Salvar palpites" : "Preencha todos os placares")));
}
function RankingPage({
  user,
  pilotRanking
}) {
  const [tab, setTab] = useState("geral");
  const localRanking = pilotRanking.filter(person => person.store === user.store);
  const data = tab === "geral" ? pilotRanking : localRanking;
  const podium = [pilotRanking[1], pilotRanking[0], pilotRanking[2]].filter(Boolean);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold uppercase tracking-[.18em] text-potiguar-lime"
  }, "Temporada 2026"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-2 font-display text-3xl font-extrabold"
  }, "Quem está voando?"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm text-white/60"
  }, tab === "geral" ? "Classificação geral do piloto comercial." : `Classificação apenas da loja ${user.store}.`)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-center gap-3"
  }, podium.map((p, i) => {
    const rank = [2, 1, 3][i];
    return /*#__PURE__*/React.createElement("div", {
      key: p.name,
      className: `text-center ${rank === 1 ? "-translate-y-3" : ""}`
    }, /*#__PURE__*/React.createElement(Avatar, {
      initials: p.name.split(" ").map(x => x[0]).slice(0, 2).join(""),
      size: rank === 1 ? "large" : "normal",
      rank: rank,
      photoUrl: p.photoUrl
    }), /*#__PURE__*/React.createElement("p", {
      className: "mt-2 max-w-[82px] truncate text-[10px] font-bold"
    }, p.name.split(" ")[0]), /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-extrabold text-potiguar-lime"
    }, p.points, " pts"));
  })))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 border-b border-slate-100 p-4 sm:p-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("geral"),
    className: `rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${tab === "geral" ? "bg-potiguar-900 text-white" : "text-slate-400 hover:bg-slate-50"}`
  }, "Top 10 geral"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("loja"),
    className: `rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${tab === "loja" ? "bg-potiguar-900 text-white" : "text-slate-400 hover:bg-slate-50"}`
  }, "Minha loja: ", user.store)), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100"
  }, data.map((person, idx) => {
    const isMe = person.name === user.name;
    return /*#__PURE__*/React.createElement("div", {
      key: person.name,
      className: `flex items-center gap-3 p-4 sm:gap-4 sm:px-6 ${isMe ? "bg-potiguar-lime/10" : ""}`
    }, /*#__PURE__*/React.createElement("span", {
      className: `grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold ${idx === 0 ? "bg-amber-100 text-amber-700" : idx === 1 ? "bg-slate-100 text-slate-500" : idx === 2 ? "bg-orange-100 text-orange-700" : "text-slate-400"}`
    }, idx < 3 ? ["🥇", "🥈", "🥉"][idx] : idx + 1), /*#__PURE__*/React.createElement(Avatar, {
      initials: person.name.split(" ").map(x => x[0]).slice(0, 2).join(""),
      photoUrl: person.photoUrl
    }), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex-1"
    }, /*#__PURE__*/React.createElement("p", {
      className: "truncate text-sm font-extrabold text-potiguar-950"
    }, person.name, " ", isMe && /*#__PURE__*/React.createElement("span", {
      className: "ml-1 text-[9px] text-potiguar-700"
    }, "(VOCÊ)")), /*#__PURE__*/React.createElement("p", {
      className: "truncate text-[10px] text-slate-400"
    }, person.role, " • ", person.store || user.store, " • Comunicado ", person.announcementPoints, " • Palpite ", person.predictionPoints, " pts", person.salesPoints + person.topSellerPoints || person.storeGoalPoints ? ` • Venda ${person.salesPoints + person.topSellerPoints} pts${person.storeGoalPoints ? ` • Meta ${person.storeGoalPoints} pts` : ""}` : "")), person.trend && /*#__PURE__*/React.createElement("span", {
      className: `hidden text-[10px] font-bold sm:block ${person.trend.startsWith("+") ? "text-emerald-600" : person.trend.startsWith("-") ? "text-red-400" : "text-slate-300"}`
    }, person.trend), /*#__PURE__*/React.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("strong", {
      className: "font-display text-lg text-potiguar-900"
    }, person.points), /*#__PURE__*/React.createElement("p", {
      className: "text-[9px] font-bold text-slate-300"
    }, "PONTOS")));
  }))));
}
function StorePage({
  user,
  pilotRanking,
  totalSold,
  settings
}) {
  const productFocusEnabled = isProductFocusEnabled(settings);
  const storeFocus = getStoreFocus(user.store);
  const storeUnit = storeFocus.product.unit || "unidades";
  const storeGoal = storeFocus.goal || 1;
  const storePercent = Math.round(totalSold / storeGoal * 100);
  const localRanking = pilotRanking.filter(person => person.store === user.store);
  const localPoints = localRanking.reduce((sum, person) => sum + person.points, 0);
  const localReads = localRanking.reduce((sum, person) => sum + person.announcementPoints, 0);
  const localHits = localRanking.reduce((sum, person) => sum + person.predictionHits, 0);
  const networkRanking = stores.map(store => store.name === user.store ? {
    ...store,
    sold: totalSold,
    goal: storeGoal
  } : {
    ...store,
    sold: 0,
    goal: storeGoal
  }).sort((a, b) => b.sold / b.goal - a.sold / a.goal);
  const dayChampion = networkRanking[0];
  if (!productFocusEnabled) return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "store",
    size: 16
  }), " Loja ", user.store), /*#__PURE__*/React.createElement("h2", {
    className: "mt-3 font-display text-3xl font-extrabold"
  }, "Fase teste: foco nos palpites"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm leading-6 text-white/65"
  }, "Nesta etapa não teremos desafio da semana nem meta comercial. A partir das oitavas, esta tela passa a mostrar metas, vendas e ranking comercial da loja.")), user.accessRole === "leadership" && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3"
  }, /*#__PURE__*/React.createElement(StatCard, {
    icon: "users",
    label: "Equipe",
    value: localRanking.length,
    detail: "Participantes da loja",
    accent: "green"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "megaphone",
    label: "Leituras",
    value: localReads,
    detail: "Endomarketing confirmado",
    accent: "lime"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "ranking",
    label: "Pontos da loja",
    value: localPoints,
    detail: `${localHits} acerto(s) em palpites`,
    accent: "white"
  })), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Nosso time"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Ranking ", user.store)), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800"
  }, localRanking.length, " PARTICIPANTES")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-3"
  }, localRanking.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    className: `flex items-center gap-3 rounded-xl p-3 ${p.name === user.name ? "bg-potiguar-lime/15" : "bg-slate-50"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 text-center text-xs font-extrabold text-slate-400"
  }, i === 0 ? "🥇" : i + 1), /*#__PURE__*/React.createElement(Avatar, {
    initials: p.name.split(" ").map(x => x[0]).slice(0, 2).join(""),
    photoUrl: p.photoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-sm font-extrabold text-potiguar-950"
  }, p.name, p.name === user.name && /*#__PURE__*/React.createElement("span", {
    className: "ml-1 text-[9px] text-potiguar-700"
  }, "(VOCÊ)")), /*#__PURE__*/React.createElement("p", {
    className: "truncate text-[10px] text-slate-400"
  }, p.role, " • ", p.predictionHits, " acerto(s)")), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-lg text-potiguar-900"
  }, p.points))))));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "store",
    size: 16
  }), " Loja ", user.store), /*#__PURE__*/React.createElement("h2", {
    className: "mt-3 font-display text-3xl font-extrabold"
  }, "Juntos até a meta!"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm text-white/60"
  }, "Piloto ativo em ", user.store, " • ranking atualizado pelas vendas reais")), /*#__PURE__*/React.createElement("div", {
    className: "glass rounded-2xl px-5 py-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-bold uppercase tracking-wider text-white/45"
  }, "Atingimento hoje"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-4xl font-extrabold text-potiguar-lime"
  }, storePercent, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-2 flex justify-between text-xs font-bold"
  }, /*#__PURE__*/React.createElement("span", null, totalSold, " ", storeUnit, " vendidos"), /*#__PURE__*/React.createElement("span", null, "Meta: ", storeGoal, " ", storeUnit)), /*#__PURE__*/React.createElement("div", {
    className: "h-3 overflow-hidden rounded-full bg-black/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full bg-potiguar-lime",
    style: {
      width: `${Math.min(storePercent, 100)}%`
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-[1fr_.82fr]"
  }, /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Nosso time"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Ranking ", user.store)), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800"
  }, localRanking.length, " PARTICIPANTES")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-3"
  }, localRanking.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    className: `flex items-center gap-3 rounded-xl p-3 ${p.name === user.name ? "bg-potiguar-lime/15" : "bg-slate-50"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 text-center text-xs font-extrabold text-slate-400"
  }, i === 0 ? "🥇" : i + 1), /*#__PURE__*/React.createElement(Avatar, {
    initials: p.name.split(" ").map(x => x[0]).slice(0, 2).join(""),
    photoUrl: p.photoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-sm font-extrabold text-potiguar-950"
  }, p.name, p.name === user.name && /*#__PURE__*/React.createElement("span", {
    className: "ml-1 text-[9px] text-potiguar-700"
  }, "(VOCÊ)")), /*#__PURE__*/React.createElement("p", {
    className: "truncate text-[10px] text-slate-400"
  }, p.role, " • ", p.soldQuantity, " ", storeUnit, " • ", p.predictionHits, " acerto(s)", p.isTopSeller ? " • destaque" : "")), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-lg text-potiguar-900"
  }, p.points))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid h-14 w-14 place-items-center rounded-2xl bg-amber-100 text-3xl"
  }, "🏆"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-amber-600"
  }, "Loja campeã do dia"), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl font-extrabold text-potiguar-950"
  }, dayChampion.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, Math.round(dayChampion.sold / dayChampion.goal * 100), "% da meta • ", dayChampion.sold, " ", storeUnit)))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-lg font-extrabold text-potiguar-950"
  }, "Ranking da rede"), /*#__PURE__*/React.createElement(Icon, {
    name: "ranking",
    className: "text-potiguar-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-4"
  }, networkRanking.slice(0, 4).map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-1.5 flex justify-between text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-potiguar-950"
  }, i + 1, ". ", s.name), /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-potiguar-700"
  }, Math.round(s.sold / s.goal * 100), "%")), /*#__PURE__*/React.createElement("div", {
    className: "progress-track h-2 rounded-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill h-full rounded-full",
    style: {
      width: `${Math.min(s.sold / s.goal * 100, 100)}%`
    }
  })))))))));
}
function AdminPage({
  adminUser,
  users: allUsers,
  customUsers,
  setToast,
  predictionEntries,
  readEntries,
  salesEntries,
  setSalesEntries,
  pilotRanking,
  totalSold,
  profilePhotos,
  settings,
  activeGames,
  worldCupMatches,
  onSaveSetting,
  onRefreshData,
  onAccessAs
}) {
  const [module, setModule] = useState("dashboard");
  const [userSearch, setUserSearch] = useState("");
  const [storeFilter, setStoreFilter] = useState("Todas");
  const [users, setUsers] = useState(allUsers);
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    cpf: "",
    job: "Vendedor",
    profile: "Vendedor",
    store: PILOT_STORE
  });
  const [editingCpf, setEditingCpf] = useState("");
  const [assignments, setAssignments] = useState(initialProductAssignments);
  const [productCatalog, setProductCatalog] = useState(focusProducts);
  const [newProduct, setNewProduct] = useState({
    sku: "",
    name: "",
    brand: "",
    price: "",
    description: "",
    imageUrl: "",
    siteUrl: ""
  });
  const [newAssignment, setNewAssignment] = useState({
    store: "Centro",
    productId: "camesa-pano-prato-chef",
    goal: "50"
  });
  const [announcementForm, setAnnouncementForm] = useState(settings.announcement || defaultAnnouncement);
  const [awardForm, setAwardForm] = useState(settings.award || defaultAward);
  const [roundForm, setRoundForm] = useState(settings.round || defaultRoundConfig);
  const currentAdminGame = activeGames[0] || games[0];
  const [resultForm, setResultForm] = useState(() => {
    const result = (settings.matchResults || defaultMatchResults)[currentAdminGame.id] || defaultMatchResults[1] || {};
    return {
      homeScore: String(result.homeScore),
      awayScore: String(result.awayScore)
    };
  });
  const [newSale, setNewSale] = useState(() => {
    const firstSeller = registeredUsers.find(user => user.profile === "Vendedor") || {};
    const firstAssignment = initialProductAssignments.find(item => item.store === (firstSeller.store || PILOT_STORE)) || initialProductAssignments[0];
    return {
      store: firstSeller.store || PILOT_STORE,
      seller: firstSeller.name || "",
      productId: firstAssignment?.productId || "",
      quantity: "1"
    };
  });
  useEffect(() => {
    setUsers(allUsers);
    setAnnouncementForm(settings.announcement || defaultAnnouncement);
    setAwardForm(settings.award || defaultAward);
    setRoundForm(settings.round || defaultRoundConfig);
    const result = (settings.matchResults || defaultMatchResults)[currentAdminGame.id] || defaultMatchResults[1] || {};
    setResultForm({
      homeScore: String(result.homeScore),
      awayScore: String(result.awayScore)
    });
  }, [allUsers, settings, currentAdminGame.id]);
  const actions = [["bolt", "Aderência", "Quem participou e quem falta", "engagement"], ["megaphone", "Comunicados", "Criar textos e inserir vídeos", "announcements"], ["fire", "Desafios", "Cadastrar desafio da semana", "products"], ["target", "Metas", "Definir objetivos por loja", "goals"], ["ball", "Palpites", "Visualizar palpites enviados", "predictions"], ["chart", "Vendas", "Lançar quantidade por vendedor", "sales"], ["users", "Colaboradores", "Cadastrar acessos elegíveis", "users"], ["trophy", "Premiações", "Administrar reconhecimentos", "awards"], ["ranking", "Rankings", "Acompanhar classificação", "rankings"], ["chart", "Dashboards", "Visualizar indicadores", "dashboard"], ["shield", "Rodadas", "Controlar e encerrar rodadas", "rounds"]];
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
    if (!acc[entry.seller]) acc[entry.seller] = {
      name: entry.seller,
      store: entry.store,
      quantity: 0
    };
    acc[entry.seller].quantity += Number(entry.quantity);
    return acc;
  }, {})).sort((a, b) => b.quantity - a.quantity);
  const storeGoal = assignments.find(item => item.store === PILOT_STORE)?.goal || 200;
  const sellerCount = users.filter(user => user.profile === "Vendedor").length;
  const leaderCount = users.filter(user => user.profile === "Liderança").length;
  const adminCount = users.filter(user => user.profile === "Administrador").length;
  const participantCount = sellerCount + leaderCount;
  const roundWindow = getPredictionWindow(roundForm || defaultRoundConfig);
  const roundClosingSummary = getRoundClosingSummary(pilotRanking);
  const productFocusEnabled = isProductFocusEnabled(settings);
  const storeSummaries = getStoreSummaries(pilotRanking, predictionEntries, readEntries);
  const predictionEngagement = getPredictionEngagement(users, predictionEntries);
  const formatCpf = value => value.replace(/\D/g, "").slice(0, 11).replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  const startEditUser = user => {
    const cpf = onlyDigits(user.cpf);
    const editable = (Array.isArray(customUsers) ? customUsers : []).some(item => onlyDigits(item.cpf) === cpf);
    if (!editable) {
      setToast("Este usuário veio da base importada. Nesta fase, edite apenas usuários cadastrados pelo admin.");
      return;
    }
    setEditingCpf(cpf);
    setNewUser({
      name: user.name,
      cpf: user.cpf,
      job: user.profile === "Administrador" ? "Administrador" : user.profile === "Liderança" ? "Líder de loja" : "Vendedor",
      profile: user.profile,
      store: user.store
    });
    setShowUserForm(true);
    setModule("users");
  };
  const cancelUserForm = () => {
    setShowUserForm(false);
    setEditingCpf("");
    setNewUser({
      name: "",
      cpf: "",
      job: "Vendedor",
      profile: "Vendedor",
      store: PILOT_STORE
    });
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
    const created = normalizeCustomUser({
      ...newUser,
      email: "",
      status: "Ativo"
    });
    const nextCustomUsers = [...(Array.isArray(customUsers) ? customUsers : []).filter(user => onlyDigits(user.cpf) !== (editingCpf || onlyDigits(created.cpf))), created];
    const ok = await onSaveSetting("customUsers", nextCustomUsers);
    if (!ok) {
      setToast("Não foi possível salvar o colaborador no banco.");
      return;
    }
    setUsers(mergeUsers(registeredUsers, nextCustomUsers));
    cancelUserForm();
    setToast(editingCpf ? `${created.name} atualizado com sucesso.` : `${created.name} cadastrado. Senha inicial: CPF.`);
  };
  const resetUserPassword = async targetUser => {
    if (!window.confirm(`Redefinir a senha de ${targetUser.name} para o CPF do usuário?`)) return;
    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          adminCpf: adminUser?.cpf,
          targetCpf: targetUser.cpf
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Falha ao redefinir senha.");
      setToast(`Senha de ${targetUser.name} redefinida para o CPF. No próximo login, ele deverá criar nova senha.`);
    } catch (error) {
      console.error(error);
      setToast("Não foi possível redefinir a senha no servidor.");
    }
  };
  const assignProduct = event => {
    event.preventDefault();
    const exists = assignments.some(item => item.store === newAssignment.store && item.productId === newAssignment.productId);
    if (exists) {
      setToast("Este desafio já está definido para a loja.");
      return;
    }
    setAssignments([...assignments, {
      ...newAssignment,
      goal: Number(newAssignment.goal)
    }]);
    setToast("Desafio da semana vinculado à loja.");
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
  const createProduct = event => {
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
    setProductCatalog([...productCatalog, {
      ...newProduct,
      id
    }]);
    setNewProduct({
      sku: "",
      name: "",
      brand: "",
      price: "",
      description: "",
      imageUrl: "",
      siteUrl: ""
    });
    setToast("Produto cadastrado no piloto.");
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sellerCpf: seller?.cpf,
          seller: newSale.seller,
          store: newSale.store,
          productId: newSale.productId,
          productSku: product?.sku,
          productName: product?.name,
          quantity: Number(newSale.quantity)
        })
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
      attachments: Array.isArray(announcementForm.attachments) ? announcementForm.attachments : []
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
          dataUrl: reader.result
        });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })));
      setAnnouncementForm({
        ...announcementForm,
        attachments: [...currentAttachments, ...attachments]
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
      attachments: (announcementForm.attachments || []).filter(file => file.id !== attachmentId)
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
      predictionsCloseAt: roundWindow.closeAt.toISOString()
    };
    const ok = await onSaveSetting("round", next);
    if (ok) setToast("Rodada atualizada.");
  };
  const applyCalendarRound = round => {
    const {
      openAt,
      closeAt
    } = getPredictionWindow(round);
    setRoundForm({
      ...round,
      status: "open",
      openAt: openAt.toISOString(),
      predictionsCloseAt: closeAt.toISOString()
    });
    setToast(`${round.name} carregada. Revise e clique em Salvar rodada.`);
  };
  const saveResult = async event => {
    event.preventDefault();
    const next = {
      ...(settings.matchResults || defaultMatchResults),
      [currentAdminGame.id]: {
        homeScore: Number(resultForm.homeScore),
        awayScore: Number(resultForm.awayScore)
      }
    };
    const ok = await onSaveSetting("matchResults", next);
    if (ok) setToast("Resultado salvo. Ranking recalculado.");
  };
  const syncWorldCupMatches = async () => {
    try {
      const response = await fetch("/api/world-cup/sync", {
        method: "POST"
      });
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
      winners: roundClosingSummary
    };
    const ok = await onSaveSetting("round", next);
    if (ok) setToast(productFocusEnabled ? "Rodada encerrada com vendedor geral, vendedores por loja e top 2 líderes." : "Fase teste encerrada com top geral, líderes e vendedores por loja.");
  };
  const exportReport = () => {
    const rows = [["posicao", "nome", "cpf", "loja", "perfil", "pontos", "comunicado", "palpite_pts", "acertos", "placar_exato", "venda_pts", "quantidade", "meta_pts"], ...pilotRanking.map((person, index) => [index + 1, person.name, person.cpf, person.store, person.role, person.points, person.announcementPoints, person.predictionPoints, person.predictionHits, person.exactPredictions, person.salesPoints + person.topSellerPoints, person.soldQuantity, person.storeGoalPoints])];
    const csv = rows.map(row => row.map(value => `"${String(value ?? "").replace(/"/g, '""')}"`).join(";")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio-copa-potiguar-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setToast("Relatório CSV exportado.");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-slate-400"
  }, "Piloto comercial • acesso administrativo"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-3xl font-extrabold text-potiguar-950"
  }, "Central de administração")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onRefreshData();
      setToast("Dados atualizados.");
    },
    className: "flex items-center justify-center gap-2 rounded-xl border border-potiguar-900/10 bg-white px-4 py-3 text-xs font-extrabold text-potiguar-900"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 17
  }), " Atualizar"), /*#__PURE__*/React.createElement("button", {
    onClick: exportReport,
    className: "flex items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    size: 17
  }), " Exportar relatório"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 xl:grid-cols-4"
  }, /*#__PURE__*/React.createElement(StatCard, {
    icon: "users",
    label: "Participantes do piloto",
    value: participantCount,
    detail: `${sellerCount} vendedores • ${leaderCount} líderes • ${adminCount} admins`,
    accent: "green"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "megaphone",
    label: "Leituras",
    value: readEntries.length,
    detail: readEntries.length ? "Comunicados confirmados" : "Aguardando confirmações",
    accent: "lime"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "ball",
    label: "Aderência aos palpites",
    value: `${predictionEngagement.totals.adherence}%`,
    detail: `${predictionEngagement.totals.participated}/${predictionEngagement.totals.eligible} participaram • faltam ${predictionEngagement.totals.missing}`,
    accent: "white"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: productFocusEnabled ? "store" : "trophy",
    label: productFocusEnabled ? "Meta da rede" : "Fase teste",
    value: productFocusEnabled ? `${Math.round(totalSold / storeGoal * 100)}%` : "16 avos",
    detail: productFocusEnabled ? `${totalSold} de ${storeGoal}` : "Somente endomarketing e palpites",
    accent: "white"
  })), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Ações rápidas"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "O que vamos movimentar?")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid grid-cols-2 gap-2 sm:hidden"
  }, actions.map(([icon, title,, value]) => /*#__PURE__*/React.createElement("button", {
    key: title,
    onClick: () => setModule(value),
    className: `flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-left transition ${module === value ? "border-potiguar-500 bg-potiguar-lime text-potiguar-950 shadow-sm" : "border-slate-100 bg-slate-50 text-potiguar-900"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `grid h-7 w-7 shrink-0 place-items-center rounded-xl ${module === value ? "bg-potiguar-950 text-potiguar-lime" : "bg-white text-potiguar-900"}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    className: "truncate text-[11px] font-extrabold"
  }, title)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 hidden gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-4"
  }, actions.map(([icon, title, desc, value]) => /*#__PURE__*/React.createElement("button", {
    key: title,
    onClick: () => setModule(value),
    className: `lift rounded-2xl border p-4 text-left ${module === value ? "border-potiguar-500 bg-potiguar-lime/10" : "border-slate-100 bg-slate-50"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid h-10 w-10 place-items-center rounded-xl bg-potiguar-900 text-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19
  })), /*#__PURE__*/React.createElement("strong", {
    className: "mt-4 block text-sm text-potiguar-950"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "mt-1 block text-[10px] leading-4 text-slate-400"
  }, desc))))), module === "engagement" && /*#__PURE__*/React.createElement("section", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-pattern pitch-lines overflow-hidden rounded-3xl p-6 text-white sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.22em] text-potiguar-lime"
  }, "Aderência em tempo real"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-2 font-display text-3xl font-extrabold"
  }, "Quem já entrou no jogo?"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 max-w-2xl text-sm leading-6 text-white/65"
  }, "Acompanhe por loja quem já enviou palpite e quem ainda precisa ser acionado pelo líder.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-white/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-white/45"
  }, "Aderência"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-3xl font-extrabold text-potiguar-lime"
  }, predictionEngagement.totals.adherence, "%")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-white/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-white/45"
  }, "Participaram"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-3xl font-extrabold"
  }, predictionEngagement.totals.participated)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-white/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-white/45"
  }, "Faltam"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-3xl font-extrabold text-potiguar-red"
  }, predictionEngagement.totals.missing))))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 lg:grid-cols-2"
  }, /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-emerald-600"
  }, "Melhor aderência"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Lojas mais engajadas")), /*#__PURE__*/React.createElement(Icon, {
    name: "trophy",
    className: "text-potiguar-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-3"
  }, predictionEngagement.bestStores.slice(0, 5).map((store, index) => /*#__PURE__*/React.createElement("div", {
    key: store.store,
    className: "rounded-2xl border border-slate-100 bg-slate-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold text-potiguar-950"
  }, index + 1, ". ", store.store), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-[10px] text-slate-400"
  }, store.participated, "/", store.total, " participantes • ", store.guesses, " palpites")), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-2xl text-potiguar-900"
  }, store.adherence, "%")), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 h-2 rounded-full bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full bg-potiguar-lime",
    style: {
      width: `${Math.min(store.adherence, 100)}%`
    }
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-red"
  }, "Ponto de atenção"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Lojas para acionar agora")), /*#__PURE__*/React.createElement(Icon, {
    name: "megaphone",
    className: "text-potiguar-red"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 space-y-3"
  }, predictionEngagement.worstStores.slice(0, 5).map((store, index) => /*#__PURE__*/React.createElement("button", {
    key: store.store,
    onClick: () => setStoreFilter(store.store),
    className: "w-full rounded-2xl border border-red-100 bg-red-50 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold text-potiguar-950"
  }, index + 1, ". ", store.store), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-[10px] text-red-500"
  }, "Faltam ", store.missing, " de ", store.total, " • vendedores ", store.sellerParticipated, "/", store.sellers, " • líderes ", store.leaderParticipated, "/", store.leaders)), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-2xl text-potiguar-red"
  }, store.adherence, "%"))))))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-100 p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Relação por loja"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Quem falta participar dos palpites"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Lista nominal comparando usuários elegíveis com palpites gravados no servidor.")), /*#__PURE__*/React.createElement("select", {
    value: storeFilter,
    onChange: event => setStoreFilter(event.target.value),
    className: "rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-potiguar-900 outline-none focus:border-potiguar-500"
  }, /*#__PURE__*/React.createElement("option", null, "Todas"), fixedStores.map(store => /*#__PURE__*/React.createElement("option", {
    key: store
  }, store))))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4 p-5 sm:p-6 xl:grid-cols-2"
  }, predictionEngagement.stores.filter(store => storeFilter === "Todas" || store.store === storeFilter).map(store => /*#__PURE__*/React.createElement("div", {
    key: store.store,
    className: "rounded-2xl border border-slate-100 bg-slate-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, store.store), /*#__PURE__*/React.createElement("h5", {
    className: "mt-1 font-display text-lg font-extrabold text-potiguar-950"
  }, store.adherence, "% de aderência"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-[10px] text-slate-400"
  }, store.participated, "/", store.total, " participaram • ", store.guesses, " palpites gravados")), /*#__PURE__*/React.createElement("span", {
    className: `rounded-full px-3 py-1 text-[10px] font-extrabold ${store.missing ? "bg-red-100 text-potiguar-red" : "bg-potiguar-lime/25 text-potiguar-800"}`
  }, store.missing ? `${store.missing} faltam` : "100%")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid grid-cols-2 gap-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white p-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] font-bold text-slate-400"
  }, "Vendedores"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-extrabold text-potiguar-800"
  }, store.sellerParticipated, "/", store.sellers)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white p-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] font-bold text-slate-400"
  }, "Líderes"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-extrabold text-potiguar-800"
  }, store.leaderParticipated, "/", store.leaders))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 max-h-56 overflow-auto rounded-xl bg-white p-3"
  }, store.missingPeople.length ? store.missingPeople.map(person => /*#__PURE__*/React.createElement("div", {
    key: person.cpf,
    className: "flex items-center justify-between gap-3 border-b border-slate-50 py-2 last:border-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, person.profile, " • CPF ", formatCpf(person.cpf))), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-extrabold text-potiguar-red"
  }, "Pendente"))) : /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-potiguar-lime/15 p-4 text-center text-xs font-extrabold text-potiguar-900"
  }, "Todos os elegíveis da loja já participaram 🎯"))))))), module === "announcements" && /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-pattern pitch-lines p-6 text-white"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.18em] text-potiguar-lime"
  }, "RH • Endomarketing"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-2 font-display text-2xl font-extrabold"
  }, "Central de comunicados"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 max-w-2xl text-sm leading-6 text-white/65"
  }, "Cadastre o comunicado da rodada, inclua vídeo/anexos e agende quando ele deve aparecer para os participantes.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveAnnouncement,
    className: "grid gap-5 p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-potiguar-lime/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "1. Conteúdo principal"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid gap-4 md:grid-cols-[1fr_.45fr]"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Título que aparecerá para o colaborador"), /*#__PURE__*/React.createElement("input", {
    value: announcementForm.title || "",
    onChange: e => setAnnouncementForm({
      ...announcementForm,
      title: e.target.value
    }),
    placeholder: "Ex.: Vídeo obrigatório da rodada",
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Tempo mínimo do vídeo"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: announcementForm.minimumSeconds || 30,
    onChange: e => setAnnouncementForm({
      ...announcementForm,
      minimumSeconds: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  }))), /*#__PURE__*/React.createElement("label", {
    className: "mt-4 block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Texto do comunicado"), /*#__PURE__*/React.createElement("textarea", {
    rows: "5",
    value: announcementForm.body || "",
    onChange: e => setAnnouncementForm({
      ...announcementForm,
      body: e.target.value
    }),
    placeholder: "Escreva aqui a orientação que o colaborador precisa ler antes de palpitar.",
    className: "w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs leading-5 outline-none focus:border-potiguar-500"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-5 lg:grid-cols-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-slate-50 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "2. Vídeo e arquivos"), /*#__PURE__*/React.createElement("label", {
    className: "mt-4 block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "URL do vídeo"), /*#__PURE__*/React.createElement("input", {
    value: announcementForm.videoUrl || "",
    onChange: e => setAnnouncementForm({
      ...announcementForm,
      videoUrl: e.target.value
    }),
    placeholder: "Cole o link do YouTube",
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", {
    className: "mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-potiguar-700/25 bg-white p-5 text-center transition hover:border-potiguar-lime"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "text-potiguar-700"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mt-2 text-xs font-extrabold text-potiguar-950"
  }, "Adicionar arquivos"), /*#__PURE__*/React.createElement("span", {
    className: "mt-1 text-[10px] text-slate-400"
  }, "PDF, imagem ou documento • até 5 arquivos • 900 KB cada"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: true,
    onChange: attachAnnouncementFiles,
    className: "hidden"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-2"
  }, (announcementForm.attachments || []).map(file => /*#__PURE__*/React.createElement("div", {
    key: file.id,
    className: "flex items-center justify-between gap-3 rounded-xl bg-white p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, file.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, Math.round((file.size || 0) / 1024), " KB")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => removeAnnouncementAttachment(file.id),
    className: "rounded-lg bg-red-50 px-3 py-2 text-[10px] font-extrabold text-potiguar-red"
  }, "Remover"))), !(announcementForm.attachments || []).length && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Nenhum arquivo anexado."))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-slate-50 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "3. Agendamento"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid gap-4 sm:grid-cols-2"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Iniciar em"), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    value: formatDateTimeInput(announcementForm.startsAt),
    onChange: e => setAnnouncementForm({
      ...announcementForm,
      startsAt: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Finalizar em"), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    value: formatDateTimeInput(announcementForm.endsAt),
    onChange: e => setAnnouncementForm({
      ...announcementForm,
      endsAt: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  }))), /*#__PURE__*/React.createElement("label", {
    className: "mt-4 block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Status visível"), /*#__PURE__*/React.createElement("input", {
    value: announcementForm.publishedAt || "",
    onChange: e => setAnnouncementForm({
      ...announcementForm,
      publishedAt: e.target.value
    }),
    placeholder: "Ex.: ATIVO, Programado, Rodada 16 avos",
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", {
    className: "mt-4 block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "ID interno"), /*#__PURE__*/React.createElement("input", {
    value: announcementForm.id || "",
    onChange: e => setAnnouncementForm({
      ...announcementForm,
      id: e.target.value
    }),
    placeholder: "Pode deixar automático",
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-xl bg-white p-3 text-xs leading-5 text-slate-500"
  }, "Dica para o RH: ao mudar o ID do comunicado, a leitura será exigida novamente para a rodada."))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 sm:flex-row sm:justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setAnnouncementForm(settings.announcement || defaultAnnouncement),
    className: "rounded-xl px-5 py-3 text-xs font-extrabold text-slate-400"
  }, "Desfazer alterações"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "rounded-xl bg-potiguar-900 px-6 py-3 text-xs font-extrabold text-white"
  }, "Salvar comunicado")))), module === "awards" && /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-amber-600"
  }, "Premiação"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Prêmio da rodada"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Este prêmio aparece na Home dos participantes.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveAward,
    className: "mt-5 grid gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4 md:grid-cols-2"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Prêmio"), /*#__PURE__*/React.createElement("input", {
    value: awardForm.name || "",
    onChange: e => setAwardForm({
      ...awardForm,
      name: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Critério"), /*#__PURE__*/React.createElement("input", {
    value: awardForm.criterion || "",
    onChange: e => setAwardForm({
      ...awardForm,
      criterion: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  }))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Descrição"), /*#__PURE__*/React.createElement("textarea", {
    rows: "3",
    value: awardForm.description || "",
    onChange: e => setAwardForm({
      ...awardForm,
      description: e.target.value
    }),
    className: "w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs leading-5 outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white"
  }, "Salvar premiação")))), module === "rounds" && /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Rodada"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Controle da rodada e resultado"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Use o status para comunicar o momento da rodada. O resultado recalcula os pontos de palpite.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 rounded-2xl border border-potiguar-500/15 bg-potiguar-lime/5 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Calendário automático"), /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-lg font-extrabold text-potiguar-950"
  }, "Fases finais da Copa"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-500"
  }, "16 avos em modo teste; a partir das oitavas, rodadas oficiais. Os palpites ficam liberados em qualquer horário e encerram 10 minutos antes do jogo.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 sm:items-end"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-white px-3 py-1 text-[10px] font-extrabold text-potiguar-800"
  }, "Até 10 min antes"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: syncWorldCupMatches,
    className: "rounded-xl bg-potiguar-900 px-4 py-2.5 text-[10px] font-extrabold text-white"
  }, "Sincronizar Copa"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-2xl border border-white bg-white/80 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "football-data.org"), /*#__PURE__*/React.createElement("h5", {
    className: "text-sm font-extrabold text-potiguar-950"
  }, "Jogos sincronizados")), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800"
  }, worldCupMatches.length, " jogos")), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3"
  }, (activeGames || []).slice(0, 6).map(match => {
    const access = getGamePredictionAccess(match);
    return /*#__PURE__*/React.createElement("div", {
      key: match.id,
      className: "rounded-xl bg-slate-50 p-3"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
    }, match.group), /*#__PURE__*/React.createElement("p", {
      className: "mt-1 truncate text-xs font-extrabold text-potiguar-950"
    }, match.home, " x ", match.away), /*#__PURE__*/React.createElement("p", {
      className: "mt-1 text-[10px] text-slate-400"
    }, formatDateTime(match.kickoffAt), " • fecha ", formatDateTime(access.closeAt)));
  }), worldCupMatches.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Nenhum jogo sincronizado ainda. Configure a API key e clique em Sincronizar Copa."))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3"
  }, knockoutRounds.map(round => {
    const access = getPredictionAccess(round);
    return /*#__PURE__*/React.createElement("button", {
      key: round.id,
      type: "button",
      onClick: () => applyCalendarRound(round),
      className: `rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${round.official ? "border-potiguar-500/20 bg-white" : "border-amber-200 bg-amber-50"}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
    }, round.phase), /*#__PURE__*/React.createElement("p", {
      className: "mt-1 text-sm font-extrabold text-potiguar-950"
    }, round.name)), /*#__PURE__*/React.createElement("span", {
      className: `rounded-full px-2.5 py-1 text-[9px] font-extrabold ${round.official ? "bg-potiguar-lime/25 text-potiguar-800" : "bg-amber-100 text-amber-700"}`
    }, round.official ? "OFICIAL" : "TESTE")), /*#__PURE__*/React.createElement("p", {
      className: "mt-3 text-[10px] leading-4 text-slate-500"
    }, "Jogo: ", formatDateTime(round.kickoffAt), " • Palpites até ", formatDateTime(access.closeAt)), /*#__PURE__*/React.createElement("p", {
      className: "mt-1 text-[10px] font-bold text-potiguar-700"
    }, "Abertura sugerida: ", formatDateTime(access.openAt)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-xl bg-white p-3 text-xs leading-5 text-slate-500"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-potiguar-950"
  }, "Regra dos palpites:"), " ", predictionRules.join(" • "))), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveRound,
    className: "mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_.7fr_.8fr_.8fr_auto] md:items-end"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Nome da rodada"), /*#__PURE__*/React.createElement("input", {
    value: roundForm.name || "",
    onChange: e => setRoundForm({
      ...roundForm,
      name: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    value: roundForm.status || "open",
    onChange: e => setRoundForm({
      ...roundForm,
      status: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  }, /*#__PURE__*/React.createElement("option", {
    value: "open"
  }, "Aberta"), /*#__PURE__*/React.createElement("option", {
    value: "predictions_closed"
  }, "Palpites encerrados"), /*#__PURE__*/React.createElement("option", {
    value: "results"
  }, "Resultado lançado"), /*#__PURE__*/React.createElement("option", {
    value: "closed"
  }, "Rodada encerrada"))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Horário do jogo"), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    value: (roundForm.kickoffAt || "").slice(0, 16),
    onChange: e => setRoundForm({
      ...roundForm,
      kickoffAt: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Fecha automaticamente"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    readOnly: true,
    value: formatDateTime(roundWindow.closeAt),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold text-potiguar-800 outline-none"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white"
  }, "Salvar rodada")), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveResult,
    className: "mt-5 grid gap-4 rounded-2xl bg-potiguar-950 p-4 text-white md:grid-cols-[1fr_.4fr_.4fr_auto] md:items-end"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-lime"
  }, "Resultado do jogo"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm font-extrabold"
  }, currentAdminGame.home, " x ", currentAdminGame.away)), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-white/70"
  }, currentAdminGame.home), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: resultForm.homeScore,
    onChange: e => setResultForm({
      ...resultForm,
      homeScore: e.target.value
    }),
    className: "w-full rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-xs text-white outline-none focus:border-potiguar-lime"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-white/70"
  }, currentAdminGame.away), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: resultForm.awayScore,
    onChange: e => setResultForm({
      ...resultForm,
      awayScore: e.target.value
    }),
    className: "w-full rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-xs text-white outline-none focus:border-potiguar-lime"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "rounded-xl bg-potiguar-lime px-5 py-3 text-xs font-extrabold text-potiguar-950"
  }, "Salvar resultado")), /*#__PURE__*/React.createElement("section", {
    className: "mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-amber-700"
  }, "Fechamento da rodada"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-lg font-extrabold text-potiguar-950"
  }, "Ganhadores da ", roundForm.phase || "rodada"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs leading-5 text-slate-500"
  }, productFocusEnabled ? "Ao encerrar, o sistema registra o 1º vendedor geral, o 1º vendedor de cada loja e os 2 primeiros líderes geral." : "Na fase teste, contam apenas leitura do endomarketing e pontos dos palpites.")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: closeRound,
    className: "rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white"
  }, "Encerrar e registrar ganhadores")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid gap-3 lg:grid-cols-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, "Top 3 geral"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 space-y-2"
  }, roundClosingSummary.topOverall.length ? roundClosingSummary.topOverall.map((person, index) => /*#__PURE__*/React.createElement("div", {
    key: person.cpf,
    className: "flex items-center gap-2 rounded-xl bg-slate-50 p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-6 text-center text-xs"
  }, ["🥇", "🥈", "🥉"][index]), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, person.store, " • ", person.role)), /*#__PURE__*/React.createElement("strong", {
    className: "text-xs text-potiguar-900"
  }, person.points))) : /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Sem pontuação registrada ainda."))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, "Top 2 líderes"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 space-y-2"
  }, roundClosingSummary.topLeaders.length ? roundClosingSummary.topLeaders.map((person, index) => /*#__PURE__*/React.createElement("div", {
    key: person.cpf,
    className: "flex items-center gap-2 rounded-xl bg-slate-50 p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-6 text-center text-xs"
  }, ["🥇", "🥈", "🥉"][index]), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, person.store)), /*#__PURE__*/React.createElement("strong", {
    className: "text-xs text-potiguar-900"
  }, person.points))) : /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Sem líderes pontuados ainda."))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, "Vendedor por loja"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid gap-2 sm:grid-cols-2"
  }, roundClosingSummary.storeWinners.length ? roundClosingSummary.storeWinners.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.store,
    className: "rounded-xl bg-slate-50 p-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold text-potiguar-800"
  }, item.store), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 truncate text-xs font-extrabold text-potiguar-950"
  }, item.winner.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, item.winner.points, " pts • ", item.winner.role))) : /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Sem lojas com pontuação registrada ainda.")))))), module === "rankings" && /*#__PURE__*/React.createElement("section", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-pattern pitch-lines rounded-[28px] p-6 text-white sm:p-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.18em] text-potiguar-lime"
  }, "Classificação consolidada"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-3xl font-extrabold"
  }, "Rankings do piloto"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm text-white/60"
  }, "Ranking calculado com dados gravados no banco: leituras, palpites e vendas. Atualização automática a cada 15 segundos.")), /*#__PURE__*/React.createElement("div", {
    className: "glass rounded-2xl px-5 py-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-bold uppercase text-white/45"
  }, "Atualização"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-lg font-extrabold"
  }, "Automática")))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Premiação Oitavas"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Ganhadores previstos da rodada"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Acompanhamento ao vivo: 1º vendedor geral, 1º vendedor de cada loja e os 2 primeiros líderes geral.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid gap-3 md:grid-cols-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: (settings.award || defaultAward).storeSellerPrizeUrl || defaultAward.storeSellerPrizeUrl,
    target: "_blank",
    rel: "noreferrer",
    className: "rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-potiguar-lime"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, "Prêmio por loja"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm font-extrabold text-potiguar-950"
  }, (settings.award || defaultAward).storeSellerPrize || defaultAward.storeSellerPrize), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-[10px] text-slate-400"
  }, "Para o 1º vendedor de cada loja")), /*#__PURE__*/React.createElement("a", {
    href: (settings.award || defaultAward).mainPrizeUrl || defaultAward.mainPrizeUrl,
    target: "_blank",
    rel: "noreferrer",
    className: "rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-potiguar-lime"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, "Prêmio geral/liderança"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm font-extrabold text-potiguar-950"
  }, (settings.award || defaultAward).overallSellerPrize || defaultAward.overallSellerPrize), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-[10px] text-slate-400"
  }, "Para 1º vendedor geral e top 2 líderes"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 grid gap-4 xl:grid-cols-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-potiguar-lime/15 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, "1º vendedor geral"), roundClosingSummary.topSellerOverall ? /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: roundClosingSummary.topSellerOverall.name.split(" ").map(part => part[0]).slice(0, 2).join(""),
    photoUrl: roundClosingSummary.topSellerOverall.photoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-sm font-extrabold text-potiguar-950"
  }, roundClosingSummary.topSellerOverall.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-500"
  }, roundClosingSummary.topSellerOverall.store)), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-lg text-potiguar-900"
  }, roundClosingSummary.topSellerOverall.points)) : /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-xs text-slate-400"
  }, "Aguardando pontuação.")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-slate-50 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, "Top 2 líderes geral"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 space-y-2"
  }, roundClosingSummary.topLeaders.length ? roundClosingSummary.topLeaders.map((person, index) => /*#__PURE__*/React.createElement("div", {
    key: person.cpf,
    className: "flex items-center gap-2 rounded-xl bg-white p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-6 text-center text-xs"
  }, ["🥇", "🥈"][index]), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, person.store)), /*#__PURE__*/React.createElement("strong", {
    className: "text-xs text-potiguar-900"
  }, person.points))) : /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Aguardando líderes pontuarem."))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-slate-50 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, "1º vendedor por loja"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1"
  }, roundClosingSummary.storeWinners.length ? roundClosingSummary.storeWinners.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.store,
    className: "rounded-xl bg-white p-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold text-potiguar-800"
  }, item.store), /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, item.winner?.name || "—"))) : /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "Aguardando lojas pontuarem."))))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-2"
  }, /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-100 p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Pontuação geral"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Ranking geral de participantes"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Fonte: leituras, palpites e vendas registradas no servidor.")), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100"
  }, pilotRanking.slice(0, 10).map((person, index) => /*#__PURE__*/React.createElement("div", {
    key: person.name,
    className: "flex items-center gap-3 px-5 py-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `grid h-8 w-8 place-items-center rounded-lg text-xs font-extrabold ${index < 3 ? "bg-potiguar-lime/20 text-potiguar-800" : "text-slate-400"}`
  }, index < 3 ? ["🥇", "🥈", "🥉"][index] : index + 1), /*#__PURE__*/React.createElement(Avatar, {
    initials: person.name.split(" ").map(part => part[0]).slice(0, 2).join(""),
    photoUrl: person.photoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, person.store, " • ", person.role, " • Comunicado ", person.announcementPoints, " pt • Palpite ", person.predictionPoints, " pts/", person.predictionHits, " acerto(s)", person.salesPoints + person.topSellerPoints || person.storeGoalPoints ? ` • Venda ${person.salesPoints + person.topSellerPoints} pts/${person.soldQuantity} m²${person.storeGoalPoints ? ` • Meta ${person.storeGoalPoints} pts` : ""}` : "")), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-lg text-potiguar-900"
  }, person.points, " pts"))))), productFocusEnabled && /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-100 p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Desafio da semana"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Quantidade por vendedor")), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100"
  }, salesRanking.map((person, index) => /*#__PURE__*/React.createElement("div", {
    key: person.name,
    className: "flex items-center gap-3 px-5 py-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-7 text-center text-xs font-extrabold text-slate-400"
  }, index + 1), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, person.store)), /*#__PURE__*/React.createElement("span", {
    className: "rounded-xl bg-potiguar-lime/20 px-3 py-2 font-display text-lg font-extrabold text-potiguar-800"
  }, person.quantity, " ", productCatalog.find(product => assignments.some(item => item.productId === product.id))?.unit || "un.")))))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Desempenho acumulado"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Ranking das lojas")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 grid gap-3 md:grid-cols-2"
  }, storeSummaries.map((store, index) => /*#__PURE__*/React.createElement("div", {
    key: store.store,
    className: "flex items-center gap-4 rounded-xl bg-slate-50 p-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid h-9 w-9 place-items-center rounded-xl bg-white text-xs font-extrabold text-potiguar-900"
  }, index + 1, "º"), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-potiguar-950"
  }, store.store), /*#__PURE__*/React.createElement("strong", {
    className: "text-potiguar-700"
  }, store.points, " pts")), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 text-[10px] text-slate-400"
  }, store.readCount, " leituras • ", store.predictionCount, " palpites • ", store.participants, " participantes")))))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-100 p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Detalhamento por loja"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Ranking interno de cada loja"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Mostra a composição dos pontos por colaborador: comunicado, palpites, acertos e vendas/metas quando estiverem ativas.")), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100"
  }, storeSummaries.map(summary => /*#__PURE__*/React.createElement("div", {
    key: summary.store,
    className: "p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
  }, summary.sellerCount, " vendedores • ", summary.leaderCount, " líderes"), /*#__PURE__*/React.createElement("h5", {
    className: "mt-1 font-display text-lg font-extrabold text-potiguar-950"
  }, summary.store)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 text-[10px] font-extrabold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-potiguar-lime/20 px-3 py-1 text-potiguar-800"
  }, summary.points, " pts"), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-slate-100 px-3 py-1 text-slate-500"
  }, summary.readCount, " leituras"), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-slate-100 px-3 py-1 text-slate-500"
  }, summary.predictionCount, " palpites"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full min-w-[840px] text-left"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "#"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Colaborador"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Perfil"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3 text-center"
  }, "Comunicado"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3 text-center"
  }, "Palpite"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3 text-center"
  }, "Acertos"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3 text-center"
  }, "Placar exato"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3 text-center"
  }, "Venda/meta"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3 text-right"
  }, "Total"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100"
  }, summary.people.map((person, index) => /*#__PURE__*/React.createElement("tr", {
    key: person.cpf,
    className: index === 0 ? "bg-potiguar-lime/10" : ""
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-xs font-extrabold text-slate-400"
  }, index === 0 ? "🥇" : index + 1), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: person.name.split(" ").map(part => part[0]).slice(0, 2).join(""),
    photoUrl: person.photoUrl
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: "truncate text-xs font-extrabold text-potiguar-950"
  }, person.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-slate-400"
  }, "CPF ", person.cpf)))), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `rounded-full px-2.5 py-1 text-[9px] font-extrabold ${person.role === "Liderança" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`
  }, person.role)), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-center text-xs font-bold text-potiguar-900"
  }, person.announcementPoints), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-center text-xs font-bold text-potiguar-900"
  }, person.predictionPoints), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-center text-xs font-bold text-potiguar-900"
  }, person.predictionHits), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-center text-xs font-bold text-potiguar-900"
  }, person.exactPredictions), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-center text-xs font-bold text-potiguar-900"
  }, person.salesPoints + person.topSellerPoints + person.storeGoalPoints), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-right font-display text-lg font-extrabold text-potiguar-900"
  }, person.points))))))))))), module === "predictions" && /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Palpites enviados"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Jogos da rodada"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Lista consolidada dos palpites gravados no servidor.")), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-potiguar-lime/25 px-3 py-1 text-[10px] font-extrabold text-potiguar-800"
  }, predictionEntries.length, " PALPITES")), predictionEntries.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "p-6 text-sm text-slate-400"
  }, "Nenhum palpite gravado ainda. Os palpites feitos antes desta atualização não foram armazenados no servidor.") : /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full min-w-[760px] text-left"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "px-5 py-3"
  }, "Vendedor"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Loja"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Jogo"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Palpite"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Resultado"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Pontos"), /*#__PURE__*/React.createElement("th", {
    className: "px-5 py-3 text-right"
  }, "Enviado em"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100"
  }, predictionEntries.map(entry => {
    const result = (settings.matchResults || defaultMatchResults)[entry.match_id];
    const points = getPredictionPoints(entry, settings.matchResults || defaultMatchResults);
    return /*#__PURE__*/React.createElement("tr", {
      key: `${entry.cpf}-${entry.match_id}-${entry.submitted_at}`
    }, /*#__PURE__*/React.createElement("td", {
      className: "px-5 py-4"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-extrabold text-potiguar-950"
    }, entry.full_name), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-slate-400"
    }, "CPF ", formatCpf(entry.cpf))), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-4 text-xs font-bold text-potiguar-800"
    }, entry.store), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-4 text-xs text-slate-500"
    }, entry.home_team, " x ", entry.away_team), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-4 font-display text-lg font-extrabold text-potiguar-900"
    }, entry.home_score, " × ", entry.away_score), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-4 font-display text-lg font-extrabold text-potiguar-900"
    }, result ? `${result.homeScore} × ${result.awayScore}` : "—"), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: `rounded-xl px-3 py-2 text-xs font-extrabold ${points === 4 ? "bg-potiguar-lime/25 text-potiguar-800" : points === 2 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"}`
    }, points, " pts")), /*#__PURE__*/React.createElement("td", {
      className: "px-5 py-4 text-right text-xs text-slate-400"
    }, new Date(entry.submitted_at).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    })));
  }))))), module === "dashboard" && /*#__PURE__*/React.createElement("section", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-[1.25fr_.75fr]"
  }, /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Evolução do piloto"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Participação em apuração")), /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    className: "text-potiguar-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex h-48 items-end justify-between gap-3 border-b border-slate-100 px-2"
  }, [0, 0, 0, 0, 0, 0, 0].map((value, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "flex h-full flex-1 flex-col justify-end gap-2 text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] font-bold text-potiguar-700"
  }, value, "%"), /*#__PURE__*/React.createElement("div", {
    className: "mx-auto w-full max-w-10 rounded-t-lg bg-gradient-to-t from-potiguar-900 to-potiguar-lime",
    style: {
      height: `${Math.max(value, 4)}%`
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] font-bold text-slate-400"
  }, ["S", "T", "Q", "Q", "S", "S", "D"][index]))))), /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines rounded-2xl p-6 text-white"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-lime"
  }, "Resumo comercial"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold"
  }, "Desafios da semana"), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-white/45"
  }, "Desafios ativos"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 font-display text-3xl font-extrabold"
  }, assignments.length)), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-white/45"
  }, "Quantidade lançada"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 font-display text-3xl font-extrabold"
  }, salesEntries.reduce((sum, item) => sum + Number(item.quantity), 0))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-white/45"
  }, "Lojas com produto configurado"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 font-display text-3xl font-extrabold"
  }, new Set(assignments.map(item => item.store)).size, "/", fixedStores.length)))))), module === "products" && /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Configuração comercial"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Cadastro e desafios da semana"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "Informe o código/SKU usado pela Potiguar para preencher os dados do produto pelo site.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: createProduct,
    className: "mt-5 rounded-2xl border border-potiguar-500/15 bg-potiguar-lime/5 p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4 xl:flex-row xl:items-end"
  }, /*#__PURE__*/React.createElement("label", {
    className: "xl:w-44"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Código/SKU"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Código SKU do produto",
    value: newProduct.sku,
    onChange: e => setNewProduct({
      ...newProduct,
      sku: e.target.value.replace(/\D/g, "")
    }),
    placeholder: "Ex.: 219134",
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: lookupProduct,
    className: "rounded-xl border border-potiguar-900/15 bg-white px-4 py-3 text-xs font-extrabold text-potiguar-800"
  }, "Buscar no site"), /*#__PURE__*/React.createElement("label", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Nome do produto"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Nome do produto",
    value: newProduct.name,
    onChange: e => setNewProduct({
      ...newProduct,
      name: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", {
    className: "xl:w-40"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Marca"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Marca do produto",
    value: newProduct.brand,
    onChange: e => setNewProduct({
      ...newProduct,
      brand: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", {
    className: "xl:w-36"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Preço"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Preço do produto",
    value: newProduct.price,
    onChange: e => setNewProduct({
      ...newProduct,
      price: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white"
  }, "Cadastrar produto")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 grid gap-4 md:grid-cols-[120px_1fr]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid aspect-square place-items-center overflow-hidden rounded-xl border border-slate-100 bg-white"
  }, newProduct.imageUrl ? /*#__PURE__*/React.createElement("img", {
    src: newProduct.imageUrl,
    alt: newProduct.name,
    className: "h-full w-full object-contain p-2"
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: "fire",
    className: "text-slate-200",
    size: 32
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Descrição"), /*#__PURE__*/React.createElement("textarea", {
    "aria-label": "Descrição do produto",
    value: newProduct.description,
    onChange: e => setNewProduct({
      ...newProduct,
      description: e.target.value
    }),
    rows: "4",
    className: "w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs leading-5 outline-none focus:border-potiguar-500"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-[10px] text-slate-400"
  }, "Teste da consulta: informe o SKU ", /*#__PURE__*/React.createElement("strong", null, "219134"), ". Preço e disponibilidade devem ser atualizados sempre no momento da consulta.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold text-potiguar-950"
  }, "Vincular desafio à loja")), /*#__PURE__*/React.createElement("form", {
    onSubmit: assignProduct,
    className: "mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_1.5fr_.7fr_auto] md:items-end"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Loja"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Loja do desafio da semana",
    value: newAssignment.store,
    onChange: e => setNewAssignment({
      ...newAssignment,
      store: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  }, [...fixedStores, "Rede Potiguar"].map(store => /*#__PURE__*/React.createElement("option", {
    key: store
  }, store)))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Produto"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Desafio da semana",
    value: newAssignment.productId,
    onChange: e => setNewAssignment({
      ...newAssignment,
      productId: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  }, productCatalog.map(product => /*#__PURE__*/React.createElement("option", {
    key: product.id,
    value: product.id
  }, product.sku, " • ", product.name)))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Meta"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Meta do desafio da semana",
    type: "number",
    min: "1",
    value: newAssignment.goal,
    onChange: e => setNewAssignment({
      ...newAssignment,
      goal: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white"
  }, "Vincular produto")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3"
  }, assignments.map((item, index) => {
    const product = productCatalog.find(product => product.id === item.productId);
    return /*#__PURE__*/React.createElement("div", {
      key: `${item.store}-${item.productId}-${index}`,
      className: "rounded-2xl border border-slate-100 p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
    }, item.store), /*#__PURE__*/React.createElement("p", {
      className: "mt-1 text-sm font-extrabold text-potiguar-950"
    }, product?.name), /*#__PURE__*/React.createElement("p", {
      className: "mt-1 text-[10px] text-slate-400"
    }, "SKU ", product?.sku, " • ", product?.brand, " • ", product?.price)), /*#__PURE__*/React.createElement("span", {
      className: "rounded-lg bg-potiguar-lime/20 px-2.5 py-1 text-[10px] font-extrabold text-potiguar-800"
    }, "META ", item.goal)));
  }))), module === "sales" && /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Apuração do desafio da semana"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Vendas do desafio por vendedor"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, productFocusEnabled ? "O lançamento identifica loja, vendedor, desafio da semana e quantidade." : "Desafio da semana desativado na fase teste/16 avos. Vendas entram somente a partir das oitavas.")), !productFocusEnabled && /*#__PURE__*/React.createElement("div", {
    className: "mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800"
  }, "Nesta fase vamos medir apenas palpites e endomarketing. Não lance vendas de desafio da semana agora."), productFocusEnabled && /*#__PURE__*/React.createElement("form", {
    onSubmit: addSale,
    className: "mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_1.2fr_1.6fr_.7fr_auto] md:items-end"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Loja"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Loja da venda",
    value: newSale.store,
    onChange: e => {
      const store = e.target.value;
      const sellers = users.filter(user => user.profile === "Vendedor" && user.store === store);
      const products = assignments.filter(item => item.store === store);
      setNewSale({
        ...newSale,
        store,
        seller: sellers[0]?.name || "",
        productId: products[0]?.productId || ""
      });
    },
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  }, fixedStores.map(store => /*#__PURE__*/React.createElement("option", {
    key: store
  }, store)))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Vendedor"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Vendedor da venda",
    value: newSale.seller,
    onChange: e => setNewSale({
      ...newSale,
      seller: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione"), sellersForSale.map(user => /*#__PURE__*/React.createElement("option", {
    key: user.cpf
  }, user.name)))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Desafio da semana"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Desafio vendido",
    value: newSale.productId,
    onChange: e => setNewSale({
      ...newSale,
      productId: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione"), productsForSale.map(item => {
    const product = productCatalog.find(product => product.id === item.productId);
    return /*#__PURE__*/React.createElement("option", {
      key: item.productId,
      value: item.productId
    }, product?.sku, " • ", product?.name);
  }))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Quantidade"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Quantidade vendida",
    type: "number",
    min: "0.01",
    step: "0.01",
    value: newSale.quantity,
    onChange: e => setNewSale({
      ...newSale,
      quantity: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white"
  }, "Registrar venda")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full min-w-[650px] text-left"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Vendedor"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Loja"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Produto"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3 text-right"
  }, "Quantidade"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100"
  }, salesEntries.map(entry => {
    const product = productCatalog.find(product => product.id === entry.productId);
    return /*#__PURE__*/React.createElement("tr", {
      key: entry.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-3 text-xs font-extrabold text-potiguar-950"
    }, entry.seller), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-3 text-xs text-slate-500"
    }, entry.store), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-3 text-xs text-slate-500"
    }, entry.productSku || product?.sku, " • ", entry.productName || product?.name), /*#__PURE__*/React.createElement("td", {
      className: "px-4 py-3 text-right font-display text-lg font-extrabold text-potiguar-800"
    }, entry.quantity));
  }))))), module === "users" && /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-100 p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Controle de acesso"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Usuários cadastrados"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, users.length, " usuários • ", fixedStores.length, " lojas fixas")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 sm:flex-row"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Pesquisar usuários"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Pesquisar usuários",
    value: userSearch,
    onChange: event => setUserSearch(event.target.value),
    placeholder: "Buscar nome ou CPF",
    className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs outline-none focus:border-potiguar-500 sm:w-60"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Filtrar por loja"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Filtrar por loja",
    value: storeFilter,
    onChange: event => setStoreFilter(event.target.value),
    className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-potiguar-900 outline-none focus:border-potiguar-500 sm:w-48"
  }, /*#__PURE__*/React.createElement("option", null, "Todas"), fixedStores.map(store => /*#__PURE__*/React.createElement("option", {
    key: store
  }, store)), /*#__PURE__*/React.createElement("option", null, "Rede Potiguar"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (showUserForm) cancelUserForm();else setShowUserForm(true);
    },
    className: "flex items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Novo usuário")))), showUserForm && /*#__PURE__*/React.createElement("form", {
    onSubmit: createUser,
    className: "grid gap-4 border-b border-slate-100 bg-potiguar-lime/5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-2 xl:col-span-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, editingCpf ? "Editando colaborador" : "Novo colaborador")), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Nome completo"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Nome do novo colaborador",
    value: newUser.name,
    onChange: e => setNewUser({
      ...newUser,
      name: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "CPF"), /*#__PURE__*/React.createElement("input", {
    "aria-label": "CPF do novo colaborador",
    inputMode: "numeric",
    value: newUser.cpf,
    onChange: e => setNewUser({
      ...newUser,
      cpf: formatCpf(e.target.value)
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs outline-none focus:border-potiguar-500"
  })), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Cargo"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Cargo do novo colaborador",
    value: newUser.job,
    onChange: e => {
      const job = e.target.value;
      setNewUser({
        ...newUser,
        job,
        profile: job === "Administrador" ? "Administrador" : job === "Líder de loja" ? "Liderança" : "Vendedor",
        store: job === "Administrador" ? "Rede Potiguar" : newUser.store
      });
    },
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  }, /*#__PURE__*/React.createElement("option", null, "Vendedor"), /*#__PURE__*/React.createElement("option", null, "Líder de loja"), /*#__PURE__*/React.createElement("option", null, "Administrador"))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Loja"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Loja do novo colaborador",
    value: newUser.store,
    onChange: e => setNewUser({
      ...newUser,
      store: e.target.value
    }),
    className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs"
  }, [...fixedStores, "Rede Potiguar"].map(store => /*#__PURE__*/React.createElement("option", {
    key: store
  }, store)))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: cancelUserForm,
    className: "rounded-xl px-4 py-3 text-xs font-bold text-slate-400"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "flex-1 rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white"
  }, editingCpf ? "Salvar" : "Cadastrar"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full min-w-[820px] text-left"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-3"
  }, "Colaborador"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Cargo original"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Perfil no piloto"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Loja"), /*#__PURE__*/React.createElement("th", {
    className: "px-4 py-3"
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-3 text-right"
  }, "Ações"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100"
  }, visibleUsers.map(user => /*#__PURE__*/React.createElement("tr", {
    key: user.cpf,
    className: "hover:bg-potiguar-lime/5"
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-6 py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: user.name.split(" ").map(x => x[0]).slice(0, 2).join(""),
    photoUrl: profilePhotos[onlyDigits(user.cpf)]
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-extrabold text-potiguar-950"
  }, user.name), /*#__PURE__*/React.createElement("p", {
    className: "mt-0.5 text-[10px] font-semibold text-slate-400"
  }, "CPF ", user.cpf)))), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-4 text-xs font-semibold text-slate-500"
  }, user.job), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: `rounded-full px-2.5 py-1 text-[9px] font-extrabold ${user.profile === "Administrador" ? "bg-purple-50 text-purple-700" : user.profile === "Liderança" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`
  }, user.profile)), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-4 text-xs font-bold text-potiguar-800"
  }, user.store), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-1.5 w-1.5 rounded-full bg-emerald-500"
  }), user.status)), /*#__PURE__*/React.createElement("td", {
    className: "px-6 py-4 text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2"
  }, user.profile !== "Administrador" && /*#__PURE__*/React.createElement("button", {
    onClick: () => onAccessAs(user),
    className: "rounded-lg bg-potiguar-lime px-3 py-2 text-[10px] font-extrabold text-potiguar-950"
  }, "Acessar como"), /*#__PURE__*/React.createElement("button", {
    onClick: () => resetUserPassword(user),
    className: "rounded-lg bg-amber-50 px-3 py-2 text-[10px] font-extrabold text-amber-700"
  }, "Resetar senha"), /*#__PURE__*/React.createElement("button", {
    onClick: () => startEditUser(user),
    className: "rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-extrabold text-slate-500"
  }, "Editar"))))))), visibleUsers.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "p-10 text-center text-sm font-semibold text-slate-400"
  }, "Nenhum usuário encontrado."))), formModule && /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Cadastro e manutenção"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, formModule.title)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModule("dashboard"),
    className: "grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-500"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 grid gap-4 md:grid-cols-3"
  }, formModule.fields.map((field, index) => /*#__PURE__*/React.createElement("label", {
    key: field,
    className: "block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, field), /*#__PURE__*/React.createElement("input", {
    "aria-label": field,
    type: field.includes("Data") || field.includes("Abertura") || field.includes("Encerramento") ? "datetime-local" : field.includes("Meta") ? "number" : "text",
    placeholder: index === 0 ? "Preencha aqui" : "",
    className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-potiguar-500 focus:bg-white"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModule("dashboard"),
    className: "rounded-xl px-5 py-3 text-xs font-extrabold text-slate-400"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setToast(`${formModule.button}: registro preparado. A persistência será feita no PostgreSQL.`),
    className: "rounded-xl bg-potiguar-900 px-5 py-3 text-xs font-extrabold text-white"
  }, formModule.button))), module === "dashboard" && /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-[1.25fr_.75fr]"
  }, /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, productFocusEnabled ? "Desempenho por loja" : "Fase teste"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Acompanhamento das lojas")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-400"
  }, "Atualização automática")), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 grid gap-3 md:grid-cols-2"
  }, storeSummaries.map((summary, index) => {
    const maxPoints = Math.max(1, ...storeSummaries.map(item => item.points));
    return /*#__PURE__*/React.createElement("div", {
      key: summary.store,
      className: "rounded-2xl border border-slate-100 bg-slate-50 p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] font-extrabold uppercase tracking-wider text-potiguar-700"
    }, index + 1, "º lugar"), /*#__PURE__*/React.createElement("h4", {
      className: "mt-1 text-sm font-extrabold text-potiguar-950"
    }, summary.store), /*#__PURE__*/React.createElement("p", {
      className: "mt-1 text-[10px] text-slate-400"
    }, summary.sellerCount, " vendedores • ", summary.leaderCount, " líderes")), /*#__PURE__*/React.createElement("strong", {
      className: "font-display text-xl text-potiguar-900"
    }, summary.points, " pts")), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 progress-track h-2.5 rounded-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-fill h-full rounded-full",
      style: {
        width: `${Math.min(summary.points / maxPoints * 100, 100)}%`
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "mt-3 grid grid-cols-3 gap-2 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl bg-white p-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[9px] font-bold text-slate-400"
    }, "Leituras"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-extrabold text-potiguar-800"
    }, summary.readCount)), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl bg-white p-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[9px] font-bold text-slate-400"
    }, "Palpites"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-extrabold text-potiguar-800"
    }, summary.predictionCount)), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl bg-white p-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[9px] font-bold text-slate-400"
    }, "Top vendedor"), /*#__PURE__*/React.createElement("p", {
      className: "truncate text-[10px] font-extrabold text-potiguar-800"
    }, summary.topSeller?.name?.split(" ")[0] || "—"))));
  }))), /*#__PURE__*/React.createElement("section", {
    className: "hero-pattern pitch-lines rounded-2xl p-6 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-lime"
  }, "Rodada atual"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold"
  }, "Status operacional")), /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    className: "text-potiguar-lime"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 space-y-4"
  }, [["Comunicado publicado", true], [productFocusEnabled ? "Desafio da semana ativo" : "Desafio da semana nas oitavas", productFocusEnabled], [productFocusEnabled ? "Metas configuradas" : "Metas comerciais pausadas", productFocusEnabled], ["Resultados dos jogos", false]].map(([label, ok]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    className: "flex items-center justify-between rounded-xl bg-white/7 p-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: `grid h-6 w-6 place-items-center rounded-full ${ok ? "bg-potiguar-lime text-potiguar-950" : "bg-white/10 text-white/40"}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ok ? "check" : "clock",
    size: 13
  }))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setToast("Encerramento simulado. Em produção, a ação será auditada e impedirá novos palpites."),
    className: "mt-6 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-extrabold hover:bg-white/15"
  }, "Encerrar rodada"))));
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
  useEffect(() => window.scrollTo({
    top: 0,
    behavior: "smooth"
  }), [page]);
  const loadPredictions = async () => {
    try {
      const response = await fetch("/api/predictions", {
        cache: "no-store"
      });
      if (!response.ok) return;
      const data = await response.json();
      setPredictionEntries(data.predictions || []);
    } catch (error) {
      console.warn("Não foi possível carregar palpites.", error);
    }
  };
  const loadSales = async () => {
    try {
      const response = await fetch("/api/sales", {
        cache: "no-store"
      });
      if (!response.ok) return;
      const data = await response.json();
      setSalesEntries(data.sales || []);
    } catch (error) {
      console.warn("Não foi possível carregar vendas.", error);
    }
  };
  const loadAnnouncementReads = async () => {
    try {
      const response = await fetch("/api/announcement-reads", {
        cache: "no-store"
      });
      if (!response.ok) return;
      const data = await response.json();
      setReadEntries(data.reads || []);
    } catch (error) {
      console.warn("Não foi possível carregar leituras do comunicado.", error);
    }
  };
  const loadProfilePhotos = async () => {
    try {
      const response = await fetch("/api/profile-photos", {
        cache: "no-store"
      });
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
      const response = await fetch("/api/settings", {
        cache: "no-store"
      });
      if (!response.ok) return;
      const data = await response.json();
      setAppSettings({
        ...defaultAppSettings,
        ...(data.settings || {})
      });
    } catch (error) {
      console.warn("Não foi possível carregar configurações da rodada.", error);
    }
  };
  const loadWorldCupMatches = async () => {
    try {
      const response = await fetch("/api/world-cup/matches", {
        cache: "no-store"
      });
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
  const allRegisteredUsers = useMemo(() => mergeUsers(registeredUsers, customUsers), [appSettings.customUsers]);
  const dynamicDemoUsers = useMemo(() => buildDemoUsers(allRegisteredUsers), [allRegisteredUsers]);
  const activeGames = getActiveGames(worldCupMatches, activeRound);
  const syncedMatchResults = getMatchResultsFromGames(activeGames);
  const scoringSettings = {
    ...appSettings,
    matchResults: {
      ...(appSettings.matchResults || defaultMatchResults),
      ...syncedMatchResults
    }
  };
  const activePredictionEntries = predictionEntries.filter(entry => isAfterScoringStart(entry, scoringSettings));
  const activeSalesEntries = salesEntries.filter(entry => isAfterScoringStart(entry, scoringSettings));
  const activeReadEntries = readEntries.filter(entry => isAfterScoringStart(entry, scoringSettings));
  const pilotRanking = buildPilotRanking(allRegisteredUsers, activePredictionEntries, activeSalesEntries, activeReadEntries, profilePhotos, scoringSettings);
  const totalSold = isProductFocusEnabled(scoringSettings) ? activeSalesEntries.reduce((sum, item) => sum + Number(item.quantity || 0), 0) : 0;
  const loggedUser = user ? dynamicDemoUsers[onlyDigits(user.cpf)] || user : savedSessionCpf ? dynamicDemoUsers[savedSessionCpf] || null : null;
  const viewedUser = impersonatedCpf ? dynamicDemoUsers[impersonatedCpf] || null : null;
  const effectiveUser = viewedUser || loggedUser;
  const effectiveUserStoreSold = effectiveUser && isProductFocusEnabled(scoringSettings) ? activeSalesEntries.filter(entry => normalizeStore(entry.store) === effectiveUser.store).reduce((sum, item) => sum + Number(item.quantity || 0), 0) : 0;
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
        awayScore: Number(scores[game.id]?.[1])
      }));
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf: currentUser.cpf,
          fullName: currentUser.name,
          accessRole: currentUser.accessRole,
          store: currentUser.store,
          predictions
        })
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf: currentUser.cpf,
          fullName: currentUser.name,
          accessRole: currentUser.accessRole,
          store: currentUser.store,
          roundId: activeRound.id,
          roundName: activeRound.name,
          announcementId: activeAnnouncement.id,
          announcementTitle: activeAnnouncement.title,
          watchedSeconds
        })
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf: currentUser.cpf,
          fullName: currentUser.name,
          store: currentUser.store,
          photoData
        })
      });
      if (!response.ok) throw new Error("Falha ao salvar foto.");
      const data = await response.json();
      setProfilePhotos(photos => ({
        ...photos,
        [onlyDigits(data.photo.cpf)]: data.photo.photoData
      }));
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          key,
          value
        })
      });
      if (!response.ok) throw new Error("Falha ao salvar configuração.");
      const data = await response.json();
      setAppSettings({
        ...defaultAppSettings,
        ...(data.settings || {})
      });
      return true;
    } catch (error) {
      console.error(error);
      setToast("Não foi possível salvar a configuração.");
      return false;
    }
  };
  const completeLogin = nextUser => {
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf: nextUser.cpf,
          password
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return {
        ok: false,
        error: data.error || "CPF ou senha inválidos."
      };
      if (data.mustChangePassword) {
        setPendingPasswordUser(nextUser);
        setPendingCurrentPassword(password);
        return {
          ok: true,
          mustChangePassword: true
        };
      }
      completeLogin(nextUser);
      return {
        ok: true
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: "Não foi possível validar o acesso no servidor."
      };
    }
  };
  const changeInitialPassword = async newPassword => {
    if (!pendingPasswordUser) return {
      ok: false,
      error: "Sessão de primeiro acesso não encontrada."
    };
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf: pendingPasswordUser.cpf,
          currentPassword: pendingCurrentPassword,
          newPassword
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return {
        ok: false,
        error: data.error || "Não foi possível alterar a senha."
      };
      completeLogin(pendingPasswordUser);
      setToast("Senha criada com sucesso.");
      return {
        ok: true
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: "Não foi possível salvar a nova senha no servidor."
      };
    }
  };
  const accessAsUser = targetUser => {
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
  if (pendingPasswordUser) return /*#__PURE__*/React.createElement(ChangePasswordScreen, {
    user: pendingPasswordUser,
    currentPassword: pendingCurrentPassword,
    onChanged: changeInitialPassword,
    onCancel: logout
  });
  if (!effectiveUser) return /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: login,
    userMap: dynamicDemoUsers
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "app-shell"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    page: activePage,
    setPage: setPage,
    user: effectiveUser,
    onLogout: logout,
    profilePhotos: profilePhotos
  }), /*#__PURE__*/React.createElement("div", {
    className: "main-column"
  }, /*#__PURE__*/React.createElement(Topbar, {
    page: activePage,
    user: effectiveUser,
    onLogout: logout,
    profilePhotos: profilePhotos,
    isImpersonating: isImpersonating,
    onStopImpersonation: stopAccessAsUser
  }), /*#__PURE__*/React.createElement("main", {
    className: "mobile-safe mx-auto max-w-[1440px] p-4 sm:p-8 lg:p-10"
  }, isImpersonating && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 flex flex-col gap-3 rounded-2xl border border-potiguar-lime/40 bg-potiguar-lime/15 p-4 sm:flex-row sm:items-center sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Modo validação"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-extrabold text-potiguar-950"
  }, "Você está vendo o sistema como ", effectiveUser.name, " • ", effectiveUser.store, " • ", effectiveUser.accessRole === "leadership" ? "Liderança" : "Vendedor")), /*#__PURE__*/React.createElement("button", {
    onClick: stopAccessAsUser,
    className: "rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white"
  }, "Voltar ao admin")), activePage === "home" && /*#__PURE__*/React.createElement(Home, {
    acknowledged: announcementAcknowledged,
    setPage: setPage,
    setToast: setToast,
    user: effectiveUser,
    pilotRanking: pilotRanking,
    totalSold: effectiveUserStoreSold,
    profilePhotos: profilePhotos,
    settings: appSettings,
    activeGames: activeGames,
    onAcknowledge: saveAnnouncementRead,
    onSaveProfilePhoto: saveProfilePhoto
  }), activePage === "guesses" && /*#__PURE__*/React.createElement(Guesses, {
    acknowledged: announcementAcknowledged,
    setPage: setPage,
    setToast: setToast,
    user: effectiveUser,
    settings: appSettings,
    activeGames: activeGames,
    onSavePrediction: savePrediction
  }), activePage === "ranking" && /*#__PURE__*/React.createElement(RankingPage, {
    user: effectiveUser,
    pilotRanking: pilotRanking
  }), activePage === "store" && /*#__PURE__*/React.createElement(StorePage, {
    user: effectiveUser,
    pilotRanking: pilotRanking,
    totalSold: effectiveUserStoreSold,
    settings: appSettings
  }), activePage === "admin" && /*#__PURE__*/React.createElement(AdminPage, {
    adminUser: effectiveUser,
    users: allRegisteredUsers,
    customUsers: customUsers,
    setToast: setToast,
    predictionEntries: activePredictionEntries,
    readEntries: activeReadEntries,
    salesEntries: activeSalesEntries,
    setSalesEntries: setSalesEntries,
    pilotRanking: pilotRanking,
    totalSold: totalSold,
    profilePhotos: profilePhotos,
    settings: scoringSettings,
    activeGames: activeGames,
    worldCupMatches: worldCupMatches,
    onSaveSetting: saveSetting,
    onRefreshData: refreshData,
    onAccessAs: accessAsUser
  }))), /*#__PURE__*/React.createElement(MobileNav, {
    page: activePage,
    setPage: setPage,
    user: effectiveUser
  }), toast && /*#__PURE__*/React.createElement("div", {
    className: "toast fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-potiguar-950 px-5 py-3 text-xs font-bold text-white shadow-2xl lg:bottom-8"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid h-5 w-5 place-items-center rounded-full bg-potiguar-lime text-potiguar-950"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  })), toast));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));