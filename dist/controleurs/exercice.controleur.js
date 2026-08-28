"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lister = lister;
exports.obtenir = obtenir;
exports.indice = indice;
exports.tenter = tenter;
exports.mesTentatives = mesTentatives;
exports.maProgression = maProgression;
const exercice_service_1 = require("../services/exercice.service");
const client_1 = require("../generated/prisma/client");
/**
 * Vérifie qu'une catégorie appartient bien
 * à l'enum Prisma Category.
 */
function categorieValide(categorie) {
    return (typeof categorie === "string" &&
        Object.values(client_1.Category).includes(categorie));
}
/**
 * GET /api/exercices
 *
 * Liste les exercices.
 *
 * Filtres optionnels :
 * ?categorie=JAVASCRIPT
 * ?difficulte=FACILE
 */
async function lister(req, res) {
    try {
        const categorie = req.query.categorie;
        const difficulte = req.query.difficulte;
        if (categorie !== undefined &&
            !categorieValide(categorie)) {
            return res.status(400).json({
                erreur: "Catégorie d'exercice invalide.",
            });
        }
        if (difficulte !== undefined &&
            typeof difficulte !== "string") {
            return res.status(400).json({
                erreur: "Difficulté invalide.",
            });
        }
        const exercices = await (0, exercice_service_1.listerExercices)(categorie, difficulte);
        return res.status(200).json({
            exercices,
            total: exercices.length,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération des exercices :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer les exercices.",
        });
    }
}
/**
 * GET /api/exercices/:id
 */
async function obtenir(req, res) {
    const idParam = req.params.id;
    if (typeof idParam !== "string" || !idParam.trim()) {
        return res.status(400).json({
            erreur: "Identifiant d'exercice invalide.",
        });
    }
    const id = idParam;
    try {
        const exercice = await (0, exercice_service_1.obtenirExercice)(id);
        if (!exercice) {
            return res.status(404).json({
                erreur: "Exercice introuvable.",
            });
        }
        return res.status(200).json({
            exercice,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération de l'exercice :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer l'exercice.",
        });
    }
}
/**
 * GET /api/exercices/:id/indices/:numero
 */
async function indice(req, res) {
    const idParam = req.params.id;
    const numeroParam = req.params.numero;
    if (typeof idParam !== "string" ||
        !idParam.trim()) {
        return res.status(400).json({
            erreur: "Identifiant d'exercice invalide.",
        });
    }
    if (typeof numeroParam !== "string" ||
        !numeroParam.trim()) {
        return res.status(400).json({
            erreur: "Numéro d'indice invalide.",
        });
    }
    const id = idParam;
    const numero = Number.parseInt(numeroParam, 10);
    if (![1, 2, 3].includes(numero)) {
        return res.status(400).json({
            erreur: "Le numéro d'indice doit être compris entre 1 et 3.",
        });
    }
    try {
        const resultat = await (0, exercice_service_1.obtenirIndice)(id, numero);
        if (!resultat) {
            return res.status(404).json({
                erreur: "Exercice introuvable.",
            });
        }
        return res.status(200).json(resultat);
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération de l'indice :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer l'indice.",
        });
    }
}
/**
 * POST /api/exercices/:id/tenter
 *
 * Body :
 * {
 *   "reponse": "...",
 *   "indicesUtilises": 0
 * }
 */
async function tenter(req, res) {
    const utilisateurId = req.utilisateurId;
    const idParam = req.params.id;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    if (typeof idParam !== "string" ||
        !idParam.trim()) {
        return res.status(400).json({
            erreur: "Identifiant d'exercice invalide.",
        });
    }
    const id = idParam;
    const { reponse, indicesUtilises } = req.body;
    if (typeof reponse !== "string" ||
        !reponse.trim()) {
        return res.status(400).json({
            erreur: "Votre réponse est requise.",
        });
    }
    if (indicesUtilises !== undefined &&
        (typeof indicesUtilises !== "number" ||
            !Number.isInteger(indicesUtilises) ||
            indicesUtilises < 0 ||
            indicesUtilises > 3)) {
        return res.status(400).json({
            erreur: "Le nombre d'indices utilisés doit être compris entre 0 et 3.",
        });
    }
    const nombreIndices = indicesUtilises ?? 0;
    try {
        const resultat = await (0, exercice_service_1.soumettreTentative)(utilisateurId, id, reponse, nombreIndices);
        if (!resultat) {
            return res.status(404).json({
                erreur: "Exercice introuvable.",
            });
        }
        return res.status(200).json({
            succes: true,
            correct: resultat.tentative.correct,
            tentative: resultat.tentative,
            progression: resultat.progression,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la soumission de la tentative :", erreur);
        return res.status(500).json({
            erreur: "Impossible d'enregistrer votre tentative.",
        });
    }
}
/**
 * GET /api/exercices/mes-tentatives
 *
 * Historique des tentatives de l'utilisateur connecté.
 */
async function mesTentatives(req, res) {
    const utilisateurId = req.utilisateurId;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    const exerciceId = typeof req.query.exerciceId === "string"
        ? req.query.exerciceId
        : undefined;
    try {
        const tentatives = await (0, exercice_service_1.listerTentativesUtilisateur)(utilisateurId, exerciceId);
        return res.status(200).json({
            tentatives,
            total: tentatives.length,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération des tentatives :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer vos tentatives.",
        });
    }
}
/**
 * GET /api/exercices/ma-progression
 */
async function maProgression(req, res) {
    const utilisateurId = req.utilisateurId;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    try {
        const progression = await (0, exercice_service_1.obtenirProgression)(utilisateurId);
        return res.status(200).json({
            progression,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération de la progression :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer votre progression.",
        });
    }
}
//# sourceMappingURL=exercice.controleur.js.map