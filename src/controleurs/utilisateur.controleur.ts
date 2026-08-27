import { Response } from "express";

import {
  trouverUtilisateurParId,
    modifierProfilUtilisateur,
} from "../services/utilisateur.service";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
export async function modifierProfil(
  req: RequeteAuthentifiee,
  res: Response
) {
  const utilisateurId = req.utilisateurId;

  if (!utilisateurId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  const { displayName } = req.body;

  if (
    displayName !== null &&
    displayName !== undefined &&
    typeof displayName !== "string"
  ) {
    return res.status(400).json({
      erreur: "Le nom affiché doit être une chaîne de caractères.",
    });
  }

  const nomAffiche =
    displayName === undefined
      ? undefined
      : displayName.trim() || null;

  if (nomAffiche !== undefined && nomAffiche !== null) {
    if (nomAffiche.length > 50) {
      return res.status(400).json({
        erreur: "Le nom affiché ne peut pas dépasser 50 caractères.",
      });
    }
  }

  try {
    const utilisateur = await modifierProfilUtilisateur(
      utilisateurId,
      nomAffiche ?? null
    );

    return res.status(200).json({
      message: "Profil mis à jour avec succès.",
      utilisateur,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la modification du profil :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Récupérer le profil de l'utilisateur connecté
 */
export async function profil(
  req: RequeteAuthentifiee,
  res: Response
) {
  const utilisateurId = req.utilisateurId;

  if (!utilisateurId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  try {
    const utilisateur = await trouverUtilisateurParId(
      utilisateurId
    );

    if (!utilisateur) {
      return res.status(404).json({
        erreur: "Utilisateur introuvable.",
      });
    }

    return res.status(200).json({
      utilisateur,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération du profil :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}