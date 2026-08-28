
import { Response } from "express";

import {
  creerDemandePaiement,
  listerPaiementsUtilisateur,
  obtenirPaiementUtilisateur,
  listerPaiementsAdmin,
  approuverPaiement,
  rejeterPaiement,
} from "../services/paiement.service";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

/**
 * Créer une demande de paiement Premium.
 */
export async function creerPaiement(
  req: RequeteAuthentifiee,
  res: Response
) {
  const utilisateurId = req.utilisateurId;

  if (!utilisateurId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  const { montant } = req.body;

  if (
    typeof montant !== "number" ||
    !Number.isFinite(montant) ||
    montant <= 0
  ) {
    return res.status(400).json({
      erreur: "Le montant doit être un nombre supérieur à 0.",
    });
  }

  try {
    const paiement = await creerDemandePaiement(
      utilisateurId,
      Math.round(montant)
    );

    return res.status(201).json({
      message: "Demande de paiement créée avec succès.",
      paiement,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la création du paiement :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Lister les paiements de l'utilisateur connecté.
 */
export async function obtenirPaiement(
  req: RequeteAuthentifiee,
  res: Response
) {
  const utilisateurId = req.utilisateurId;

  if (!utilisateurId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  const paiementId = String(req.params.paiementId ?? "");

  if (!paiementId) {
    return res.status(400).json({
      erreur: "Identifiant du paiement requis.",
    });
  }

  try {
    const paiement = await obtenirPaiementUtilisateur(
      paiementId,
      utilisateurId
    );

    if (!paiement) {
      return res.status(404).json({
        erreur: "Paiement introuvable.",
      });
    }

    return res.status(200).json({
      paiement,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération du paiement :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Lister les paiements pour l'administration.
 */
export async function paiementsAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  const page = Math.max(
    1,
    Number.parseInt(String(req.query.page ?? "1"), 10) || 1
  );

  const limite = Math.min(
    100,
    Math.max(
      1,
      Number.parseInt(String(req.query.limite ?? "20"), 10) || 20
    )
  );

  try {
    const resultat = await listerPaiementsAdmin(page, limite);

    return res.status(200).json(resultat);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des paiements admin :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Approuver un paiement.
 */
export async function approuverPaiementAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  const paiementId = String(req.params.paiementId ?? "");

  if (!paiementId) {
    return res.status(400).json({
      erreur: "Identifiant du paiement requis.",
    });
  }

  try {
    const paiement = await approuverPaiement(paiementId);

    return res.status(200).json({
      message: "Paiement approuvé avec succès.",
      paiement,
    });
  } catch (erreur: any) {
    if (erreur?.code === "P2025") {
      return res.status(404).json({
        erreur: "Paiement introuvable.",
      });
    }

    console.error(
      "Erreur lors de l'approbation du paiement :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Rejeter un paiement.
 */
export async function rejeterPaiementAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  const paiementId = String(req.params.paiementId ?? "");

  if (!paiementId) {
    return res.status(400).json({
      erreur: "Identifiant du paiement requis.",
    });
  }

  try {
    const paiement = await rejeterPaiement(paiementId);

    return res.status(200).json({
      message: "Paiement rejeté avec succès.",
      paiement,
    });
  } catch (erreur: any) {
    if (erreur?.code === "P2025") {
      return res.status(404).json({
        erreur: "Paiement introuvable.",
      });
    }

    console.error(
      "Erreur lors du rejet du paiement :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

export async function mesPaiements(
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
    const paiements =
      await listerPaiementsUtilisateur(utilisateurId);

    return res.status(200).json({
      paiements,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des paiements :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}
