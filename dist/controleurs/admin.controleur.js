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
exports.creerExperience = creerExperience;
exports.modifierExperience = modifierExperience;
exports.marquerNotificationLueAdmin = marquerNotificationLueAdmin;
const { prisma } = require("../lib/prisma");
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
/**
 * Modifier le statut d'une expérience + déclencher notification
 */
async function modifierStatutExperience(req, res) {
    const adminId = req.utilisateurId;
    const id = req.params.id;
    const { statut } = req.body;
    if (!adminId) {
        return res.status(401).json({ erreur: "Authentification requise." });
    }
    if (!id || typeof id !== "string") {
        return res.status(400).json({ erreur: "Identifiant d'expérience invalide." });
    }
    if (statut !== "PUBLISHED" && statut !== "HIDDEN" && statut !== "DELETED") {
        return res.status(400).json({ erreur: "Statut d'expérience invalide." });
    }
    try {
        const experience = await (0, admin_service_1.modifierStatutExperienceAdmin)(id, statut, adminId);
        // Déclenchement de la notification de modération pour l'auteur de l'expérience
        const typeNotif = statut === "PUBLISHED" ? "EXPERIENCE_APPROUVEE" : "EXPERIENCE_REFUSEE";
        const messageNotif = statut === "PUBLISHED"
            ? `Votre expérience "${experience.titre}" a été approuvée.`
            : `Votre expérience "${experience.titre}" a été refusée ou masquée.`;
        await prisma.notification.create({
            data: {
                userId: experience.userId,
                type: typeNotif,
                titre: statut === "PUBLISHED" ? "Expérience approuvée" : "Expérience masquée",
                message: messageNotif,
                lien: `/experiences/${experience.id}`,
            },
        });
        return res.status(200).json({
            message: "Statut de l'expérience mis à jour.",
            experience,
        });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({ erreur: "Expérience introuvable." });
        }
        console.error("Erreur lors de la modification du statut :", erreur);
        return res.status(500).json({ erreur: "Erreur interne du serveur." });
    }
}
/**
 * Lister les signalements pour l'administration
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
const CATEGORIES_VALIDES = [
    "JAVASCRIPT",
    "TYPESCRIPT",
    "REACT",
    "HTTP",
    "API",
    "HTML_CSS",
];
function categorieValide(valeur) {
    return (typeof valeur === "string" && CATEGORIES_VALIDES.includes(valeur));
}
function validerDonneesExperience(body) {
    const { titre, categorie, probleme, cause, solution, technologie, code } = body;
    if (typeof titre !== "string" || !titre.trim()) {
        return { valide: false, erreur: "Le titre est requis." };
    }
    if (!categorieValide(categorie)) {
        return { valide: false, erreur: "Catégorie invalide." };
    }
    if (typeof probleme !== "string" || !probleme.trim()) {
        return { valide: false, erreur: "Le problème est requis." };
    }
    if (typeof cause !== "string" || !cause.trim()) {
        return { valide: false, erreur: "La cause est requise." };
    }
    if (typeof solution !== "string" || !solution.trim()) {
        return { valide: false, erreur: "La solution est requise." };
    }
    const technologieNettoyee = typeof technologie === "string" && technologie.trim()
        ? technologie.trim()
        : undefined;
    const codeNettoye = typeof code === "string" && code.trim() ? code.trim() : undefined;
    return {
        valide: true,
        donnees: {
            titre: titre.trim(),
            categorie,
            probleme: probleme.trim(),
            cause: cause.trim(),
            solution: solution.trim(),
            technologie: technologieNettoyee,
            code: codeNettoye,
        },
    };
}
/**
 * Créer une expérience
 * POST /api/admin/experiences
 */
async function creerExperience(req, res) {
    const adminId = req.utilisateurId;
    if (!adminId) {
        return res.status(401).json({ erreur: "Authentification requise." });
    }
    const validation = validerDonneesExperience(req.body);
    if (!validation.valide) {
        return res.status(400).json({ erreur: validation.erreur });
    }
    try {
        const experience = await (0, admin_service_1.creerExperienceAdmin)(adminId, {
            ...validation.donnees,
            userId: adminId,
        });
        return res.status(201).json(experience);
    }
    catch (erreur) {
        console.error("Erreur création expérience (admin) :", erreur);
        return res.status(500).json({
            erreur: "Impossible de créer l'expérience.",
        });
    }
}
/**
 * Modifier une expérience
 * PUT /api/admin/experiences/:id
 */
async function modifierExperience(req, res) {
    const id = req.params.id;
    if (!id || typeof id !== "string") {
        return res.status(400).json({
            erreur: "Identifiant d'expérience invalide.",
        });
    }
    const validation = validerDonneesExperience(req.body);
    if (!validation.valide) {
        return res.status(400).json({ erreur: validation.erreur });
    }
    try {
        const experience = await (0, admin_service_1.modifierExperienceAdmin)(id, validation.donnees);
        return res.status(200).json(experience);
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({ erreur: "Expérience introuvable." });
        }
        console.error("Erreur modification expérience (admin) :", erreur);
        return res.status(500).json({
            erreur: "Impossible de modifier l'expérience.",
        });
    }
}
/**
 * Marquer une notification comme lue
 * PATCH /api/admin/notifications/:id/lue
 */
async function marquerNotificationLueAdmin(req, res) {
    const { id } = req.params;
    const adminId = req.utilisateurId;
    if (!adminId) {
        return res.status(401).json({ erreur: "Authentification requise." });
    }
    if (!id || typeof id !== "string") {
        return res.status(400).json({ erreur: "Identifiant invalide." });
    }
    try {
        // Appel du service pour mettre à jour la notification
        const notification = await (0, admin_service_1.marquerNotificationCommeLueService)(id, adminId);
        return res.status(200).json({ success: true, notification });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({ erreur: "Notification introuvable." });
        }
        console.error("Erreur notification lue :", erreur);
        return res.status(500).json({ erreur: "Erreur interne du serveur." });
    }
}
//# sourceMappingURL=admin.controleur.js.map