"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paiement_admin_controleur_1 = require("../controleurs/paiement-admin.controleur");
const admin_controleur_1 = require("../controleurs/admin.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const routeur = (0, express_1.Router)();
routeur.get("/dashboard", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, admin_controleur_1.dashboardAdmin);
routeur.get("/utilisateurs", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, admin_controleur_1.utilisateursAdmin);
routeur.get("/experiences", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, admin_controleur_1.experiencesAdmin);
routeur.patch("/experiences/:id/statut", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, admin_controleur_1.modifierStatutExperience);
routeur.get("/signalements", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, admin_controleur_1.signalementsAdmin);
routeur.patch("/signalements/:id/statut", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, admin_controleur_1.modifierStatutSignalementAdmin);
routeur.get("/paiements", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, paiement_admin_controleur_1.paiementsAdmin);
routeur.patch("/paiements/:id/approuver", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, paiement_admin_controleur_1.approuverPaiementAdmin);
routeur.patch("/paiements/:id/rejeter", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, paiement_admin_controleur_1.rejeterPaiementAdmin);
exports.default = routeur;
//# sourceMappingURL=admin.routes.js.map