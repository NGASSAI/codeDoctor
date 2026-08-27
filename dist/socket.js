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
 * Initialise Socket.IO sur le serveur HTTP Express.
 */
function initialiserSocket(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token;
            if (!token) {
                return next(new Error("Authentification requise."));
            }
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                return next(new Error("JWT_SECRET non configuré."));
            }
            const payload = jsonwebtoken_1.default.verify(token, secret);
            if (!payload.id || typeof payload.id !== "string") {
                return next(new Error("Token invalide."));
            }
            socket.data.userId = payload.id;
            next();
        }
        catch {
            next(new Error("Token invalide ou expiré."));
        }
    });
    io.on("connection", (socket) => {
        const userId = socket.data.userId;
        console.log(`🔌 Socket connecté : ${userId}`);
        // Chaque utilisateur rejoint sa propre salle.
        socket.join(`user:${userId}`);
        socket.on("disconnect", () => {
            console.log(`🔌 Socket déconnecté : ${userId}`);
        });
    });
    console.log("⚡ Socket.IO démarré");
    return io;
}
/**
 * Récupérer l'instance Socket.IO.
 */
function obtenirSocket() {
    if (!io) {
        throw new Error("Socket.IO n'est pas initialisé.");
    }
    return io;
}
/**
 * Envoyer une notification en temps réel à un utilisateur.
 */
function envoyerNotificationTempsReel(userId, notification) {
    if (!io) {
        console.warn("Socket.IO non initialisé : notification temps réel ignorée.");
        return;
    }
    io.to(`user:${userId}`).emit("notification", notification);
}
//# sourceMappingURL=socket.js.map