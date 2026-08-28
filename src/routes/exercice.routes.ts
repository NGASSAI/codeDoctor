import { Router } from "express";

import {
  lister,
  obtenir,
  indice,
  tenter,
  mesTentatives,
  maProgression,
} from "../controleurs/exercice.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const router = Router();

/**
 * Routes spécifiques AVANT /:id
 */

router.get(
  "/mes-tentatives",
  authentificationMiddleware,
  mesTentatives
);

router.get(
  "/ma-progression",
  authentificationMiddleware,
  maProgression
);

/**
 * Liste des exercices.
 */
router.get("/", lister);

/**
 * Voir un exercice.
 */
router.get("/:id", obtenir);

/**
 * Récupérer un indice.
 */
router.get(
  "/:id/indices/:numero",
  authentificationMiddleware,
  indice
);

/**
 * Soumettre une réponse.
 */
router.post(
  "/:id/tenter",
  authentificationMiddleware,
  tenter
);

export default router;