"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JAVASCRIPT_EXERCISES = void 0;
exports.JAVASCRIPT_EXERCISES = [
    {
        title: "Double soumission d'une commande",
        category: "JAVASCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
let isSubmitting = false;

async function createOrder(productId: string) {
  if (isSubmitting) return;

  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ productId })
  });

  isSubmitting = true;
}
`,
        hint1: "Regarde attentivement le moment où isSubmitting passe à true.",
        hint2: "Deux clics rapides peuvent lancer deux requêtes avant que l'état soit modifié.",
        hint3: "Le verrou doit être activé avant de lancer l'opération asynchrone.",
        solution: `
let isSubmitting = false;

async function createOrder(productId: string) {
  if (isSubmitting) return;

  isSubmitting = true;

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productId })
    });

    if (!response.ok) {
      throw new Error("Impossible de créer la commande");
    }
  } finally {
    isSubmitting = false;
  }
}
`,
        keywords: ["async", "fetch", "double-submit", "concurrence", "commande"],
    },
    {
        title: "Recherche avec résultats obsolètes",
        category: "JAVASCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
async function searchUsers(query: string) {
  const response = await fetch(
    \`/api/users?search=\${encodeURIComponent(query)}\`
  );

  const users = await response.json();

  renderUsers(users);
}

searchUsers("jean");
searchUsers("jean-pierre");
`,
        hint1: "Les requêtes réseau ne terminent pas forcément dans l'ordre où elles sont lancées.",
        hint2: "La réponse de la première recherche peut arriver après la seconde.",
        hint3: "Il faut identifier quelle requête est la plus récente avant d'afficher son résultat.",
        solution: `
let latestRequestId = 0;

async function searchUsers(query: string) {
  const requestId = ++latestRequestId;

  const response = await fetch(
    \`/api/users?search=\${encodeURIComponent(query)}\`
  );

  const users = await response.json();

  if (requestId !== latestRequestId) {
    return;
  }

  renderUsers(users);
}
`,
        keywords: ["fetch", "race-condition", "search", "async", "stale-data"],
    },
    {
        title: "Fuite mémoire avec un événement",
        category: "JAVASCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
function initializeDashboard() {
  window.addEventListener("resize", () => {
    updateDashboardLayout();
  });
}

initializeDashboard();
initializeDashboard();
initializeDashboard();
`,
        hint1: "Chaque appel ajoute quelque chose à window.",
        hint2: "Les anciens listeners ne sont jamais supprimés.",
        hint3: "Conserve une référence à la fonction listener et supprime-la lorsque nécessaire.",
        solution: `
function initializeDashboard() {
  const handleResize = () => {
    updateDashboardLayout();
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}

const cleanup = initializeDashboard();

// Lorsque le dashboard est détruit :
cleanup();
`,
        keywords: ["event-listener", "memory-leak", "cleanup", "window", "resize"],
    },
    {
        title: "Promise.all qui masque les erreurs",
        category: "JAVASCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
async function loadDashboard() {
  const [user, orders, notifications] = await Promise.all([
    fetch("/api/user").then((r) => r.json()),
    fetch("/api/orders").then((r) => r.json()),
    fetch("/api/notifications").then((r) => r.json())
  ]);

  return {
    user,
    orders,
    notifications
  };
}
`,
        hint1: "Que se passe-t-il si une seule des trois requêtes échoue ?",
        hint2: "Promise.all rejette toute l'opération lorsqu'une promesse échoue.",
        hint3: "Utilise Promise.allSettled si certaines données peuvent être indisponibles sans bloquer tout le dashboard.",
        solution: `
async function loadDashboard() {
  const results = await Promise.allSettled([
    fetch("/api/user").then((r) => r.json()),
    fetch("/api/orders").then((r) => r.json()),
    fetch("/api/notifications").then((r) => r.json())
  ]);

  const [userResult, ordersResult, notificationsResult] = results;

  return {
    user:
      userResult.status === "fulfilled"
        ? userResult.value
        : null,

    orders:
      ordersResult.status === "fulfilled"
        ? ordersResult.value
        : [],

    notifications:
      notificationsResult.status === "fulfilled"
        ? notificationsResult.value
        : []
  };
}
`,
        keywords: ["promise", "promise-all", "promise-allsettled", "dashboard", "api"],
    },
    {
        title: "Mutation accidentelle des données utilisateur",
        category: "JAVASCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
const user = {
  name: "Jean",
  settings: {
    theme: "dark",
    notifications: true
  }
};

function disableNotifications(user: typeof user) {
  user.settings.notifications = false;
}

disableNotifications(user);

console.log(user.settings.notifications);
`,
        hint1: "La fonction reçoit une référence vers l'objet original.",
        hint2: "Modifier user.settings modifie directement l'objet source.",
        hint3: "Crée une nouvelle structure au lieu de modifier directement l'objet existant.",
        solution: `
const user = {
  name: "Jean",
  settings: {
    theme: "dark",
    notifications: true
  }
};

function disableNotifications(user: typeof user) {
  return {
    ...user,
    settings: {
      ...user.settings,
      notifications: false
    }
  };
}

const updatedUser = disableNotifications(user);

console.log(user.settings.notifications); // true
console.log(updatedUser.settings.notifications); // false
`,
        keywords: ["mutation", "immutability", "object", "spread", "state"],
    },
    {
        title: "Cache utilisateur qui retourne de vieilles données",
        category: "JAVASCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
const cache = new Map<string, unknown>();

async function getUser(id: string) {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();

  cache.set(id, user);

  return user;
}
`,
        hint1: "Le cache n'a aucune durée de validité.",
        hint2: "Une donnée peut rester indéfiniment dans la mémoire.",
        hint3: "Associe une date d'expiration à chaque entrée du cache.",
        solution: `
type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

const CACHE_TTL = 60_000;

async function getUser(id: string) {
  const cached = cache.get(id);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  cache.delete(id);

  const response = await fetch(\`/api/users/\${id}\`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer l'utilisateur");
  }

  const user = await response.json();

  cache.set(id, {
    value: user,
    expiresAt: Date.now() + CACHE_TTL
  });

  return user;
}
`,
        keywords: ["cache", "ttl", "expiration", "performance", "fetch"],
    },
    {
        title: "Débounce incorrect pour une recherche",
        category: "JAVASCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
function debounceSearch(query: string) {
  setTimeout(() => {
    fetch(\`/api/search?q=\${query}\`);
  }, 500);
}

input.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;

  debounceSearch(target.value);
});
`,
        hint1: "Le délai est bien présent, mais les anciens timers continuent.",
        hint2: "Chaque frappe crée un nouveau setTimeout.",
        hint3: "Il faut conserver l'identifiant du timer et annuler le précédent.",
        solution: `
let searchTimer: ReturnType<typeof setTimeout> | undefined;

function debounceSearch(query: string) {
  if (searchTimer) {
    clearTimeout(searchTimer);
  }

  searchTimer = setTimeout(async () => {
    await fetch(
      \`/api/search?q=\${encodeURIComponent(query)}\`
    );
  }, 500);
}

input.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;

  debounceSearch(target.value);
});
`,
        keywords: ["debounce", "search", "setTimeout", "performance", "input"],
    },
    {
        title: "Pagination qui ignore la dernière page",
        category: "JAVASCRIPT",
        difficulty: "MOYEN",
        buggyCode: `
async function loadProducts(page: number, limit: number) {
  const response = await fetch(
    \`/api/products?page=\${page}&limit=\${limit}\`
  );

  const data = await response.json();

  for (let currentPage = 1; currentPage < data.totalPages; currentPage++) {
    console.log(\`Chargement de la page \${currentPage}\`);
  }
}
`,
        hint1: "Observe attentivement la condition de la boucle.",
        hint2: "La valeur totalPages doit elle-même pouvoir être parcourue.",
        hint3: "La condition actuelle s'arrête avant la dernière page.",
        solution: `
async function loadProducts(page: number, limit: number) {
  const response = await fetch(
    \`/api/products?page=\${page}&limit=\${limit}\`
  );

  const data = await response.json();

  for (
    let currentPage = 1;
    currentPage <= data.totalPages;
    currentPage++
  ) {
    console.log(\`Chargement de la page \${currentPage}\`);
  }
}
`,
        keywords: ["pagination", "api", "loop", "products", "pages"],
    },
    {
        title: "Traitement de données sans validation",
        category: "JAVASCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
function calculateTotal(items: any[]) {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

const total = calculateTotal([
  { price: 20, quantity: 2 },
  { price: "50", quantity: 1 },
  { quantity: 3 }
]);

console.log(total);
`,
        hint1: "Les données peuvent provenir d'une API et ne sont pas forcément fiables.",
        hint2: "Tous les objets ne possèdent pas nécessairement price et quantity.",
        hint3: "Valide les propriétés avant de faire les calculs.",
        solution: `
type CartItem = {
  price: number;
  quantity: number;
};

function calculateTotal(items: unknown[]): number {
  return items.reduce((total, item) => {
    if (
      typeof item !== "object" ||
      item === null ||
      !("price" in item) ||
      !("quantity" in item)
    ) {
      return total;
    }

    const price = item.price;
    const quantity = item.quantity;

    if (
      typeof price !== "number" ||
      typeof quantity !== "number"
    ) {
      return total;
    }

    return total + price * quantity;
  }, 0);
}

const total = calculateTotal([
  { price: 20, quantity: 2 },
  { price: "50", quantity: 1 },
  { quantity: 3 }
]);

console.log(total);
`,
        keywords: ["validation", "unknown", "api", "data", "reduce", "security"],
    },
    {
        title: "Boucle infinie lors d'une synchronisation",
        category: "JAVASCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
let isSyncing = false;

async function synchronize() {
  if (isSyncing) {
    return;
  }

  isSyncing = true;

  try {
    await fetch("/api/sync", {
      method: "POST"
    });

    synchronize();
  } finally {
    isSyncing = false;
  }
}

synchronize();
`,
        hint1: "La fonction s'appelle elle-même après chaque synchronisation.",
        hint2: "Le verrou est encore actif au moment de l'appel récursif.",
        hint3: "Si une synchronisation périodique est nécessaire, utilise un mécanisme dédié plutôt qu'une récursion.",
        solution: `
async function synchronize() {
  try {
    const response = await fetch("/api/sync", {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Échec de la synchronisation");
    }
  } catch (error) {
    console.error("Erreur de synchronisation :", error);
  }
}

async function startSynchronization() {
  await synchronize();

  setInterval(() => {
    synchronize();
  }, 60_000);
}

startSynchronization();
`,
        keywords: ["recursion", "infinite-loop", "sync", "setInterval", "async"],
    },
    {
        title: "Gestion incorrecte d'une session expirée",
        category: "JAVASCRIPT",
        difficulty: "DIFFICILE",
        buggyCode: `
async function fetchUserProfile() {
  const response = await fetch("/api/profile");

  if (!response.ok) {
    throw new Error("Une erreur est survenue");
  }

  return response.json();
}

async function loadProfile() {
  try {
    const profile = await fetchUserProfile();

    console.log("Profil :", profile);
  } catch (error) {
    console.error(error);
  }
}
`,
        hint1: "Toutes les erreurs HTTP ne signifient pas la même chose.",
        hint2: "Une session expirée possède généralement un statut HTTP identifiable.",
        hint3: "Traite séparément le cas 401 afin de permettre à l'application de réagir à l'expiration de la session.",
        solution: `
async function fetchUserProfile() {
  const response = await fetch("/api/profile");

  if (response.status === 401) {
    throw new Error("SESSION_EXPIRED");
  }

  if (!response.ok) {
    throw new Error("Impossible de récupérer le profil");
  }

  return response.json();
}

async function loadProfile() {
  try {
    const profile = await fetchUserProfile();

    console.log("Profil :", profile);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "SESSION_EXPIRED"
    ) {
      console.log("Session expirée. Redirection vers la connexion...");
      window.location.href = "/connexion";
      return;
    }

    console.error("Erreur :", error);
  }
}
`,
        keywords: [
            "fetch",
            "401",
            "session",
            "authentication",
            "error-handling",
            "api"
        ],
    },
];
//# sourceMappingURL=javascript.js.map