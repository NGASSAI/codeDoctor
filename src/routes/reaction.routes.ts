import { Router } from "express";

import {
  ajouter,
  lister,
  supprimer,
} from "../controleurs/reaction.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const router = Router();

/**
 * Voir les réactions d'une expérience
 * Public
 */
router.get(
  "/experiences/:experienceId/reactions",
  lister
);

/**
 * Ajouter une réaction
 * Authentification requise
 */
router.post(
  "/experiences/:experienceId/reactions",
  authentificationMiddleware,
  ajouter
);

/**
 * Supprimer sa réaction
 * Authentification requise
 */
router.delete(
  "/experiences/:experienceId/reactions/:type",
  authentificationMiddleware,
  supprimer
);

export default router;