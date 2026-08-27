import { Router } from "express";

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
export default routeur;