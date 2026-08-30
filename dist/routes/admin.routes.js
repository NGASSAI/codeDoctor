"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paiement_admin_controleur_1 = require("../controleurs/paiement-admin.controleur");
const admin_controleur_1 = require("../controleurs/admin.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const routeur = (0, express_1.Router)();
// Application des middlewares de sécurité pour toutes les routes d'administration
routeur.use(authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware);
// --- DASHBOARD ---
routeur.get("/dashboard", admin_controleur_1.dashboardAdmin);
// --- UTILISATEURS ---
routeur.get("/utilisateurs", admin_controleur_1.utilisateursAdmin);
routeur.patch("/utilisateurs/:id/role", admin_controleur_1.modifierRoleUtilisateur);
// --- EXPERIENCES ---
routeur.get("/experiences", admin_controleur_1.experiencesAdmin);
routeur.patch("/experiences/:id/statut", admin_controleur_1.modifierStatutExperience);
routeur.delete("/utilisateurs/:id", admin_controleur_1.supprimerUtilisateur);
routeur.get("/experiences", admin_controleur_1.experiencesAdmin);
routeur.patch("/experiences/:id/statut", admin_controleur_1.modifierStatutExperience);
routeur.delete("/experiences/:id", admin_controleur_1.supprimerExperience);
// --- NOTIFICATIONS ---
routeur.get("/notifications", admin_controleur_1.notificationsAdmin);
// --- SIGNALEMENTS ---
routeur.get("/signalements", admin_controleur_1.signalementsAdmin);
routeur.patch("/signalements/:id/statut", admin_controleur_1.modifierStatutSignalementAdmin);
// --- PAIEMENTS ---
routeur.get("/paiements", paiement_admin_controleur_1.paiementsAdmin);
routeur.patch("/paiements/:id/approuver", paiement_admin_controleur_1.approuverPaiementAdmin);
routeur.patch("/paiements/:id/rejeter", paiement_admin_controleur_1.rejeterPaiementAdmin);
exports.default = routeur;
//# sourceMappingURL=admin.routes.js.map