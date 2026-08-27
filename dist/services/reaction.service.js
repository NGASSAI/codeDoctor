"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajouterReaction = ajouterReaction;
exports.obtenirReactions = obtenirReactions;
exports.trouverReaction = trouverReaction;
exports.supprimerReaction = supprimerReaction;
const base_1 = require("../base");
/**
 * Ajouter une réaction
 */
async function ajouterReaction(userId, experienceId, type) {
    return base_1.prisma.reaction.create({
        data: {
            userId,
            experienceId,
            type,
        },
    });
}
/**
 * Récupérer les réactions d'une expérience
 */
async function obtenirReactions(experienceId) {
    return base_1.prisma.reaction.findMany({
        where: {
            experienceId,
        },
        orderBy: {
            createdAt: "asc",
        },
        include: {
            user: {
                select: {
                    id: true,
                    displayName: true,
                },
            },
        },
    });
}
/**
 * Vérifier si l'utilisateur possède déjà cette réaction
 */
async function trouverReaction(userId, experienceId, type) {
    return base_1.prisma.reaction.findUnique({
        where: {
            experienceId_userId_type: {
                experienceId,
                userId,
                type,
            },
        },
    });
}
/**
 * Supprimer une réaction
 */
async function supprimerReaction(userId, experienceId, type) {
    return base_1.prisma.reaction.delete({
        where: {
            experienceId_userId_type: {
                experienceId,
                userId,
                type,
            },
        },
    });
}
//# sourceMappingURL=reaction.service.js.map