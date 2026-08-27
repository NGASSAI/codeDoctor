import { prisma } from "../base";
import {
  Category,
  ExperienceStatus,
  UserRole,
  NotificationType,
} from "../generated/prisma/client";

import { creerNotification } from "./notification.service";


/**
 * Créer une expérience
 */
export async function creerExperience(
  userId: string,
  data: {
    titre: string;
    probleme: string;
    code?: string;
    cause: string;
    solution: string;
    technologie?: string;
    categorie: Category;
  }
) {
  const experience = await prisma.experience.create({
    data: {
      userId,
      titre: data.titre,
      probleme: data.probleme,
      code: data.code ?? null,
      cause: data.cause,
      solution: data.solution,
      technologie: data.technologie ?? null,
      categorie: data.categorie,
      statut: ExperienceStatus.PUBLISHED,
    },
  });

  // Récupérer tous les administrateurs
  const administrateurs = await prisma.user.findMany({
    where: {
      role: UserRole.ADMIN,
    },
    select: {
      id: true,
    },
  });

  // Notifier chaque administrateur
  await Promise.all(
    administrateurs.map((admin) =>
      creerNotification(
        admin.id,
        NotificationType.NOUVELLE_EXPERIENCE,
        "Nouvelle expérience",
        `Une nouvelle expérience "${experience.titre}" a été publiée.`,
        `/experiences/${experience.id}`
      )
    )
  );

  return experience;
}

/**
 * Récupérer toutes les expériences publiques
 */
export async function obtenirExperiences(
  categorie?: Category
) {
  return prisma.experience.findMany({
    where: {
      statut: ExperienceStatus.PUBLISHED,
      ...(categorie ? { categorie } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
        },
      },
      _count: {
        select: {
          comments: true,
          reactions: true,
        },
      },
    },
  });
}

/**
 * Récupérer une expérience par son ID
 */
export async function obtenirExperienceParId(id: string) {
  return prisma.experience.findFirst({
    where: {
      id,
      statut: ExperienceStatus.PUBLISHED,
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
        },
      },
      comments: {
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
      },
      reactions: true,
      _count: {
        select: {
          comments: true,
          reactions: true,
          reports: true,
        },
      },
    },
  });
}

/**
 * Vérifier qu'une expérience appartient bien à l'utilisateur
 */
export async function trouverExperienceUtilisateur(
  experienceId: string,
  userId: string
) {
  return prisma.experience.findFirst({
    where: {
      id: experienceId,
      userId,
    },
  });
}

/**
 * Modifier une expérience
 */
export async function modifierExperience(
  experienceId: string,
  userId: string,
  data: {
    titre?: string;
    probleme?: string;
    code?: string;
    cause?: string;
    solution?: string;
    technologie?: string;
    categorie?: Category;
  }
) {
  return prisma.experience.updateMany({
    where: {
      id: experienceId,
      userId,
    },
    data,
  });
}

/**
 * Supprimer une expérience
 *
 * On utilise une suppression logique :
 * l'expérience passe à DELETED au lieu
 * d'être immédiatement supprimée de PostgreSQL.
 */
export async function supprimerExperience(
  experienceId: string,
  userId: string
) {
  return prisma.experience.updateMany({
    where: {
      id: experienceId,
      userId,
    },
    data: {
      statut: ExperienceStatus.DELETED,
    },
  });
}