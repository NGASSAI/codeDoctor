import { Router } from "express";
import {
  paiementsAdmin,
  approuverPaiementAdmin,
  rejeterPaiementAdmin,
} from "../controleurs/paiement-admin.controleur";

import { dashboardAdmin,utilisateursAdmin,experiencesAdmin,
  modifierStatutExperience,signalementsAdmin,
  modifierStatutSignalementAdmin, } from "../controleurs/admin.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

import { adminMiddleware } from "../middlewares/admin.middleware";

const routeur = Router();

routeur.get(
  "/dashboard",
  authentificationMiddleware,
  adminMiddleware,
  dashboardAdmin
);
routeur.get(
  "/utilisateurs",
  authentificationMiddleware,
  adminMiddleware,
  utilisateursAdmin
);
routeur.get(
  "/experiences",
  authentificationMiddleware,
  adminMiddleware,
  experiencesAdmin
);

routeur.patch(
  "/experiences/:id/statut",
  authentificationMiddleware,
  adminMiddleware,
  modifierStatutExperience
);
routeur.get(
  "/signalements",
  authentificationMiddleware,
  adminMiddleware,
  signalementsAdmin
);

routeur.patch(
  "/signalements/:id/statut",
  authentificationMiddleware,
  adminMiddleware,
  modifierStatutSignalementAdmin
);
routeur.get(
  "/paiements",
  authentificationMiddleware,
  adminMiddleware,
  paiementsAdmin
);

routeur.patch(
  "/paiements/:id/approuver",
  authentificationMiddleware,
  adminMiddleware,
  approuverPaiementAdmin
);

routeur.patch(
  "/paiements/:id/rejeter",
  authentificationMiddleware,
  adminMiddleware,
  rejeterPaiementAdmin
);
export default routeur;