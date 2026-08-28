import { prisma } from "../base";

const DUREE_PREMIUM_JOURS = 30;

export interface EtatAbonnement {
  plan: string;
  statut: string;
  dateDebut: Date;
  dateRenouvellement: Date;
  premiumActif: boolean;
}

/**
 * Récupérer ou créer l'abonnement FREE d'un utilisateur.
 */
export async function obtenirOuCreerAbonnement(
  userId: string
) {
  const abonnement = await prisma.subscription.findUnique({
    where: {
      userId,
    },
  });

  if (abonnement) {
    return abonnement;
  }

  return prisma.subscription.create({
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
export async function obtenirEtatAbonnement(
  userId: string
): Promise<EtatAbonnement> {
  const abonnement =
    await obtenirOuCreerAbonnement(userId);

  const maintenant = new Date();

  const premiumActif =
    abonnement.plan === "PREMIUM" &&
    abonnement.statut === "ACTIVE" &&
    abonnement.dateRenouvellement > maintenant;

  /*
   * Si Premium est arrivé à expiration,
   * on repasse automatiquement en FREE.
   */
  if (
    abonnement.plan === "PREMIUM" &&
    abonnement.dateRenouvellement <= maintenant &&
    abonnement.statut === "ACTIVE"
  ) {
    const abonnementMisAJour =
      await prisma.subscription.update({
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
      dateRenouvellement:
        abonnementMisAJour.dateRenouvellement,
      premiumActif: false,
    };
  }

  return {
    plan: abonnement.plan,
    statut: abonnement.statut,
    dateDebut: abonnement.dateDebut,
    dateRenouvellement:
      abonnement.dateRenouvellement,
    premiumActif,
  };
}

/**
 * Vérifier si un utilisateur possède Premium.
 */
export async function utilisateurPremium(
  userId: string
): Promise<boolean> {
  const etat = await obtenirEtatAbonnement(userId);

  return etat.premiumActif;
}

/**
 * Activer Premium.
 *
 * Cette fonction sera utilisée par le système
 * de validation du paiement.
 */
export async function activerPremium(
  userId: string
) {
  const maintenant = new Date();

  const dateRenouvellement = new Date(
    maintenant.getTime() +
      DUREE_PREMIUM_JOURS *
        24 *
        60 *
        60 *
        1000
  );

  return prisma.subscription.upsert({
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
export async function desactiverPremium(
  userId: string
) {
  return prisma.subscription.update({
    where: {
      userId,
    },
    data: {
      plan: "FREE",
      statut: "ACTIVE",
    },
  });
}