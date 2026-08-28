"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historique_controleur_1 = require("../controleurs/historique.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const router = (0, express_1.Router)();
router.use(authentification_middleware_1.authentificationMiddleware);
router.get("/", historique_controleur_1.lister);
router.post("/", historique_controleur_1.creer);
router.get("/:id", historique_controleur_1.obtenir);
router.delete("/:id", historique_controleur_1.supprimer);
router.post("/:id/conversation", historique_controleur_1.nouvelleConversation);
router.get("/conversations/:id", historique_controleur_1.conversation);
router.post("/conversations/:id/messages", historique_controleur_1.message);
exports.default = router;
//# sourceMappingURL=historique.routes.js.map