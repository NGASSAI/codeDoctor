"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diagnostic_controleur_1 = require("../controleurs/diagnostic.controleur");
const exercice_controleur_1 = require("../controleurs/exercice.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const router = (0, express_1.Router)();
/**
 * Routes spécifiques AVANT /:id
 */
router.get("/mes-tentatives", authentification_middleware_1.authentificationMiddleware, exercice_controleur_1.mesTentatives);
router.get("/ma-progression", authentification_middleware_1.authentificationMiddleware, exercice_controleur_1.maProgression);
/**
 * Liste des exercices.
 */
router.get("/", exercice_controleur_1.lister);
/**
 * Voir un exercice.
 */
router.get("/:id", exercice_controleur_1.obtenir);
/**
 * Récupérer un indice.
 */
router.get("/:id/indices/:numero", authentification_middleware_1.authentificationMiddleware, exercice_controleur_1.indice);
router.get("/capacites", diagnostic_controleur_1.listerCapacites);
/**
 * Soumettre une réponse.
 */
router.post("/:id/tenter", authentification_middleware_1.authentificationMiddleware, exercice_controleur_1.tenter);
exports.default = router;
//# sourceMappingURL=exercice.routes.js.map