import { Request, Response } from "express";
import { prisma } from "../base";
import {
  creerCommentaire,
  obtenirCommentaires,
  trouverCommentaireUtilisateur,
  supprimerCommentaire,
} from "../services/commentaire.service";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

/**
 * Créer un commentaire
 * POST /api/experiences/:experienceId/commentaires
 */
export async function creer(
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

    const { contenu } = req.body;

    if (typeof contenu !== "string" || !contenu.trim()) {
      return res.status(400).json({
        erreur: "Le contenu du commentaire est requis.",
      });
    }

    const contenuNettoye = contenu.trim();

    if (contenuNettoye.length > 1000) {
      return res.status(400).json({
        erreur: "Le commentaire ne peut pas dépasser 1000 caractères.",
      });
    }

    const commentaire = await creerCommentaire(
      utilisateurId,
      experienceId,
      contenuNettoye
    );

    // Récupération de l'expérience et du commentateur pour la notification
    const [experience, auteurCommentaire] = await Promise.all([
      prisma.experience.findUnique({
        where: { id: experienceId },
        select: { userId: true, titre: true },
      }),
      prisma.user.findUnique({
        where: { id: utilisateurId },
        select: { displayName: true },
      }),
    ]);

    // Notification à l'auteur de l'expérience si ce n'est pas lui-même qui commente
    if (experience && experience.userId !== utilisateurId) {
      const nomAuteur = auteurCommentaire?.displayName || "Un utilisateur";
      await prisma.notification.create({
        data: {
          userId: experience.userId,
          type: "NOUVEAU_COMMENTAIRE",
          titre: "Nouveau commentaire",
          message: `${nomAuteur} a commenté votre expérience "${experience.titre}".`,
          lien: `/experiences/${experienceId}`,
        },
      });
    }

    return res.status(201).json({
      message: "Commentaire ajouté avec succès.",
      commentaire,
    });
  } catch (erreur) {
    console.error("Erreur création commentaire :", erreur);

    return res.status(500).json({
      erreur: "Impossible de créer le commentaire.",
    });
  }
}

/**
 * Récupérer les commentaires d'une expérience
 * GET /api/experiences/:experienceId/commentaires
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

    const commentaires = await obtenirCommentaires(experienceId);

    return res.status(200).json({
      commentaires,
    });
  } catch (erreur) {
    console.error("Erreur récupération commentaires :", erreur);

    return res.status(500).json({
      erreur: "Impossible de récupérer les commentaires.",
    });
  }
}

/**
 * Supprimer son propre commentaire
 * DELETE /api/commentaires/:id
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

    const commentId = req.params.id;

    if (typeof commentId !== "string") {
      return res.status(400).json({
        erreur: "Identifiant du commentaire invalide.",
      });
    }

    const commentaire = await trouverCommentaireUtilisateur(
      commentId,
      utilisateurId
    );

    if (!commentaire) {
      return res.status(404).json({
        erreur: "Commentaire introuvable.",
      });
    }

    await supprimerCommentaire(
      commentId,
      utilisateurId
    );

    return res.status(200).json({
      message: "Commentaire supprimé avec succès..",
    });
  } catch (erreur) {
    console.error("Erreur suppression commentaire :", erreur);

    return res.status(500).json({
      erreur: "Impossible de supprimer le commentaire.",
    });
  }
}