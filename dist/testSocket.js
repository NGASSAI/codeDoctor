"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const JWT_ADMIN = process.env.JWT_ADMIN;
if (!JWT_ADMIN) {
    console.error("❌ JWT_ADMIN n'est pas défini.");
    process.exit(1);
}
const socket = (0, socket_io_client_1.io)("http://localhost:4000", {
    auth: {
        token: JWT_ADMIN,
    },
});
socket.on("connect", () => {
    console.log("✅ ADMIN connecté à Socket.IO");
    console.log("Socket ID :", socket.id);
});
socket.on("notification", (notification) => {
    console.log("🔔 NOTIFICATION REÇUE :", notification);
});
socket.on("connect_error", (error) => {
    console.error("❌ Erreur Socket.IO :", error.message);
});
socket.on("disconnect", (reason) => {
    console.log("🔌 Déconnecté :", reason);
});
//# sourceMappingURL=testSocket.js.map