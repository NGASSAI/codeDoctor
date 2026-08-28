"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerDemandePaiement = creerDemandePaiement;
exports.listerPaiementsUtilisateur = listerPaiementsUtilisateur;
exports.obtenirPaiementUtilisateur = obtenirPaiementUtilisateur;
exports.listerPaiementsAdmin = listerPaiementsAdmin;
exports.approuverPaiement = approuverPaiement;
exports.rejeterPaiement = rejeterPaiement;
const base_1 = require("../base");
const notification_service_1 = require("./notification.service");
/**
 * Créer une demande de paiement Premium.
 */
async function creerDemandePaiement(userId, montant) {
    return base_1.prisma.payment.create({
        data: {
            userId,
            montant,
            methode: "WHATSAPP",
            statut: "PENDING",
        },
        select: {
            id: true,
            userId: true,
            montant: true,
            methode: true,
            statut: true,
            createdAt: true,
        },
    });
}
/**
 * Récupérer les demandes de paiement d'un utilisateur.
 */
async function listerPaiementsUtilisateur(userId) {
    return base_1.prisma.payment.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            montant: true,
            methode: true,
            statut: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
/**
 * Récupérer un paiement précis appartenant à un utilisateur.
 */
async function obtenirPaiementUtilisateur(paiementId, userId) {
    return base_1.prisma.payment.findFirst({
        where: {
            id: paiementId,
            userId,
        },
        select: {
            id: true,
            montant: true,
            methode: true,
            statut: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}
/**
 * Lister les paiements pour l'administration.
 */
async function listerPaiementsAdmin(page, limite) {
    const skip = (page - 1) * limite;
    const [paiements, total] = await Promise.all([
        base_1.prisma.payment.findMany({
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
            },
        }),
        base_1.prisma.payment.count(),
    ]);
    return {
        paiements,
        pagination: {
            page,
            limite,
            total,
            pages: Math.ceil(total / limite),
        },
    };
}
/**
 * Approuver un paiement.
 */
/**
 * Approuver un paiement et activer le Premium.
 */
async function approuverPaiement(paiementId) {
    const paiement = await base_1.prisma.payment.findUnique({
        where: {
            id: paiementId,
        },
    });
    if (!paiement) {
        throw new Error("PAIEMENT_INTRouvable");
    }
    if (paiement.statut === "APPROVED") {
        return paiement;
    }
    const dateRenouvellement = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const resultat = await base_1.prisma.$transaction(async (tx) => {
        const paiementApprouve = await tx.payment.update({
            where: {
                id: paiementId,
            },
            data: {
                statut: "APPROVED",
            },
        });
        await tx.subscription.upsert({
            where: {
                userId: paiement.userId,
            },
            create: {
                userId: paiement.userId,
                plan: "PREMIUM",
                statut: "ACTIVE",
                dateDebut: new Date(),
                dateRenouvellement,
            },
            update: {
                plan: "PREMIUM",
                statut: "ACTIVE",
                dateDebut: new Date(),
                dateRenouvellement,
            },
        });
        return paiementApprouve;
    });
    await (0, notification_service_1.creerNotification)(paiement.userId, "EXPERIENCE_APPROUVEE", "Abonnement Premium activé", "Votre paiement a été approuvé. Votre abonnement Premium est maintenant actif pour 30 jours.");
    return resultat;
}
/**
 * Rejeter un paiement.
 */
async function rejeterPaiement(paiementId) {
    const paiement = await base_1.prisma.payment.findUnique({
        where: {
            id: paiementId,
        },
    });
    if (!paiement) {
        throw new Error("PAIEMENT_INTRouvable");
    }
    const resultat = await base_1.prisma.payment.update({
        where: {
            id: paiementId,
        },
        data: {
            statut: "REJECTED",
        },
    });
    await (0, notification_service_1.creerNotification)(paiement.userId, "EXPERIENCE_REFUSEE", "Paiement rejeté", "Votre demande de paiement Premium a été rejetée.");
    return resultat;
}
//# sourceMappingURL=paiement.service.js.map