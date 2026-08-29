
import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";

interface PayloadJWT {
  id: string;
}

let io: Server | null = null;

/**
 * Origines autorisées pour Socket.IO.
 *
 * Développement :
 *   http://localhost:5173
 *
 * Production :
 *   https://code-doctor-front.vercel.app
 */
const ORIGINES_AUTORISEES = [
  "http://localhost:5173",
  "https://code-doctor-front.vercel.app",
];

/**
 * Initialise Socket.IO sur le serveur HTTP Express.
 */
export function initialiserSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: ORIGINES_AUTORISEES,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token || typeof token !== "string") {
        return next(
          new Error("Authentification requise.")
        );
      }

      const secret = process.env.JWT_SECRET;

      if (!secret) {
        return next(
          new Error("JWT_SECRET non configuré.")
        );
      }

      const payload = jwt.verify(
        token,
        secret
      ) as PayloadJWT;

      if (
        !payload.id ||
        typeof payload.id !== "string"
      ) {
        return next(
          new Error("Token invalide.")
        );
      }

      socket.data.userId = payload.id;

      next();
    } catch {
      next(
        new Error("Token invalide ou expiré.")
      );
    }
  });

  io.on("connection", (socket) => {
    const userId =
      socket.data.userId as string;

    console.log(
      `🔌 Socket connecté : ${userId}`
    );

    // Chaque utilisateur rejoint sa propre salle.
    socket.join(`user:${userId}`);

    socket.on("disconnect", (raison) => {
      console.log(
        `🔌 Socket déconnecté : ${userId} (${raison})`
      );
    });
  });

  console.log("⚡ Socket.IO démarré");

  return io;
}

/**
 * Récupérer l'instance Socket.IO.
 */
export function obtenirSocket() {
  if (!io) {
    throw new Error(
      "Socket.IO n'est pas initialisé."
    );
  }

  return io;
}

/**
 * Envoyer une notification en temps réel à un utilisateur.
 */
export function envoyerNotificationTempsReel(
  userId: string,
  notification: unknown
) {
  if (!io) {
    console.warn(
      "Socket.IO non initialisé : notification temps réel ignorée."
    );

    return;
  }

  io.to(`user:${userId}`).emit(
    "notification",
    notification
  );
}
