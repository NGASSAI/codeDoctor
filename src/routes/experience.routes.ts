import { Router } from "express";

import {
  creer,
  lister,
  obtenir,
  modifier,
  supprimer,
} from "../controleurs/experience.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const router = Router();

/**
 * Expériences publiques
 */

// Toutes les expériences publiées
router.get("/", lister);

// Une expérience précise
router.get("/:id", obtenir);

/**
 * Expériences nécessitant une authentification
 */

// Créer une expérience
router.post("/", authentificationMiddleware, creer);

// Modifier sa propre expérience
router.put("/:id", authentificationMiddleware, modifier);

// Supprimer sa propre expérience
router.delete("/:id", authentificationMiddleware, supprimer);

export default router;