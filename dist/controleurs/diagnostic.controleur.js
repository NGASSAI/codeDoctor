"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnostiquer = diagnostiquer;
exports.listerCapacites = listerCapacites;
const diagnostic_service_1 = require("../services/diagnostic.service");
const diagnostic_service_2 = require("../services/diagnostic.service");
const CATEGORIES_DIAGNOSTIC = [
    "JAVASCRIPT",
    "TYPESCRIPT",
    "REACT",
    "HTTP",
    "API",
    "HTML_CSS",
];
function estCategorieValide(valeur) {
    return CATEGORIES_DIAGNOSTIC.includes(valeur);
}
/**
 * POST /api/diagnostic
 *
 * Analyse un code avec le moteur de règles local.
 *
 * L'IA n'intervient pas ici.
 */
async function diagnostiquer(req, res) {
    try {
        const { code, categorie } = req.body;
        if (typeof code !== "string" || !code.trim()) {
            return res.status(400).json({
                succes: false,
                erreur: "Le code à analyser est requis.",
            });
        }
        if (typeof categorie !== "string" ||
            !estCategorieValide(categorie)) {
            return res.status(400).json({
                succes: false,
                erreur: "La catégorie fournie est invalide.",
                categories: CATEGORIES_DIAGNOSTIC,
            });
        }
        const resultats = await (0, diagnostic_service_2.diagnostiquerCode)(code, categorie);
        return res.status(200).json({
            succes: true,
            categorie,
            nombreProblemes: resultats.length,
            resultats,
        });
    }
    catch (erreur) {
        console.error("Erreur lors du diagnostic :", erreur);
        return res.status(500).json({
            succes: false,
            erreur: "Impossible d'effectuer le diagnostic.",
        });
    }
}
async function listerCapacites(req, res) {
    try {
        const categorie = req.query.categorie;
        const regles = await (0, diagnostic_service_1.listerReglesDiagnostic)(categorie && estCategorieValide(categorie)
            ? categorie
            : undefined);
        const capacites = regles.map((regle) => ({
            code: regle.code,
            titre: regle.title,
            categorie: regle.category,
            severite: regle.severity,
        }));
        return res.status(200).json({ capacites });
    }
    catch (erreur) {
        console.error("Erreur récupération capacités :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer les capacités du moteur.",
        });
    }
}
//# sourceMappingURL=diagnostic.controleur.js.map