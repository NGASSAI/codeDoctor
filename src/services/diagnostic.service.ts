
import { prisma } from "../base";

import type { Category } from "../generated/prisma/client";

import { REGLES_DIAGNOSTIC } from "../donnees/regles-diagnostic";

export interface DiagnosticResultat {
  regleId: string;
  code: string;
  titre: string;
  categorie: Category;
  severite: string;
  explication: string;
  cause: string;
  commentTrouver: string;
  correction: string;
  avant: string;
  apres: string;
}

/**
 * Recherche les règles correspondant au code fourni.
 *
 * Le moteur de diagnostic fonctionne localement :
 * - il récupère les règles correspondant à la catégorie ;
 * - il applique un détecteur spécifique à chaque règle ;
 * - il retourne uniquement les problèmes détectés.
 *
 * L'IA pourra être ajoutée plus tard comme couche complémentaire.
 */
export async function diagnostiquerCode(
  code: string,
  categorie: Category
): Promise<DiagnosticResultat[]> {
  if (!code.trim()) {
    return [];
  }

  const codeNormalise = code.toLowerCase();

  const regles = await prisma.rule.findMany({
    where: {
      category: categorie,
    },
    orderBy: {
      code: "asc",
    },
  });

  const resultats: DiagnosticResultat[] = [];

  for (const regle of regles) {
    const codeRegle = regle.code.toLowerCase();
    const titreRegle = regle.title.toLowerCase();

    let correspond = false;

    switch (regle.code) {
      // ========================================================
      // JAVASCRIPT
      // ========================================================

      /**
       * JS001
       *
       * Détecte une variable let/const utilisée avant sa déclaration.
       *
       * Exemple :
       *
       * console.log(nom);
       * const nom = "Jean";
       */
      case "JS001": {
        const declarationRegex =
          /\b(?:const|let)\s+([A-Za-z_$][\w$]*)\b/g;

        let match: RegExpExecArray | null;

        while ((match = declarationRegex.exec(code)) !== null) {
          const nomVariable = match[1];

if (!nomVariable) {
  continue;
}
          const positionDeclaration = match.index;

          const avantDeclaration = code.slice(0, positionDeclaration);

          const utilisationAvantDeclaration = new RegExp(
            `\\b${nomVariable.replace(
              /[$()*+.?[\\\]^{|}]/g,
              "\\$&"
            )}\\b`
          ).test(avantDeclaration);

          if (utilisationAvantDeclaration) {
            correspond = true;
            break;
          }
        }

        break;
      }

      /**
       * JS002
       *
       * Détecte des situations où une valeur peut être undefined.
       */
      case "JS002":
        correspond =
          /\b[A-Za-z_$][\w$]*\s*=\s*[\s\S]*?\.find\s*\(/i.test(code) ||
          /\b[A-Za-z_$][\w$]*\s*=\s*[\s\S]*?\.find\s*\([\s\S]*?\)/i.test(
            code
          ) ||
          /\b[A-Za-z_$][\w$]*\s*\?\.\s*[A-Za-z_$][\w$]*/i.test(code) ||
          /\bundefined\b/i.test(code);

        break;

      /**
       * JS003
       *
       * Détecte == et != sans les confondre avec === et !==.
       */
      case "JS003":
        correspond =
          /(^|[^=])==([^=]|$)/.test(code) ||
          /(^|[^!])!=([^=]|$)/.test(code);

        break;

      /**
       * JS004
       *
       * Détecte les opérations asynchrones qui ne semblent
       * pas disposer d'une gestion d'erreur.
       */
      case "JS004": {
        const operationAsynchrone =
          /\b(fetch|axios|Promise)\s*(?:<[^>]+>)?\s*\(/i.test(code) ||
          /\bawait\b/i.test(code) ||
          /\.then\s*\(/i.test(code);

        const gestionErreur =
          /\btry\s*\{/i.test(code) ||
          /\.catch\s*\(/i.test(code);

        correspond = operationAsynchrone && !gestionErreur;

        break;
      }

      /**
       * JS005
       *
       * Détecte les méthodes qui modifient directement un tableau.
       */
      case "JS005":
        correspond =
          /\.\s*(push|pop|splice|sort|shift|unshift)\s*\(/i.test(code);

        break;

      /**
       * JS006
       *
       * Détecte les conditions du type :
       *
       * role === "ADMIN" || "USER"
       */
      case "JS006":
        correspond =
          /\|\|\s*["'`][^"'`]+["'`]/.test(code) ||
          /\|\|\s*(?:true|false|\d+)\b/i.test(code);

        break;

      // ========================================================
      // TYPESCRIPT
      // ========================================================

      /**
       * TS001
       *
       * Détecte l'utilisation de any.
       */
      case "TS001":
        correspond = /\bany\b/.test(code);

        break;

      /**
       * TS002
       *
       * Détecte certaines valeurs potentiellement undefined.
       */
      case "TS002":
        correspond =
          /\?\s*:\s*[A-Za-z_$][\w$]*(?:\s*\[\])?\s*[;,\n=)]/.test(code) ||
          /\.find\s*\(/i.test(code) ||
          /\bundefined\b/i.test(code);

        break;

      /**
       * TS003
       *
       * Détection volontairement prudente d'une propriété
       * potentiellement inexistante.
       *
       * Le moteur local ne remplace pas le compilateur TypeScript.
       */
      case "TS003": {
        const interfaces = [
          ...code.matchAll(
            /\binterface\s+([A-Za-z_$][\w$]*)\s*\{([\s\S]*?)\}/g
          ),
        ];

        for (const interfaceMatch of interfaces) {
      const contenuInterface = interfaceMatch[2];

if (!contenuInterface) {
  continue;
}

          const proprietes = [
            ...contenuInterface.matchAll(
              /^\s*([A-Za-z_$][\w$]*)\s*[?!]?\s*:/gm
            ),
          ].map((match) => match[1]);

          if (proprietes.length === 0) {
            continue;
          }

          const objetUtilisation = new RegExp(
            `\\b([A-Za-z_$][\\w$]*)\\.([A-Za-z_$][\\w$]*)\\b`,
            "g"
          );

          let utilisation: RegExpExecArray | null;

          while ((utilisation = objetUtilisation.exec(code)) !== null) {
            const proprieteUtilisee = utilisation[2];

            if (!proprietes.includes(proprieteUtilisee)) {
              correspond = true;
              break;
            }
          }

          if (correspond) {
            break;
          }
        }

        break;
      }

      // ========================================================
      // REACT
      // ========================================================

      /**
       * RE001
       *
       * Détecte un map() JSX sans key.
       */
      case "RE001":
        correspond =
          /\.map\s*\(/i.test(code) &&
          /=>\s*\(?\s*</.test(code) &&
          /<[A-Za-z][^>]*>/i.test(code) &&
          !/\bkey\s*=/.test(code);

        break;

      /**
       * RE002
       *
       * Détecte un useEffect avec une dépendance extérieure
       * mais un tableau de dépendances vide.
       */
      case "RE002":
        correspond =
          /useEffect\s*\(/i.test(code) &&
          /\b(userId|user|data|id)\b/i.test(code) &&
          /,\s*\[\s*\]\s*\)/i.test(code);

        break;

      /**
       * RE003
       *
       * Détecte un setState utilisé directement dans useEffect.
       */
      case "RE003": {
        const effets = code.match(
          /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\}\s*,\s*\[[\s\S]*?\]\s*\)/gi
        );

        if (effets) {
          correspond = effets.some((effet) =>
            /\bset[A-Z][A-Za-z0-9_$]*\s*\(/.test(effet)
          );
        }

        break;
      }

      /**
       * RE004
       *
       * Détecte un Hook appelé dans un bloc conditionnel.
       */
      case "RE004":
        correspond =
          /if\s*\([^)]*\)\s*\{[\s\S]*?\b(useState|useEffect|useMemo|useCallback|useRef)\s*\(/i.test(
            code
          ) ||
          /(?:for|while)\s*\([^)]*\)\s*\{[\s\S]*?\b(useState|useEffect|useMemo|useCallback|useRef)\s*\(/i.test(
            code
          );

        break;

      // ========================================================
      // HTTP
      // ========================================================

      /**
       * HTTP001
       *
       * Détecte une réponse 200 contenant une erreur.
       */
      case "HTTP001":
        correspond =
          /status\s*\(\s*200\s*\)/i.test(code) &&
          /\b(erreur|error|introuvable|not found|failed)\b/i.test(code);

        break;

      /**
       * HTTP002
       *
       * Détecte req.body dans une route GET.
       */
      case "HTTP002":
        correspond =
          /\bapp\.get\s*\([^)]*,[\s\S]*?\breq\.body\b/i.test(code) ||
          /\brouter\.get\s*\([^)]*,[\s\S]*?\breq\.body\b/i.test(code);

        break;

      // ========================================================
      // API
      // ========================================================

      /**
       * API001
       *
       * Détecte une entrée utilisateur utilisée sans validation
       * apparente.
       */
      case "API001":
        correspond =
          /\breq\.(body|params|query)\b/i.test(code) &&
          !/\b(zod|joi|yup|validator|validate|safeParse|parse)\b/i.test(
            code
          );

        break;

      /**
       * API002
       *
       * Détecte async/await sans try/catch.
       */
      case "API002":
        correspond =
          /\basync\b/.test(code) &&
          /\bawait\b/.test(code) &&
          !/\btry\s*\{/i.test(code);

        break;

      /**
       * API003
       *
       * Détecte le retour direct d'un objet ORM avec res.json().
       */
      case "API003":
        correspond =
          /\b(prisma|sequelize|mongoose)\b/i.test(code) &&
          /\bres\.json\s*\(/i.test(code) &&
          !/\bselect\s*:/i.test(code);

        break;

      // ========================================================
      // HTML / CSS
      // ========================================================

      /**
       * HC001
       *
       * Détecte certains cas classiques d'imbrication HTML invalide.
       */
      case "HC001":
        correspond =
          /<p[^>]*>[\s\S]*?<div\b/i.test(code) ||
          /<div[^>]*>[\s\S]*?<p[^>]*>[\s\S]*?<\/p>[\s\S]*?<\/div>/i.test(
            code
          );

        break;

      /**
       * HC002
       *
       * Détecte les images sans attribut alt.
       */
      case "HC002":
        correspond =
          /<img\b(?![^>]*\balt\s*=)[^>]*>/i.test(code);

        break;

      // ========================================================
      // FALLBACK
      // ========================================================

      default:
        /**
         * Fallback pour les futures règles.
         *
         * Une règle est considérée comme pertinente si son code
         * ou son titre apparaît explicitement dans le code fourni.
         */
        correspond =
          codeNormalise.includes(codeRegle) ||
          codeNormalise.includes(titreRegle);

        break;
    }

    if (!correspond) {
      continue;
    }

    resultats.push({
      regleId: regle.id,
      code: regle.code,
      titre: regle.title,
      categorie: regle.category,
      severite: regle.severity,
      explication: regle.explanation,
      cause: regle.cause,
      commentTrouver: regle.howToFind,
      correction: regle.fixHint,
      avant: regle.beforeCode,
      apres: regle.afterCode,
    });
  }

  return resultats;
}

/**
 * Récupère toutes les règles de diagnostic enregistrées
 * en base de données.
 */
export async function listerReglesDiagnostic(
  categorie?: Category
) {
  const requete = {
    orderBy: [
      {
        category: "asc" as const,
      },
      {
        code: "asc" as const,
      },
    ],
    ...(categorie !== undefined
      ? {
          where: {
            category: categorie,
          },
        }
      : {}),
  };

  return prisma.rule.findMany(requete);
}

/**
 * Vérifie quelles règles du catalogue local
 * sont déjà présentes en base.
 */
export async function verifierCatalogueDiagnostic() {
  const resultats: Array<{
    code: string;
    presente: boolean;
    regleId: string | null;
  }> = [];

  for (const regle of REGLES_DIAGNOSTIC) {
    const existante = await prisma.rule.findUnique({
      where: {
        code: regle.code,
      },
      select: {
        id: true,
      },
    });

    resultats.push({
      code: regle.code,
      presente: Boolean(existante),
      regleId: existante?.id ?? null,
    });
  }

  return resultats;
}

