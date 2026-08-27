import { prisma } from "../base";
import type { ReactionType } from "../generated/prisma/client";

/**
 * Ajouter une réaction
 */
export async function ajouterReaction(
  userId: string,
  experienceId: string,
  type: ReactionType
) {
  return prisma.reaction.create({
    data: {
      userId,
      experienceId,
      type,
    },
  });
}

/**
 * Récupérer les réactions d'une expérience
 */
export async function obtenirReactions(experienceId: string) {
  return prisma.reaction.findMany({
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
 * Vérifier si l'utilisateur possède déjà cette réaction
 */
export async function trouverReaction(
  userId: string,
  experienceId: string,
  type: ReactionType
) {
  return prisma.reaction.findUnique({
    where: {
      experienceId_userId_type: {
        experienceId,
        userId,
        type,
      },
    },
  });
}

/**
 * Supprimer une réaction
 */
export async function supprimerReaction(
  userId: string,
  experienceId: string,
  type: ReactionType
) {
  return prisma.reaction.delete({
    where: {
      experienceId_userId_type: {
        experienceId,
        userId,
        type,
      },
    },
  });
}