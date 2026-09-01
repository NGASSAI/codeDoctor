import { prisma } from "../base";
import { ExperienceStatus } from "../generated/prisma/client";
import { Category } from "../generated/prisma/client";

/**
 * Créer une expérience depuis l'espace admin.
 * L'admin connecté devient l'auteur de l'expérience.
 */
export async function creerExperienceAdmin(
  adminId: string,
  donnees: {
    titre: string;
    categorie: Category;
    probleme: string;
    cause: string;
    solution: string;
    technologie?: string| null | undefined;
    code?: string | null | undefined;
    userId: string;
  }
) {
  return prisma.experience.create({
    data: {
      titre: donnees.titre,
      categorie: donnees.categorie,
      probleme: donnees.probleme,
      cause: donnees.cause,
      solution: donnees.solution,
      technologie: donnees.technologie ?? null,
      code: donnees.code ?? null,
      userId: donnees.userId,
      statut: "PUBLISHED",
    },
  });
}

/**
 * Modifier une expérience depuis l'espace admin.
 */
export async function modifierExperienceAdmin(
  experienceId: string,
  donnees: {
    titre?: string;
    categorie?: Category;
    probleme?: string;
    cause?: string;
    solution?: string;
    technologie?: string | null | undefined;
    code?: string | null | undefined;
  }
) {
  const { technologie, code, ...rest } = donnees;

  return prisma.experience.update({
    where: { id: experienceId },
    data: {
      ...rest,
      ...(technologie !== undefined ? { technologie: technologie ?? null } : {}),
      ...(code !== undefined ? { code: code ?? null } : {}),
    },
  });
}

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

/**
 * Modifier le rôle d'un utilisateur (ex: USER <-> ADMIN).
 */
export async function modifierRoleUtilisateurAdmin(
  userId: string,
  role: "USER" | "ADMIN"
) {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      email: true,
      displayName: true,
      role: true,
    },
  });
}

/**
 * Modifier le statut d'activation / bannissement d'un utilisateur.
 */
export async function modifierStatutUtilisateurAdmin(
  userId: string,
  estActif: boolean
) {
  return prisma.user.update({
    where: { id: userId },
    data: { isBlocked: !estActif },
    select: {
      id: true,
      email: true,
      displayName: true,
      role: true,
    },
  });
}

/**
 * Supprimer définitivement un utilisateur.
 */
export async function supprimerUtilisateurAdmin(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  });
}

/**
 * Supprimer définitivement une expérience.
 */
export async function supprimerExperienceAdmin(experienceId: string) {
  return prisma.experience.delete({
    where: { id: experienceId },
  });
}

/**
 * Notifications de l'administrateur connecté.
 */
export async function obtenirNotificationsAdmin(
  adminId: string,
  page: number,
  limite: number
) {
  const skip = (page - 1) * limite;

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: adminId },
      skip,
      take: limite,
      orderBy: { createdAt: "desc" },
    }),
    prisma.notification.count({ where: { userId: adminId } }),
  ]);

  return {
    notifications,
    pagination: {
      page,
      limite,
      total,
      pages: Math.ceil(total / limite),
    },
  };
}