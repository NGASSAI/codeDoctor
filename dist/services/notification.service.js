"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerNotification = creerNotification;
exports.obtenirNotifications = obtenirNotifications;
exports.obtenirNotificationsNonLues = obtenirNotificationsNonLues;
exports.compterNotificationsNonLues = compterNotificationsNonLues;
exports.marquerNotificationCommeLue = marquerNotificationCommeLue;
exports.marquerToutesCommeLues = marquerToutesCommeLues;
exports.supprimerNotification = supprimerNotification;
const base_1 = require("../base");
const socket_1 = require("../socket");
/**
 * Créer une notification pour un utilisateur
 */
async function creerNotification(userId, type, titre, message, lien) {
    const notification = await base_1.prisma.notification.create({
        data: {
            userId,
            type,
            titre,
            message,
            lien: lien ?? null,
        },
    });
    (0, socket_1.envoyerNotificationTempsReel)(userId, notification);
    return notification;
}
/**
 * Récupérer les notifications d'un utilisateur
 */
async function obtenirNotifications(userId) {
    return base_1.prisma.notification.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 50,
    });
}
/**
 * Récupérer uniquement les notifications non lues
 */
async function obtenirNotificationsNonLues(userId) {
    return base_1.prisma.notification.findMany({
        where: {
            userId,
            lue: false,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
/**
 * Compter les notifications non lues
 */
async function compterNotificationsNonLues(userId) {
    return base_1.prisma.notification.count({
        where: {
            userId,
            lue: false,
        },
    });
}
/**
 * Marquer une notification comme lue
 */
async function marquerNotificationCommeLue(notificationId, userId) {
    return base_1.prisma.notification.updateMany({
        where: {
            id: notificationId,
            userId,
        },
        data: {
            lue: true,
        },
    });
}
/**
 * Marquer toutes les notifications comme lues
 */
async function marquerToutesCommeLues(userId) {
    return base_1.prisma.notification.updateMany({
        where: {
            userId,
            lue: false,
        },
        data: {
            lue: true,
        },
    });
}
/**
 * Supprimer une notification
 */
async function supprimerNotification(notificationId, userId) {
    return base_1.prisma.notification.deleteMany({
        where: {
            id: notificationId,
            userId,
        },
    });
}
//# sourceMappingURL=notification.service.js.map