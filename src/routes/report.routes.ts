import { Router } from "express";

import {
  creer,
  lister,
  obtenir,
  modifierStatut,
} from "../controleurs/report.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

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
 * Protection ADMIN à ajouter
 */
router.get(
  "/signalements",
  authentificationMiddleware,
  lister
);

/**
 * Voir un signalement
 * Protection ADMIN à ajouter
 */
router.get(
  "/signalements/:id",
  authentificationMiddleware,
  obtenir
);

/**
 * Modifier le statut d'un signalement
 * Protection ADMIN à ajouter
 */
router.patch(
  "/signalements/:id/statut",
  authentificationMiddleware,
  modifierStatut
);

export default router;