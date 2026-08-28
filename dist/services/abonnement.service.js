"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenirOuCreerAbonnement = obtenirOuCreerAbonnement;
exports.obtenirEtatAbonnement = obtenirEtatAbonnement;
exports.utilisateurPremium = utilisateurPremium;
exports.activerPremium = activerPremium;
exports.desactiverPremium = desactiverPremium;
const base_1 = require("../base");
const DUREE_PREMIUM_JOURS = 30;
/**
 * Récupérer ou créer l'abonnement FREE d'un utilisateur.
 */
async function obtenirOuCreerAbonnement(userId) {
    const abonnement = await base_1.prisma.subscription.findUnique({
        where: {
            userId,
        },
    });
    if (abonnement) {
        return abonnement;
    }
    return base_1.prisma.subscription.create({
        data: {
            userId,
            plan: "FREE",
            statut: "ACTIVE",
            dateDebut: new Date(),
            dateRenouvellement: new Date(),
        },
    });
}
/**
 * Récupérer l'état actuel de l'abonnement.
 */
async function obtenirEtatAbonnement(userId) {
    const abonnement = await obtenirOuCreerAbonnement(userId);
    const maintenant = new Date();
    const premiumActif = abonnement.plan === "PREMIUM" &&
        abonnement.statut === "ACTIVE" &&
        abonnement.dateRenouvellement > maintenant;
    /*
     * Si Premium est arrivé à expiration,
     * on repasse automatiquement en FREE.
     */
    if (abonnement.plan === "PREMIUM" &&
        abonnement.dateRenouvellement <= maintenant &&
        abonnement.statut === "ACTIVE") {
        const abonnementMisAJour = await base_1.prisma.subscription.update({
            where: {
                id: abonnement.id,
            },
            data: {
                plan: "FREE",
                statut: "ACTIVE",
            },
        });
        return {
            plan: abonnementMisAJour.plan,
            statut: abonnementMisAJour.statut,
            dateDebut: abonnementMisAJour.dateDebut,
            dateRenouvellement: abonnementMisAJour.dateRenouvellement,
            premiumActif: false,
        };
    }
    return {
        plan: abonnement.plan,
        statut: abonnement.statut,
        dateDebut: abonnement.dateDebut,
        dateRenouvellement: abonnement.dateRenouvellement,
        premiumActif,
    };
}
/**
 * Vérifier si un utilisateur possède Premium.
 */
async function utilisateurPremium(userId) {
    const etat = await obtenirEtatAbonnement(userId);
    return etat.premiumActif;
}
/**
 * Activer Premium.
 *
 * Cette fonction sera utilisée par le système
 * de validation du paiement.
 */
async function activerPremium(userId) {
    const maintenant = new Date();
    const dateRenouvellement = new Date(maintenant.getTime() +
        DUREE_PREMIUM_JOURS *
            24 *
            60 *
            60 *
            1000);
    return base_1.prisma.subscription.upsert({
        where: {
            userId,
        },
        create: {
            userId,
            plan: "PREMIUM",
            statut: "ACTIVE",
            dateDebut: maintenant,
            dateRenouvellement,
        },
        update: {
            plan: "PREMIUM",
            statut: "ACTIVE",
            dateDebut: maintenant,
            dateRenouvellement,
        },
    });
}
/**
 * Désactiver Premium.
 */
async function desactiverPremium(userId) {
    return base_1.prisma.subscription.update({
        where: {
            userId,
        },
        data: {
            plan: "FREE",
            statut: "ACTIVE",
        },
    });
}
//# sourceMappingURL=abonnement.service.js.map