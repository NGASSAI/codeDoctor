"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
exports.default = routeur;
//# sourceMappingURL=admin.routes.js.map