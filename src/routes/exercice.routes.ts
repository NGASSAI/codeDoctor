import { Router } from "express";

import {
  lister,
  obtenir,
  indice,
  tenter,
  mesTentatives,
  maProgression,
  listerPourAdmin,
  creer,
  modifier,
  supprimer,
} from "../controleurs/exercice.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

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
 * Routes ADMIN — gestion des exercices.
 * Placées avant /:id pour ne pas être interceptées.
 */

router.get(
  "/admin/tous",
  authentificationMiddleware,
  adminMiddleware,
  listerPourAdmin
);

router.post(
  "/admin",
  authentificationMiddleware,
  adminMiddleware,
  creer
);

router.put(
  "/admin/:id",
  authentificationMiddleware,
  adminMiddleware,
  modifier
);

router.delete(
  "/admin/:id",
  authentificationMiddleware,
  adminMiddleware,
  supprimer
);

/**
 * Liste des exercices (public).
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