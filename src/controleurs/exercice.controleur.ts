import { Request, Response } from "express";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

import {
  listerExercices,
  obtenirExercice,
  obtenirIndice,
  creerExercice,
  modifierExercice,
  supprimerExercice,
  listerExercicesAdmin, 
  soumettreTentative,
  listerTentativesUtilisateur,
  obtenirProgression,
} from "../services/exercice.service";

import { Category } from "../generated/prisma/client";

/**
 * Vérifie qu'une catégorie appartient bien
 * à l'enum Prisma Category.
 */
function categorieValide(
  categorie: unknown
): categorie is Category {
  return (
    typeof categorie === "string" &&
    Object.values(Category).includes(
      categorie as Category
    )
  );
}

/**
 * GET /api/exercices
 *
 * Liste les exercices.
 *
 * Filtres optionnels :
 * ?categorie=JAVASCRIPT
 * ?difficulte=FACILE
 */
export async function lister(
  req: Request,
  res: Response
) {
  try {
    const categorie = req.query.categorie;
    const difficulte = req.query.difficulte;

    if (
      categorie !== undefined &&
      !categorieValide(categorie)
    ) {
      return res.status(400).json({
        erreur: "Catégorie d'exercice invalide.",
      });
    }

    if (
      difficulte !== undefined &&
      typeof difficulte !== "string"
    ) {
      return res.status(400).json({
        erreur: "Difficulté invalide.",
      });
    }

    const exercices = await listerExercices(
      categorie as Category | undefined,
      difficulte as string | undefined
    );

    return res.status(200).json({
      exercices,
      total: exercices.length,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des exercices :",
      erreur
    );

    return res.status(500).json({
      erreur:
        "Impossible de récupérer les exercices.",
    });
  }
}

/**
 * GET /api/exercices/:id
 */
export async function obtenir(
  req: Request,
  res: Response
) {
  const idParam = req.params.id;

  if (typeof idParam !== "string" || !idParam.trim()) {
    return res.status(400).json({
      erreur: "Identifiant d'exercice invalide.",
    });
  }

  const id: string = idParam;

  try {
    const exercice = await obtenirExercice(id);

    if (!exercice) {
      return res.status(404).json({
        erreur: "Exercice introuvable.",
      });
    }

    return res.status(200).json({
      exercice,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de l'exercice :",
      erreur
    );

    return res.status(500).json({
      erreur:
        "Impossible de récupérer l'exercice.",
    });
  }
}

/**
 * GET /api/exercices/:id/indices/:numero
 */
export async function indice(
  req: Request,
  res: Response
) {
  const idParam = req.params.id;
  const numeroParam = req.params.numero;

  if (
    typeof idParam !== "string" ||
    !idParam.trim()
  ) {
    return res.status(400).json({
      erreur: "Identifiant d'exercice invalide.",
    });
  }

  if (
    typeof numeroParam !== "string" ||
    !numeroParam.trim()
  ) {
    return res.status(400).json({
      erreur: "Numéro d'indice invalide.",
    });
  }

  const id: string = idParam;
  const numero = Number.parseInt(numeroParam, 10);

  if (![1, 2, 3].includes(numero)) {
    return res.status(400).json({
      erreur:
        "Le numéro d'indice doit être compris entre 1 et 3.",
    });
  }

  try {
    const resultat = await obtenirIndice(
      id,
      numero
    );

    if (!resultat) {
      return res.status(404).json({
        erreur: "Exercice introuvable.",
      });
    }

    return res.status(200).json(resultat);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de l'indice :",
      erreur
    );

    return res.status(500).json({
      erreur:
        "Impossible de récupérer l'indice.",
    });
  }
}

/**
 * POST /api/exercices/:id/tenter
 *
 * Body :
 * {
 *   "reponse": "...",
 *   "indicesUtilises": 0
 * }
 */
export async function tenter(
  req: RequeteAuthentifiee,
  res: Response
) {
  const utilisateurId = req.utilisateurId;
  const idParam = req.params.id;

  if (!utilisateurId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  if (
    typeof idParam !== "string" ||
    !idParam.trim()
  ) {
    return res.status(400).json({
      erreur: "Identifiant d'exercice invalide.",
    });
  }

  const id: string = idParam;

  const { reponse, indicesUtilises } = req.body;

  if (
    typeof reponse !== "string" ||
    !reponse.trim()
  ) {
    return res.status(400).json({
      erreur: "Votre réponse est requise.",
    });
  }

  if (
    indicesUtilises !== undefined &&
    (
      typeof indicesUtilises !== "number" ||
      !Number.isInteger(indicesUtilises) ||
      indicesUtilises < 0 ||
      indicesUtilises > 3
    )
  ) {
    return res.status(400).json({
      erreur:
        "Le nombre d'indices utilisés doit être compris entre 0 et 3.",
    });
  }

  const nombreIndices = indicesUtilises ?? 0;

  try {
    const resultat = await soumettreTentative(
      utilisateurId,
      id,
      reponse,
      nombreIndices
    );

    if (!resultat) {
      return res.status(404).json({
        erreur: "Exercice introuvable.",
      });
    }

    return res.status(200).json({
      succes: true,
      correct: resultat.tentative.correct,
      tentative: resultat.tentative,
      progression: resultat.progression,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la soumission de la tentative :",
      erreur
    );

    return res.status(500).json({
      erreur:
        "Impossible d'enregistrer votre tentative.",
    });
  }
}

/**
 * GET /api/exercices/mes-tentatives
 *
 * Historique des tentatives de l'utilisateur connecté.
 */
export async function mesTentatives(
  req: RequeteAuthentifiee,
  res: Response
) {
  const utilisateurId = req.utilisateurId;

  if (!utilisateurId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  const exerciceId =
    typeof req.query.exerciceId === "string"
      ? req.query.exerciceId
      : undefined;

  try {
    const tentatives =
      await listerTentativesUtilisateur(
        utilisateurId,
        exerciceId
      );

    return res.status(200).json({
      tentatives,
      total: tentatives.length,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des tentatives :",
      erreur
    );

    return res.status(500).json({
      erreur:
        "Impossible de récupérer vos tentatives.",
    });
  }
}

/**
 * GET /api/exercices/ma-progression
 */
export async function maProgression(
  req: RequeteAuthentifiee,
  res: Response
) {
  const utilisateurId = req.utilisateurId;

  if (!utilisateurId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  try {
    const progression =
      await obtenirProgression(
        utilisateurId
      );

    return res.status(200).json({
      progression,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de la progression :",
      erreur
    );

    return res.status(500).json({
      erreur:
        "Impossible de récupérer votre progression.",
    });
  }
}
const DIFFICULTES_VALIDES = ["FACILE", "MOYEN", "DIFFICILE"];

function difficulteValide(valeur: unknown): valeur is string {
  return (
    typeof valeur === "string" &&
    DIFFICULTES_VALIDES.includes(valeur.toUpperCase())
  );
}

function validerDonneesExercice(body: unknown): {
  valide: boolean;
  erreur?: string;
  donnees?: {
    title: string;
    category: Category;
    difficulty: string;
    buggyCode: string;
    hint1: string;
    hint2: string;
    hint3: string;
    solution: string;
    keywords: string[];
  };
} {
  const {
    title,
    category,
    difficulty,
    buggyCode,
    hint1,
    hint2,
    hint3,
    solution,
    keywords,
  } = body as Record<string, unknown>;

  if (typeof title !== "string" || !title.trim()) {
    return { valide: false, erreur: "Le titre est requis." };
  }

  if (!categorieValide(category)) {
    return { valide: false, erreur: "Catégorie invalide." };
  }

  if (!difficulteValide(difficulty)) {
    return {
      valide: false,
      erreur: "La difficulté doit être FACILE, MOYEN ou DIFFICILE.",
    };
  }

  if (typeof buggyCode !== "string" || !buggyCode.trim()) {
    return {
      valide: false,
      erreur: "Le code buggé est requis.",
    };
  }

  if (
    typeof hint1 !== "string" ||
    typeof hint2 !== "string" ||
    typeof hint3 !== "string" ||
    !hint1.trim() ||
    !hint2.trim() ||
    !hint3.trim()
  ) {
    return {
      valide: false,
      erreur: "Les 3 indices sont requis.",
    };
  }

  if (typeof solution !== "string" || !solution.trim()) {
    return {
      valide: false,
      erreur: "La solution est requise.",
    };
  }

  if (
    !Array.isArray(keywords) ||
    !keywords.every((k) => typeof k === "string")
  ) {
    return {
      valide: false,
      erreur: "Les mots-clés doivent être une liste de textes.",
    };
  }

  return {
    valide: true,
    donnees: {
      title: title.trim(),
      category,
      difficulty: difficulty.toUpperCase(),
      buggyCode,
      hint1: hint1.trim(),
      hint2: hint2.trim(),
      hint3: hint3.trim(),
      solution: solution.trim(),
      keywords: keywords.map((k) => k.trim()).filter(Boolean),
    },
  };
}

/**
 * GET /api/exercices/admin/tous
 *
 * Liste complète pour l'admin (avec solution et mots-clés).
 */
export async function listerPourAdmin(
  req: Request,
  res: Response
) {
  try {
    const exercices = await listerExercicesAdmin();

    return res.status(200).json({
      exercices,
      total: exercices.length,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des exercices (admin) :",
      erreur
    );

    return res.status(500).json({
      erreur: "Impossible de récupérer les exercices.",
    });
  }
}

/**
 * POST /api/exercices/admin
 *
 * Crée un exercice.
 */
export async function creer(
  req: Request,
  res: Response
) {
  const validation = validerDonneesExercice(req.body);

  if (!validation.valide || !validation.donnees) {
    return res.status(400).json({
      erreur: validation.erreur,
    });
  }

  try {
    const exercice = await creerExercice(validation.donnees);

    return res.status(201).json({
      message: "Exercice créé avec succès.",
      exercice,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la création de l'exercice :",
      erreur
    );

    return res.status(500).json({
      erreur: "Impossible de créer l'exercice.",
    });
  }
}

/**
 * PUT /api/exercices/admin/:id
 *
 * Modifie un exercice.
 */
export async function modifier(
  req: Request,
  res: Response
) {
  const idParam = req.params.id;

  if (typeof idParam !== "string" || !idParam.trim()) {
    return res.status(400).json({
      erreur: "Identifiant d'exercice invalide.",
    });
  }

  const validation = validerDonneesExercice(req.body);

  if (!validation.valide || !validation.donnees) {
    return res.status(400).json({
      erreur: validation.erreur,
    });
  }

  try {
    const exercice = await modifierExercice(
      idParam,
      validation.donnees
    );

    return res.status(200).json({
      message: "Exercice modifié avec succès.",
      exercice,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la modification de l'exercice :",
      erreur
    );

    return res.status(500).json({
      erreur: "Impossible de modifier l'exercice.",
    });
  }
}

/**
 * DELETE /api/exercices/admin/:id
 *
 * Supprime un exercice.
 */
export async function supprimer(
  req: Request,
  res: Response
) {
  const idParam = req.params.id;

  if (typeof idParam !== "string" || !idParam.trim()) {
    return res.status(400).json({
      erreur: "Identifiant d'exercice invalide.",
    });
  }

  try {
    await supprimerExercice(idParam);

    return res.status(200).json({
      message: "Exercice supprimé avec succès.",
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la suppression de l'exercice :",
      erreur
    );

    return res.status(500).json({
      erreur: "Impossible de supprimer l'exercice.",
    });
  }
} 