import { Router } from "express";

import { diagnostiquer } from "../controleurs/diagnostic.controleur";
import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const router = Router();

/**
 * Analyse locale du code.
 *
 * Le moteur utilise les règles CodeDoctor
 * enregistrées en base de données.
 */
router.post(
  "/",
  authentificationMiddleware,
  diagnostiquer
);

export default router;