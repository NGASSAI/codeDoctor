"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerSignalement = creerSignalement;
exports.trouverSignalement = trouverSignalement;
exports.obtenirSignalements = obtenirSignalements;
exports.obtenirSignalementParId = obtenirSignalementParId;
exports.modifierStatutSignalement = modifierStatutSignalement;
const base_1 = require("../base");
/**
 * Créer un signalement
 */
async function creerSignalement(userId, experienceId, raison, description) {
    return base_1.prisma.report.create({
        data: {
            userId,
            experienceId,
            raison,
            description: description ?? null,
        },
    });
}
/**
 * Vérifier si l'utilisateur a déjà signalé cette expérience
 */
async function trouverSignalement(userId, experienceId) {
    return base_1.prisma.report.findFirst({
        where: {
            userId,
            experienceId,
        },
    });
}
/**
 * Récupérer les signalements
 * Utilisé plus tard par l'administration
 */
async function obtenirSignalements(statut) {
    const where = statut
        ? {
            statut,
        }
        : {};
    return base_1.prisma.report.findMany({
        where,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: {
                select: {
                    id: true,
                    displayName: true,
                    email: true,
                },
            },
            experience: {
                select: {
                    id: true,
                    titre: true,
                    probleme: true,
                    categorie: true,
                },
            },
        },
    });
}
/**
 * Récupérer un signalement par son ID
 */
async function obtenirSignalementParId(id) {
    return base_1.prisma.report.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    displayName: true,
                    email: true,
                },
            },
            experience: true,
        },
    });
}
/**
 * Modifier le statut d'un signalement
 * Utilisé par l'administrateur
 */
async function modifierStatutSignalement(id, statut) {
    return base_1.prisma.report.update({
        where: {
            id,
        },
        data: {
            statut,
            resolvedAt: statut === "RESOLVED"
                ? new Date()
                : null,
        },
    });
}
//# sourceMappingURL=report.service.js.map