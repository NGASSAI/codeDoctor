"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creer = creer;
exports.lister = lister;
exports.obtenir = obtenir;
exports.modifier = modifier;
exports.supprimer = supprimer;
const experience_service_1 = require("../services/experience.service");
const client_1 = require("../generated/prisma/client");
/**
 * Créer une expérience
 * POST /api/experiences
 */
async function creer(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const { titre, probleme, code, cause, solution, technologie, categorie, } = req.body;
        if (!titre || !probleme || !cause || !solution || !categorie) {
            return res.status(400).json({
                erreur: "Titre, problème, cause, solution et catégorie sont requis.",
            });
        }
        if (!Object.values(client_1.Category).includes(categorie)) {
            return res.status(400).json({
                erreur: "Catégorie invalide.",
            });
        }
        const experience = await (0, experience_service_1.creerExperience)(utilisateurId, {
            titre,
            probleme,
            code,
            cause,
            solution,
            technologie,
            categorie,
        });
        return res.status(201).json({
            message: "Expérience publiée avec succès.",
            experience,
        });
    }
    catch (erreur) {
        console.error("Erreur création expérience :", erreur);
        return res.status(500).json({
            erreur: "Impossible de créer l'expérience.",
        });
    }
}
/**
 * Obtenir toutes les expériences publiques
 * GET /api/experiences
 */
async function lister(req, res) {
    try {
        const recherche = typeof req.query.recherche === "string"
            ? req.query.recherche.trim()
            : undefined;
        const categorie = typeof req.query.categorie === "string"
            ? req.query.categorie
            : undefined;
        const pageParam = typeof req.query.page === "string"
            ? Number(req.query.page)
            : 1;
        const limiteParam = typeof req.query.limite === "string"
            ? Number(req.query.limite)
            : 10;
        // Validation de la catégorie
        if (categorie &&
            !Object.values(client_1.Category).includes(categorie)) {
            return res.status(400).json({
                erreur: "Catégorie invalide.",
            });
        }
        // Validation de la page
        if (!Number.isInteger(pageParam) ||
            pageParam < 1) {
            return res.status(400).json({
                erreur: "Le numéro de page doit être un entier supérieur ou égal à 1.",
            });
        }
        // Validation de la limite
        if (!Number.isInteger(limiteParam) ||
            limiteParam < 1 ||
            limiteParam > 50) {
            return res.status(400).json({
                erreur: "La limite doit être comprise entre 1 et 50.",
            });
        }
        const resultat = await (0, experience_service_1.obtenirExperiences)(recherche, categorie, pageParam, limiteParam);
        return res.status(200).json(resultat);
    }
    catch (erreur) {
        console.error("Erreur récupération expériences :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer les expériences.",
        });
    }
}
/**
 * Obtenir une expérience
 * GET /api/experiences/:id
 */
async function obtenir(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            return res.status(400).json({
                erreur: "Identifiant d'expérience invalide.",
            });
        }
        const experience = await (0, experience_service_1.obtenirExperienceParId)(id);
        if (!experience) {
            return res.status(404).json({
                erreur: "Expérience introuvable.",
            });
        }
        return res.status(200).json({
            experience,
        });
    }
    catch (erreur) {
        console.error("Erreur récupération expérience :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer l'expérience.",
        });
    }
}
/**
 * Modifier une expérience
 * PUT /api/experiences/:id
 */
async function modifier(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const id = req.params.id;
        if (typeof id !== "string") {
            return res.status(400).json({
                erreur: "Identifiant d'expérience invalide.",
            });
        }
        const experience = await (0, experience_service_1.trouverExperienceUtilisateur)(id, utilisateurId);
        if (!experience) {
            return res.status(404).json({
                erreur: "Expérience introuvable.",
            });
        }
        const { titre, probleme, code, cause, solution, technologie, categorie, } = req.body;
        if (categorie &&
            !Object.values(client_1.Category).includes(categorie)) {
            return res.status(400).json({
                erreur: "Catégorie invalide.",
            });
        }
        await (0, experience_service_1.modifierExperience)(id, utilisateurId, {
            titre,
            probleme,
            code,
            cause,
            solution,
            technologie,
            categorie,
        });
        const experienceModifiee = await (0, experience_service_1.obtenirExperienceParId)(id);
        return res.status(200).json({
            message: "Expérience modifiée avec succès.",
            experience: experienceModifiee,
        });
    }
    catch (erreur) {
        console.error("Erreur modification expérience :", erreur);
        return res.status(500).json({
            erreur: "Impossible de modifier l'expérience.",
        });
    }
}
/**
 * Supprimer une expérience
 * DELETE /api/experiences/:id
 */
async function supprimer(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const id = req.params.id;
        if (typeof id !== "string") {
            return res.status(400).json({
                erreur: "Identifiant d'expérience invalide.",
            });
        }
        const experience = await (0, experience_service_1.trouverExperienceUtilisateur)(id, utilisateurId);
        if (!experience) {
            return res.status(404).json({
                erreur: "Expérience introuvable.",
            });
        }
        await (0, experience_service_1.supprimerExperience)(id, utilisateurId);
        return res.status(200).json({
            message: "Expérience supprimée avec succès.",
        });
    }
    catch (erreur) {
        console.error("Erreur suppression expérience :", erreur);
        return res.status(500).json({
            erreur: "Impossible de supprimer l'expérience.",
        });
    }
}
//# sourceMappingURL=experience.controleur.js.map