"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_EXERCISES = void 0;
exports.HTTP_EXERCISES = [
    {
        title: "Utiliser GET pour supprimer une ressource",
        category: "HTTP",
        difficulty: "FACILE",
        buggyCode: `
async function deleteUser(userId: string) {
  const response = await fetch(\`/api/users/\${userId}\`);

  if (!response.ok) {
    throw new Error("Suppression impossible");
  }
}
`,
        hint1: "GET sert normalement à récupérer une ressource.",
        hint2: "La suppression possède une méthode HTTP dédiée.",
        hint3: "Remplace GET par DELETE.",
        solution: `
async function deleteUser(userId: string) {
  const response = await fetch(\`/api/users/\${userId}\`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Suppression impossible");
  }
}
`,
        keywords: ["http", "get", "delete", "rest", "api"],
    },
    {
        title: "Mauvaise méthode pour modifier partiellement une ressource",
        category: "HTTP",
        difficulty: "MOYEN",
        buggyCode: `
async function updateEmail(userId: string, email: string) {
  const response = await fetch(\`/api/users/\${userId}\`, {
    method: "GET",
  });

  return response.json();
}
`,
        hint1: "GET ne modifie pas une ressource.",
        hint2: "La modification partielle possède une méthode HTTP adaptée.",
        hint3: "Utilise PATCH et envoie les données.",
        solution: `
async function updateEmail(userId: string, email: string) {
  const response = await fetch(\`/api/users/\${userId}\`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok) {
    throw new Error("Modification impossible");
  }

  return response.json();
}
`,
        keywords: ["http", "patch", "get", "rest", "update"],
    },
    {
        title: "Corps JSON envoyé sans Content-Type",
        category: "HTTP",
        difficulty: "MOYEN",
        buggyCode: `
async function createUser(name: string, email: string) {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
    }),
  });
}
`,
        hint1: "Le serveur doit savoir quel format contient le body.",
        hint2: "JSON doit être déclaré explicitement dans les headers.",
        hint3: "Ajoute Content-Type: application/json.",
        solution: `
async function createUser(name: string, email: string) {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });
}
`,
        keywords: ["http", "json", "content-type", "headers", "post"],
    },
    {
        title: "Confondre 401 et 403",
        category: "HTTP",
        difficulty: "MOYEN",
        buggyCode: `
async function loadAdminDashboard() {
  const response = await fetch("/api/admin/dashboard");

  if (response.status === 403) {
    window.location.href = "/connexion";
    return;
  }

  return response.json();
}
`,
        hint1: "401 et 403 ne représentent pas la même situation.",
        hint2: "401 concerne généralement l'authentification.",
        hint3: "403 signifie que l'identité est connue mais que l'accès est refusé.",
        solution: `
async function loadAdminDashboard() {
  const response = await fetch("/api/admin/dashboard");

  if (response.status === 401) {
    window.location.href = "/connexion";
    return;
  }

  if (response.status === 403) {
    throw new Error("Accès réservé aux administrateurs");
  }

  if (!response.ok) {
    throw new Error("Erreur serveur");
  }

  return response.json();
}
`,
        keywords: ["http", "401", "403", "authentication", "authorization"],
    },
    {
        title: "Ne pas vérifier response.ok",
        category: "HTTP",
        difficulty: "MOYEN",
        buggyCode: `
async function getProduct(id: string) {
  const response = await fetch(\`/api/products/\${id}\`);

  const product = await response.json();

  return product;
}
`,
        hint1: "fetch ne rejette pas automatiquement les réponses HTTP 4xx ou 5xx.",
        hint2: "Une réponse 404 peut donc arriver jusqu'au json().",
        hint3: "Vérifie response.ok avant de traiter la réponse.",
        solution: `
async function getProduct(id: string) {
  const response = await fetch(\`/api/products/\${id}\`);

  if (!response.ok) {
    throw new Error(
      \`Erreur HTTP : \${response.status}\`
    );
  }

  const product = await response.json();

  return product;
}
`,
        keywords: ["http", "fetch", "response.ok", "404", "500"],
    },
    {
        title: "Créer une ressource avec le mauvais statut attendu",
        category: "HTTP",
        difficulty: "DIFFICILE",
        buggyCode: `
async function createOrder(order: unknown) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (response.status === 200) {
    console.log("Commande créée");
  }
}
`,
        hint1: "POST peut créer une nouvelle ressource.",
        hint2: "HTTP possède un statut spécialement utilisé pour une création réussie.",
        hint3: "Le statut classique est 201 Created.",
        solution: `
async function createOrder(order: unknown) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (response.status === 201) {
    console.log("Commande créée");
    return response.json();
  }

  if (!response.ok) {
    throw new Error("Création de la commande impossible");
  }
}
`,
        keywords: ["http", "201", "created", "post", "status"],
    },
    {
        title: "Mauvaise gestion d'une requête sans contenu",
        category: "HTTP",
        difficulty: "MOYEN",
        buggyCode: `
async function deleteAccount() {
  const response = await fetch("/api/account", {
    method: "DELETE",
  });

  const data = await response.json();

  console.log(data);
}
`,
        hint1: "Une suppression réussie peut ne retourner aucun body.",
        hint2: "Le statut 204 signifie No Content.",
        hint3: "Ne tente pas de parser du JSON lorsque la réponse est 204.",
        solution: `
async function deleteAccount() {
  const response = await fetch("/api/account", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Suppression impossible");
  }

  if (response.status === 204) {
    console.log("Compte supprimé");
    return;
  }

  const data = await response.json();

  console.log(data);
}
`,
        keywords: ["http", "204", "no-content", "delete", "response"],
    },
    {
        title: "Token d'authentification absent",
        category: "HTTP",
        difficulty: "DIFFICILE",
        buggyCode: `
async function getPrivateProfile(token: string) {
  const response = await fetch("/api/profile");

  if (!response.ok) {
    throw new Error("Erreur");
  }

  return response.json();
}
`,
        hint1: "L'API privée doit pouvoir identifier l'utilisateur.",
        hint2: "Le token doit être transmis dans les headers.",
        hint3: "Utilise Authorization avec le schéma Bearer.",
        solution: `
async function getPrivateProfile(token: string) {
  const response = await fetch("/api/profile", {
    headers: {
      Authorization: \`Bearer \${token}\`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur");
  }

  return response.json();
}
`,
        keywords: [
            "http",
            "authorization",
            "bearer",
            "token",
            "authentication",
        ],
    },
    {
        title: "Cache HTTP mal configuré pour des données privées",
        category: "HTTP",
        difficulty: "DIFFICILE",
        buggyCode: `
async function getPrivateData() {
  const response = await fetch("/api/private-data", {
    cache: "force-cache",
  });

  return response.json();
}
`,
        hint1: "Ces données dépendent de l'utilisateur connecté.",
        hint2: "Mettre en cache une réponse privée peut exposer des données au mauvais utilisateur.",
        hint3: "Désactive le cache pour cette requête.",
        solution: `
async function getPrivateData() {
  const response = await fetch("/api/private-data", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les données");
  }

  return response.json();
}
`,
        keywords: ["http", "cache", "private-data", "security", "no-store"],
    },
    {
        title: "Requête CORS mal comprise",
        category: "HTTP",
        difficulty: "DIFFICILE",
        buggyCode: `
async function loadExternalApi() {
  const response = await fetch(
    "https://api.example.com/users",
    {
      mode: "no-cors",
    }
  );

  return response.json();
}
`,
        hint1: "no-cors ne donne pas accès librement au contenu de la réponse.",
        hint2: "Une réponse opaque ne peut généralement pas être lue comme du JSON côté navigateur.",
        hint3: "Le serveur distant doit autoriser correctement l'origine avec les headers CORS.",
        solution: `
async function loadExternalApi() {
  const response = await fetch(
    "https://api.example.com/users"
  );

  if (!response.ok) {
    throw new Error("API externe inaccessible");
  }

  return response.json();
}
`,
        keywords: [
            "http",
            "cors",
            "no-cors",
            "origin",
            "security",
        ],
    },
];
//# sourceMappingURL=http.js.map