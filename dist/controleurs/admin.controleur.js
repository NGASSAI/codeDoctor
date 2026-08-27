"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAdmin = dashboardAdmin;
exports.utilisateursAdmin = utilisateursAdmin;
exports.experiencesAdmin = experiencesAdmin;
exports.modifierStatutExperience = modifierStatutExperience;
exports.signalementsAdmin = signalementsAdmin;
exports.modifierStatutSignalementAdmin = modifierStatutSignalementAdmin;
const admin_service_1 = require("../services/admin.service");
const report_service_1 = require("../services/report.service");
/**
 * Dashboard administrateur
 */
async function dashboardAdmin(_req, res) {
    try {
        const statistiques = await (0, admin_service_1.obtenirStatistiquesAdmin)();
        return res.status(200).json({
            statistiques,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération des statistiques admin :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Lister les utilisateurs pour l'administration
 */
async function utilisateursAdmin(req, res) {
    try {
        const page = Math.max(Number.parseInt(req.query.page) || 1, 1);
        const limite = Math.min(Math.max(Number.parseInt(req.query.limite) || 10, 1), 100);
        const resultat = await (0, admin_service_1.listerUtilisateursAdmin)(page, limite);
        return res.status(200).json(resultat);
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération des utilisateurs admin :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Lister les expériences pour l'administration
 */
async function experiencesAdmin(req, res) {
    try {
        const page = Math.max(Number.parseInt(req.query.page) || 1, 1);
        const limite = Math.min(Math.max(Number.parseInt(req.query.limite) || 10, 1), 100);
        const resultat = await (0, admin_service_1.listerExperiencesAdmin)(page, limite);
        return res.status(200).json(resultat);
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération des expériences admin :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Modifier le statut d'une expérience
 */
async function modifierStatutExperience(req, res) {
    const adminId = req.utilisateurId;
    const id = req.params.id;
    const { statut } = req.body;
    if (!adminId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    if (!id || typeof id !== "string") {
        return res.status(400).json({
            erreur: "Identifiant d'expérience invalide.",
        });
    }
    if (statut !== "PUBLISHED" &&
        statut !== "HIDDEN" &&
        statut !== "DELETED") {
        return res.status(400).json({
            erreur: "Statut d'expérience invalide.",
        });
    }
    try {
        const experience = await (0, admin_service_1.modifierStatutExperienceAdmin)(id, statut, adminId);
        return res.status(200).json({
            message: "Statut de l'expérience mis à jour.",
            experience,
        });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({
                erreur: "Expérience introuvable.",
            });
        }
        console.error("Erreur lors de la modification du statut :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Lister les signalements pour l'administration
 *
 * GET /api/admin/signalements
 *
 * Exemple :
 * /api/admin/signalements
 * /api/admin/signalements?statut=PENDING
 */
async function signalementsAdmin(req, res) {
    const statut = req.query.statut;
    if (statut !== undefined &&
        statut !== "PENDING" &&
        statut !== "REVIEWED" &&
        statut !== "RESOLVED" &&
        statut !== "REJECTED") {
        return res.status(400).json({
            erreur: "Statut de signalement invalide.",
        });
    }
    try {
        const signalements = await (0, report_service_1.obtenirSignalements)(statut);
        return res.status(200).json({
            signalements,
            total: signalements.length,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération des signalements admin :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Modifier le statut d'un signalement
 *
 * PATCH /api/admin/signalements/:id/statut
 */
async function modifierStatutSignalementAdmin(req, res) {
    const id = req.params.id;
    const { statut } = req.body;
    if (!id || typeof id !== "string") {
        return res.status(400).json({
            erreur: "Identifiant de signalement invalide.",
        });
    }
    if (statut !== "PENDING" &&
        statut !== "REVIEWED" &&
        statut !== "RESOLVED" &&
        statut !== "REJECTED") {
        return res.status(400).json({
            erreur: "Statut de signalement invalide.",
        });
    }
    try {
        const signalement = await (0, report_service_1.modifierStatutSignalement)(id, statut);
        return res.status(200).json({
            message: "Statut du signalement mis à jour.",
            signalement,
        });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({
                erreur: "Signalement introuvable.",
            });
        }
        console.error("Erreur lors de la modification du signalement :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
//# sourceMappingURL=admin.controleur.js.map