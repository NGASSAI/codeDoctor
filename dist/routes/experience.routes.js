"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const experience_controleur_1 = require("../controleurs/experience.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const router = (0, express_1.Router)();
/**
 * Expériences publiques
 */
// Toutes les expériences publiées
router.get("/", experience_controleur_1.lister);
// Une expérience précise
router.get("/:id", experience_controleur_1.obtenir);
/**
 * Expériences nécessitant une authentification
 */
// Créer une expérience
router.post("/", authentification_middleware_1.authentificationMiddleware, experience_controleur_1.creer);
// Modifier sa propre expérience
router.put("/:id", authentification_middleware_1.authentificationMiddleware, experience_controleur_1.modifier);
// Supprimer sa propre expérience
router.delete("/:id", authentification_middleware_1.authentificationMiddleware, experience_controleur_1.supprimer);
exports.default = router;
//# sourceMappingURL=experience.routes.js.map