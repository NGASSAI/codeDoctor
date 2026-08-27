import { Router } from "express";

import {
  creer,
  lister,
  supprimer,
} from "../controleurs/commentaire.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const router = Router();

/**
 * Commentaires d'une expérience
 */

// Voir les commentaires — public
router.get(
  "/experiences/:experienceId/commentaires",
  lister
);

// Ajouter un commentaire — connecté
router.post(
  "/experiences/:experienceId/commentaires",
  authentificationMiddleware,
  creer
);

// Supprimer son commentaire — connecté
router.delete(
  "/commentaires/:id",
  authentificationMiddleware,
  supprimer
);

export default router;