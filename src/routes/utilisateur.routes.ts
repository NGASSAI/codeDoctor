
import { Router } from "express";

import {
  profil,
  modifierProfil,
  modifierSecuriteRecuperationControleur,
} from "../controleurs/utilisateur.controleur";

import {
  authentificationMiddleware,
} from "../middlewares/authentification.middleware";

const routeur = Router();

/**
 * Profil
 */
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

/**
 * Sécurité de récupération du compte
 */
routeur.patch(
  "/profil/securite-recuperation",
  authentificationMiddleware,
  modifierSecuriteRecuperationControleur
);

export default routeur;
