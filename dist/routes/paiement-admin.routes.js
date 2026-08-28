"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paiement_controleur_1 = require("../controleurs/paiement.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const routeur = (0, express_1.Router)();
routeur.use(authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware);
routeur.get("/", paiement_controleur_1.paiementsAdmin);
routeur.patch("/:paiementId/approuver", paiement_controleur_1.approuverPaiementAdmin);
routeur.patch("/:paiementId/rejeter", paiement_controleur_1.rejeterPaiementAdmin);
exports.default = routeur;
//# sourceMappingURL=paiement-admin.routes.js.map