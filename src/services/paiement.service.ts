
import { prisma } from "../base";
import { creerNotification } from "./notification.service";

/**
 * Créer une demande de paiement Premium.
 */
export async function creerDemandePaiement(
  userId: string,
  montant: number
) {
  return prisma.payment.create({
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
export async function listerPaiementsUtilisateur(
  userId: string
) {
  return prisma.payment.findMany({
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
export async function obtenirPaiementUtilisateur(
  paiementId: string,
  userId: string
) {
  return prisma.payment.findFirst({
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
export async function listerPaiementsAdmin(
  page: number,
  limite: number
) {
  const skip = (page - 1) * limite;

  const [paiements, total] = await Promise.all([
    prisma.payment.findMany({
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

    prisma.payment.count(),
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
export async function approuverPaiement(
  paiementId: string
) {
  const paiement = await prisma.payment.findUnique({
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

  const dateRenouvellement = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  );

  const resultat = await prisma.$transaction(async (tx) => {
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

 await creerNotification(
  paiement.userId,
  "PAIEMENT_APPROUVE",
  "Abonnement Premium activé",
  "Votre paiement a été approuvé. Votre abonnement Premium est maintenant actif pour 30 jours."
);

  return resultat;
}

/**
 * Rejeter un paiement.
 */
export async function rejeterPaiement(
  paiementId: string
) {
  const paiement = await prisma.payment.findUnique({
    where: {
      id: paiementId,
    },
  });

  if (!paiement) {
    throw new Error("PAIEMENT_INTRouvable");
  }

  const resultat = await prisma.payment.update({
    where: {
      id: paiementId,
    },
    data: {
      statut: "REJECTED",
    },
  });

  await creerNotification(
    paiement.userId,
    "PAIEMENT_REJETE",
    "Paiement rejeté",
    "Votre demande de paiement Premium a été rejetée."
  );

  return resultat;
}