"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerCommentaire = creerCommentaire;
exports.obtenirCommentaires = obtenirCommentaires;
exports.trouverCommentaireUtilisateur = trouverCommentaireUtilisateur;
exports.supprimerCommentaire = supprimerCommentaire;
const base_1 = require("../base");
/**
 * Créer un commentaire sur une expérience
 */
async function creerCommentaire(userId, experienceId, contenu) {
    return base_1.prisma.comment.create({
        data: {
            userId,
            experienceId,
            contenu,
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
 * Récupérer les commentaires d'une expérience
 */
async function obtenirCommentaires(experienceId) {
    return base_1.prisma.comment.findMany({
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
 * Vérifier qu'un commentaire appartient bien à un utilisateur
 */
async function trouverCommentaireUtilisateur(commentId, userId) {
    return base_1.prisma.comment.findFirst({
        where: {
            id: commentId,
            userId,
        },
    });
}
/**
 * Supprimer un commentaire appartenant à l'utilisateur
 */
async function supprimerCommentaire(commentId, userId) {
    return base_1.prisma.comment.deleteMany({
        where: {
            id: commentId,
            userId,
        },
    });
}
//# sourceMappingURL=commentaire.service.js.map