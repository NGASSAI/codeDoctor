"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controleur_1 = require("../controleurs/report.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
/**
 * Signaler une expérience
 * Utilisateur connecté
 */
router.post("/experiences/:experienceId/signalements", authentification_middleware_1.authentificationMiddleware, report_controleur_1.creer);
/**
 * Lister les signalements
 * ADMIN uniquement
 */
router.get("/signalements", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, report_controleur_1.lister);
/**
 * Voir un signalement
 * ADMIN uniquement
 */
router.get("/signalements/:id", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, report_controleur_1.obtenir);
/**
 * Modifier le statut d'un signalement
 * ADMIN uniquement
 */
router.patch("/signalements/:id/statut", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, report_controleur_1.modifierStatut);
exports.default = router;
//# sourceMappingURL=report.routes.js.map