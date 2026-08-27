import { Router } from "express";

import {
  listerNotifications,
  listerNotificationsNonLues,
  compterNonLues,
  marquerCommeLue,
  marquerToutesCommeLuesControleur,
  supprimer,
} from "../controleurs/notification.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const router = Router();

router.use(authentificationMiddleware);

router.get("/", listerNotifications);

router.get("/non-lues", listerNotificationsNonLues);

router.get("/compteur", compterNonLues);

router.patch("/:id/lue", marquerCommeLue);

router.patch("/lues", marquerToutesCommeLuesControleur);

router.delete("/:id", supprimer);

export default router;