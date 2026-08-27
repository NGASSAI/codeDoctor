import { Request, Response } from "express";

import type {
  ReportReason,
  ReportStatus,
} from "../generated/prisma/client";

import {
  creerSignalement,
  trouverSignalement,
  obtenirSignalements,
  obtenirSignalementParId,
  modifierStatutSignalement,
} from "../services/report.service";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

/**
 * Créer un signalement
 * POST /api/experiences/:experienceId/signalements
 */
export async function creer(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const userId = req.utilisateurId;

    if (!userId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    const experienceId = req.params.experienceId;

    if (typeof experienceId !== "string") {
      return res.status(400).json({
        erreur: "Identifiant d'expérience invalide.",
      });
    }

    const { raison, description } = req.body;

    const raisonsAutorisees = [
  "SPAM",
  "HARCELEMENT",
  "CONTENU_INAPPROPRIE",
  "CODE_DANGEREUX",
  "INFORMATIONS_FAUSSES",
  "AUTRE",
];

    if (
      typeof raison !== "string" ||
      !raisonsAutorisees.includes(raison)
    ) {
      return res.status(400).json({
        erreur: "Raison du signalement invalide.",
      });
    }

    if (
      description !== undefined &&
      typeof description !== "string"
    ) {
      return res.status(400).json({
        erreur: "La description doit être une chaîne de caractères.",
      });
    }

    const signalementExistant = await trouverSignalement(
      userId,
      experienceId
    );

    if (signalementExistant) {
      return res.status(409).json({
        erreur: "Vous avez déjà signalé cette expérience.",
      });
    }

    const signalement = await creerSignalement(
      userId,
      experienceId,
      raison as ReportReason,
      description
    );

    return res.status(201).json({
      message: "Signalement envoyé avec succès.",
      signalement,
    });
  } catch (erreur) {
    console.error("Erreur création signalement :", erreur);

    return res.status(500).json({
      erreur: "Impossible de créer le signalement.",
    });
  }
}

/**
 * Voir les signalements
 * GET /api/signalements
 *
 * Cette route sera réservée à l'administration plus tard.
 */
export async function lister(
  req: Request,
  res: Response
) {
  try {
    const statut = req.query.statut;

    let statutValide: ReportStatus | undefined;

    if (typeof statut === "string") {
      const statutsAutorises = [
        "PENDING",
        "REVIEWED",
        "RESOLVED",
        "DISMISSED",
      ];

      if (!statutsAutorises.includes(statut)) {
        return res.status(400).json({
          erreur: "Statut invalide.",
        });
      }

      statutValide = statut as ReportStatus;
    }

    const signalements = await obtenirSignalements(
      statutValide
    );

    return res.status(200).json({
      signalements,
    });
  } catch (erreur) {
    console.error("Erreur récupération signalements :", erreur);

    return res.status(500).json({
      erreur: "Impossible de récupérer les signalements.",
    });
  }
}

/**
 * Voir un signalement
 * GET /api/signalements/:id
 *
 * Cette route sera réservée à l'administration plus tard.
 */
export async function obtenir(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        erreur: "Identifiant de signalement invalide.",
      });
    }

    const signalement = await obtenirSignalementParId(id);

    if (!signalement) {
      return res.status(404).json({
        erreur: "Signalement introuvable.",
      });
    }

    return res.status(200).json({
      signalement,
    });
  } catch (erreur) {
    console.error("Erreur récupération signalement :", erreur);

    return res.status(500).json({
      erreur: "Impossible de récupérer le signalement.",
    });
  }
}

/**
 * Modifier le statut d'un signalement
 * PATCH /api/signalements/:id/statut
 *
 * Cette route sera réservée à l'administration plus tard.
 */
export async function modifierStatut(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        erreur: "Identifiant de signalement invalide.",
      });
    }

    const { statut } = req.body;

    const statutsAutorises = [
      "PENDING",
      "REVIEWED",
      "RESOLVED",
      "DISMISSED",
    ];

    if (
      typeof statut !== "string" ||
      !statutsAutorises.includes(statut)
    ) {
      return res.status(400).json({
        erreur: "Statut invalide.",
      });
    }

    const signalement = await modifierStatutSignalement(
      id,
      statut as ReportStatus
    );

    return res.status(200).json({
      message: "Statut du signalement modifié avec succès.",
      signalement,
    });
  } catch (erreur) {
    console.error("Erreur modification signalement :", erreur);

    return res.status(500).json({
      erreur: "Impossible de modifier le statut du signalement.",
    });
  }
}