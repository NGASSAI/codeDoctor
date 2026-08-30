"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifierSyntaxe = verifierSyntaxe;
const parser_1 = require("@babel/parser");
function verifierSyntaxe(code, categorie) {
    const categoriesConcernees = ["JAVASCRIPT", "TYPESCRIPT", "REACT"];
    if (!categoriesConcernees.includes(categorie)) {
        return [];
    }
    const plugins = ["jsx"];
    if (categorie === "TYPESCRIPT" || categorie === "REACT") {
        plugins.push("typescript");
    }
    try {
        (0, parser_1.parse)(code, {
            sourceType: "module",
            plugins,
            errorRecovery: false,
        });
        return [];
    }
    catch (erreur) {
        const erreurBabel = erreur;
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
                cause: "Une construction du langage n'est pas correctement formée (accolade, parenthèse, point-virgule, etc.).",
                commentTrouver: `Regardez précisément la ligne ${ligne} de votre code.`,
                correction: "Corrigez la syntaxe à l'endroit indiqué avant de poursuivre l'analyse.",
                avant: "",
                apres: "",
            },
        ];
    }
}
//# sourceMappingURL=verification-syntaxe.service.js.map