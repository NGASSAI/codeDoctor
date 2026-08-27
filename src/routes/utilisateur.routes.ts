import { Router } from "express";

import { profil ,modifierProfil} from "../controleurs/utilisateur.controleur";
import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const routeur = Router();

routeur.get(
  "/profil",
  authentificationMiddleware,
  profil
);
routeur.patch(
  "/profil",
  authentificationMiddleware,
  modifierProfil
);

export default routeur;