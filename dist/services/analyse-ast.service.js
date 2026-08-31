"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detecterViaAST = detecterViaAST;
const parser_1 = require("@babel/parser");
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
 * détectés dans le code.
 *
 * Les détecteurs seront ajoutés progressivement, catégorie par catégorie,
 * en utilisant les vrais codes de src/data/codeDoctorRules.ts.
 */
function detecterViaAST(code, categorie) {
    const resultats = new Set();
    try {
        construireAST(code, categorie);
    }
    catch {
        return resultats;
    }
    // Détecteurs AST à ajouter ici, catégorie par catégorie.
    return resultats;
}
//# sourceMappingURL=analyse-ast.service.js.map