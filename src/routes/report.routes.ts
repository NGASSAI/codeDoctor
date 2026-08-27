import { Router } from "express";

import {
  creer,
  lister,
  obtenir,
  modifierStatut,
} from "../controleurs/report.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

/**
 * Signaler une expérience
 * Utilisateur connecté
 */
router.post(
  "/experiences/:experienceId/signalements",
  authentificationMiddleware,
  creer
);

/**
 * Lister les signalements
 * ADMIN uniquement
 */
router.get(
  "/signalements",
  authentificationMiddleware,
  adminMiddleware,
  lister
);

/**
 * Voir un signalement
 * ADMIN uniquement
 */
router.get(
  "/signalements/:id",
  authentificationMiddleware,
  adminMiddleware,
  obtenir
);

/**
 * Modifier le statut d'un signalement
 * ADMIN uniquement
 */
router.patch(
  "/signalements/:id/statut",
  authentificationMiddleware,
  adminMiddleware,
  modifierStatut
);

export default router;