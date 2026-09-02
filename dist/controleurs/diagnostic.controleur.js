"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnostiquer = diagnostiquer;
exports.listerCapacites = listerCapacites;
const diagnostic_service_1 = require("../services/diagnostic.service");
const historique_service_1 = require("../services/historique.service");
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
 *
 * Si l'utilisateur est connecté et qu'au moins un problème
 * est détecté, une entrée est ajoutée à son historique.
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
        const resultats = await (0, diagnostic_service_1.diagnostiquerCode)(code, categorie);
        const utilisateurId = req.utilisateurId;
        if (utilisateurId && resultats.length > 0) {
            const premierResultat = resultats[0];
            try {
                await (0, historique_service_1.creerHistorique)(utilisateurId, {
                    categorie: categorie,
                    titre: `Analyse ${categorie} — ${resultats.length} problème${resultats.length > 1 ? "s" : ""} détecté${resultats.length > 1 ? "s" : ""}`,
                    severite: premierResultat?.severite,
                    extrait: code.slice(0, 2000),
                });
            }
            catch (erreurHistorique) {
                console.error("Erreur enregistrement historique (diagnostic) :", erreurHistorique);
                // On n'interrompt pas la réponse principale pour autant.
            }
        }
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
/**
 * GET /api/diagnostic/capacites
 */
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