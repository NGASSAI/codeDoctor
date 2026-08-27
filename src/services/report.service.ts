import { prisma } from "../base";

import type { ReportReason, ReportStatus } from "../generated/prisma/client";

/**
 * Créer un signalement
 */
export async function creerSignalement(
  userId: string,
  experienceId: string,
  raison: ReportReason,
  description?: string
) {
  return prisma.report.create({
    data: {
      userId,
      experienceId,
      raison,
      description: description ?? null,
    },
  });
}

/**
 * Vérifier si l'utilisateur a déjà signalé cette expérience
 */
export async function trouverSignalement(
  userId: string,
  experienceId: string
) {
  return prisma.report.findFirst({
    where: {
      userId,
      experienceId,
    },
  });
}

/**
 * Récupérer les signalements
 * Utilisé plus tard par l'administration
 */

export async function obtenirSignalements(
  statut?: ReportStatus
) {
  const where = statut
    ? {
        statut,
      }
    : {};

  return prisma.report.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
          email: true,
        },
      },
      experience: {
        select: {
          id: true,
          titre: true,
          probleme: true,
          categorie: true,
        },
      },
    },
  });
}


/**
 * Récupérer un signalement par son ID
 */
export async function obtenirSignalementParId(
  id: string
) {
  return prisma.report.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
          email: true,
        },
      },
      experience: true,
    },
  });
}

/**
 * Modifier le statut d'un signalement
 * Utilisé par l'administrateur
 */
export async function modifierStatutSignalement(
  id: string,
  statut: ReportStatus
) {
  return prisma.report.update({
    where: {
      id,
    },
    data: {
      statut,
    },
  });
}