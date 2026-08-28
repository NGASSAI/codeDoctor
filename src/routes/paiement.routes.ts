
import { Router } from "express";

import {
  creerPaiement,
  mesPaiements,
  obtenirPaiement,
} from "../controleurs/paiement.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const routeur = Router();

/**
 * Créer une demande de paiement Premium
 */
routeur.post(
  "/",
  authentificationMiddleware,
  creerPaiement
);

/**
 * Récupérer mes paiements
 */
routeur.get(
  "/",
  authentificationMiddleware,
  mesPaiements
);

/**
 * Récupérer un paiement précis
 */
routeur.get(
  "/:paiementId",
  authentificationMiddleware,
  obtenirPaiement
);


export default routeur;
