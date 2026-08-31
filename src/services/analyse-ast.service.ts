import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import type { Category } from "../generated/prisma/client";

export interface DetectionAST {
  code: string;
  trouve: boolean;
}

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
 * Retourne uniquement les codes de règles trouvés.
 */
export function detecterViaAST(
  code: string,
  categorie: Category
): Set<string> {
  const resultats = new Set<string>();

  let ast;

  try {
    ast = construireAST(code, categorie);
  } catch {
    return resultats; // la syntaxe est déjà vérifiée en amont
  }

  traverse(ast, {
    // JS003 — comparaison non stricte (== ou !=)
    BinaryExpression(chemin) {
      if (["==", "!="].includes(chemin.node.operator)) {
        resultats.add("JS003");
      }
    },

    // TS001 — utilisation de "any"
    TSAnyKeyword() {
      resultats.add("TS001");
    },

    // RE001 — .map() JSX sans prop "key"
    JSXElement(chemin) {
      const parent = chemin.parentPath;

      const estDansMap =
        parent?.isArrowFunctionExpression() &&
        parent.parentPath?.isCallExpression() &&
        parent.parentPath.node.callee.type === "MemberExpression" &&
        parent.parentPath.node.callee.property.type === "Identifier" &&
        parent.parentPath.node.callee.property.name === "map";

      if (estDansMap) {
        const aKey = chemin.node.openingElement.attributes.some(
          (attr) =>
            attr.type === "JSXAttribute" && attr.name.name === "key"
        );

        if (!aKey) {
          resultats.add("RE001");
        }
      }
    },

    // Méthode unique regroupant toutes les vérifications d'appels de fonction
    CallExpression(chemin) {
      const callee = chemin.node.callee;

      // JS005 — mutation directe d'un tableau
      if (
        callee.type === "MemberExpression" &&
        callee.property.type === "Identifier" &&
        ["push", "pop", "splice", "sort", "shift", "unshift"].includes(
          callee.property.name
        )
      ) {
        resultats.add("JS005");
      }

      // RE004 — Hook appelé dans un bloc conditionnel
      if (
        callee.type === "Identifier" &&
        /^use[A-Z]/.test(callee.name)
      ) {
        let parent: typeof chemin.parentPath | null = chemin.parentPath;

        while (parent) {
          if (
            parent.isIfStatement() ||
            parent.isForStatement() ||
            parent.isWhileStatement()
          ) {
            resultats.add("RE004");
            break;
          }

          parent = parent.parentPath;
        }
      }
    },
  });

  return resultats;
}