import { Request, Response } from "express";

import type { ReactionType } from "../generated/prisma/client";

import {
  ajouterReaction,
  obtenirReactions,
  trouverReaction,
  supprimerReaction,
} from "../services/reaction.service";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

/**
 * Ajouter une réaction
 * POST /api/experiences/:experienceId/reactions
 */
export async function ajouter(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;

    if (!utilisateurId) {
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

    const { type } = req.body;

    const typesAutorises = [
      "LIKE",
      "HELPFUL",
      "INTERESTING",
    ];

    if (
      typeof type !== "string" ||
      !typesAutorises.includes(type)
    ) {
      return res.status(400).json({
        erreur: "Type de réaction invalide.",
      });
    }

    const reactionExistante = await trouverReaction(
      utilisateurId,
      experienceId,
      type as ReactionType
    );

    if (reactionExistante) {
      return res.status(409).json({
        erreur: "Vous avez déjà ajouté cette réaction.",
      });
    }

    const reaction = await ajouterReaction(
      utilisateurId,
      experienceId,
      type as ReactionType
    );

    return res.status(201).json({
      message: "Réaction ajoutée avec succès.",
      reaction,
    });
  } catch (erreur) {
    console.error("Erreur ajout réaction :", erreur);

    return res.status(500).json({
      erreur: "Impossible d'ajouter la réaction.",
    });
  }
}

/**
 * Récupérer les réactions d'une expérience
 * GET /api/experiences/:experienceId/reactions
 */
export async function lister(
  req: Request,
  res: Response
) {
  try {
    const experienceId = req.params.experienceId;

    if (typeof experienceId !== "string") {
      return res.status(400).json({
        erreur: "Identifiant d'expérience invalide.",
      });
    }

    const reactions = await obtenirReactions(experienceId);

    return res.status(200).json({
      reactions,
    });
  } catch (erreur) {
    console.error("Erreur récupération réactions :", erreur);

    return res.status(500).json({
      erreur: "Impossible de récupérer les réactions.",
    });
  }
}

/**
 * Supprimer une réaction
 * DELETE /api/experiences/:experienceId/reactions/:type
 */
export async function supprimer(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;

    if (!utilisateurId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    const experienceId = req.params.experienceId;
    const type = req.params.type;

    if (
      typeof experienceId !== "string" ||
      typeof type !== "string"
    ) {
      return res.status(400).json({
        erreur: "Paramètres invalides.",
      });
    }

    const typesAutorises = [
      "LIKE",
      "HELPFUL",
      "INTERESTING",
    ];

    if (!typesAutorises.includes(type)) {
      return res.status(400).json({
        erreur: "Type de réaction invalide.",
      });
    }

    const reaction = await trouverReaction(
      utilisateurId,
      experienceId,
      type as ReactionType
    );

    if (!reaction) {
      return res.status(404).json({
        erreur: "Réaction introuvable.",
      });
    }

    await supprimerReaction(
      utilisateurId,
      experienceId,
      type as ReactionType
    );

    return res.status(200).json({
      message: "Réaction supprimée avec succès.",
    });
  } catch (erreur) {
    console.error("Erreur suppression réaction :", erreur);

    return res.status(500).json({
      erreur: "Impossible de supprimer la réaction.",
    });
  }
}