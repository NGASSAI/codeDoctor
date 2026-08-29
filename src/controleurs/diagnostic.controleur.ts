import type { Request, Response } from "express";

import type { Category } from "../generated/prisma/client";
import { diagnostiquerCode } from "../services/diagnostic.service";

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
 */
export async function diagnostiquer(
  req: Request,
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