import { Router } from "express";

import { analyserCodeControleur } from "../controleurs/ia.controleur";
import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const routeur = Router();

routeur.post(
  "/analyser",
  authentificationMiddleware,
  analyserCodeControleur
);

export default routeur;