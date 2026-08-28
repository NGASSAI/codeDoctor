
import { prisma } from "../base";

const QUOTA_FREE = 5;
const QUOTA_PREMIUM = 30;

export interface EtatQuotaIA {
  plan: "FREE" | "PREMIUM" | "ADMIN";
  utilise: number;
  limite: number | null;
  restant: number | null;
  illimite: boolean;
  dateJour: string;
}

function obtenirDateJour(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Brazzaville",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function verifierEtConsommerQuotaIA(
  utilisateurId: string
): Promise<EtatQuotaIA> {
  const dateJour = obtenirDateJour();

  const utilisateur = await prisma.user.findUnique({
    where: {
      id: utilisateurId,
    },
    select: {
      role: true,
    },
  });

  if (!utilisateur) {
    throw new Error("UTILISATEUR_INTRouvable");
  }

  // L'administrateur ne consomme jamais le quota utilisateur.
  if (utilisateur.role === "ADMIN") {
    return {
      plan: "ADMIN",
      utilise: 0,
      limite: null,
      restant: null,
      illimite: true,
      dateJour,
    };
  }

  const abonnement = await prisma.subscription.findUnique({
    where: {
      userId: utilisateurId,
    },
    select: {
      plan: true,
      statut: true,
      dateRenouvellement: true,
    },
  });

  // DEBUG TEMPORAIRE : vérification de l'abonnement PREMIUM
  console.log("========== DEBUG PREMIUM ==========");
  console.log("Utilisateur :", utilisateurId);
  console.log("Abonnement :", abonnement);
  console.log("Date actuelle :", new Date());

  if (abonnement) {
    console.log(
      "PLAN PREMIUM :",
      abonnement.plan === "PREMIUM"
    );

    console.log(
      "STATUT ACTIVE :",
      abonnement.statut.trim() === "ACTIVE"
    );

    console.log(
      "DATE FUTURE :",
      abonnement.dateRenouvellement > new Date()
    );
  } else {
    console.log("AUCUN ABONNEMENT TROUVÉ");
  }

  console.log("===================================");

  const premiumActif =
    abonnement?.plan === "PREMIUM" &&
    abonnement.statut.trim() === "ACTIVE"&&
    abonnement.dateRenouvellement > new Date();

  const plan = premiumActif ? "PREMIUM" : "FREE";
  const limite = premiumActif ? QUOTA_PREMIUM : QUOTA_FREE;

  /*
   * On récupère ou crée le compteur du jour.
   */
  await prisma.aIUsage.upsert({
    where: {
      userId_dateJour: {
        userId: utilisateurId,
        dateJour,
      },
    },
    create: {
      userId: utilisateurId,
      dateJour,
      requetes: 0,
      tokensUtilises: 0,
    },
    update: {},
  });

  /*
   * Incrémentation conditionnelle :
   * le compteur n'est augmenté que s'il est encore sous la limite.
   *
   * Cela évite qu'un utilisateur puisse simplement envoyer
   * plusieurs requêtes simultanément pour dépasser facilement
   * son quota.
   */
  const resultat = await prisma.aIUsage.updateMany({
    where: {
      userId: utilisateurId,
      dateJour,
      requetes: {
        lt: limite,
      },
    },
    data: {
      requetes: {
        increment: 1,
      },
    },
  });

  if (resultat.count === 0) {
    const usage = await prisma.aIUsage.findUnique({
      where: {
        userId_dateJour: {
          userId: utilisateurId,
          dateJour,
        },
      },
      select: {
        requetes: true,
      },
    });

    throw new Error(
      `QUOTA_IA_ATTEINT:${plan}:${usage?.requetes ?? limite}:${limite}`
    );
  }

  const usage = await prisma.aIUsage.findUnique({
    where: {
      userId_dateJour: {
        userId: utilisateurId,
        dateJour,
      },
    },
    select: {
      requetes: true,
    },
  });

  const utilise = usage?.requetes ?? 1;

  return {
    plan,
    utilise,
    limite,
    restant: Math.max(0, limite - utilise),
    illimite: false,
    dateJour,
  };
}

export async function enregistrerTokensIA(
  utilisateurId: string,
  dateJour: string,
  tokens: number
) {
  if (!Number.isFinite(tokens) || tokens <= 0) {
    return;
  }

  await prisma.aIUsage.update({
    where: {
      userId_dateJour: {
        userId: utilisateurId,
        dateJour,
      },
    },
    data: {
      tokensUtilises: {
        increment: Math.round(tokens),
      },
    },
  });
}

export async function obtenirEtatQuotaIA(
  utilisateurId: string
): Promise<EtatQuotaIA> {
  const dateJour = obtenirDateJour();

  const utilisateur = await prisma.user.findUnique({
    where: {
      id: utilisateurId,
    },
    select: {
      role: true,
    },
  });

  if (!utilisateur) {
    throw new Error("UTILISATEUR_INTRouvable");
  }

  if (utilisateur.role === "ADMIN") {
    return {
      plan: "ADMIN",
      utilise: 0,
      limite: null,
      restant: null,
      illimite: true,
      dateJour,
    };
  }

  const abonnement = await prisma.subscription.findUnique({
    where: {
      userId: utilisateurId,
    },
    select: {
      plan: true,
      statut: true,
      dateRenouvellement: true,
    },
  });

 
   


  const premiumActif =
    abonnement?.plan === "PREMIUM" &&
    abonnement.statut.trim() === "ACTIVE"&&
    abonnement.dateRenouvellement > new Date();

  const plan = premiumActif ? "PREMIUM" : "FREE";
  const limite = premiumActif ? QUOTA_PREMIUM : QUOTA_FREE;

  const usage = await prisma.aIUsage.findUnique({
    where: {
      userId_dateJour: {
        userId: utilisateurId,
        dateJour,
      },
    },
    select: {
      requetes: true,
      tokensUtilises: true,
    },
  });

  const utilise = usage?.requetes ?? 0;

  return {
    plan,
    utilise,
    limite,
    restant: Math.max(0, limite - utilise),
    illimite: false,
    dateJour,
  };
}
