"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_EXERCISES = void 0;
exports.API_EXERCISES = [
    {
        title: "API qui accepte n'importe quelle donnée",
        category: "API",
        difficulty: "MOYEN",
        buggyCode: `
app.post("/api/users", async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });

  res.status(201).json(user);
});
`,
        hint1: "Le client contrôle entièrement req.body.",
        hint2: "Un utilisateur pourrait envoyer des champs qui ne devraient jamais être modifiables.",
        hint3: "Valide et sélectionne explicitement les champs autorisés avant Prisma.",
        solution: `
app.post("/api/users", async (req, res) => {
  const { email, displayName, passwordHash } = req.body;

  if (
    typeof email !== "string" ||
    typeof displayName !== "string" ||
    typeof passwordHash !== "string"
  ) {
    return res.status(400).json({
      error: "Données invalides",
    });
  }

  const user = await prisma.user.create({
    data: {
      email,
      displayName,
      passwordHash,
    },
  });

  return res.status(201).json(user);
});
`,
        keywords: [
            "api",
            "validation",
            "security",
            "request-body",
            "mass-assignment",
        ],
    },
    {
        title: "ID utilisateur non validé",
        category: "API",
        difficulty: "MOYEN",
        buggyCode: `
app.get("/api/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json(user);
});
`,
        hint1: "Une ressource inexistante ne doit pas être retournée comme si elle existait.",
        hint2: "Que dois-tu retourner lorsque findUnique renvoie null ?",
        hint3: "Utilise le statut HTTP 404.",
        solution: `
app.get("/api/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "Utilisateur introuvable",
    });
  }

  return res.json(user);
});
`,
        keywords: [
            "api",
            "404",
            "not-found",
            "prisma",
            "route-parameter",
        ],
    },
    {
        title: "Erreur serveur exposée au client",
        category: "API",
        difficulty: "DIFFICILE",
        buggyCode: `
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});
`,
        hint1: "Les erreurs internes peuvent contenir des informations sensibles.",
        hint2: "Le client n'a pas besoin de connaître la stack trace ou les détails Prisma.",
        hint3: "Log l'erreur côté serveur et retourne un message générique.",
        solution: `
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.json(users);
  } catch (error) {
    console.error("GET /api/users:", error);

    return res.status(500).json({
      error: "Une erreur interne est survenue",
    });
  }
});
`,
        keywords: [
            "api",
            "error-handling",
            "security",
            "500",
            "prisma",
        ],
    },
    {
        title: "Pagination absente sur une API",
        category: "API",
        difficulty: "DIFFICILE",
        buggyCode: `
app.get("/api/experiences", async (req, res) => {
  const experiences = await prisma.experience.findMany();

  return res.json(experiences);
});
`,
        hint1: "Une table peut contenir des milliers ou millions de lignes.",
        hint2: "Retourner toutes les lignes peut saturer la base et le serveur.",
        hint3: "Ajoute page, limit, skip et take.",
        solution: `
app.get("/api/experiences", async (req, res) => {
  const page = Math.max(
    Number.parseInt(String(req.query.page ?? "1"), 10),
    1
  );

  const limit = Math.min(
    Math.max(
      Number.parseInt(String(req.query.limit ?? "20"), 10),
      1
    ),
    100
  );

  const skip = (page - 1) * limit;

  const [experiences, total] = await Promise.all([
    prisma.experience.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.experience.count(),
  ]);

  return res.json({
    data: experiences,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});
`,
        keywords: [
            "api",
            "pagination",
            "limit",
            "offset",
            "performance",
            "prisma",
        ],
    },
    {
        title: "Mot de passe renvoyé par l'API",
        category: "API",
        difficulty: "CRITIQUE",
        buggyCode: `
app.get("/api/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  return res.json(user);
});
`,
        hint1: "Le modèle User contient passwordHash.",
        hint2: "Une API publique ne doit jamais exposer cette donnée.",
        hint3: "Sélectionne explicitement les champs autorisés.",
        solution: `
app.get("/api/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
    select: {
      id: true,
      email: true,
      displayName: true,
      emailVerified: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "Utilisateur introuvable",
    });
  }

  return res.json(user);
});
`,
        keywords: [
            "api",
            "security",
            "password",
            "passwordHash",
            "prisma",
            "select",
        ],
    },
    {
        title: "Suppression d'une ressource sans autorisation",
        category: "API",
        difficulty: "CRITIQUE",
        buggyCode: `
app.delete("/api/experiences/:id", async (req, res) => {
  await prisma.experience.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.status(204).send();
});
`,
        hint1: "La route permet à n'importe quel utilisateur connecté ou non de supprimer.",
        hint2: "Il faut vérifier l'identité et les permissions.",
        hint3: "Vérifie req.user puis assure-toi que l'utilisateur possède la ressource ou possède le rôle ADMIN.",
        solution: `
app.delete("/api/experiences/:id", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Authentification requise",
    });
  }

  const experience = await prisma.experience.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!experience) {
    return res.status(404).json({
      error: "Expérience introuvable",
    });
  }

  const isOwner = experience.userId === req.user.id;
  const isAdmin = req.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      error: "Action non autorisée",
    });
  }

  await prisma.experience.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.status(204).send();
});
`,
        keywords: [
            "api",
            "authorization",
            "authentication",
            "security",
            "delete",
            "rbac",
        ],
    },
    {
        title: "Validation d'une catégorie inexistante",
        category: "API",
        difficulty: "MOYEN",
        buggyCode: `
app.get("/api/experiences", async (req, res) => {
  const experiences = await prisma.experience.findMany({
    where: {
      categorie: req.query.category,
    },
  });

  return res.json(experiences);
});
`,
        hint1: "La catégorie Prisma est un enum.",
        hint2: "Une valeur envoyée par le client peut être invalide.",
        hint3: "Vérifie la valeur avant de construire la requête Prisma.",
        solution: `
const categories = [
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "HTTP",
  "API",
  "HTML_CSS",
] as const;

app.get("/api/experiences", async (req, res) => {
  const category = String(req.query.category ?? "");

  if (
    category &&
    !categories.includes(
      category as (typeof categories)[number]
    )
  ) {
    return res.status(400).json({
      error: "Catégorie invalide",
    });
  }

  const experiences = await prisma.experience.findMany({
    where: category
      ? {
          categorie:
            category as (typeof categories)[number],
        }
      : undefined,
  });

  return res.json(experiences);
});
`,
        keywords: [
            "api",
            "validation",
            "enum",
            "query",
            "prisma",
            "typescript",
        ],
    },
    {
        title: "Race condition lors de la création d'une réaction",
        category: "API",
        difficulty: "CRITIQUE",
        buggyCode: `
app.post("/api/experiences/:id/like", async (req, res) => {
  const existing = await prisma.reaction.findFirst({
    where: {
      experienceId: req.params.id,
      userId: req.user.id,
      type: "LIKE",
    },
  });

  if (existing) {
    return res.status(409).json({
      error: "Déjà aimé",
    });
  }

  const reaction = await prisma.reaction.create({
    data: {
      experienceId: req.params.id,
      userId: req.user.id,
      type: "LIKE",
    },
  });

  return res.status(201).json(reaction);
});
`,
        hint1: "Deux requêtes simultanées peuvent toutes les deux ne rien trouver.",
        hint2: "La vérification seule ne garantit pas l'unicité.",
        hint3: "La contrainte @@unique([experienceId, userId, type]) de Prisma doit protéger la base.",
        solution: `
app.post("/api/experiences/:id/like", async (req, res) => {
  try {
    const reaction = await prisma.reaction.create({
      data: {
        experienceId: req.params.id,
        userId: req.user.id,
        type: "LIKE",
      },
    });

    return res.status(201).json(reaction);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      return res.status(409).json({
        error: "Réaction déjà enregistrée",
      });
    }

    console.error(error);

    return res.status(500).json({
      error: "Erreur interne",
    });
  }
});
`,
        keywords: [
            "api",
            "race-condition",
            "unique",
            "prisma",
            "concurrency",
            "database",
        ],
    },
    {
        title: "Création d'une commande non idempotente",
        category: "API",
        difficulty: "DIFFICILE",
        buggyCode: `
app.post("/api/payments", async (req, res) => {
  const payment = await prisma.payment.create({
    data: {
      userId: req.user.id,
      montant: req.body.montant,
      methode: "WHATSAPP",
      statut: "PENDING",
    },
  });

  return res.status(201).json(payment);
});
`,
        hint1: "Le client peut envoyer deux fois la même requête.",
        hint2: "Un double clic ou une reconnexion peut créer deux paiements.",
        hint3: "Utilise une clé d'idempotence enregistrée côté serveur.",
        solution: `
app.post("/api/payments", async (req, res) => {
  const idempotencyKey = req.header("Idempotency-Key");

  if (!idempotencyKey) {
    return res.status(400).json({
      error: "Idempotency-Key requise",
    });
  }

  const existing = await prisma.payment.findFirst({
    where: {
      userId: req.user.id,
      idempotencyKey,
    },
  });

  if (existing) {
    return res.status(200).json(existing);
  }

  const payment = await prisma.payment.create({
    data: {
      userId: req.user.id,
      montant: req.body.montant,
      methode: "WHATSAPP",
      statut: "PENDING",
      idempotencyKey,
    },
  });

  return res.status(201).json(payment);
});
`,
        keywords: [
            "api",
            "idempotency",
            "payments",
            "security",
            "duplicate",
            "request",
        ],
    },
    {
        title: "Rate limiting absent sur une API sensible",
        category: "API",
        difficulty: "CRITIQUE",
        buggyCode: `
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({
      error: "Identifiants incorrects",
    });
  }

  const token = await createSession(user);

  return res.json({
    token,
  });
});
`,
        hint1: "Cette route peut être appelée autant de fois que nécessaire.",
        hint2: "Un attaquant peut automatiser des milliers de tentatives.",
        hint3: "Ajoute un rate limiter basé sur l'IP et éventuellement l'identifiant.",
        solution: `
app.post(
  "/api/auth/login",
  loginRateLimiter,
  async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (
      !user ||
      !(await verifyPassword(
        password,
        user.passwordHash
      ))
    ) {
      return res.status(401).json({
        error: "Identifiants incorrects",
      });
    }

    const token = await createSession(user);

    return res.json({
      token,
    });
  }
);
`,
        keywords: [
            "api",
            "rate-limit",
            "authentication",
            "security",
            "brute-force",
            "login",
        ],
    },
];
//# sourceMappingURL=api.js.map