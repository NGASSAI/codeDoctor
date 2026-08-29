
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";

import experienceRoutes from "./routes/experience.routes";
import utilisateurRoutes from "./routes/utilisateur.routes";
import commentaireRoutes from "./routes/commentaire.routes";
import reactionRoutes from "./routes/reaction.routes";
import authentificationRoutes from "./routes/authentification.routes";
import reportRoutes from "./routes/report.routes";
import notificationRoutes from "./routes/notification.routes";
import adminRoutes from "./routes/admin.routes";
import iaRoutes from "./routes/ia.routes";
import exerciceRoutes from "./routes/exercice.routes";
import { gestionnaireErreurs } from "./middlewares/gestionnaireErreurs";
import historiqueRoutes from "./routes/historique.routes";
import abonnementRoutes from "./routes/abonnement.routes";
import paiementRoutes from "./routes/paiement.routes";
import paiementAdminRoutes from "./routes/paiement-admin.routes";
import diagnosticRoutes from "./routes/diagnostic.routes";

import { initialiserSocket } from "./socket";

dotenv.config();

const app = express();

/**
 * =========================================================
 * CORS
 * =========================================================
 */

const ORIGINES_FIXES_AUTORISEES = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://code-doctor-front.vercel.app",
];

function origineAutorisee(
  origin: string | undefined
): boolean {
  if (!origin) {
    return true;
  }

  if (
    ORIGINES_FIXES_AUTORISEES.includes(origin)
  ) {
    return true;
  }

  /**
   * Autorise les déploiements Preview Vercel
   * du projet CodeDoctor.
   *
   * Exemple :
   * https://code-doctor-front-38unppi7n-ngassais-projects.vercel.app
   */
  return /^https:\/\/code-doctor-front-[a-z0-9-]+-ngassais-projects\.vercel\.app$/i.test(
    origin
  );
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (origineAutorisee(origin)) {
        callback(null, true);
        return;
      }

      callback(
        new Error(
          `Origine CORS non autorisée : ${
            origin ?? "inconnue"
          }`
        )
      );
    },
    credentials: true,
  })
);

/**
 * =========================================================
 * MIDDLEWARES
 * =========================================================
 */

app.use(express.json());

/**
 * =========================================================
 * ROUTES
 * =========================================================
 */

app.use(
  "/api/auth",
  authentificationRoutes
);

app.use(
  "/api/experiences",
  experienceRoutes
);

app.use(
  "/api/utilisateurs",
  utilisateurRoutes
);

app.use(
  "/api",
  commentaireRoutes
);

app.use(
  "/api",
  reactionRoutes
);

app.use(
  "/api",
  reportRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/ia",
  iaRoutes
);

app.use(
  "/api/exercices",
  exerciceRoutes
);

app.use(
  "/api/historique",
  historiqueRoutes
);

app.use(
  "/api/abonnement",
  abonnementRoutes
);

app.use(
  "/api/paiements",
  paiementRoutes
);

app.use(
  "/api/admin/paiements",
  paiementAdminRoutes
);

app.use(
  "/api/diagnostic",
  diagnosticRoutes
);

/**
 * =========================================================
 * HEALTH CHECK
 * =========================================================
 */

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "CodeDoctor backend en ligne",
  });
});

/**
 * =========================================================
 * GESTION DES ERREURS
 * =========================================================
 */

app.use(gestionnaireErreurs);

/**
 * =========================================================
 * SERVEUR HTTP + SOCKET.IO
 * =========================================================
 */

const server = createServer(app);

initialiserSocket(server);

const PORT =
  Number(process.env.PORT) || 4000;

server.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Serveur démarré sur http://0.0.0.0:${PORT}`
    );
  }
);
