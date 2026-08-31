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
 * Retourne uniquement les codes de règles trouvés.
 */
function detecterViaAST(code, categorie) {
    const resultats = new Set();
    let ast;
    try {
        ast = construireAST(code, categorie);
    }
    catch {
        return resultats; // la syntaxe est déjà vérifiée en amont
    }
    (0, traverse_1.default)(ast, {
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
            const estDansMap = parent?.isArrowFunctionExpression() &&
                parent.parentPath?.isCallExpression() &&
                parent.parentPath.node.callee.type === "MemberExpression" &&
                parent.parentPath.node.callee.property.type === "Identifier" &&
                parent.parentPath.node.callee.property.name === "map";
            if (estDansMap) {
                const aKey = chemin.node.openingElement.attributes.some((attr) => attr.type === "JSXAttribute" && attr.name.name === "key");
                if (!aKey) {
                    resultats.add("RE001");
                }
            }
        },
        // Méthode unique regroupant toutes les vérifications d'appels de fonction
        CallExpression(chemin) {
            const callee = chemin.node.callee;
            // JS005 — mutation directe d'un tableau
            if (callee.type === "MemberExpression" &&
                callee.property.type === "Identifier" &&
                ["push", "pop", "splice", "sort", "shift", "unshift"].includes(callee.property.name)) {
                resultats.add("JS005");
            }
            // RE004 — Hook appelé dans un bloc conditionnel
            if (callee.type === "Identifier" &&
                /^use[A-Z]/.test(callee.name)) {
                let parent = chemin.parentPath;
                while (parent) {
                    if (parent.isIfStatement() ||
                        parent.isForStatement() ||
                        parent.isWhileStatement()) {
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
//# sourceMappingURL=analyse-ast.service.js.map