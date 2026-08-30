"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenirStatistiquesAdmin = obtenirStatistiquesAdmin;
exports.listerUtilisateursAdmin = listerUtilisateursAdmin;
exports.listerExperiencesAdmin = listerExperiencesAdmin;
exports.modifierStatutExperienceAdmin = modifierStatutExperienceAdmin;
exports.modifierRoleUtilisateurAdmin = modifierRoleUtilisateurAdmin;
exports.modifierStatutUtilisateurAdmin = modifierStatutUtilisateurAdmin;
exports.supprimerUtilisateurAdmin = supprimerUtilisateurAdmin;
exports.obtenirNotificationsAdmin = obtenirNotificationsAdmin;
const base_1 = require("../base");
async function obtenirStatistiquesAdmin() {
    const [utilisateurs, experiences, experiencesPubliees, experiencesCachees, commentaires, reactions, signalements, signalementsEnAttente, exercices, conversations, notifications,] = await Promise.all([
        base_1.prisma.user.count(),
        base_1.prisma.experience.count(),
        base_1.prisma.experience.count({ where: { statut: "PUBLISHED" } }),
        base_1.prisma.experience.count({ where: { statut: "HIDDEN" } }),
        base_1.prisma.comment.count(),
        base_1.prisma.reaction.count(),
        base_1.prisma.report.count(),
        base_1.prisma.report.count({ where: { statut: "PENDING" } }),
        base_1.prisma.exercise.count(),
        base_1.prisma.conversation.count(),
        base_1.prisma.notification.count(),
    ]);
    return {
        utilisateurs,
        experiences: {
            total: experiences,
            publiees: experiencesPubliees,
            cachees: experiencesCachees,
        },
        commentaires,
        reactions,
        signalements: {
            total: signalements,
            enAttente: signalementsEnAttente,
        },
        exercices,
        conversations,
        notifications,
    };
}
/**
 * Liste des utilisateurs pour l'administration.
 */
async function listerUtilisateursAdmin(page, limite) {
    const skip = (page - 1) * limite;
    const [utilisateurs, total] = await Promise.all([
        base_1.prisma.user.findMany({
            skip,
            take: limite,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                email: true,
                displayName: true,
                role: true,
                emailVerified: true,
                createdAt: true,
                _count: {
                    select: {
                        experiences: true,
                        comments: true,
                        reports: true,
                    },
                },
            },
        }),
        base_1.prisma.user.count(),
    ]);
    return {
        utilisateurs,
        pagination: {
            page,
            limite,
            total,
            pages: Math.ceil(total / limite),
        },
    };
}
/**
 * Liste toutes les expériences pour l'administration.
 * Contrairement à l'API publique, l'admin voit
 * également les expériences HIDDEN et DELETED.
 */
async function listerExperiencesAdmin(page, limite) {
    const skip = (page - 1) * limite;
    const [experiences, total] = await Promise.all([
        base_1.prisma.experience.findMany({
            skip,
            take: limite,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        displayName: true,
                    },
                },
                moderator: {
                    select: {
                        id: true,
                        email: true,
                        displayName: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        reactions: true,
                        reports: true,
                    },
                },
            },
        }),
        base_1.prisma.experience.count(),
    ]);
    return {
        experiences,
        pagination: {
            page,
            limite,
            total,
            pages: Math.ceil(total / limite),
        },
    };
}
/**
 * Modifier le statut d'une expérience.
 */
async function modifierStatutExperienceAdmin(experienceId, statut, adminId) {
    return base_1.prisma.experience.update({
        where: {
            id: experienceId,
        },
        data: {
            statut,
            moderatedAt: new Date(),
            moderatedBy: adminId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    displayName: true,
                },
            },
        },
    });
}
/**
 * Modifier le rôle d'un utilisateur (ex: USER <-> ADMIN).
 */
async function modifierRoleUtilisateurAdmin(userId, role) {
    return base_1.prisma.user.update({
        where: { id: userId },
        data: { role },
        select: {
            id: true,
            email: true,
            displayName: true,
            role: true,
        },
    });
}
/**
 * Modifier le statut d'activation / bannissement d'un utilisateur.
 */
async function modifierStatutUtilisateurAdmin(userId, estActif) {
    // Ajuste le champ selon ton schéma Prisma (ex: estActif, estBanni, etc.)
    return base_1.prisma.user.update({
        where: { id: userId },
        data: { isBlocked: !estActif }, // Adapté si tu as un champ isBlocked ou similaire
        select: {
            id: true,
            email: true,
            displayName: true,
            role: true,
        },
    });
}
/**
 * Supprimer définitivement un utilisateur.
 */
async function supprimerUtilisateurAdmin(userId) {
    return base_1.prisma.user.delete({
        where: { id: userId },
    });
}
/**
 * Notifications de l'administrateur connecté.
 */
async function obtenirNotificationsAdmin(adminId, page, limite) {
    const skip = (page - 1) * limite;
    const [notifications, total] = await Promise.all([
        base_1.prisma.notification.findMany({
            where: { userId: adminId },
            skip,
            take: limite,
            orderBy: { createdAt: "desc" },
        }),
        base_1.prisma.notification.count({ where: { userId: adminId } }),
    ]);
    return {
        notifications,
        pagination: {
            page,
            limite,
            total,
            pages: Math.ceil(total / limite),
        },
    };
}
//# sourceMappingURL=admin.service.js.map