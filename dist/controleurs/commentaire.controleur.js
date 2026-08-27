"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creer = creer;
exports.lister = lister;
exports.supprimer = supprimer;
const commentaire_service_1 = require("../services/commentaire.service");
/**
 * Créer un commentaire
 * POST /api/experiences/:experienceId/commentaires
 */
async function creer(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const experienceId = req.params.experienceId;
        if (typeof experienceId !== "string") {
            return res.status(400).json({
                erreur: "Identifiant d'expérience invalide.",
            });
        }
        const { contenu } = req.body;
        if (typeof contenu !== "string" || !contenu.trim()) {
            return res.status(400).json({
                erreur: "Le contenu du commentaire est requis.",
            });
        }
        const contenuNettoye = contenu.trim();
        if (contenuNettoye.length > 1000) {
            return res.status(400).json({
                erreur: "Le commentaire ne peut pas dépasser 1000 caractères.",
            });
        }
        const commentaire = await (0, commentaire_service_1.creerCommentaire)(utilisateurId, experienceId, contenuNettoye);
        return res.status(201).json({
            message: "Commentaire ajouté avec succès.",
            commentaire,
        });
    }
    catch (erreur) {
        console.error("Erreur création commentaire :", erreur);
        return res.status(500).json({
            erreur: "Impossible de créer le commentaire.",
        });
    }
}
/**
 * Récupérer les commentaires d'une expérience
 * GET /api/experiences/:experienceId/commentaires
 */
async function lister(req, res) {
    try {
        const experienceId = req.params.experienceId;
        if (typeof experienceId !== "string") {
            return res.status(400).json({
                erreur: "Identifiant d'expérience invalide.",
            });
        }
        const commentaires = await (0, commentaire_service_1.obtenirCommentaires)(experienceId);
        return res.status(200).json({
            commentaires,
        });
    }
    catch (erreur) {
        console.error("Erreur récupération commentaires :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer les commentaires.",
        });
    }
}
/**
 * Supprimer son propre commentaire
 * DELETE /api/commentaires/:id
 */
async function supprimer(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const commentId = req.params.id;
        if (typeof commentId !== "string") {
            return res.status(400).json({
                erreur: "Identifiant du commentaire invalide.",
            });
        }
        const commentaire = await (0, commentaire_service_1.trouverCommentaireUtilisateur)(commentId, utilisateurId);
        if (!commentaire) {
            return res.status(404).json({
                erreur: "Commentaire introuvable.",
            });
        }
        await (0, commentaire_service_1.supprimerCommentaire)(commentId, utilisateurId);
        return res.status(200).json({
            message: "Commentaire supprimé avec succès.",
        });
    }
    catch (erreur) {
        console.error("Erreur suppression commentaire :", erreur);
        return res.status(500).json({
            erreur: "Impossible de supprimer le commentaire.",
        });
    }
}
//# sourceMappingURL=commentaire.controleur.js.map