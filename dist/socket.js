"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialiserSocket = initialiserSocket;
exports.obtenirSocket = obtenirSocket;
exports.envoyerNotificationTempsReel = envoyerNotificationTempsReel;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let io = null;
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
function origineAutorisee(origin) {
    if (!origin) {
        return true;
    }
    if (ORIGINES_FIXES_AUTORISEES.includes(origin)) {
        return true;
    }
    return /^https:\/\/code-doctor-front-[a-z0-9-]+-ngassais-projects\.vercel\.app$/i.test(origin);
}
/**
 * =========================================================
 * INITIALISATION SOCKET.IO
 * =========================================================
 */
function initialiserSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: (origin, callback) => {
                if (origineAutorisee(origin)) {
                    callback(null, true);
                    return;
                }
                callback(new Error(`Origine Socket.IO non autorisée : ${origin ?? "inconnue"}`));
            },
            credentials: true,
        },
    });
    /**
     * Authentification du socket avec le JWT.
     */
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token;
            if (!token ||
                typeof token !== "string") {
                return next(new Error("Authentification requise."));
            }
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                return next(new Error("JWT_SECRET non configuré."));
            }
            const payload = jsonwebtoken_1.default.verify(token, secret);
            if (!payload.id ||
                typeof payload.id !== "string") {
                return next(new Error("Token invalide."));
            }
            socket.data.userId =
                payload.id;
            next();
        }
        catch {
            next(new Error("Token invalide ou expiré."));
        }
    });
    /**
     * Connexion d'un utilisateur.
     */
    io.on("connection", (socket) => {
        const userId = socket.data.userId;
        console.log(`🔌 Socket connecté : ${userId}`);
        /**
         * Chaque utilisateur possède
         * sa propre salle.
         */
        socket.join(`user:${userId}`);
        socket.on("disconnect", (raison) => {
            console.log(`🔌 Socket déconnecté : ${userId} (${raison})`);
        });
    });
    console.log("⚡ Socket.IO démarré");
    return io;
}
/**
 * =========================================================
 * RÉCUPÉRER SOCKET.IO
 * =========================================================
 */
function obtenirSocket() {
    if (!io) {
        throw new Error("Socket.IO n'est pas initialisé.");
    }
    return io;
}
/**
 * =========================================================
 * NOTIFICATION TEMPS RÉEL
 * =========================================================
 */
function envoyerNotificationTempsReel(userId, notification) {
    if (!io) {
        console.warn("Socket.IO non initialisé : notification temps réel ignorée.");
        return;
    }
    io.to(`user:${userId}`).emit("notification", notification);
}
//# sourceMappingURL=socket.js.map