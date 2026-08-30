import { parse } from "@babel/parser";

import type { Category } from "../generated/prisma/client";
import type { DiagnosticResultat } from "./diagnostic.service";

export function verifierSyntaxe(
  code: string,
  categorie: Category
): DiagnosticResultat[] {
  const categoriesConcernees = ["JAVASCRIPT", "TYPESCRIPT", "REACT"];

  if (!categoriesConcernees.includes(categorie)) {
    return [];
  }

  const plugins: any[] = ["jsx"];

  if (categorie === "TYPESCRIPT" || categorie === "REACT") {
    plugins.push("typescript");
  }

  try {
    parse(code, {
      sourceType: "module",
      plugins,
      errorRecovery: false,
    });

    return [];
  } catch (erreur) {
    const erreurBabel = erreur as {
      message?: string;
      loc?: { line: number; column: number };
    };

    const ligne = erreurBabel.loc?.line ?? 0;
    const colonne = (erreurBabel.loc?.column ?? 0) + 1;
    const message = erreurBabel.message ?? "Erreur de syntaxe inconnue.";

    return [
      {
        regleId: "syntaxe-0",
        code: "SYNTAXE",
        titre: "Erreur de syntaxe",
        categorie,
        severite: "CRITIQUE",
        explication: `Le code contient une erreur de syntaxe à la ligne ${ligne}, colonne ${colonne} : ${message}`,
        cause:
          "Une construction du langage n'est pas correctement formée (accolade, parenthèse, point-virgule, etc.).",
        commentTrouver: `Regardez précisément la ligne ${ligne} de votre code.`,
        correction:
          "Corrigez la syntaxe à l'endroit indiqué avant de poursuivre l'analyse.",
        avant: "",
        apres: "",
      },
    ];
  }
}