import { Router } from "express";

import {
  paiementsAdmin,
  approuverPaiementAdmin,
  rejeterPaiementAdmin,
} from "../controleurs/paiement.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const routeur = Router();

routeur.use(
  authentificationMiddleware,
  adminMiddleware
);

routeur.get("/", paiementsAdmin);

routeur.patch(
  "/:paiementId/approuver",
  approuverPaiementAdmin
);

routeur.patch(
  "/:paiementId/rejeter",
  rejeterPaiementAdmin
);

export default routeur;