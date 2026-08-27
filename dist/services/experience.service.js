"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerExperience = creerExperience;
exports.obtenirExperiences = obtenirExperiences;
exports.obtenirExperienceParId = obtenirExperienceParId;
exports.trouverExperienceUtilisateur = trouverExperienceUtilisateur;
exports.modifierExperience = modifierExperience;
exports.supprimerExperience = supprimerExperience;
const base_1 = require("../base");
const client_1 = require("../generated/prisma/client");
const notification_service_1 = require("./notification.service");
/**
 * Créer une expérience
 */
async function creerExperience(userId, data) {
    const experience = await base_1.prisma.experience.create({
        data: {
            userId,
            titre: data.titre,
            probleme: data.probleme,
            code: data.code ?? null,
            cause: data.cause,
            solution: data.solution,
            technologie: data.technologie ?? null,
            categorie: data.categorie,
            statut: client_1.ExperienceStatus.PUBLISHED,
        },
    });
    // Récupérer tous les administrateurs
    const administrateurs = await base_1.prisma.user.findMany({
        where: {
            role: client_1.UserRole.ADMIN,
        },
        select: {
            id: true,
        },
    });
    // Notifier chaque administrateur
    await Promise.all(administrateurs.map((admin) => (0, notification_service_1.creerNotification)(admin.id, client_1.NotificationType.NOUVELLE_EXPERIENCE, "Nouvelle expérience", `Une nouvelle expérience "${experience.titre}" a été publiée.`, `/experiences/${experience.id}`)));
    return experience;
}
/**
 * Récupérer toutes les expériences publiques
 */
async function obtenirExperiences(recherche, categorie, page = 1, limite = 10) {
    const skip = (page - 1) * limite;
    const where = {
        statut: client_1.ExperienceStatus.PUBLISHED,
        ...(categorie
            ? {
                categorie,
            }
            : {}),
        ...(recherche
            ? {
                OR: [
                    {
                        titre: {
                            contains: recherche,
                            mode: "insensitive",
                        },
                    },
                    {
                        probleme: {
                            contains: recherche,
                            mode: "insensitive",
                        },
                    },
                    {
                        cause: {
                            contains: recherche,
                            mode: "insensitive",
                        },
                    },
                    {
                        solution: {
                            contains: recherche,
                            mode: "insensitive",
                        },
                    },
                    {
                        technologie: {
                            contains: recherche,
                            mode: "insensitive",
                        },
                    },
                ],
            }
            : {}),
    };
    const [experiences, total] = await Promise.all([
        base_1.prisma.experience.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limite,
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        reactions: true,
                    },
                },
            },
        }),
        base_1.prisma.experience.count({
            where,
        }),
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
 * Récupérer une expérience par son ID
 */
async function obtenirExperienceParId(id) {
    return base_1.prisma.experience.findFirst({
        where: {
            id,
            statut: client_1.ExperienceStatus.PUBLISHED,
        },
        include: {
            user: {
                select: {
                    id: true,
                    displayName: true,
                },
            },
            comments: {
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
            },
            reactions: true,
            _count: {
                select: {
                    comments: true,
                    reactions: true,
                    reports: true,
                },
            },
        },
    });
}
/**
 * Vérifier qu'une expérience appartient bien à l'utilisateur
 */
async function trouverExperienceUtilisateur(experienceId, userId) {
    return base_1.prisma.experience.findFirst({
        where: {
            id: experienceId,
            userId,
        },
    });
}
/**
 * Modifier une expérience
 */
async function modifierExperience(experienceId, userId, data) {
    return base_1.prisma.experience.updateMany({
        where: {
            id: experienceId,
            userId,
        },
        data,
    });
}
/**
 * Supprimer une expérience
 *
 * On utilise une suppression logique :
 * l'expérience passe à DELETED au lieu
 * d'être immédiatement supprimée de PostgreSQL.
 */
async function supprimerExperience(experienceId, userId) {
    return base_1.prisma.experience.updateMany({
        where: {
            id: experienceId,
            userId,
        },
        data: {
            statut: client_1.ExperienceStatus.DELETED,
        },
    });
}
//# sourceMappingURL=experience.service.js.map