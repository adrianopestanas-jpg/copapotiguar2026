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
const fixedStores = ["Imperatriz"];
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
  return /(GERENTE|SUBGERENTE)/.test(textKey(job)) ? "Liderança" : "Vendedor";
};
const resolveJob = (job, explicitProfile) => {
  if (explicitProfile === "Administrador") return toTitleCase(job);
  return /(GERENTE|SUBGERENTE)/.test(textKey(job)) ? "Líder de loja" : "Vendedor";
};
const makeInitials = name => String(name ?? "").trim().split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join("");
const participantRows = typeof window !== "undefined" && window.COPA_PARTICIPANTS || [];
const registeredUsers = participantRows.map(([name, cpf, job, store, explicitProfile]) => {
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
}).filter(user => user.store === PILOT_STORE || user.profile === "Administrador");
const rankedSellers = registeredUsers.filter(user => user.profile === "Vendedor");
const ranking = rankedSellers.slice(0, 10).map((user, index) => ({
  name: user.name,
  store: user.store,
  role: user.job,
  points: 0,
  trend: "—"
}));
const demoUsers = registeredUsers.reduce((acc, participant, index) => {
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
  description: "Produto foco cadastrado manualmente para teste da loja Imperatriz.",
  imageUrl: "",
  unit: "m²"
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
  store: "Imperatriz",
  productId: "piso-house-color-formigres",
  goal: 200
}];
const initialSalesEntries = [];
const stores = [{
  name: "Imperatriz",
  score: 0,
  sold: 0,
  goal: 200
}];
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
  venue: "Miami Stadium"
}];
const predictionClosesAt = new Date("2026-06-25T23:59:59-03:00");
const getPredictionClosed = () => new Date() > predictionClosesAt;
const currentAnnouncement = {
  id: "copa-potiguar-video-2026-06-25",
  title: "Copa Potiguar 2026: começou o jogo",
  minimumSeconds: 30
};
const matchResults = {
  1: {
    homeScore: 0,
    awayScore: 3
  }
};
const getPredictionPoints = entry => {
  const result = matchResults[entry.match_id];
  if (!result) return 0;
  const predictedHome = Number(entry.home_score);
  const predictedAway = Number(entry.away_score);
  const exact = predictedHome === result.homeScore && predictedAway === result.awayScore;
  if (exact) return 4;
  const predictedOutcome = Math.sign(predictedHome - predictedAway);
  const resultOutcome = Math.sign(result.homeScore - result.awayScore);
  return predictedOutcome === resultOutcome ? 2 : 0;
};
const getPredictionStats = entry => {
  const points = getPredictionPoints(entry);
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
const buildPilotRanking = (users, predictionEntries, salesEntries, readEntries, profilePhotos = {}) => {
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
    isTopSeller: false
  }));
  const byCpf = Object.fromEntries(rows.map(row => [row.cpf, row]));
  readEntries.forEach(entry => {
    const row = byCpf[onlyDigits(entry.cpf)];
    if (!row || entry.announcementId !== currentAnnouncement.id || row.announcementRead) return;
    row.announcementRead = true;
    row.announcementPoints += 1;
    row.points += 1;
  });
  predictionEntries.forEach(entry => {
    const row = byCpf[onlyDigits(entry.cpf)];
    if (!row) return;
    const {
      points,
      hit,
      exact
    } = getPredictionStats(entry);
    row.predictionPoints += points;
    row.predictionHits += hit ? 1 : 0;
    row.exactPredictions += exact ? 1 : 0;
    row.points += points;
  });
  const salesByCpf = salesEntries.reduce((acc, entry) => {
    const cpf = onlyDigits(entry.sellerCpf || "");
    if (!cpf) return acc;
    acc[cpf] = (acc[cpf] || 0) + Number(entry.quantity || 0);
    return acc;
  }, {});
  Object.entries(salesByCpf).forEach(([cpf, quantity]) => {
    const row = byCpf[cpf];
    if (!row || quantity <= 0) return;
    row.soldQuantity = quantity;
    row.salesPoints += 5;
    row.points += 5;
  });
  const maxSold = Math.max(0, ...Object.values(salesByCpf));
  if (maxSold > 0) {
    Object.entries(salesByCpf).filter(([, quantity]) => quantity === maxSold).slice(0, 1).forEach(([cpf]) => {
      const row = byCpf[cpf];
      if (!row) return;
      row.isTopSeller = true;
      row.topSellerPoints += 8;
      row.points += 8;
    });
  }
  const storeGoal = initialProductAssignments.find(item => item.store === PILOT_STORE)?.goal || 200;
  const totalSold = Object.values(salesByCpf).reduce((sum, value) => sum + value, 0);
  if (totalSold >= storeGoal) {
    rows.forEach(row => {
      row.storeGoalPoints += row.role === "Liderança" ? 4 : 2;
      row.points += row.role === "Liderança" ? 4 : 2;
    });
  }
  return rows.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
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
  onLogin
}) {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const formatCpf = value => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  };
  const submit = event => {
    event.preventDefault();
    const cpfDigits = cpf.replace(/\D/g, "");
    const passwordDigits = password.replace(/\D/g, "");
    const user = demoUsers[cpfDigits];
    if (!user || passwordDigits !== cpfDigits) {
      setError("CPF ou senha inválidos.");
      return;
    }
    onLogin(user);
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
  }, "Acesso controlado • Piloto Imperatriz")), /*#__PURE__*/React.createElement("section", {
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
  }, "Use seu CPF. Nesta largada do piloto, a senha é o próprio CPF."), /*#__PURE__*/React.createElement("form", {
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
    className: "flex w-full items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-potiguar-900/15"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 17
  }), " Entrar")))));
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
  profilePhotos
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
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-potiguar-800 shadow-sm sm:flex"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot h-2 w-2 rounded-full bg-potiguar-lime"
  }), "20:00 simulado"), /*#__PURE__*/React.createElement("button", {
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
  }), " ", leadership ? "Resultado dos vendedores" : "Produto Foco"), /*#__PURE__*/React.createElement("h2", {
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
  onAcknowledge
}) {
  const [secondsViewed, setSecondsViewed] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);
  const readyToConfirm = secondsViewed >= currentAnnouncement.minimumSeconds;
  const remainingSeconds = Math.max(currentAnnouncement.minimumSeconds - secondsViewed, 0);
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
  }, currentAnnouncement.title)), /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500"
  }, "19 JUN • 19:56")), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm leading-6 text-slate-500"
  }, "Hoje começa o piloto da Copa Potiguar 2026 em Imperatriz. Leia o comunicado, assista ao vídeo e participe da rodada: o jogo vale palpite, o produto foco vale venda e o desempenho da loja vale reconhecimento para o time."), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs leading-5 text-amber-800"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block font-extrabold"
  }, "Como participar hoje"), "Assista ao vídeo → confirme a leitura → envie seu palpite antes das 18h59 → acompanhe as vendas do produto foco."), /*#__PURE__*/React.createElement("div", {
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
  }, "Iniciar vídeo e validação de 30 segundos")) : /*#__PURE__*/React.createElement("div", {
    className: "mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-xl bg-black shadow-xl"
  }, /*#__PURE__*/React.createElement("iframe", {
    className: "h-full w-full",
    src: "https://www.youtube-nocookie.com/embed/7EzZjpmw6FQ?rel=0&autoplay=1",
    title: "Vídeo da Copa Potiguar 2026",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://youtu.be/7EzZjpmw6FQ",
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
function Home({
  acknowledged,
  setPage,
  setToast,
  user,
  pilotRanking,
  totalSold,
  profilePhotos,
  onAcknowledge,
  onSaveProfilePhoto
}) {
  const leadership = user.accessRole === "leadership";
  const predictionsClosed = getPredictionClosed();
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
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-slate-400"
  }, "Quarta-feira, 24 de junho • palpites até 18:59"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-1 font-display text-3xl font-extrabold text-potiguar-950"
  }, "Boa noite, ", user.firstName, "! ", /*#__PURE__*/React.createElement("span", {
    className: "inline-block origin-bottom-right animate-[wave_1.6s_ease-in-out_infinite]"
  }, "👋")), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm text-slate-500"
  }, leadership ? "Acompanhe o desempenho dos vendedores da sua loja." : predictionsClosed ? "Palpites encerrados. Agora vamos acompanhar as vendas do produto foco." : "A janela de palpites está aberta até 18:59.")), /*#__PURE__*/React.createElement("div", {
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
    detail: leadership ? `Comunicado ${userRanking?.announcementPoints || 0} • Meta ${userRanking?.storeGoalPoints || 0}` : `Comunicado ${userRanking?.announcementPoints || 0} • Palpite ${userRanking?.predictionPoints || 0} • Venda ${(userRanking?.salesPoints || 0) + (userRanking?.topSellerPoints || 0)}`,
    accent: "green"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "ranking",
    label: "Posição geral",
    value: `${userPosition || "—"}º`,
    detail: userRanking?.isTopSeller ? "Destaque do produto foco" : "Ranking atualizado automaticamente",
    accent: "lime"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "target",
    label: leadership ? "Vendedores com venda" : "Palpites certos",
    value: leadership ? `${activeSellers}/${storeSellers.length}` : userRanking?.predictionHits || 0,
    detail: leadership ? "Com pelo menos 1 venda lançada" : `${userRanking?.exactPredictions || 0} placar exato • ${totalPredictionHits} acertos no piloto`,
    accent: "white"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "fire",
    label: leadership ? "Meta da loja" : "Meta da loja",
    value: `${storePercent}%`,
    detail: `${totalSold} de ${storeFocus.goal} ${storeFocusUnit}`,
    accent: "white"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-[1.45fr_.8fr]"
  }, /*#__PURE__*/React.createElement(ProductCard, {
    user: user,
    totalSold: totalSold,
    pilotRanking: pilotRanking
  }), /*#__PURE__*/React.createElement(MiniRanking, {
    pilotRanking: pilotRanking
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-[1.45fr_.8fr]"
  }, /*#__PURE__*/React.createElement(Announcement, {
    acknowledged: acknowledged,
    setToast: setToast,
    user: user,
    onAcknowledge: onAcknowledge
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage(predictionsClosed ? "store" : "guesses"),
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
  }, predictionsClosed ? "Acompanhar produto foco" : acknowledged ? "Faça seus palpites" : "Leia para desbloquear"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-white/55"
  }, predictionsClosed ? "Agora a operação segue pelas vendas" : "Aberto agora • encerra às 18h59")), /*#__PURE__*/React.createElement("span", {
    className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 transition group-hover:translate-x-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron"
  }))))), user.accessRole !== "admin" && /*#__PURE__*/React.createElement(StoreMiniRanking, {
    user: user,
    pilotRanking: pilotRanking
  }));
}
function Guesses({
  acknowledged,
  setPage,
  setToast,
  user,
  onSavePrediction
}) {
  const [scores, setScores] = useState({
    1: ["", ""]
  });
  const [saved, setSaved] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const predictionsClosed = now > predictionClosesAt;
  const complete = Object.values(scores).every(pair => pair[0] !== "" && pair[1] !== "");
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);
  const updateScore = (id, side, value) => {
    if (value === "" || /^\d$/.test(value) && Number(value) <= 9) {
      setScores({
        ...scores,
        [id]: scores[id].map((v, i) => i === side ? value : v)
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
  }, "Para acessar os jogos, você precisa ler e confirmar o comunicado obrigatório de hoje.")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-amber-50 p-4 text-left text-sm text-amber-800"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block"
  }, "Regra da rodada"), "Janela reaberta para teste hoje até 23h59."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage("home"),
    className: "mt-6 w-full rounded-xl bg-potiguar-900 px-5 py-3.5 text-sm font-extrabold text-white"
  }, "Voltar e ler o comunicado"))));
  if (predictionsClosed) return /*#__PURE__*/React.createElement("div", {
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
  }, "A janela de teste de palpites foi encerrada.")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 sm:p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-potiguar-lime/15 p-4 text-left text-sm text-potiguar-900"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block"
  }, "Próxima etapa"), "A partir de agora, acompanhe somente as vendas do produto foco de Imperatriz."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage("store"),
    className: "mt-6 w-full rounded-xl bg-potiguar-900 px-5 py-3.5 text-sm font-extrabold text-white"
  }, "Ver produto foco e loja"))));
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
  }), " Teste aberto até 23:59"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-3 font-display text-3xl font-extrabold"
  }, "Teste de palpite: Brasil"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm text-white/60"
  }, "Resultado simulado: Escócia 0 x 3 Brasil. Placar exato vale 4 pontos; vencedor vale 2.")), /*#__PURE__*/React.createElement("div", {
    className: "glass flex items-center gap-3 rounded-2xl px-4 py-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    className: "text-potiguar-lime"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-bold uppercase tracking-wider text-white/45"
  }, "Fechamento do teste"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-lg font-extrabold"
  }, "23h59"))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, games.map(game => /*#__PURE__*/React.createElement("article", {
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
  }, game.venue))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-2 sm:flex-row sm:justify-end"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, game.homeFlag), /*#__PURE__*/React.createElement("strong", {
    className: "text-center text-sm text-potiguar-950 sm:text-base"
  }, game.home)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    "aria-label": `Gols ${game.home}`,
    className: "score-input h-12 w-12 rounded-xl border-2 border-slate-100 bg-slate-50 text-center font-display text-xl font-extrabold text-potiguar-950 outline-none transition focus:border-potiguar-lime focus:bg-white sm:h-14 sm:w-14",
    type: "number",
    min: "0",
    max: "9",
    value: scores[game.id][0],
    onChange: e => updateScore(game.id, 0, e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-slate-300"
  }, "×"), /*#__PURE__*/React.createElement("input", {
    "aria-label": `Gols ${game.away}`,
    className: "score-input h-12 w-12 rounded-xl border-2 border-slate-100 bg-slate-50 text-center font-display text-xl font-extrabold text-potiguar-950 outline-none transition focus:border-potiguar-lime focus:bg-white sm:h-14 sm:w-14",
    type: "number",
    min: "0",
    max: "9",
    value: scores[game.id][1],
    onChange: e => updateScore(game.id, 1, e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-2 sm:flex-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl sm:order-2"
  }, game.awayFlag), /*#__PURE__*/React.createElement("strong", {
    className: "text-center text-sm text-potiguar-950 sm:text-base"
  }, game.away)))))), /*#__PURE__*/React.createElement("div", {
    className: "sticky bottom-24 z-10 rounded-2xl border border-potiguar-900/10 bg-white/95 p-3 shadow-2xl backdrop-blur lg:bottom-5"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: !complete || saved,
    onClick: async () => {
      const ok = await onSavePrediction(user, scores);
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
    }, person.role, " • ", person.store || user.store, " • Comunicado ", person.announcementPoints, " • Palpite ", person.predictionPoints, " pts • Venda ", person.salesPoints + person.topSellerPoints, " pts", person.storeGoalPoints ? ` • Meta ${person.storeGoalPoints} pts` : "")), person.trend && /*#__PURE__*/React.createElement("span", {
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
  totalSold
}) {
  const storeFocus = getStoreFocus(user.store);
  const storeUnit = storeFocus.product.unit || "unidades";
  const storeGoal = storeFocus.goal || 1;
  const storePercent = Math.round(totalSold / storeGoal * 100);
  const localRanking = pilotRanking.filter(person => person.store === user.store);
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
  setToast,
  predictionEntries,
  readEntries,
  salesEntries,
  setSalesEntries,
  pilotRanking,
  totalSold,
  profilePhotos,
  onRefreshData
}) {
  const [module, setModule] = useState("dashboard");
  const [userSearch, setUserSearch] = useState("");
  const [storeFilter, setStoreFilter] = useState("Todas");
  const [users, setUsers] = useState(registeredUsers);
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    cpf: "",
    job: "Vendedor",
    profile: "Vendedor",
    store: PILOT_STORE
  });
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
    store: PILOT_STORE,
    productId: "piso-house-color-formigres",
    goal: "200"
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
  const actions = [["megaphone", "Comunicados", "Criar textos e inserir vídeos", "announcements"], ["fire", "Produtos", "Cadastrar o produto foco", "products"], ["target", "Metas", "Definir objetivos por loja", "goals"], ["ball", "Palpites", "Visualizar palpites enviados", "predictions"], ["chart", "Vendas", "Lançar quantidade por vendedor", "sales"], ["users", "Colaboradores", "Cadastrar acessos elegíveis", "users"], ["trophy", "Premiações", "Administrar reconhecimentos", "awards"], ["ranking", "Rankings", "Acompanhar classificação", "rankings"], ["bolt", "Dashboards", "Visualizar indicadores", "dashboard"], ["shield", "Rodadas", "Controlar e encerrar rodadas", "rounds"]];
  const moduleContent = {
    announcements: {
      title: "Manutenção de comunicados",
      fields: ["Título do comunicado", "Data de publicação", "URL do vídeo"],
      button: "Publicar comunicado"
    },
    products: {
      title: "Cadastro de produto foco",
      fields: ["Nome do produto", "Marca", "URL da imagem"],
      button: "Salvar produto"
    },
    goals: {
      title: "Definição de metas",
      fields: ["Loja", "Meta em unidades", "Data da campanha"],
      button: "Aplicar meta"
    },
    users: {
      title: "Cadastro de colaboradores",
      fields: ["Nome completo", "CPF", "Loja"],
      button: "Criar acesso"
    },
    awards: {
      title: "Administração de premiações",
      fields: ["Nome da premiação", "Critério", "Descrição do prêmio"],
      button: "Salvar premiação"
    },
    rounds: {
      title: "Controle de rodadas",
      fields: ["Nome da rodada", "Abertura dos palpites", "Encerramento"],
      button: "Salvar rodada"
    }
  };
  const formModule = ["users", "products", "sales"].includes(module) ? null : moduleContent[module];
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
  const formatCpf = value => value.replace(/\D/g, "").slice(0, 11).replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  const createUser = event => {
    event.preventDefault();
    if (!newUser.name || newUser.cpf.replace(/\D/g, "").length !== 11) {
      setToast("Informe o nome e um CPF com 11 dígitos.");
      return;
    }
    if (users.some(user => user.cpf.replace(/\D/g, "") === newUser.cpf.replace(/\D/g, ""))) {
      setToast("Já existe um colaborador cadastrado com este CPF.");
      return;
    }
    setUsers([...users, {
      ...newUser,
      email: "",
      status: "Ativo"
    }]);
    setNewUser({
      name: "",
      cpf: "",
      job: "Vendedor",
      profile: "Vendedor",
      store: PILOT_STORE
    });
    setShowUserForm(false);
    setToast("Colaborador cadastrado no piloto.");
  };
  const assignProduct = event => {
    event.preventDefault();
    const exists = assignments.some(item => item.store === newAssignment.store && item.productId === newAssignment.productId);
    if (exists) {
      setToast("Este produto já está definido como foco para a loja.");
      return;
    }
    setAssignments([...assignments, {
      ...newAssignment,
      goal: Number(newAssignment.goal)
    }]);
    setToast("Produto foco vinculado à loja.");
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
      setToast("Venda do produto foco registrada no servidor.");
    } catch (error) {
      console.error(error);
      setToast("Não foi possível registrar a venda no servidor.");
    }
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
    onClick: () => setToast("Relatório da rodada preparado para exportação."),
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
    label: "Palpites",
    value: predictionEntries.length,
    detail: predictionEntries.length ? "Enviados para apuração" : "Aguardando envio",
    accent: "white"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "store",
    label: "Meta Imperatriz",
    value: `${Math.round(totalSold / storeGoal * 100)}%`,
    detail: `${totalSold} de ${storeGoal} m²`,
    accent: "white"
  })), /*#__PURE__*/React.createElement("section", {
    className: "soft-card rounded-2xl p-5 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Ações rápidas"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "O que vamos movimentar?")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
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
  }, desc))))), module === "rankings" && /*#__PURE__*/React.createElement("section", {
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
  }, "Vendedores competem em categoria única. Lojas são classificadas pelo atingimento das metas.")), /*#__PURE__*/React.createElement("div", {
    className: "glass rounded-2xl px-5 py-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-bold uppercase text-white/45"
  }, "Atualização"), /*#__PURE__*/React.createElement("p", {
    className: "font-display text-lg font-extrabold"
  }, "Hoje • 20:00")))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 xl:grid-cols-2"
  }, /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-100 p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Pontuação geral"), /*#__PURE__*/React.createElement("h4", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Ranking de vendedores")), /*#__PURE__*/React.createElement("div", {
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
  }, person.store, " • ", person.role, " • Comunicado ", person.announcementPoints, " pt • Palpite ", person.predictionPoints, " pts/", person.predictionHits, " acerto(s) • Venda ", person.salesPoints + person.topSellerPoints, " pts/", person.soldQuantity, " m²", person.storeGoalPoints ? ` • Meta ${person.storeGoalPoints} pts` : "")), /*#__PURE__*/React.createElement("strong", {
    className: "font-display text-lg text-potiguar-900"
  }, person.points, " pts"))))), /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-100 p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Produto foco"), /*#__PURE__*/React.createElement("h4", {
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
  }, [...stores].sort((a, b) => b.sold / b.goal - a.sold / a.goal).map((store, index) => /*#__PURE__*/React.createElement("div", {
    key: store.name,
    className: "flex items-center gap-4 rounded-xl bg-slate-50 p-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grid h-9 w-9 place-items-center rounded-xl bg-white text-xs font-extrabold text-potiguar-900"
  }, index + 1, "º"), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-potiguar-950"
  }, store.name), /*#__PURE__*/React.createElement("strong", {
    className: "text-potiguar-700"
  }, Math.round(store.sold / store.goal * 100), "%")), /*#__PURE__*/React.createElement("div", {
    className: "progress-track mt-2 h-2 rounded-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill h-full rounded-full",
    style: {
      width: `${Math.min(store.sold / store.goal * 100, 100)}%`
    }
  })))))))), module === "predictions" && /*#__PURE__*/React.createElement("section", {
    className: "soft-card overflow-hidden rounded-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-extrabold uppercase tracking-[.15em] text-potiguar-700"
  }, "Palpites enviados"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Escócia x Brasil"), /*#__PURE__*/React.createElement("p", {
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
    const result = matchResults[entry.match_id];
    const points = getPredictionPoints(entry);
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
  }, "Produtos foco"), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl bg-white/10 p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-white/45"
  }, "Produtos ativos"), /*#__PURE__*/React.createElement("p", {
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
  }, "Cadastro e produtos foco"), /*#__PURE__*/React.createElement("p", {
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
  }, "Vincular produto foco à loja")), /*#__PURE__*/React.createElement("form", {
    onSubmit: assignProduct,
    className: "mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_1.5fr_.7fr_auto] md:items-end"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
    className: "mb-2 block text-xs font-extrabold text-potiguar-950"
  }, "Loja"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Loja do produto foco",
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
    "aria-label": "Produto foco",
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
    "aria-label": "Meta do produto foco",
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
  }, "Apuração do produto foco"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Quantidade vendida por vendedor"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-xs text-slate-400"
  }, "O lançamento identifica loja, vendedor, produto foco e quantidade.")), /*#__PURE__*/React.createElement("form", {
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
  }, "Produto foco"), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Produto vendido",
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
    onClick: () => setShowUserForm(!showUserForm),
    className: "flex items-center justify-center gap-2 rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Novo usuário")))), showUserForm && /*#__PURE__*/React.createElement("form", {
    onSubmit: createUser,
    className: "grid gap-4 border-b border-slate-100 bg-potiguar-lime/5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-5"
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
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
    onClick: () => setShowUserForm(false),
    className: "rounded-xl px-4 py-3 text-xs font-bold text-slate-400"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "flex-1 rounded-xl bg-potiguar-900 px-4 py-3 text-xs font-extrabold text-white"
  }, "Cadastrar"))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setToast(`Abrindo cadastro de ${user.name}.`),
    className: "rounded-lg bg-slate-100 px-3 py-2 text-[10px] font-extrabold text-slate-500"
  }, "Editar")))))), visibleUsers.length === 0 && /*#__PURE__*/React.createElement("div", {
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
  }, "Desempenho comercial"), /*#__PURE__*/React.createElement("h3", {
    className: "mt-1 font-display text-xl font-extrabold text-potiguar-950"
  }, "Metas por loja")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-400"
  }, "Atualização automática")), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 space-y-5"
  }, stores.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    className: "grid grid-cols-[76px_1fr_42px] items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "truncate text-xs font-bold text-potiguar-950"
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "progress-track h-2.5 rounded-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill h-full rounded-full",
    style: {
      width: `${Math.min(totalSold / storeGoal * 100, 100)}%`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-right text-xs font-extrabold text-potiguar-700"
  }, Math.round(totalSold / storeGoal * 100), "%"))))), /*#__PURE__*/React.createElement("section", {
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
  }, [["Comunicado publicado", true], ["Produto do dia ativo", true], ["Metas configuradas", true], ["Resultados dos jogos", false]].map(([label, ok]) => /*#__PURE__*/React.createElement("div", {
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
  const [page, setPage] = useState("home");
  const [acknowledged, setAcknowledged] = useState(false);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState("");
  const [predictionEntries, setPredictionEntries] = useState([]);
  const [salesEntries, setSalesEntries] = useState([]);
  const [readEntries, setReadEntries] = useState([]);
  const [profilePhotos, setProfilePhotos] = useState({});
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
  const refreshData = async () => {
    await Promise.all([loadPredictions(), loadSales(), loadAnnouncementReads(), loadProfilePhotos()]);
  };
  useEffect(() => {
    refreshData();
    const timer = setInterval(refreshData, 15000);
    return () => clearInterval(timer);
  }, []);
  const pilotRanking = buildPilotRanking(registeredUsers, predictionEntries, salesEntries, readEntries, profilePhotos);
  const totalSold = salesEntries.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const currentUserRead = user ? readEntries.some(entry => onlyDigits(entry.cpf) === onlyDigits(user.cpf) && entry.announcementId === currentAnnouncement.id) : false;
  const announcementAcknowledged = acknowledged || currentUserRead;
  const savePrediction = async (currentUser, scores) => {
    try {
      const predictions = games.map(game => ({
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
          announcementId: currentAnnouncement.id,
          announcementTitle: currentAnnouncement.title,
          watchedSeconds
        })
      });
      if (!response.ok) throw new Error("Falha ao registrar comunicado.");
      const data = await response.json();
      setReadEntries(data.reads || []);
      setAcknowledged(true);
      return true;
    } catch (error) {
      console.error(error);
      setToast("Não foi possível registrar a leitura do comunicado.");
      return false;
    }
  };
  const saveProfilePhoto = async (currentUser, photoData) => {
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
  const login = nextUser => {
    setUser(nextUser);
    setPage(nextUser.accessRole === "admin" ? "admin" : "home");
    setAcknowledged(false);
  };
  const logout = () => {
    setUser(null);
    setPage("home");
    setAcknowledged(false);
    setToast("");
  };
  if (!user) return /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: login
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "app-shell"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    page: page,
    setPage: setPage,
    user: user,
    onLogout: logout,
    profilePhotos: profilePhotos
  }), /*#__PURE__*/React.createElement("div", {
    className: "main-column"
  }, /*#__PURE__*/React.createElement(Topbar, {
    page: page,
    user: user,
    onLogout: logout,
    profilePhotos: profilePhotos
  }), /*#__PURE__*/React.createElement("main", {
    className: "mobile-safe mx-auto max-w-[1440px] p-4 sm:p-8 lg:p-10"
  }, page === "home" && /*#__PURE__*/React.createElement(Home, {
    acknowledged: announcementAcknowledged,
    setPage: setPage,
    setToast: setToast,
    user: user,
    pilotRanking: pilotRanking,
    totalSold: totalSold,
    profilePhotos: profilePhotos,
    onAcknowledge: saveAnnouncementRead,
    onSaveProfilePhoto: saveProfilePhoto
  }), page === "guesses" && /*#__PURE__*/React.createElement(Guesses, {
    acknowledged: announcementAcknowledged,
    setPage: setPage,
    setToast: setToast,
    user: user,
    onSavePrediction: savePrediction
  }), page === "ranking" && /*#__PURE__*/React.createElement(RankingPage, {
    user: user,
    pilotRanking: pilotRanking
  }), page === "store" && /*#__PURE__*/React.createElement(StorePage, {
    user: user,
    pilotRanking: pilotRanking,
    totalSold: totalSold
  }), page === "admin" && /*#__PURE__*/React.createElement(AdminPage, {
    setToast: setToast,
    predictionEntries: predictionEntries,
    readEntries: readEntries,
    salesEntries: salesEntries,
    setSalesEntries: setSalesEntries,
    pilotRanking: pilotRanking,
    totalSold: totalSold,
    profilePhotos: profilePhotos,
    onRefreshData: refreshData
  }))), /*#__PURE__*/React.createElement(MobileNav, {
    page: page,
    setPage: setPage,
    user: user
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