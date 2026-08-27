"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controleur_1 = require("../controleurs/notification.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const router = (0, express_1.Router)();
router.use(authentification_middleware_1.authentificationMiddleware);
router.get("/", notification_controleur_1.listerNotifications);
router.get("/non-lues", notification_controleur_1.listerNotificationsNonLues);
router.get("/compteur", notification_controleur_1.compterNonLues);
router.patch("/:id/lue", notification_controleur_1.marquerCommeLue);
router.patch("/lues", notification_controleur_1.marquerToutesCommeLuesControleur);
router.delete("/:id", notification_controleur_1.supprimer);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map