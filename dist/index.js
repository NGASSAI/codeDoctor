"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const experience_routes_1 = __importDefault(require("./routes/experience.routes"));
const utilisateur_routes_1 = __importDefault(require("./routes/utilisateur.routes"));
const commentaire_routes_1 = __importDefault(require("./routes/commentaire.routes"));
const reaction_routes_1 = __importDefault(require("./routes/reaction.routes"));
const authentification_routes_1 = __importDefault(require("./routes/authentification.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const socket_1 = require("./socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/admin", admin_routes_1.default);
app.use("/api/auth", authentification_routes_1.default);
app.use("/api/experiences", experience_routes_1.default);
app.use("/api/utilisateurs", utilisateur_routes_1.default);
app.use("/api", commentaire_routes_1.default);
app.use("/api", reaction_routes_1.default);
app.use("/api", report_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        message: "CodeDoctor backend en ligne",
    });
});
// Serveur HTTP partagé entre Express et Socket.IO
const server = (0, http_1.createServer)(app);
// Initialisation de Socket.IO
(0, socket_1.initialiserSocket)(server);
const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
});
//# sourceMappingURL=index.js.map