
import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";

interface PayloadJWT {
  id: string;
}

let io: Server | null = null;

/**
 * =========================================================
 * CORS SOCKET.IO
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

  return /^https:\/\/code-doctor-front-[a-z0-9-]+-ngassais-projects\.vercel\.app$/i.test(
    origin
  );
}

/**
 * =========================================================
 * INITIALISATION SOCKET.IO
 * =========================================================
 */

export function initialiserSocket(
  server: HttpServer
) {
  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (origineAutorisee(origin)) {
          callback(null, true);
          return;
        }

        callback(
          new Error(
            `Origine Socket.IO non autorisée : ${
              origin ?? "inconnue"
            }`
          )
        );
      },
      credentials: true,
    },
  });

  /**
   * Authentification du socket avec le JWT.
   */
  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token;

      if (
        !token ||
        typeof token !== "string"
      ) {
        return next(
          new Error(
            "Authentification requise."
          )
        );
      }

      const secret =
        process.env.JWT_SECRET;

      if (!secret) {
        return next(
          new Error(
            "JWT_SECRET non configuré."
          )
        );
      }

      const payload =
        jwt.verify(
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

      socket.data.userId =
        payload.id;

      next();
    } catch {
      next(
        new Error(
          "Token invalide ou expiré."
        )
      );
    }
  });

  /**
   * Connexion d'un utilisateur.
   */
  io.on("connection", (socket) => {
    const userId =
      socket.data.userId as string;

    console.log(
      `🔌 Socket connecté : ${userId}`
    );

    /**
     * Chaque utilisateur possède
     * sa propre salle.
     */
    socket.join(`user:${userId}`);

    socket.on(
      "disconnect",
      (raison) => {
        console.log(
          `🔌 Socket déconnecté : ${userId} (${raison})`
        );
      }
    );
  });

  console.log(
    "⚡ Socket.IO démarré"
  );

  return io;
}

/**
 * =========================================================
 * RÉCUPÉRER SOCKET.IO
 * =========================================================
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
 * =========================================================
 * NOTIFICATION TEMPS RÉEL
 * =========================================================
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
