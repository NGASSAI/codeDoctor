import { Router } from "express";
import {
  analyserCodeControleur,
} from "../controleurs/ia.controleur";

import {
  authentificationMiddleware,
  RequeteAuthentifiee,
} from "../middlewares/authentification.middleware";

import { obtenirEtatQuotaIA } from "../services/quota.service";

const routeur = Router();

routeur.post(
  "/analyser",
  authentificationMiddleware,
  analyserCodeControleur
);
routeur.get(
  "/quota",
  authentificationMiddleware,
  async (req: RequeteAuthentifiee, res) => {
    try {
      if (!req.utilisateurId) {
        return res.status(401).json({
          erreur: "Authentification requise.",
        });
      }

      const quota = await obtenirEtatQuotaIA(req.utilisateurId);

      return res.status(200).json(quota);
    } catch (erreur) {
      console.error("Erreur diagnostic quota :", erreur);

      return res.status(500).json({
        erreur: "Impossible de récupérer le quota.",
      });
    }
  }
);

export default routeur;