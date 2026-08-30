
import { Response } from "express";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

import {
  obtenirStatistiquesAdmin,
  listerUtilisateursAdmin,
  listerExperiencesAdmin,
  modifierStatutExperienceAdmin,
  modifierRoleUtilisateurAdmin,
  supprimerUtilisateurAdmin,
  supprimerExperienceAdmin,
  obtenirNotificationsAdmin,
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
 * Modifier le rôle d'un utilisateur
 * PATCH /api/admin/utilisateurs/:id/role
 */
export async function modifierRoleUtilisateur(
  req: RequeteAuthentifiee,
  res: Response
) {
  const { id } = req.params;
  const { role } = req.body;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ erreur: "Identifiant utilisateur invalide." });
  }

  if (role !== "USER" && role !== "ADMIN") {
    return res.status(400).json({ erreur: "Rôle invalide." });
  }

  try {
    const utilisateur = await modifierRoleUtilisateurAdmin(id, role);
    return res.status(200).json({
      message: "Rôle mis à jour avec succès.",
      utilisateur,
    });
  } catch (erreur: any) {
    if (erreur?.code === "P2025") {
      return res.status(404).json({ erreur: "Utilisateur introuvable." });
    }
    console.error("Erreur modification rôle :", erreur);
    return res.status(500).json({ erreur: "Erreur interne du serveur." });
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
 * Supprimer une expérience
 * DELETE /api/admin/experiences/:id
 */
export async function supprimerExperience(
  req: RequeteAuthentifiee,
  res: Response
) {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ erreur: "Identifiant d'expérience invalide." });
  }

  try {
    await supprimerExperienceAdmin(id);
    return res.status(200).json({ success: true });
  } catch (erreur: any) {
    if (erreur?.code === "P2025") {
      return res.status(404).json({ erreur: "Expérience introuvable." });
    }
    console.error("Erreur suppression expérience :", erreur);
    return res.status(500).json({ erreur: "Erreur interne du serveur." });
  }
}
/**
 * Supprimer un utilisateur
 * DELETE /api/admin/utilisateurs/:id
 */
export async function supprimerUtilisateur(
  req: RequeteAuthentifiee,
  res: Response
) {
  const { id } = req.params;
  const adminId = req.utilisateurId;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ erreur: "Identifiant utilisateur invalide." });
  }

  if (id === adminId) {
    return res.status(400).json({ erreur: "Vous ne pouvez pas supprimer votre propre compte." });
  }

  try {
    await supprimerUtilisateurAdmin(id);
    return res.status(200).json({ success: true });
  } catch (erreur: any) {
    if (erreur?.code === "P2025") {
      return res.status(404).json({ erreur: "Utilisateur introuvable." });
    }
    console.error("Erreur suppression utilisateur :", erreur);
    return res.status(500).json({ erreur: "Erreur interne du serveur." });
  }
}

/**
 * Notifications de l'administrateur connecté
 * GET /api/admin/notifications
 */
export async function notificationsAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  const adminId = req.utilisateurId;

  if (!adminId) {
    return res.status(401).json({ erreur: "Authentification requise." });
  }

  try {
    const page = Math.max(Number.parseInt(req.query.page as string) || 1, 1);
    const limite = Math.min(
      Math.max(Number.parseInt(req.query.limite as string) || 20, 1),
      100
    );

    const resultat = await obtenirNotificationsAdmin(adminId, page, limite);

    return res.status(200).json(resultat);
  } catch (erreur) {
    console.error("Erreur récupération notifications admin :", erreur);
    return res.status(500).json({ erreur: "Erreur interne du serveur." });
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
