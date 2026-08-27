"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentaire_controleur_1 = require("../controleurs/commentaire.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const router = (0, express_1.Router)();
/**
 * Commentaires d'une expérience
 */
// Voir les commentaires — public
router.get("/experiences/:experienceId/commentaires", commentaire_controleur_1.lister);
// Ajouter un commentaire — connecté
router.post("/experiences/:experienceId/commentaires", authentification_middleware_1.authentificationMiddleware, commentaire_controleur_1.creer);
// Supprimer son commentaire — connecté
router.delete("/commentaires/:id", authentification_middleware_1.authentificationMiddleware, commentaire_controleur_1.supprimer);
exports.default = router;
//# sourceMappingURL=commentaire.routes.js.map