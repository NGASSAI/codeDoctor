"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAdmin = dashboardAdmin;
exports.modifierRoleUtilisateur = modifierRoleUtilisateur;
exports.utilisateursAdmin = utilisateursAdmin;
exports.supprimerExperience = supprimerExperience;
exports.supprimerUtilisateur = supprimerUtilisateur;
exports.notificationsAdmin = notificationsAdmin;
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
 * Modifier le rôle d'un utilisateur
 * PATCH /api/admin/utilisateurs/:id/role
 */
async function modifierRoleUtilisateur(req, res) {
    const { id } = req.params;
    const { role } = req.body;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ erreur: "Identifiant utilisateur invalide." });
    }
    if (role !== "USER" && role !== "ADMIN") {
        return res.status(400).json({ erreur: "Rôle invalide." });
    }
    try {
        const utilisateur = await (0, admin_service_1.modifierRoleUtilisateurAdmin)(id, role);
        return res.status(200).json({
            message: "Rôle mis à jour avec succès.",
            utilisateur,
        });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({ erreur: "Utilisateur introuvable." });
        }
        console.error("Erreur modification rôle :", erreur);
        return res.status(500).json({ erreur: "Erreur interne du serveur." });
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
 * Supprimer une expérience
 * DELETE /api/admin/experiences/:id
 */
async function supprimerExperience(req, res) {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ erreur: "Identifiant d'expérience invalide." });
    }
    try {
        await (0, admin_service_1.supprimerExperienceAdmin)(id);
        return res.status(200).json({ success: true });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({ erreur: "Expérience introuvable." });
        }
        console.error("Erreur suppression expérience :", erreur);
        return res.status(500).json({ erreur: "Erreur interne du serveur." });
    }
}
/**
 * Supprimer un utilisateur
 * DELETE /api/admin/utilisateurs/:id
 */
async function supprimerUtilisateur(req, res) {
    const { id } = req.params;
    const adminId = req.utilisateurId;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ erreur: "Identifiant utilisateur invalide." });
    }
    if (id === adminId) {
        return res.status(400).json({ erreur: "Vous ne pouvez pas supprimer votre propre compte." });
    }
    try {
        await (0, admin_service_1.supprimerUtilisateurAdmin)(id);
        return res.status(200).json({ success: true });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({ erreur: "Utilisateur introuvable." });
        }
        console.error("Erreur suppression utilisateur :", erreur);
        return res.status(500).json({ erreur: "Erreur interne du serveur." });
    }
}
/**
 * Notifications de l'administrateur connecté
 * GET /api/admin/notifications
 */
async function notificationsAdmin(req, res) {
    const adminId = req.utilisateurId;
    if (!adminId) {
        return res.status(401).json({ erreur: "Authentification requise." });
    }
    try {
        const page = Math.max(Number.parseInt(req.query.page) || 1, 1);
        const limite = Math.min(Math.max(Number.parseInt(req.query.limite) || 20, 1), 100);
        const resultat = await (0, admin_service_1.obtenirNotificationsAdmin)(adminId, page, limite);
        return res.status(200).json(resultat);
    }
    catch (erreur) {
        console.error("Erreur récupération notifications admin :", erreur);
        return res.status(500).json({ erreur: "Erreur interne du serveur." });
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