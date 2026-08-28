"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paiement_controleur_1 = require("../controleurs/paiement.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const routeur = (0, express_1.Router)();
/**
 * Créer une demande de paiement Premium
 */
routeur.post("/", authentification_middleware_1.authentificationMiddleware, paiement_controleur_1.creerPaiement);
/**
 * Récupérer mes paiements
 */
routeur.get("/", authentification_middleware_1.authentificationMiddleware, paiement_controleur_1.mesPaiements);
/**
 * Récupérer un paiement précis
 */
routeur.get("/:paiementId", authentification_middleware_1.authentificationMiddleware, paiement_controleur_1.obtenirPaiement);
exports.default = routeur;
//# sourceMappingURL=paiement.routes.js.map