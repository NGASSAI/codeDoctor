import { Response } from "express";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

import {
  obtenirEtatAbonnement,
} from "../services/abonnement.service";

/**
 * Récupérer l'abonnement de l'utilisateur connecté.
 */
export async function monAbonnement(
  req: RequeteAuthentifiee,
  res: Response
) {
  const userId = req.utilisateurId;

  if (!userId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  try {
    const abonnement =
      await obtenirEtatAbonnement(userId);

    return res.status(200).json({
      abonnement,
    });
  } catch (erreur) {
    console.error(
      "Erreur récupération abonnement :",
      erreur
    );

    return res.status(500).json({
      erreur: "Impossible de récupérer l'abonnement.",
    });
  }
}