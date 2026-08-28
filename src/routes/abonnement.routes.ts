import { Router } from "express";

import { monAbonnement } from "../controleurs/abonnement.controleur";
import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const routeur = Router();

routeur.get(
  "/",
  authentificationMiddleware,
  monAbonnement
);

export default routeur;