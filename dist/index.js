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
const ia_routes_1 = __importDefault(require("./routes/ia.routes"));
const exercice_routes_1 = __importDefault(require("./routes/exercice.routes"));
const gestionnaireErreurs_1 = require("./middlewares/gestionnaireErreurs");
const historique_routes_1 = __importDefault(require("./routes/historique.routes"));
const abonnement_routes_1 = __importDefault(require("./routes/abonnement.routes"));
const paiement_routes_1 = __importDefault(require("./routes/paiement.routes"));
const paiement_admin_routes_1 = __importDefault(require("./routes/paiement-admin.routes"));
const diagnostic_routes_1 = __importDefault(require("./routes/diagnostic.routes"));
const socket_1 = require("./socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
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
function origineAutorisee(origin) {
    if (!origin) {
        return true;
    }
    if (ORIGINES_FIXES_AUTORISEES.includes(origin)) {
        return true;
    }
    /**
     * Autorise les déploiements Preview Vercel
     * du projet CodeDoctor.
     *
     * Exemple :
     * https://code-doctor-front-38unppi7n-ngassais-projects.vercel.app
     */
    return /^https:\/\/code-doctor-front-[a-z0-9-]+-ngassais-projects\.vercel\.app$/i.test(origin);
}
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (origineAutorisee(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`Origine CORS non autorisée : ${origin ?? "inconnue"}`));
    },
    credentials: true,
}));
/**
 * =========================================================
 * MIDDLEWARES
 * =========================================================
 */
app.use(express_1.default.json());
/**
 * =========================================================
 * ROUTES
 * =========================================================
 */
app.use("/api/auth", authentification_routes_1.default);
app.use("/api/experiences", experience_routes_1.default);
app.use("/api/utilisateurs", utilisateur_routes_1.default);
app.use("/api", commentaire_routes_1.default);
app.use("/api", reaction_routes_1.default);
app.use("/api", report_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/ia", ia_routes_1.default);
app.use("/api/exercices", exercice_routes_1.default);
app.use("/api/historique", historique_routes_1.default);
app.use("/api/abonnement", abonnement_routes_1.default);
app.use("/api/paiements", paiement_routes_1.default);
app.use("/api/admin/paiements", paiement_admin_routes_1.default);
app.use("/api/diagnostic", diagnostic_routes_1.default);
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
app.use(gestionnaireErreurs_1.gestionnaireErreurs);
/**
 * =========================================================
 * SERVEUR HTTP + SOCKET.IO
 * =========================================================
 */
const server = (0, http_1.createServer)(app);
(0, socket_1.initialiserSocket)(server);
const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
});
//# sourceMappingURL=index.js.map