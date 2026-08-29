"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utilisateur_controleur_1 = require("../controleurs/utilisateur.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const routeur = (0, express_1.Router)();
/**
 * Profil
 */
routeur.get("/profil", authentification_middleware_1.authentificationMiddleware, utilisateur_controleur_1.profil);
routeur.patch("/profil", authentification_middleware_1.authentificationMiddleware, utilisateur_controleur_1.modifierProfil);
/**
 * Sécurité de récupération du compte
 */
routeur.patch("/profil/securite-recuperation", authentification_middleware_1.authentificationMiddleware, utilisateur_controleur_1.modifierSecuriteRecuperationControleur);
exports.default = routeur;
//# sourceMappingURL=utilisateur.routes.js.map