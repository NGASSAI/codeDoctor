"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reaction_controleur_1 = require("../controleurs/reaction.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const router = (0, express_1.Router)();
/**
 * Voir les réactions d'une expérience
 * Public
 */
router.get("/experiences/:experienceId/reactions", reaction_controleur_1.lister);
/**
 * Ajouter une réaction
 * Authentification requise
 */
router.post("/experiences/:experienceId/reactions", authentification_middleware_1.authentificationMiddleware, reaction_controleur_1.ajouter);
/**
 * Supprimer sa réaction
 * Authentification requise
 */
router.delete("/experiences/:experienceId/reactions/:type", authentification_middleware_1.authentificationMiddleware, reaction_controleur_1.supprimer);
exports.default = router;
//# sourceMappingURL=reaction.routes.js.map