import type { Request, Response } from "express";

import type { Category } from "../generated/prisma/client";
import { diagnostiquerCode, listerReglesDiagnostic } from "../services/diagnostic.service";
import { creerHistorique } from "../services/historique.service";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

const CATEGORIES_DIAGNOSTIC = [
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "HTTP",
  "API",
  "HTML_CSS",
] as const;

type CategorieDiagnostic =
  (typeof CATEGORIES_DIAGNOSTIC)[number];

function estCategorieValide(
  valeur: string
): valeur is CategorieDiagnostic {
  return CATEGORIES_DIAGNOSTIC.includes(
    valeur as CategorieDiagnostic
  );
}

/**
 * POST /api/diagnostic
 *
 * Analyse un code avec le moteur de règles local.
 *
 * L'IA n'intervient pas ici.
 *
 * Si l'utilisateur est connecté et qu'au moins un problème
 * est détecté, une entrée est ajoutée à son historique.
 */
export async function diagnostiquer(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const { code, categorie } = req.body as {
      code?: unknown;
      categorie?: unknown;
    };

    if (typeof code !== "string" || !code.trim()) {
      return res.status(400).json({
        succes: false,
        erreur: "Le code à analyser est requis.",
      });
    }

    if (
      typeof categorie !== "string" ||
      !estCategorieValide(categorie)
    ) {
      return res.status(400).json({
        succes: false,
        erreur: "La catégorie fournie est invalide.",
        categories: CATEGORIES_DIAGNOSTIC,
      });
    }

    const resultats = await diagnostiquerCode(
      code,
      categorie as Category
    );

    const utilisateurId = req.utilisateurId;

    if (utilisateurId && resultats.length > 0) {
      const premierResultat = resultats[0];

      try {
        await creerHistorique(utilisateurId, {
          categorie: categorie as Category,
          titre: `Analyse ${categorie} — ${resultats.length} problème${
            resultats.length > 1 ? "s" : ""
          } détecté${resultats.length > 1 ? "s" : ""}`,
          severite: premierResultat?.severite as any,
          extrait: code.slice(0, 2000),
        });
      } catch (erreurHistorique) {
        console.error(
          "Erreur enregistrement historique (diagnostic) :",
          erreurHistorique
        );
        // On n'interrompt pas la réponse principale pour autant.
      }
    }

    return res.status(200).json({
      succes: true,
      categorie,
      nombreProblemes: resultats.length,
      resultats,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors du diagnostic :",
      erreur
    );

    return res.status(500).json({
      succes: false,
      erreur:
        "Impossible d'effectuer le diagnostic.",
    });
  }
}

/**
 * GET /api/diagnostic/capacites
 */
export async function listerCapacites(
  req: Request,
  res: Response
) {
  try {
    const categorie = req.query.categorie as string | undefined;

    const regles = await listerReglesDiagnostic(
      categorie && estCategorieValide(categorie)
        ? (categorie as Category)
        : undefined
    );

    const capacites = regles.map((regle) => ({
      code: regle.code,
      titre: regle.title,
      categorie: regle.category,
      severite: regle.severity,
    }));

    return res.status(200).json({ capacites });
  } catch (erreur) {
    console.error("Erreur récupération capacités :", erreur);

    return res.status(500).json({
      erreur: "Impossible de récupérer les capacités du moteur.",
    });
  }
}