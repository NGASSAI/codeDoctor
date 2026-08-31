import { Router } from "express";

import { diagnostiquer } from "../controleurs/diagnostic.controleur";
import { authentificationMiddleware } from "../middlewares/authentification.middleware";
import { listerCapacites } from "../controleurs/diagnostic.controleur";
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
router.get("/capacites", listerCapacites);
export default router;