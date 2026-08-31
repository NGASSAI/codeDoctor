"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnostiquerCode = diagnostiquerCode;
exports.listerReglesDiagnostic = listerReglesDiagnostic;
exports.verifierCatalogueDiagnostic = verifierCatalogueDiagnostic;
const base_1 = require("../base");
const codeDoctorRules_1 = require("../data/codeDoctorRules");
const verification_syntaxe_service_1 = require("./verification-syntaxe.service");
const analyse_ast_service_1 = require("./analyse-ast.service");
/**
 * Recherche les règles correspondant au code fourni.
 *
 * Étapes :
 * 1. Vérification de la syntaxe réelle (Babel parser).
 * 2. Détections basées sur l'AST (règles migrées, une par une).
 * 3. Détections regex (fallback, pour les règles pas encore migrées).
 *
 * Les codes de règles utilisés ici doivent EXACTEMENT correspondre
 * à ceux définis dans src/data/codeDoctorRules.ts (format avec tiret,
 * ex: "JS-001", "REACT-001", "HTML-001").
 */
async function diagnostiquerCode(code, categorie) {
    if (!code.trim()) {
        return [];
    }
    // Étape 1 — erreurs de syntaxe réelles
    const erreursSyntaxe = (0, verification_syntaxe_service_1.verifierSyntaxe)(code, categorie);
    if (erreursSyntaxe.length > 0) {
        return erreursSyntaxe;
    }
    // Étape 2 — détections AST (à peupler progressivement)
    const detectionsAST = (0, analyse_ast_service_1.detecterViaAST)(code, categorie);
    // Étape 3 — moteur de règles
    const codeNormalise = code.toLowerCase();
    const regles = await base_1.prisma.rule.findMany({
        where: {
            category: categorie,
        },
        orderBy: {
            code: "asc",
        },
    });
    const resultats = [];
    for (const regle of regles) {
        const codeRegle = regle.code.toLowerCase();
        const titreRegle = regle.title.toLowerCase();
        let correspond = false;
        switch (regle.code) {
            // ========================================================
            // ========================================================
            // JAVASCRIPT
            // ========================================================
            /**
             * JS-001 — Utilisation de == au lieu de ===
             */
            case "JS-001":
                correspond = detectionsAST.has("JS-001");
                break;
            /**
             * JS-002 — Affectation utilisée dans une condition (if (age = 18))
             */
            case "JS-002":
                correspond =
                    /\bif\s*\(\s*[A-Za-z_$][\w$]*\s*=(?!=)[^=]/.test(code) ||
                        /\bwhile\s*\(\s*[A-Za-z_$][\w$]*\s*=(?!=)[^=]/.test(code);
                break;
            /**
             * JS-003 — Variable utilisée avant sa déclaration
             */
            case "JS-003": {
                const declarationRegex = /\b(?:const|let)\s+([A-Za-z_$][\w$]*)\b/g;
                let match;
                while ((match = declarationRegex.exec(code)) !== null) {
                    const nomVariable = match[1];
                    if (!nomVariable) {
                        continue;
                    }
                    const positionDeclaration = match.index;
                    const avantDeclaration = code.slice(0, positionDeclaration);
                    const utilisationAvantDeclaration = new RegExp(`\\b${nomVariable.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&")}\\b`).test(avantDeclaration);
                    if (utilisationAvantDeclaration) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-004 — Variable potentiellement non définie (faute de frappe)
             *
             * Détection prudente : une variable est utilisée dans console.log
             * ou retournée, mais son nom ne correspond à aucune déclaration.
             */
            case "JS-004": {
                const declarations = new Set();
                const declarationRegex = /\b(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/g;
                let matchDecl;
                while ((matchDecl = declarationRegex.exec(code)) !== null) {
                    if (matchDecl[1])
                        declarations.add(matchDecl[1]);
                }
                const paramsRegex = /function\s*\w*\s*\(([^)]*)\)/g;
                let matchParams;
                while ((matchParams = paramsRegex.exec(code)) !== null) {
                    const params = matchParams[1];
                    if (params) {
                        params
                            .split(",")
                            .map((p) => p.trim().split(/[\s=]/)[0])
                            .filter(Boolean)
                            .forEach((p) => declarations.add(p));
                    }
                }
                const utilisationRegex = /console\.log\(\s*([A-Za-z_$][\w$]*)\s*\)/g;
                let matchUsage;
                while ((matchUsage = utilisationRegex.exec(code)) !== null) {
                    const nomUtilise = matchUsage[1];
                    if (nomUtilise && !declarations.has(nomUtilise)) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-005 — Redéclaration incorrecte d'une variable let/const
             */
            case "JS-005": {
                const declarationRegex = /\b(?:const|let)\s+([A-Za-z_$][\w$]*)\b/g;
                const compteur = new Map();
                let match;
                while ((match = declarationRegex.exec(code)) !== null) {
                    const nom = match[1];
                    if (nom) {
                        compteur.set(nom, (compteur.get(nom) ?? 0) + 1);
                    }
                }
                correspond = [...compteur.values()].some((n) => n > 1);
                break;
            }
            /**
             * JS-006 — Utilisation inutile de var
             */
            case "JS-006":
                correspond = /\bvar\s+[A-Za-z_$]/.test(code);
                break;
            /**
             * JS-007 — Constante réassignée
             */
            case "JS-007": {
                const constDeclarationRegex = /\bconst\s+([A-Za-z_$][\w$]*)\s*=/g;
                let match;
                while ((match = constDeclarationRegex.exec(code)) !== null) {
                    const nom = match[1];
                    if (!nom)
                        continue;
                    const apresDeclaration = code.slice(match.index + match[0].length);
                    const reassignation = new RegExp(`\\b${nom}\\s*=(?!=)`).test(apresDeclaration);
                    if (reassignation) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-008 — Accès à une propriété d'une valeur potentiellement null
             *
             * Détecte un accès direct (.propriete) sur une variable qui a été
             * comparée à null ou undefined ailleurs dans le code, sans utiliser
             * l'accès optionnel (?.).
             */
            case "JS-008": {
                const comparaisonNullRegex = /\b([A-Za-z_$][\w$]*)\s*(?:===|==)\s*(?:null|undefined)\b/g;
                const variablesNullables = new Set();
                let matchNull;
                while ((matchNull = comparaisonNullRegex.exec(code)) !== null) {
                    if (matchNull[1])
                        variablesNullables.add(matchNull[1]);
                }
                for (const nom of variablesNullables) {
                    const accesDirect = new RegExp(`\\b${nom}\\.[A-Za-z_$]`).test(code);
                    const accesOptionnel = new RegExp(`\\b${nom}\\?\\.`).test(code);
                    if (accesDirect && !accesOptionnel) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-009 — Confusion entre null et undefined
             */
            case "JS-009":
                correspond =
                    /\bnull\b/.test(code) && /\bundefined\b/.test(code);
                break;
            /**
             * JS-010 — Utilisation dangereuse d'une propriété sans vérification
             *
             * Chaîne d'accès profonde (a.b.c) sans optional chaining.
             */
            case "JS-010":
                correspond =
                    /\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*){2,}\b/.test(code) &&
                        !/\?\./.test(code);
                break;
            /**
             * JS-011 — Fonction déclarée mais jamais appelée
             */
            case "JS-011": {
                const fonctionsDeclarees = [
                    ...code.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g),
                ]
                    .map((m) => m[1])
                    .filter(Boolean);
                for (const nom of fonctionsDeclarees) {
                    const appelRegex = new RegExp(`\\b${nom}\\s*\\(`, "g");
                    const occurrences = [...code.matchAll(appelRegex)];
                    // 1 occurrence = uniquement la déclaration, jamais appelée
                    if (occurrences.length <= 1) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-012 — Code placé après un return
             */
            case "JS-012":
                correspond =
                    /\breturn\b[^;{}]*;[\s\S]*?\n\s*[A-Za-z_$][\w$]*[\s\S]*?\n\s*\}/.test(code);
                break;
            /**
             * JS-013 — Paramètre manquant lors d'un appel de fonction
             *
             * Détection prudente : une fonction déclarée avec N paramètres
             * (sans valeur par défaut) est appelée avec 0 argument.
             */
            case "JS-013": {
                const fonctionsRegex = /\bfunction\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/g;
                let matchFn;
                while ((matchFn = fonctionsRegex.exec(code)) !== null) {
                    const nom = matchFn[1];
                    const params = matchFn[2];
                    if (!nom || !params?.trim())
                        continue;
                    const aDesParametresSansDefaut = params
                        .split(",")
                        .some((p) => !p.includes("="));
                    if (!aDesParametresSansDefaut)
                        continue;
                    const appelSansArgument = new RegExp(`\\b${nom}\\s*\\(\\s*\\)`).test(code);
                    if (appelSansArgument) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-014 — Mutation directe d'un tableau
             */
            case "JS-014":
                correspond = detectionsAST.has("JS-014");
                break;
            /**
             * JS-015 — Mutation directe d'un objet
             *
             * Affectation directe d'une propriété sur un objet existant
             * (nom.propriete = valeur), hors déclaration.
             */
            case "JS-015":
                correspond =
                    /\b[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*\s*=(?!=)/.test(code) &&
                        !/\bconst\b|\blet\b|\bvar\b/.test(code.split("\n").find((l) => /\.[A-Za-z_$][\w$]*\s*=(?!=)/.test(l)) ?? "");
                break;
            /**
             * JS-016 — Mauvaise utilisation de forEach pour produire une valeur
             */
            case "JS-016":
                correspond =
                    /\b(?:const|let)\s+[A-Za-z_$][\w$]*\s*=\s*[A-Za-z_$][\w$]*\.forEach\s*\(/.test(code);
                break;
            /**
             * JS-017 — Utilisation incorrecte de map pour un simple effet de bord
             *
             * .map() dont le résultat n'est ni assigné, ni retourné, ni utilisé.
             */
            case "JS-017":
                correspond =
                    /^\s*[A-Za-z_$][\w$]*\.map\s*\(/m.test(code) &&
                        !/\b(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*[A-Za-z_$][\w$]*\.map\s*\(/.test(code) &&
                        !/return\s+[A-Za-z_$][\w$]*\.map\s*\(/.test(code);
                break;
            /**
             * JS-018 — Index de tableau utilisé sans vérifier son existence
             */
            case "JS-018": {
                const accesIndexRegex = /\b([A-Za-z_$][\w$]*)\s*\[\s*[A-Za-z_$][\w$]*\s*\]/g;
                let matchIndex;
                while ((matchIndex = accesIndexRegex.exec(code)) !== null) {
                    const nomTableau = matchIndex[1];
                    if (!nomTableau)
                        continue;
                    const positionApres = matchIndex.index + matchIndex[0].length;
                    const suite = code.slice(positionApres, positionApres + 60);
                    // La variable obtenue est immédiatement utilisée avec un accès
                    // de propriété sans vérification préalable ni optional chaining.
                    const utiliseSansVerif = /^\s*\.\s*[A-Za-z_$]/.test(suite) &&
                        !/\?\./.test(suite);
                    if (utiliseSansVerif) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-019 — Promise non attendue avec await
             *
             * Une fonction se terminant par une convention async (obtenir/charger)
             * est appelée sans await ni .then().
             */
            case "JS-019":
                correspond =
                    /\b(?:const|let)\s+[A-Za-z_$][\w$]*\s*=\s*(obtenir|charger|recuperer|fetch)[A-Za-z_$]*\s*\([^)]*\)\s*;/.test(code) && !/\bawait\b/.test(code);
                break;
            /**
             * JS-020 — Erreur Promise non gérée
             *
             * Appel d'une fonction sans await, .then, .catch ni assignation.
             */
            case "JS-020":
                correspond =
                    /^\s*(obtenir|charger|recuperer|creer|supprimer|envoyer)[A-Za-z_$]*\s*\([^)]*\)\s*;\s*$/m.test(code) &&
                        !/\bawait\b/.test(code) &&
                        !/\.then\s*\(/.test(code) &&
                        !/\.catch\s*\(/.test(code);
                break;
            /**
             * JS-021 — Utilisation incorrecte de try/catch
             *
             * Un await se trouve avant le bloc try qui suit.
             */
            case "JS-021":
                correspond =
                    /\bawait\s+[^;]+;\s*\n\s*try\s*\{/.test(code);
                break;
            /**
             * JS-022 — Oubli du mot-clé await dans une fonction async
             */
            case "JS-022": {
                const estAsync = /\basync\s+function\b|\basync\s*\(/.test(code);
                if (!estAsync)
                    break;
                correspond =
                    /\b(?:const|let)\s+[A-Za-z_$][\w$]*\s*=\s*(obtenir|charger|recuperer|fetch)[A-Za-z_$]*\s*\([^)]*\)\s*;/.test(code) && !/\bawait\b/.test(code);
                break;
            }
            /**
             * JS-023 — Exécution séquentielle inutile de tâches indépendantes
             *
             * Deux await consécutifs vers des fonctions différentes, sans
             * Promise.all.
             */
            case "JS-023": {
                const awaitsRegex = /\bawait\s+[A-Za-z_$][\w$]*\s*\(/g;
                const occurrences = [...code.matchAll(awaitsRegex)];
                correspond =
                    occurrences.length >= 2 && !/Promise\.all/.test(code);
                break;
            }
            /**
             * JS-024 — Fonction async appelée sans gestion d'erreur
             */
            case "JS-024":
                correspond =
                    /^\s*[A-Za-z_$][\w$]*\s*\(\s*\)\s*;\s*$/m.test(code) &&
                        !/\btry\s*\{/.test(code) &&
                        !/\.catch\s*\(/.test(code) &&
                        !/\bawait\b/.test(code);
                break;
            /**
             * JS-025 — Condition toujours vraie (if (true))
             */
            case "JS-025":
                correspond = /\bif\s*\(\s*true\s*\)/.test(code);
                break;
            /**
             * JS-026 — Boucle potentiellement infinie
             *
             * while avec une variable de contrôle qui n'est jamais incrémentée
             * dans le corps de la boucle.
             */
            case "JS-026": {
                const whileRegex = /\bwhile\s*\(\s*([A-Za-z_$][\w$]*)\s*[<>]=?\s*[^)]+\)\s*\{([\s\S]*?)\}/g;
                let matchWhile;
                while ((matchWhile = whileRegex.exec(code)) !== null) {
                    const variable = matchWhile[1];
                    const corps = matchWhile[2];
                    if (!variable || corps === undefined)
                        continue;
                    const estIncrementee = new RegExp(`\\b${variable}\\s*(?:\\+\\+|--|\\+=|-=|=[^=])`).test(corps);
                    if (!estIncrementee) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-027 — return prématuré dans une boucle
             */
            case "JS-027": {
                const boucleForOfRegex = /\bfor\s*\(\s*const\s+[A-Za-z_$][\w$]*\s+of\s+[^)]+\)\s*\{([\s\S]*?)\}/g;
                let matchBoucle;
                while ((matchBoucle = boucleForOfRegex.exec(code)) !== null) {
                    const corps = matchBoucle[1];
                    if (corps && /\breturn\s*;/.test(corps)) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-028 — Opérateur logique utilisé incorrectement
             *
             * Combinaison de || et && sans parenthèses explicites.
             */
            case "JS-028":
                correspond =
                    /\|\|[^()]*&&|&&[^()]*\|\|/.test(code) &&
                        !/\([^()]*(?:&&|\|\|)[^()]*\)/.test(code);
                break;
            /**
             * JS-029 — Variable déclarée mais jamais utilisée
             */
            case "JS-029": {
                const declarationRegex = /\b(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=/g;
                let matchDecl;
                while ((matchDecl = declarationRegex.exec(code)) !== null) {
                    const nom = matchDecl[1];
                    if (!nom)
                        continue;
                    const positionApres = matchDecl.index + matchDecl[0].length;
                    const apresDeclaration = code.slice(positionApres);
                    const utilisee = new RegExp(`\\b${nom}\\b`).test(apresDeclaration);
                    if (!utilisee) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-030 — Code dupliqué
             *
             * Détection volontairement désactivée : nécessite une analyse
             * structurelle profonde pour être fiable. Laissé au fallback IA.
             */
            case "JS-030":
                correspond = false;
                break;
            /**
             * JS-031 — Fonction trop chargée
             *
             * Une fonction dépassant 40 lignes est considérée comme
             * potentiellement trop chargée.
             */
            case "JS-031": {
                const fonctionsRegex = /\bfunction\s+[A-Za-z_$][\w$]*\s*\([^)]*\)\s*\{/g;
                let matchFn;
                while ((matchFn = fonctionsRegex.exec(code)) !== null) {
                    const debut = matchFn.index;
                    const sousCode = code.slice(debut);
                    let profondeur = 0;
                    let fin = -1;
                    for (let i = 0; i < sousCode.length; i++) {
                        if (sousCode[i] === "{")
                            profondeur++;
                        if (sousCode[i] === "}") {
                            profondeur--;
                            if (profondeur === 0) {
                                fin = i;
                                break;
                            }
                        }
                    }
                    if (fin === -1)
                        continue;
                    const corpsFonction = sousCode.slice(0, fin);
                    const nombreLignes = corpsFonction.split("\n").length;
                    if (nombreLignes > 40) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * JS-032 — Valeur magique répétée
             *
             * Un même nombre littéral (hors 0 et 1) apparaît 3 fois ou plus.
             */
            case "JS-032": {
                const nombresRegex = /(?<![\w.])(\d{2,})(?![\w.])/g;
                const compteur = new Map();
                let matchNombre;
                while ((matchNombre = nombresRegex.exec(code)) !== null) {
                    const valeur = matchNombre[1];
                    if (valeur) {
                        compteur.set(valeur, (compteur.get(valeur) ?? 0) + 1);
                    }
                }
                correspond = [...compteur.values()].some((n) => n >= 3);
                break;
            }
            // ========================================================
            // FALLBACK — tant qu'une règle n'a pas de détecteur dédié
            // ========================================================
            default:
                correspond =
                    detectionsAST.has(regle.code) ||
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
 * Récupère toutes les règles de diagnostic enregistrées en base.
 */
async function listerReglesDiagnostic(categorie) {
    const requete = {
        orderBy: [
            { category: "asc" },
            { code: "asc" },
        ],
        ...(categorie !== undefined
            ? { where: { category: categorie } }
            : {}),
    };
    return base_1.prisma.rule.findMany(requete);
}
/**
 * Vérifie quelles règles du catalogue local (CODE_DOCTOR_RULES)
 * sont déjà présentes en base.
 */
async function verifierCatalogueDiagnostic() {
    const resultats = [];
    for (const regle of codeDoctorRules_1.CODE_DOCTOR_RULES) {
        const existante = await base_1.prisma.rule.findUnique({
            where: { code: regle.code },
            select: { id: true },
        });
        resultats.push({
            code: regle.code,
            presente: Boolean(existante),
            regleId: existante?.id ?? null,
        });
    }
    return resultats;
}
//# sourceMappingURL=diagnostic.service.js.map