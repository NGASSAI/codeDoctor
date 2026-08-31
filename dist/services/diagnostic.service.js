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
            //----------------------------------------------------------------------
            // ========================================================
            // TYPESCRIPT
            // ========================================================
            /**
             * TS-001 — Utilisation excessive de any
             */
            case "TS-001":
                correspond = detectionsAST.has("TS-001");
                break;
            /**
             * TS-002 — Paramètre de fonction non typé
             *
             * Un paramètre de fonction sans annotation ":" dans un contexte
             * TypeScript.
             */
            case "TS-002": {
                const fonctionsRegex = /\bfunction\s+[A-Za-z_$][\w$]*\s*\(([^)]*)\)/g;
                let matchFn;
                while ((matchFn = fonctionsRegex.exec(code)) !== null) {
                    const params = matchFn[1];
                    if (!params?.trim())
                        continue;
                    const parametresSansType = params
                        .split(",")
                        .map((p) => p.trim())
                        .filter(Boolean)
                        .some((p) => !p.includes(":"));
                    if (parametresSansType) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * TS-003 — Retour de fonction non typé
             *
             * function nom(...) { sans ": Type" avant l'accolade.
             */
            case "TS-003":
                correspond =
                    /\bfunction\s+[A-Za-z_$][\w$]*\s*\([^)]*\)\s*\{/.test(code) &&
                        !/\bfunction\s+[A-Za-z_$][\w$]*\s*\([^)]*\)\s*:\s*[A-Za-z_$]/.test(code);
                break;
            /**
             * TS-004 — Interface préférable pour une structure réutilisée
             *
             * Un objet de type inline ({ nom: string; age: number }) utilisé
             * directement dans une signature de fonction.
             */
            case "TS-004":
                correspond =
                    /\([^)]*:\s*\{[^}]*;[^}]*\}[^)]*\)/.test(code);
                break;
            /**
             * TS-005 — unknown préférable à any pour une donnée inconnue
             *
             * any utilisé sur un paramètre dont le nom suggère une donnée
             * externe (data, response, payload, body).
             */
            case "TS-005":
                correspond =
                    /\b(data|response|payload|body|reponse|donnees)\s*:\s*any\b/i.test(code);
                break;
            /**
         * TS-006 — Non-null assertion utilisée sans garantie
         */
            case "TS-006":
                correspond = /[\w$)\]]!(?![=\w])/.test(code);
                break;
            /**
             * TS-007 — Type union non vérifié
             *
             * Un paramètre typé avec une union (string | number) utilisé
             * directement avec une méthode spécifique à un seul type,
             * sans vérification typeof/instanceof préalable.
             */
            case "TS-007":
                correspond =
                    /:\s*[A-Za-z_$][\w$]*\s*\|\s*[A-Za-z_$][\w$]*/.test(code) &&
                        !/\btypeof\b|\binstanceof\b/.test(code);
                break;
            /**
             * TS-008 — Enum ou union non respecté
             *
             * Détection prudente : une variable typée avec un type union
             * de chaînes littérales reçoit une valeur qui n'apparaît pas
             * dans la liste des littéraux du type.
             */
            case "TS-008": {
                const unionTypeRegex = /type\s+([A-Za-z_$][\w$]*)\s*=\s*((?:"[^"]+"\s*\|\s*)*"[^"]+")/g;
                let matchType;
                while ((matchType = unionTypeRegex.exec(code)) !== null) {
                    const nomType = matchType[1];
                    const litteraux = matchType[2];
                    if (!nomType || !litteraux)
                        continue;
                    const valeursAutorisees = [
                        ...litteraux.matchAll(/"([^"]+)"/g),
                    ].map((m) => m[1]);
                    const utilisationRegex = new RegExp(`:\\s*${nomType}\\s*=\\s*"([^"]+)"`);
                    const matchUtilisation = utilisationRegex.exec(code);
                    if (matchUtilisation &&
                        matchUtilisation[1] &&
                        !valeursAutorisees.includes(matchUtilisation[1])) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            //----------------------------------------------
            // ========================================================
            // REACT
            // ========================================================
            /**
             * REACT-001 — Mutation directe du state
             *
             * Une variable issue de useState est réassignée directement
             * (sans passer par son setter).
             */
            case "REACT-001": {
                const useStateRegex = /const\s*\[\s*([A-Za-z_$][\w$]*)\s*,\s*set[A-Z][A-Za-z0-9_$]*\s*\]\s*=\s*useState/g;
                let matchState;
                while ((matchState = useStateRegex.exec(code)) !== null) {
                    const nomState = matchState[1];
                    if (!nomState)
                        continue;
                    const reassignationRegex = new RegExp(`\\b${nomState}\\s*=(?!=)`).test(code);
                    if (reassignationRegex) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * REACT-002 — Mutation directe d'un tableau dans le state
             */
            case "REACT-002":
                correspond = detectionsAST.has("REACT-002");
                break;
            /**
             * REACT-003 — Mutation directe d'un objet dans le state
             *
             * Affectation directe sur une propriété d'une variable de state.
             */
            case "REACT-003": {
                const useStateRegex = /const\s*\[\s*([A-Za-z_$][\w$]*)\s*,\s*set[A-Z][A-Za-z0-9_$]*\s*\]\s*=\s*useState/g;
                let matchState;
                while ((matchState = useStateRegex.exec(code)) !== null) {
                    const nomState = matchState[1];
                    if (!nomState)
                        continue;
                    const mutationPropriete = new RegExp(`\\b${nomState}\\.[A-Za-z_$][\\w$]*\\s*=(?!=)`).test(code);
                    if (mutationPropriete) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * REACT-004 — useEffect utilisé pour une valeur dérivée
             *
             * useEffect dont le corps ne fait qu'un seul setState calculable
             * directement à partir d'autres valeurs.
             */
            case "REACT-004": {
                const effets = code.match(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*,\s*\[[^\]]*\]\s*\)/g);
                if (effets) {
                    correspond = effets.some((effet) => {
                        const corps = effet.match(/\{([\s\S]*)\}/)?.[1]?.trim() ?? "";
                        const instructions = corps
                            .split(";")
                            .map((i) => i.trim())
                            .filter(Boolean);
                        return (instructions.length === 1 &&
                            /^set[A-Z][A-Za-z0-9_$]*\s*\(/.test(instructions[0] ?? ""));
                    });
                }
                break;
            }
            /**
             * REACT-005 — Hook utilisé conditionnellement
             */
            case "REACT-005":
                correspond = detectionsAST.has("REACT-005");
                break;
            /**
             * REACT-006 — Hook placé après un return conditionnel
             *
             * Un "return" apparaît avant un appel useState/useEffect/etc.
             * dans le corps du composant.
             */
            case "REACT-006": {
                const returnRegex = /\breturn\b/g;
                const hookRegex = /\b(useState|useEffect|useMemo|useCallback|useRef|useContext)\s*\(/g;
                const matchReturn = returnRegex.exec(code);
                const matchHook = hookRegex.exec(code);
                correspond = Boolean(matchReturn &&
                    matchHook &&
                    matchReturn.index < matchHook.index);
                break;
            }
            /**
             * REACT-007 — Absence de key stable dans une liste
             */
            case "REACT-007":
                correspond = detectionsAST.has("REACT-007");
                break;
            /**
             * REACT-008 — Index utilisé comme key pour une liste dynamique
             */
            case "REACT-008":
                correspond =
                    /\.map\s*\(\s*\([^,)]+,\s*index\s*\)\s*=>[\s\S]*?key\s*=\s*\{?\s*index\s*\}?/.test(code);
                break;
            /**
             * REACT-009 — Effet avec dépendance manquante
             *
             * useEffect avec un tableau de dépendances vide alors qu'une
             * variable extérieure (prop/state courant) est utilisée dedans.
             */
            case "REACT-009":
                correspond = detectionsAST.has("REACT-009");
                break;
            /**
             * REACT-010 — Effet provoquant potentiellement une boucle de rendu
             *
             * useEffect qui modifie un state présent dans ses propres
             * dépendances.
             */
            case "REACT-010": {
                const effets = [
                    ...code.matchAll(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*,\s*\[([^\]]*)\]\s*\)/g),
                ];
                for (const effet of effets) {
                    const corps = effet[1];
                    const dependances = effet[2];
                    if (!corps || dependances === undefined)
                        continue;
                    const deps = dependances
                        .split(",")
                        .map((d) => d.trim())
                        .filter(Boolean);
                    const modifieUneDependance = deps.some((dep) => new RegExp(`\\bset${dep.charAt(0).toUpperCase()}${dep.slice(1)}\\s*\\(`).test(corps));
                    if (modifieUneDependance) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * REACT-011 — Effet sans nettoyage pour une ressource externe
             */
            case "REACT-011": {
                const effetsAvecRessource = code.match(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\}\s*,/g);
                if (effetsAvecRessource) {
                    correspond = effetsAvecRessource.some((effet) => /(addEventListener|setInterval|setTimeout|subscribe|new WebSocket)/.test(effet) &&
                        !/(removeEventListener|clearInterval|clearTimeout|unsubscribe|\.close\s*\()/.test(effet));
                }
                break;
            }
            /**
             * REACT-012 — setState utilisé avec une ancienne valeur dans
             * plusieurs mises à jour
             *
             * Deux appels consécutifs à un setter avec la même variable
             * de state en argument direct (non fonctionnel).
             */
            case "REACT-012": {
                const setterRegex = /\bset([A-Z][A-Za-z0-9_$]*)\s*\(\s*([A-Za-z_$][\w$]*)\s*\+/g;
                const occurrences = [...code.matchAll(setterRegex)];
                const compteur = new Map();
                for (const m of occurrences) {
                    const cle = `${m[1]}-${m[2]}`;
                    compteur.set(cle, (compteur.get(cle) ?? 0) + 1);
                }
                correspond = [...compteur.values()].some((n) => n > 1);
                break;
            }
            /**
             * REACT-013 — Effet utilisé pour répondre directement à une
             * action utilisateur
             *
             * useEffect déclenché par un état booléen représentant un
             * événement ponctuel (envoye, submitted, clicked...).
             */
            case "REACT-013":
                correspond =
                    /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\}\s*,\s*\[\s*(envoye|submitted|clicked|clique|valide)\s*\]\s*\)/i.test(code);
                break;
            //----------------------------------------
            // ========================================================
            // HTTP
            // ========================================================
            /**
             * HTTP-001 — Mauvaise méthode HTTP pour l'opération
             *
             * fetch avec method: "GET" mais un body présent dans les options.
             */
            case "HTTP-001":
                correspond =
                    /method\s*:\s*["']GET["'][\s\S]{0,150}?\bbody\s*:/i.test(code) ||
                        /\bbody\s*:[\s\S]{0,150}?method\s*:\s*["']GET["']/i.test(code);
                break;
            /**
             * HTTP-002 — Absence de vérification de response.ok
             *
             * fetch suivi directement de response.json() sans test
             * response.ok / response.status.
             */
            case "HTTP-002":
                correspond =
                    /\bfetch\s*\([^)]*\)/.test(code) &&
                        /\.json\s*\(\s*\)/.test(code) &&
                        !/\.ok\b/.test(code) &&
                        !/\.status\b/.test(code);
                break;
            /**
             * HTTP-003 — Mauvais code de statut HTTP
             *
             * status(200) accompagné d'un champ d'erreur dans la réponse.
             */
            case "HTTP-003":
                correspond =
                    /status\s*\(\s*200\s*\)/i.test(code) &&
                        /\b(erreur|error|introuvable|not found|failed|echec)\b/i.test(code);
                break;
            /**
             * HTTP-004 — Création de ressource sans statut approprié
             *
             * Route POST qui renvoie status(200) au lieu de 201.
             */
            case "HTTP-004":
                correspond =
                    /\b(?:app|router)\.post\s*\(/.test(code) &&
                        /status\s*\(\s*200\s*\)/.test(code) &&
                        !/status\s*\(\s*201\s*\)/.test(code);
                break;
            /**
             * HTTP-005 — Corps JSON envoyé sans Content-Type
             */
            case "HTTP-005":
                correspond =
                    /body\s*:\s*JSON\.stringify\s*\(/.test(code) &&
                        !/Content-Type/i.test(code);
                break;
            /**
             * HTTP-006 — Endpoint sensible sans authentification
             *
             * Route dont le chemin suggère une ressource privée, définie
             * sans middleware d'authentification.
             */
            case "HTTP-006": {
                const routeRegex = /\b(?:app|router)\.(get|post|put|patch|delete)\s*\(\s*["'`]([^"'`]*(?:profil|compte|prive|admin|moi|me)[^"'`]*)["'`]\s*,\s*([^)]*)\)/gi;
                let matchRoute;
                while ((matchRoute = routeRegex.exec(code)) !== null) {
                    const handlers = matchRoute[3];
                    if (handlers &&
                        !/authentification/i.test(handlers) &&
                        !/authMiddleware/i.test(handlers)) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            // ========================================================
            // API
            // ========================================================
            /**
             * API-001 — Données utilisateur non validées
             */
            case "API-001":
                correspond =
                    /\breq\.(body|params|query)\b/i.test(code) &&
                        !/\b(zod|joi|yup|validator|validate|safeParse|parse|schema)\b/i.test(code);
                break;
            /**
             * API-002 — Erreur interne exposée au client
             *
             * L'objet error (ou sa stack) est directement renvoyé au client.
             */
            case "API-002":
                correspond =
                    /catch\s*\(\s*(error|erreur)\s*\)\s*\{[\s\S]*?res\.(json|send)\s*\(\s*\{[^}]*\b(error|erreur)\s*[,:}]/i.test(code) ||
                        /res\.(json|send)\s*\([^)]*\.stack\b/i.test(code);
                break;
            /**
             * API-003 — Route utilisant une donnée d'identité fournie par
             * le client
             */
            case "API-003":
                correspond =
                    /const\s*\{\s*userId\s*\}\s*=\s*req\.body/i.test(code) ||
                        /req\.body\.userId\b/i.test(code) ||
                        /req\.params\.userId\b/i.test(code);
                break;
            /**
             * API-004 — Absence de contrôle d'autorisation
             *
             * Route sensible (supprimer/admin) avec authentification mais
             * sans vérification de rôle.
             */
            case "API-004":
                correspond =
                    /authentificationMiddleware/i.test(code) &&
                        /\b(supprimer|admin)/i.test(code) &&
                        !/\b(adminMiddleware|verifierRole|role\s*===?\s*["']ADMIN["'])/i.test(code);
                break;
            /**
             * API-005 — Absence de gestion d'une ressource inexistante
             *
             * Résultat de findUnique/findFirst utilisé directement sans
             * vérification préalable.
             */
            case "API-005": {
                const rechercheRegex = /const\s+([A-Za-z_$][\w$]*)\s*=\s*await\s+[\s\S]*?\.(findUnique|findFirst)\s*\(/g;
                let matchRecherche;
                while ((matchRecherche = rechercheRegex.exec(code)) !== null) {
                    const nomVariable = matchRecherche[1];
                    if (!nomVariable)
                        continue;
                    const positionApres = matchRecherche.index + matchRecherche[0].length;
                    const suite = code.slice(positionApres);
                    const verifieExistence = new RegExp(`if\\s*\\(\\s*!\\s*${nomVariable}\\b`).test(suite);
                    const utiliseDirectement = new RegExp(`\\b${nomVariable}\\.[A-Za-z_$]`).test(suite);
                    if (utiliseDirectement && !verifieExistence) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * API-006 — Absence de limitation d'une entrée volumineuse
             *
             * Une donnée reçue (code, texte) est utilisée sans vérification
             * de longueur maximale.
             */
            case "API-006":
                correspond =
                    /const\s*\{\s*code\s*\}\s*=\s*req\.body/i.test(code) &&
                        !/\.length\s*[<>]/.test(code);
                break;
            /**
             * API-007 — Opération sensible sans rate limiting
             */
            case "API-007":
                correspond =
                    /\b(?:app|router)\.(post|get)\s*\(\s*["'`][^"'`]*(connexion|login|reset|analyser|inscription)[^"'`]*["'`]/i.test(code) && !/rateLimit/i.test(code);
                break;
            /**
             * API-008 — Données sensibles enregistrées dans les logs
             */
            case "API-008":
                correspond =
                    /console\.log\s*\([^)]*req\.body[^)]*\)/i.test(code) ||
                        /console\.log\s*\([^)]*\b(password|motDePasse|token|secret)\b[^)]*\)/i.test(code);
                break;
            /**
             * API-009 — Réponse API non normalisée
             *
             * Détection volontairement désactivée : nécessite de comparer
             * plusieurs endpoints entre eux, hors de portée d'une analyse
             * ligne à ligne. Laissé au fallback IA.
             */
            case "API-009":
                correspond = false;
                break;
            /**
             * API-010 — Absence de validation d'un paramètre d'URL
             */
            case "API-010": {
                const paramRegex = /const\s+([A-Za-z_$][\w$]*)\s*=\s*req\.params\.[A-Za-z_$][\w$]*/g;
                let matchParam;
                while ((matchParam = paramRegex.exec(code)) !== null) {
                    const nomVariable = matchParam[1];
                    if (!nomVariable)
                        continue;
                    const positionApres = matchParam.index + matchParam[0].length;
                    const suite = code.slice(positionApres, positionApres + 200);
                    const verifie = new RegExp(`if\\s*\\([^)]*${nomVariable}\\b`).test(suite);
                    if (!verifie) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * API-011 — Validation insuffisante d'une pagination
             */
            case "API-011":
                correspond =
                    /Number\s*\(\s*req\.query\.(limite|limit|page)\s*\)/i.test(code) &&
                        !/Math\.min|Math\.max/.test(code);
                break;
            /**
             * API-012 — Donnée utilisateur utilisée directement dans une
             * réponse HTML
             */
            case "API-012":
                correspond =
                    /\.innerHTML\s*=\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\s*;/.test(code) && !/\.innerHTML\s*=\s*["'`]/.test(code);
                break;
            // ========================================================
            // HTML / CSS
            // ========================================================
            /**
             * HTML-001 — Image sans attribut alt
             */
            case "HTML-001":
                correspond = /<img\b(?![^>]*\balt\s*=)[^>]*>/i.test(code);
                break;
            /**
             * HTML-002 — Bouton sans type explicite dans un formulaire
             */
            case "HTML-002":
                correspond =
                    /<form\b[\s\S]*?<button\b(?![^>]*\btype\s*=)[^>]*>[\s\S]*?<\/form>/i.test(code);
                break;
            /**
             * HTML-003 — Input sans label accessible
             *
             * input avec un id qui n'apparaît dans aucun htmlFor, ou input
             * sans id du tout et sans label englobant.
             */
            case "HTML-003":
                correspond =
                    /<input\b[^>]*>/i.test(code) &&
                        !/\bhtmlFor\s*=/.test(code) &&
                        !/<label\b[^>]*>[\s\S]*?<input\b/i.test(code);
                break;
            /**
             * HTML-004 — Utilisation d'un div comme bouton
             */
            case "HTML-004":
                correspond = /<div\b[^>]*\bonClick\s*=/.test(code);
                break;
            /**
             * HTML-005 — Hiérarchie de titres incohérente
             *
             * Un titre de niveau N est immédiatement suivi d'un titre de
             * niveau N+2 ou plus (saut de niveau).
             */
            case "HTML-005": {
                const titres = [
                    ...code.matchAll(/<h([1-6])\b/gi),
                ].map((m) => Number(m[1]));
                for (let i = 0; i < titres.length - 1; i++) {
                    const actuel = titres[i];
                    const suivant = titres[i + 1];
                    if (actuel !== undefined &&
                        suivant !== undefined &&
                        suivant > actuel + 1) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * HTML-006 — Formulaire sans gestion explicite de soumission
             */
            case "HTML-006":
                correspond =
                    /<form\b(?![^>]*\bonSubmit\s*=)[^>]*>/i.test(code);
                break;
            /**
             * HTML-007 — Texte de placeholder utilisé comme seule étiquette
             */
            case "HTML-007":
                correspond =
                    /<input\b[^>]*\bplaceholder\s*=/i.test(code) &&
                        !/<label\b/i.test(code);
                break;
            /**
             * HTML-008 — Lien utilisé pour une action
             */
            case "HTML-008":
                correspond =
                    /<a\b[^>]*href\s*=\s*["']#["'][^>]*\bonClick\s*=/i.test(code);
                break;
            /**
             * HTML-009 — Contenu pouvant provoquer un débordement horizontal
             *
             * Largeur fixe en pixels supérieure à 600px sans max-width.
             */
            case "HTML-009": {
                const largeurRegex = /width\s*:\s*(\d+)px/g;
                let matchLargeur;
                while ((matchLargeur = largeurRegex.exec(code)) !== null) {
                    const valeur = Number(matchLargeur[1]);
                    if (valeur >= 600 && !/max-width/.test(code)) {
                        correspond = true;
                        break;
                    }
                }
                break;
            }
            /**
             * HTML-010 — Image non responsive
             *
             * Une classe ou un sélecteur visant une image (photo, img, image)
             * a une largeur fixe en pixels sans max-width.
             */
            case "HTML-010": {
                const selecteurImageRegex = /\.(photo|image|img)\s*\{[^}]*width\s*:\s*(\d+)px[^}]*\}/gi;
                let matchSelecteur;
                while ((matchSelecteur = selecteurImageRegex.exec(code)) !== null) {
                    const blocComplet = matchSelecteur[0];
                    if (!/max-width/.test(blocComplet)) {
                        correspond = true;
                        break;
                    }
                }
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