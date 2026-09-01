"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercice_controleur_1 = require("../controleurs/exercice.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
/**
 * Routes spécifiques AVANT /:id
 */
router.get("/mes-tentatives", authentification_middleware_1.authentificationMiddleware, exercice_controleur_1.mesTentatives);
router.get("/ma-progression", authentification_middleware_1.authentificationMiddleware, exercice_controleur_1.maProgression);
/**
 * Routes ADMIN — gestion des exercices.
 * Placées avant /:id pour ne pas être interceptées.
 */
router.get("/admin/tous", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, exercice_controleur_1.listerPourAdmin);
router.post("/admin", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, exercice_controleur_1.creer);
router.put("/admin/:id", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, exercice_controleur_1.modifier);
router.delete("/admin/:id", authentification_middleware_1.authentificationMiddleware, admin_middleware_1.adminMiddleware, exercice_controleur_1.supprimer);
/**
 * Liste des exercices (public).
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
/**
 * Soumettre une réponse.
 */
router.post("/:id/tenter", authentification_middleware_1.authentificationMiddleware, exercice_controleur_1.tenter);
exports.default = router;
//# sourceMappingURL=exercice.routes.js.map