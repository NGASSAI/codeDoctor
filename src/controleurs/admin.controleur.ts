
import { Response } from "express";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

import {
  obtenirStatistiquesAdmin,
  listerUtilisateursAdmin,
  listerExperiencesAdmin,
  modifierStatutExperienceAdmin,
} from "../services/admin.service";

import {
  obtenirSignalements,
  modifierStatutSignalement as modifierStatutSignalementService,
} from "../services/report.service";

/**
 * Dashboard administrateur
 */
export async function dashboardAdmin(
  _req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const statistiques = await obtenirStatistiquesAdmin();

    return res.status(200).json({
      statistiques,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des statistiques admin :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Lister les utilisateurs pour l'administration
 */
export async function utilisateursAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const page = Math.max(
      Number.parseInt(req.query.page as string) || 1,
      1
    );

    const limite = Math.min(
      Math.max(
        Number.parseInt(req.query.limite as string) || 10,
        1
      ),
      100
    );

    const resultat = await listerUtilisateursAdmin(
      page,
      limite
    );

    return res.status(200).json(resultat);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des utilisateurs admin :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Lister les expériences pour l'administration
 */
export async function experiencesAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const page = Math.max(
      Number.parseInt(req.query.page as string) || 1,
      1
    );

    const limite = Math.min(
      Math.max(
        Number.parseInt(req.query.limite as string) || 10,
        1
      ),
      100
    );

    const resultat = await listerExperiencesAdmin(
      page,
      limite
    );

    return res.status(200).json(resultat);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des expériences admin :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Modifier le statut d'une expérience
 */
export async function modifierStatutExperience(
  req: RequeteAuthentifiee,
  res: Response
) {
  const adminId = req.utilisateurId;
  const id = req.params.id;
  const { statut } = req.body;

  if (!adminId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      erreur: "Identifiant d'expérience invalide.",
    });
  }

  if (
    statut !== "PUBLISHED" &&
    statut !== "HIDDEN" &&
    statut !== "DELETED"
  ) {
    return res.status(400).json({
      erreur: "Statut d'expérience invalide.",
    });
  }

  try {
    const experience = await modifierStatutExperienceAdmin(
      id,
      statut,
      adminId
    );

    return res.status(200).json({
      message: "Statut de l'expérience mis à jour.",
      experience,
    });
  } catch (erreur: any) {
    if (erreur?.code === "P2025") {
      return res.status(404).json({
        erreur: "Expérience introuvable.",
      });
    }

    console.error(
      "Erreur lors de la modification du statut :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Lister les signalements pour l'administration
 *
 * GET /api/admin/signalements
 *
 * Exemple :
 * /api/admin/signalements
 * /api/admin/signalements?statut=PENDING
 */
export async function signalementsAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  const statut = req.query.statut;

  if (
    statut !== undefined &&
    statut !== "PENDING" &&
    statut !== "REVIEWED" &&
    statut !== "RESOLVED" &&
    statut !== "REJECTED"
  ) {
    return res.status(400).json({
      erreur: "Statut de signalement invalide.",
    });
  }

  try {
    const signalements = await obtenirSignalements(
      statut as
        | "PENDING"
        | "REVIEWED"
        | "RESOLVED"
        | "REJECTED"
        | undefined
    );

    return res.status(200).json({
      signalements,
      total: signalements.length,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des signalements admin :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * Modifier le statut d'un signalement
 *
 * PATCH /api/admin/signalements/:id/statut
 */
export async function modifierStatutSignalementAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  const id = req.params.id;
  const { statut } = req.body;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      erreur: "Identifiant de signalement invalide.",
    });
  }

  if (
    statut !== "PENDING" &&
    statut !== "REVIEWED" &&
    statut !== "RESOLVED" &&
    statut !== "REJECTED"
  ) {
    return res.status(400).json({
      erreur: "Statut de signalement invalide.",
    });
  }

  try {
    const signalement =
      await modifierStatutSignalementService(
        id,
        statut
      );

    return res.status(200).json({
      message: "Statut du signalement mis à jour.",
      signalement,
    });
  } catch (erreur: any) {
    if (erreur?.code === "P2025") {
      return res.status(404).json({
        erreur: "Signalement introuvable.",
      });
    }

    console.error(
      "Erreur lors de la modification du signalement :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}
