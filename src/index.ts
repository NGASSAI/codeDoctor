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

import { initialiserSocket } from "./socket";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authentificationRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api", commentaireRoutes);
app.use("/api", reactionRoutes);
app.use("/api", reportRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "CodeDoctor backend en ligne",
  });
});

// Serveur HTTP partagé entre Express et Socket.IO
const server = createServer(app);

// Initialisation de Socket.IO
initialiserSocket(server);

const PORT = Number(process.env.PORT) || 4000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Serveur démarré sur http://0.0.0.0:${PORT}`
  );
});
