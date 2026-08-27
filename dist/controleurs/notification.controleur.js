"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listerNotifications = listerNotifications;
exports.listerNotificationsNonLues = listerNotificationsNonLues;
exports.compterNonLues = compterNonLues;
exports.marquerCommeLue = marquerCommeLue;
exports.marquerToutesCommeLuesControleur = marquerToutesCommeLuesControleur;
exports.supprimer = supprimer;
const notification_service_1 = require("../services/notification.service");
/**
 * Récupérer toutes les notifications de l'utilisateur connecté
 */
async function listerNotifications(req, res) {
    try {
        const userId = req.utilisateurId;
        if (!userId) {
            return res.status(401).json({
                erreur: "Utilisateur non authentifié.",
            });
        }
        const notifications = await (0, notification_service_1.obtenirNotifications)(userId);
        return res.status(200).json({
            notifications,
        });
    }
    catch (error) {
        console.error("Erreur récupération notifications :", error);
        return res.status(500).json({
            erreur: "Impossible de récupérer les notifications.",
        });
    }
}
/**
 * Récupérer uniquement les notifications non lues
 */
async function listerNotificationsNonLues(req, res) {
    try {
        const userId = req.utilisateurId;
        if (!userId) {
            return res.status(401).json({
                erreur: "Utilisateur non authentifié.",
            });
        }
        const notifications = await (0, notification_service_1.obtenirNotificationsNonLues)(userId);
        return res.status(200).json({
            notifications,
        });
    }
    catch (error) {
        console.error("Erreur récupération notifications non lues :", error);
        return res.status(500).json({
            erreur: "Impossible de récupérer les notifications.",
        });
    }
}
/**
 * Compter les notifications non lues
 */
async function compterNonLues(req, res) {
    try {
        const userId = req.utilisateurId;
        if (!userId) {
            return res.status(401).json({
                erreur: "Utilisateur non authentifié.",
            });
        }
        const nombre = await (0, notification_service_1.compterNotificationsNonLues)(userId);
        return res.status(200).json({
            nombre,
        });
    }
    catch (error) {
        console.error("Erreur comptage notifications :", error);
        return res.status(500).json({
            erreur: "Impossible de compter les notifications.",
        });
    }
}
/**
 * Marquer une notification comme lue
 */
async function marquerCommeLue(req, res) {
    try {
        const userId = req.utilisateurId;
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        if (!userId) {
            return res.status(401).json({
                erreur: "Utilisateur non authentifié.",
            });
        }
        if (!id) {
            return res.status(400).json({
                erreur: "Identifiant de notification requis.",
            });
        }
        await (0, notification_service_1.marquerNotificationCommeLue)(id, userId);
        return res.status(200).json({
            message: "Notification marquée comme lue.",
        });
    }
    catch (error) {
        console.error("Erreur marquage notification :", error);
        return res.status(500).json({
            erreur: "Impossible de modifier la notification.",
        });
    }
}
/**
 * Marquer toutes les notifications comme lues
 */
async function marquerToutesCommeLuesControleur(req, res) {
    try {
        const userId = req.utilisateurId;
        if (!userId) {
            return res.status(401).json({
                erreur: "Utilisateur non authentifié.",
            });
        }
        await (0, notification_service_1.marquerToutesCommeLues)(userId);
        return res.status(200).json({
            message: "Toutes les notifications sont maintenant lues.",
        });
    }
    catch (error) {
        console.error("Erreur marquage toutes notifications :", error);
        return res.status(500).json({
            erreur: "Impossible de modifier les notifications.",
        });
    }
}
/**
 * Supprimer une notification
 */
async function supprimer(req, res) {
    try {
        const userId = req.utilisateurId;
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        if (!userId) {
            return res.status(401).json({
                erreur: "Utilisateur non authentifié.",
            });
        }
        if (!id) {
            return res.status(400).json({
                erreur: "Identifiant de notification requis.",
            });
        }
        await (0, notification_service_1.supprimerNotification)(id, userId);
        return res.status(200).json({
            message: "Notification supprimée.",
        });
    }
    catch (error) {
        console.error("Erreur suppression notification :", error);
        return res.status(500).json({
            erreur: "Impossible de supprimer la notification.",
        });
    }
}
//# sourceMappingURL=notification.controleur.js.map