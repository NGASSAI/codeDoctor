import { prisma } from "../base";

/**
 * Créer un commentaire sur une expérience
 */
export async function creerCommentaire(
  userId: string,
  experienceId: string,
  contenu: string
) {
  return prisma.comment.create({
    data: {
      userId,
      experienceId,
      contenu,
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
  });
}

/**
 * Récupérer les commentaires d'une expérience
 */
export async function obtenirCommentaires(experienceId: string) {
  return prisma.comment.findMany({
    where: {
      experienceId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
  });
}

/**
 * Vérifier qu'un commentaire appartient bien à un utilisateur
 */
export async function trouverCommentaireUtilisateur(
  commentId: string,
  userId: string
) {
  return prisma.comment.findFirst({
    where: {
      id: commentId,
      userId,
    },
  });
}

/**
 * Supprimer un commentaire appartenant à l'utilisateur
 */
export async function supprimerCommentaire(
  commentId: string,
  userId: string
) {
  return prisma.comment.deleteMany({
    where: {
      id: commentId,
      userId,
    },
  });
}