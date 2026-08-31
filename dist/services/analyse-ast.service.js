"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detecterViaAST = detecterViaAST;
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
function construireAST(code, categorie) {
    const plugins = ["jsx"];
    if (categorie === "TYPESCRIPT" || categorie === "REACT") {
        plugins.push("typescript");
    }
    return (0, parser_1.parse)(code, {
        sourceType: "module",
        plugins,
        errorRecovery: true,
    });
}
/**
 * Exécute les détections basées sur l'AST pour une catégorie donnée.
 * Retourne les codes de règles (format réel : "JS-001", "REACT-001", etc.)
 * détectés dans le code fourni.
 */
function detecterViaAST(code, categorie) {
    const resultats = new Set();
    let ast;
    try {
        ast = construireAST(code, categorie);
    }
    catch {
        return resultats;
    }
    (0, traverse_1.default)(ast, {
        // ----------------------------------------------------------
        // JS-001 — Utilisation de == au lieu de ===
        // ----------------------------------------------------------
        BinaryExpression(chemin) {
            if (["==", "!="].includes(chemin.node.operator)) {
                resultats.add("JS-001");
            }
        },
        // ----------------------------------------------------------
        // Un seul visiteur CallExpression, qui regroupe :
        // JS-014, REACT-005, REACT-009
        // ----------------------------------------------------------
        CallExpression(chemin) {
            const callee = chemin.node.callee;
            // JS-014 — mutation directe d'un tableau
            if (callee.type === "MemberExpression" &&
                callee.property.type === "Identifier" &&
                ["push", "pop", "splice", "sort", "shift", "unshift"].includes(callee.property.name)) {
                resultats.add("JS-014");
            }
            // REACT-005 — Hook appelé conditionnellement
            if (callee.type === "Identifier" &&
                /^use[A-Z]/.test(callee.name)) {
                let parent = chemin.parentPath;
                while (parent) {
                    if (parent.isIfStatement() ||
                        parent.isForStatement() ||
                        parent.isWhileStatement()) {
                        resultats.add("REACT-005");
                        break;
                    }
                    if (parent.isFunctionDeclaration() ||
                        parent.isArrowFunctionExpression() ||
                        parent.isFunctionExpression()) {
                        break;
                    }
                    parent = parent.parentPath;
                }
            }
            // REACT-009 — dépendance manquante dans useEffect
            if (callee.type === "Identifier" && callee.name === "useEffect") {
                const [callback, depsArg] = chemin.node.arguments;
                const estFonction = callback &&
                    (callback.type === "ArrowFunctionExpression" ||
                        callback.type === "FunctionExpression");
                const depsEstTableauVide = depsArg?.type === "ArrayExpression" &&
                    depsArg.elements.length === 0;
                if (estFonction && depsEstTableauVide) {
                    const identifiantsLocaux = new Set();
                    if (callback.body.type === "BlockStatement") {
                        for (const instruction of callback.body.body) {
                            if (instruction.type === "VariableDeclaration") {
                                for (const declarateur of instruction.declarations) {
                                    if (declarateur.id.type === "Identifier") {
                                        identifiantsLocaux.add(declarateur.id.name);
                                    }
                                }
                            }
                        }
                    }
                    let utiliseVariableExterieure = false;
                    const argPath = chemin.get("arguments.0");
                    if (Array.isArray(argPath))
                        return;
                    argPath.traverse({
                        Identifier(cheminId) {
                            const nom = cheminId.node.name;
                            const motsClesIgnores = [
                                "console",
                                "window",
                                "document",
                                "undefined",
                                "null",
                            ];
                            if (!identifiantsLocaux.has(nom) &&
                                !motsClesIgnores.includes(nom) &&
                                cheminId.isReferencedIdentifier() &&
                                /^[a-z]/.test(nom)) {
                                utiliseVariableExterieure = true;
                            }
                        },
                    });
                    if (utiliseVariableExterieure) {
                        resultats.add("REACT-009");
                    }
                }
            }
        },
        // ----------------------------------------------------------
        // TS-001 — Utilisation excessive de any
        // ----------------------------------------------------------
        TSAnyKeyword() {
            resultats.add("TS-001");
        },
        // ----------------------------------------------------------
        // REACT-002 — Mutation directe d'un tableau dans le state
        // ----------------------------------------------------------
        Program(cheminProgramme) {
            const variablesState = new Set();
            cheminProgramme.traverse({
                VariableDeclarator(chemin) {
                    const init = chemin.node.init;
                    if (init?.type === "CallExpression" &&
                        init.callee.type === "Identifier" &&
                        init.callee.name === "useState" &&
                        chemin.node.id.type === "ArrayPattern") {
                        const premierElement = chemin.node.id.elements[0];
                        if (premierElement?.type === "Identifier") {
                            variablesState.add(premierElement.name);
                        }
                    }
                },
            });
            cheminProgramme.traverse({
                CallExpression(chemin) {
                    const callee = chemin.node.callee;
                    if (callee.type === "MemberExpression" &&
                        callee.object.type === "Identifier" &&
                        variablesState.has(callee.object.name) &&
                        callee.property.type === "Identifier" &&
                        ["push", "pop", "splice", "sort", "shift", "unshift"].includes(callee.property.name)) {
                        resultats.add("REACT-002");
                    }
                },
            });
        },
        // ----------------------------------------------------------
        // REACT-007 — .map() JSX sans prop "key"
        // ----------------------------------------------------------
        JSXElement(chemin) {
            const parent = chemin.parentPath;
            const estDansMap = parent?.isArrowFunctionExpression() &&
                parent.parentPath?.isCallExpression() &&
                parent.parentPath.node.callee.type === "MemberExpression" &&
                parent.parentPath.node.callee.property.type === "Identifier" &&
                parent.parentPath.node.callee.property.name === "map";
            if (estDansMap) {
                const aKey = chemin.node.openingElement.attributes.some((attr) => attr.type === "JSXAttribute" && attr.name.name === "key");
                if (!aKey) {
                    resultats.add("REACT-007");
                }
            }
        },
    });
    return resultats;
}
//# sourceMappingURL=analyse-ast.service.js.map