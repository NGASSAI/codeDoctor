"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerHistorique = creerHistorique;
exports.listerHistorique = listerHistorique;
exports.obtenirHistorique = obtenirHistorique;
exports.supprimerHistorique = supprimerHistorique;
exports.creerConversation = creerConversation;
exports.ajouterMessage = ajouterMessage;
exports.obtenirConversation = obtenirConversation;
const base_1 = require("../base");
/**
 * Créer une entrée d'historique.
 */
async function creerHistorique(utilisateurId, donnees) {
    return base_1.prisma.historyEntry.create({
        data: {
            userId: utilisateurId,
            categorie: donnees.categorie,
            titre: donnees.titre,
            ...(donnees.ruleId !== undefined
                ? { ruleId: donnees.ruleId }
                : {}),
            ...(donnees.severite !== undefined
                ? { severite: donnees.severite }
                : {}),
            ...(donnees.extrait !== undefined
                ? { extrait: donnees.extrait }
                : {}),
        },
        select: {
            id: true,
            ruleId: true,
            categorie: true,
            titre: true,
            severite: true,
            extrait: true,
            createdAt: true,
        },
    });
}
/**
 * Lister l'historique d'un utilisateur.
 */
async function listerHistorique(utilisateurId) {
    return base_1.prisma.historyEntry.findMany({
        where: {
            userId: utilisateurId,
        },
        select: {
            id: true,
            ruleId: true,
            categorie: true,
            titre: true,
            severite: true,
            extrait: true,
            createdAt: true,
            conversation: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
/**
 * Récupérer une entrée précise de l'historique.
 */
async function obtenirHistorique(historiqueId, utilisateurId) {
    return base_1.prisma.historyEntry.findFirst({
        where: {
            id: historiqueId,
            userId: utilisateurId,
        },
        select: {
            id: true,
            ruleId: true,
            categorie: true,
            titre: true,
            severite: true,
            extrait: true,
            createdAt: true,
            conversation: {
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    messages: {
                        select: {
                            id: true,
                            role: true,
                            content: true,
                            createdAt: true,
                        },
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                },
            },
        },
    });
}
/**
 * Supprimer une entrée d'historique.
 */
async function supprimerHistorique(historiqueId, utilisateurId) {
    const historique = await base_1.prisma.historyEntry.findFirst({
        where: {
            id: historiqueId,
            userId: utilisateurId,
        },
        select: {
            id: true,
        },
    });
    if (!historique) {
        return null;
    }
    return base_1.prisma.historyEntry.delete({
        where: {
            id: historique.id,
        },
    });
}
/**
 * Créer une conversation liée à une entrée d'historique.
 */
async function creerConversation(historiqueId, utilisateurId, titre) {
    const historique = await base_1.prisma.historyEntry.findFirst({
        where: {
            id: historiqueId,
            userId: utilisateurId,
        },
        select: {
            id: true,
        },
    });
    if (!historique) {
        return null;
    }
    return base_1.prisma.conversation.create({
        data: {
            userId: utilisateurId,
            historyEntryId: historique.id,
            title: titre,
        },
        select: {
            id: true,
            historyEntryId: true,
            title: true,
            createdAt: true,
        },
    });
}
/**
 * Ajouter un message à une conversation.
 */
async function ajouterMessage(conversationId, utilisateurId, role, content) {
    const conversation = await base_1.prisma.conversation.findFirst({
        where: {
            id: conversationId,
            userId: utilisateurId,
        },
        select: {
            id: true,
        },
    });
    if (!conversation) {
        return null;
    }
    return base_1.prisma.message.create({
        data: {
            conversationId,
            role,
            content,
        },
        select: {
            id: true,
            conversationId: true,
            role: true,
            content: true,
            createdAt: true,
        },
    });
}
/**
 * Récupérer une conversation complète.
 */
async function obtenirConversation(conversationId, utilisateurId) {
    return base_1.prisma.conversation.findFirst({
        where: {
            id: conversationId,
            userId: utilisateurId,
        },
        select: {
            id: true,
            historyEntryId: true,
            title: true,
            createdAt: true,
            messages: {
                select: {
                    id: true,
                    role: true,
                    content: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    });
}
//# sourceMappingURL=historique.service.js.map