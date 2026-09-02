import { prisma } from "../base";
import { Category } from "../generated/prisma/client";

/**
 * Liste les exercices disponibles.
 *
 * IMPORTANT :
 * La solution n'est jamais retournée au client.
 */
export async function listerExercices(
  categorie?: Category,
  difficulte?: string
) {
  return prisma.exercise.findMany({
    where: {
      ...(categorie ? { category: categorie } : {}),
      ...(difficulte
        ? { difficulty: difficulte }
        : {}),
    },
    select: {
      id: true,
      title: true,
      category: true,
      difficulty: true,
      buggyCode: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Récupère un exercice par son identifiant.
 *
 * La solution et les mots-clés restent secrets.
 */
export async function obtenirExercice(
  exerciceId: string
) {
  return prisma.exercise.findUnique({
    where: {
      id: exerciceId,
    },
    select: {
      id: true,
      title: true,
      category: true,
      difficulty: true,
      buggyCode: true,
      hint1: true,
      hint2: true,
      hint3: true,
      createdAt: true,
    },
  });
}

/**
 * Récupère un indice précis.
 *
 * 1 => hint1
 * 2 => hint2
 * 3 => hint3
 */
export async function obtenirIndice(
  exerciceId: string,
  numeroIndice: number
) {
  const exercice = await prisma.exercise.findUnique({
    where: {
      id: exerciceId,
    },
    select: {
      id: true,
      hint1: true,
      hint2: true,
      hint3: true,
    },
  });

  if (!exercice) {
    return null;
  }

  const indices: Record<number, string> = {
    1: exercice.hint1,
    2: exercice.hint2,
    3: exercice.hint3,
  };

  return {
    exerciceId: exercice.id,
    numeroIndice,
    indice: indices[numeroIndice],
  };
}

/**
 * Normalise une réponse ou une solution avant comparaison,
 * selon la catégorie de l'exercice.
 *
 * HTML_CSS : les espaces entre les balises sont insignifiants.
 * Autres catégories (code) : l'indentation, les retours à la ligne
 * et les espaces autour des tokens ne changent pas le sens du code,
 * donc on les retire entièrement avant de comparer.
 */
function normaliserReponse(
  texte: string,
  categorie: Category
): string {
  const base = texte.trim().toLowerCase();

  if (categorie === "HTML_CSS") {
    return base
      .replace(/>\s+</g, "><")
      .replace(/\s+/g, " ")
      .trim();
  }

  // JAVASCRIPT, TYPESCRIPT, REACT, HTTP, API
  return base.replace(/\s+/g, "");
}

/**
 * Vérifie la réponse d'un utilisateur.
 *
 * Les mots-clés restent côté serveur.
 * Le frontend ne reçoit jamais la solution.
 *
 * Règle de correction par mots-clés :
 * on n'exige plus 100% des mots-clés (trop strict), mais au moins
 * 60% d'entre eux, arrondi au-dessus. Cela tolère qu'un utilisateur
 * écrive une réponse valide mais légèrement différente de la
 * solution de référence.
 */
export async function soumettreTentative(
  utilisateurId: string,
  exerciceId: string,
  reponse: string,
  indicesUtilises: number
) {
  const exercice = await prisma.exercise.findUnique({
    where: {
      id: exerciceId,
    },
    select: {
      id: true,
      category: true,
      solution: true,
      keywords: true,
    },
  });

  if (!exercice) {
    return null;
  }

  const reponseNormalisee = normaliserReponse(
    reponse,
    exercice.category
  );

  let correcte = false;

  if (reponseNormalisee.length > 0) {
    if (exercice.keywords.length > 0) {
      const motsTrouves = exercice.keywords.filter((keyword) =>
        reponseNormalisee.includes(
          normaliserReponse(keyword, exercice.category)
        )
      ).length;

      const seuil = Math.ceil(exercice.keywords.length * 0.6);

      correcte = motsTrouves >= seuil;
    } else {
      correcte =
        reponseNormalisee ===
        normaliserReponse(exercice.solution, exercice.category);
    }
  }

  const resultat = await prisma.$transaction(async (tx) => {
    const tentative = await tx.exerciseAttempt.create({
      data: {
        userId: utilisateurId,
        exerciseId: exerciceId,
        userAnswer: reponse,
        correct: correcte,
        hintsUsed: indicesUtilises,
      },
      select: {
        id: true,
        exerciseId: true,
        correct: true,
        hintsUsed: true,
        createdAt: true,
      },
    });

    let progression = null;

    if (correcte) {
      progression = await tx.progress.upsert({
        where: {
          userId_categorie: {
            userId: utilisateurId,
            categorie: exercice.category,
          },
        },
        create: {
          userId: utilisateurId,
          categorie: exercice.category,
          compteur: 1,
        },
        update: {
          compteur: {
            increment: 1,
          },
        },
        select: {
          id: true,
          categorie: true,
          compteur: true,
        },
      });
    }

    return {
      tentative,
      progression,
    };
  });

  return resultat;
}

/**
 * Récupère l'historique des tentatives
 * de l'utilisateur pour un exercice.
 */
export async function listerTentativesUtilisateur(
  utilisateurId: string,
  exerciceId?: string
) {
  return prisma.exerciseAttempt.findMany({
    where: {
      userId: utilisateurId,
      ...(exerciceId
        ? { exerciseId: exerciceId }
        : {}),
    },
    select: {
      id: true,
      exerciseId: true,
      userAnswer: true,
      correct: true,
      hintsUsed: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Récupère la progression globale de l'utilisateur.
 */
export async function obtenirProgression(
  utilisateurId: string
) {
  return prisma.progress.findMany({
    where: {
      userId: utilisateurId,
    },
    select: {
      id: true,
      categorie: true,
      compteur: true,
    },
    orderBy: {
      categorie: "asc",
    },
  });
}

/**
 * Crée un nouvel exercice (réservé à l'admin).
 */
export async function creerExercice(donnees: {
  title: string;
  category: Category;
  difficulty: string;
  buggyCode: string;
  hint1: string;
  hint2: string;
  hint3: string;
  solution: string;
  keywords: string[];
}) {
  return prisma.exercise.create({
    data: donnees,
  });
}

/**
 * Modifie un exercice existant (réservé à l'admin).
 */
export async function modifierExercice(
  exerciceId: string,
  donnees: {
    title?: string;
    category?: Category;
    difficulty?: string;
    buggyCode?: string;
    hint1?: string;
    hint2?: string;
    hint3?: string;
    solution?: string;
    keywords?: string[];
  }
) {
  return prisma.exercise.update({
    where: { id: exerciceId },
    data: donnees,
  });
}

/**
 * Supprime un exercice (réservé à l'admin).
 */
export async function supprimerExercice(
  exerciceId: string
) {
  return prisma.exercise.delete({
    where: { id: exerciceId },
  });
}

/**
 * Liste complète des exercices pour l'admin,
 * incluant la solution et les mots-clés.
 */
export async function listerExercicesAdmin() {
  return prisma.exercise.findMany({
    orderBy: { createdAt: "desc" },
  });
}