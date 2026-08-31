import { parse } from "@babel/parser";

import type { Category } from "../generated/prisma/client";

function construireAST(code: string, categorie: Category) {
  const plugins: any[] = ["jsx"];

  if (categorie === "TYPESCRIPT" || categorie === "REACT") {
    plugins.push("typescript");
  }

  return parse(code, {
    sourceType: "module",
    plugins,
    errorRecovery: true,
  });
}

/**
 * Exécute les détections basées sur l'AST pour une catégorie donnée.
 * Retourne les codes de règles (format réel : "JS-001", "REACT-001", etc.)
 * détectés dans le code.
 *
 * Les détecteurs seront ajoutés progressivement, catégorie par catégorie,
 * en utilisant les vrais codes de src/data/codeDoctorRules.ts.
 */
export function detecterViaAST(
  code: string,
  categorie: Category
): Set<string> {
  const resultats = new Set<string>();

  try {
    construireAST(code, categorie);
  } catch {
    return resultats;
  }

  // Détecteurs AST à ajouter ici, catégorie par catégorie.

  return resultats;
}