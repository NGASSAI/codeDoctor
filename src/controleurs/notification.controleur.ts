
import { Response } from "express";

import {
  RequeteAuthentifiee,
} from "../middlewares/authentification.middleware";

import {
  obtenirNotifications,
  obtenirNotificationsNonLues,
  compterNotificationsNonLues,
  marquerNotificationCommeLue,
  marquerToutesCommeLues,
  supprimerNotification,
} from "../services/notification.service";

/**
 * Récupérer toutes les notifications de l'utilisateur connecté
 */
export async function listerNotifications(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const userId = req.utilisateurId;

    if (!userId) {
      return res.status(401).json({
        erreur: "Utilisateur non authentifié.",
      });
    }

    const notifications = await obtenirNotifications(userId);

    return res.status(200).json({
      notifications,
    });
  } catch (error) {
    console.error("Erreur récupération notifications :", error);

    return res.status(500).json({
      erreur: "Impossible de récupérer les notifications.",
    });
  }
}

/**
 * Récupérer uniquement les notifications non lues
 */
export async function listerNotificationsNonLues(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const userId = req.utilisateurId;

    if (!userId) {
      return res.status(401).json({
        erreur: "Utilisateur non authentifié.",
      });
    }

    const notifications =
      await obtenirNotificationsNonLues(userId);

    return res.status(200).json({
      notifications,
    });
  } catch (error) {
    console.error(
      "Erreur récupération notifications non lues :",
      error
    );

    return res.status(500).json({
      erreur: "Impossible de récupérer les notifications.",
    });
  }
}

/**
 * Compter les notifications non lues
 */
export async function compterNonLues(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const userId = req.utilisateurId;

    if (!userId) {
      return res.status(401).json({
        erreur: "Utilisateur non authentifié.",
      });
    }

    const nombre = await compterNotificationsNonLues(userId);

    return res.status(200).json({
      nombre,
    });
  } catch (error) {
    console.error(
      "Erreur comptage notifications :",
      error
    );

    return res.status(500).json({
      erreur: "Impossible de compter les notifications.",
    });
  }
}

/**
 * Marquer une notification comme lue
 */
export async function marquerCommeLue(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const userId = req.utilisateurId;

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!userId) {
      return res.status(401).json({
        erreur: "Utilisateur non authentifié.",
      });
    }

    if (!id) {
      return res.status(400).json({
        erreur: "Identifiant de notification requis.",
      });
    }

    await marquerNotificationCommeLue(id, userId);

    return res.status(200).json({
      message: "Notification marquée comme lue.",
    });
  } catch (error) {
    console.error(
      "Erreur marquage notification :",
      error
    );

    return res.status(500).json({
      erreur: "Impossible de modifier la notification.",
    });
  }
}

/**
 * Marquer toutes les notifications comme lues
 */
export async function marquerToutesCommeLuesControleur(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const userId = req.utilisateurId;

    if (!userId) {
      return res.status(401).json({
        erreur: "Utilisateur non authentifié.",
      });
    }

    await marquerToutesCommeLues(userId);

    return res.status(200).json({
      message: "Toutes les notifications sont maintenant lues.",
    });
  } catch (error) {
    console.error(
      "Erreur marquage toutes notifications :",
      error
    );

    return res.status(500).json({
      erreur: "Impossible de modifier les notifications.",
    });
  }
}

/**
 * Supprimer une notification
 */
export async function supprimer(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const userId = req.utilisateurId;

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!userId) {
      return res.status(401).json({
        erreur: "Utilisateur non authentifié.",
      });
    }

    if (!id) {
      return res.status(400).json({
        erreur: "Identifiant de notification requis.",
      });
    }

    await supprimerNotification(id, userId);

    return res.status(200).json({
      message: "Notification supprimée.",
    });
  } catch (error) {
    console.error(
      "Erreur suppression notification :",
      error
    );

    return res.status(500).json({
      erreur: "Impossible de supprimer la notification.",
    });
  }
}

