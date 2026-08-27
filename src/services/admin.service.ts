import { prisma } from "../base";
import { ExperienceStatus } from "../generated/prisma/client";

export async function obtenirStatistiquesAdmin() {
  const [
    utilisateurs,
    experiences,
    experiencesPubliees,
    experiencesCachees,
    commentaires,
    reactions,
    signalements,
    signalementsEnAttente,
    exercices,
    conversations,
    notifications,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.experience.count(),
    prisma.experience.count({ where: { statut: "PUBLISHED" } }),
    prisma.experience.count({ where: { statut: "HIDDEN" } }),
    prisma.comment.count(),
    prisma.reaction.count(),
    prisma.report.count(),
    prisma.report.count({ where: { statut: "PENDING" } }),
    prisma.exercise.count(),
    prisma.conversation.count(),
    prisma.notification.count(),
  ]);

  return {
    utilisateurs,
    experiences: {
      total: experiences,
      publiees: experiencesPubliees,
      cachees: experiencesCachees,
    },
    commentaires,
    reactions,
    signalements: {
      total: signalements,
      enAttente: signalementsEnAttente,
    },
    exercices,
    conversations,
    notifications,
  };
}

/**
 * Liste des utilisateurs pour l'administration.
 */
export async function listerUtilisateursAdmin(
  page: number,
  limite: number
) {
  const skip = (page - 1) * limite;

  const [utilisateurs, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limite,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        _count: {
          select: {
            experiences: true,
            comments: true,
            reports: true,
          },
        },
      },
    }),

    prisma.user.count(),
  ]);

  return {
    utilisateurs,
    pagination: {
      page,
      limite,
      total,
      pages: Math.ceil(total / limite),
    },
  };
}

/**
 * Liste toutes les expériences pour l'administration.
 * Contrairement à l'API publique, l'admin voit
 * également les expériences HIDDEN et DELETED.
 */
export async function listerExperiencesAdmin(
  page: number,
  limite: number
) {
  const skip = (page - 1) * limite;

  const [experiences, total] = await Promise.all([
    prisma.experience.findMany({
      skip,
      take: limite,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
          },
        },
        moderator: {
          select: {
            id: true,
            email: true,
            displayName: true,
          },
        },
        _count: {
          select: {
            comments: true,
            reactions: true,
            reports: true,
          },
        },
      },
    }),

    prisma.experience.count(),
  ]);

  return {
    experiences,
    pagination: {
      page,
      limite,
      total,
      pages: Math.ceil(total / limite),
    },
  };
}

/**
 * Modifier le statut d'une expérience.
 */
export async function modifierStatutExperienceAdmin(
  experienceId: string,
  statut: ExperienceStatus,
  adminId: string
) {
  return prisma.experience.update({
    where: {
      id: experienceId,
    },
    data: {
      statut,
      moderatedAt: new Date(),
      moderatedBy: adminId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          displayName: true,
        },
      },
    },
  });
}