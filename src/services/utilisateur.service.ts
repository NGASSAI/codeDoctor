import { prisma } from "../base";
import bcrypt from "bcrypt";
import crypto from "crypto";

/**
 * Crée un nouvel utilisateur.
 */
export async function creerUtilisateur(
  email: string,
  motDePasse: string,
  displayName?: string
) {
  const motDePasseHache = await bcrypt.hash(
    motDePasse,
    10
  );

  return prisma.user.create({
    data: {
      email,
      passwordHash: motDePasseHache,
      displayName: displayName?.trim() || null,
    },
  });
}

/**
 * Recherche un utilisateur à partir de son adresse email.
 */
export async function trouverUtilisateurParEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Vérifie qu'un mot de passe correspond au hash enregistré.
 */
export async function verifierMotDePasse(
  motDePasse: string,
  motDePasseHache: string
) {
  return bcrypt.compare(motDePasse, motDePasseHache);
}

/**
 * Crée une session sécurisée pour un utilisateur.
 *
 * Le refresh token original est retourné au serveur
 * afin qu'il puisse être transmis au client.
 *
 * Seul son hash SHA-256 est enregistré en base de données.
 */
export async function creerSession(
  userId: string,
  userAgent?: string
) {
  // Génération d'un token cryptographiquement sécurisé.
  const refreshToken = crypto.randomBytes(64).toString("hex");

  // On ne stocke jamais le refresh token en clair en base.
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // Durée de vie de la session : 30 jours.
  const expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  );

  const session = await prisma.session.create({
    data: {
      userId,
      refreshTokenHash,
      userAgent: userAgent ?? null,
      expiresAt,
    },
  });

  return {
    session,
    refreshToken,
  };
}
export async function supprimerSession(refreshTokenHash: string) {
  return prisma.session.delete({
    where: {
      refreshTokenHash,
    },
  });
}
export async function trouverSessionParRefreshTokenHash(
  refreshTokenHash: string
) {
  return prisma.session.findUnique({
    where: {
      refreshTokenHash,
    },
  });
}
export async function trouverSessionValide(
  refreshTokenHash: string
) {
  const session = await prisma.session.findUnique({
    where: {
      refreshTokenHash,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  // Session expirée
  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session;
}
export async function renouvelerSession(
  sessionId: string
) {
  // Génération d'un nouveau refresh token cryptographiquement sécurisé
  const nouveauRefreshToken = crypto.randomBytes(64).toString("hex");

  // Hash du nouveau refresh token avant stockage en base
  const nouveauRefreshTokenHash = crypto
    .createHash("sha256")
    .update(nouveauRefreshToken)
    .digest("hex");

  // On remplace l'ancien hash
  await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      refreshTokenHash: nouveauRefreshTokenHash,
    },
  });

  return {
    refreshToken: nouveauRefreshToken,
  };
}
export async function creerTokenReinitialisation(
  userId: string
) {
  // Token aléatoire sécurisé de 32 octets
  const token = crypto.randomBytes(32).toString("hex");

  // On ne stocke jamais le token original en base
  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Validité : 15 minutes
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: {
      userId,
      token: tokenHash,
      expiresAt,
    },
  });

  // Le token original est retourné uniquement au contrôleur
  return token;
}

export async function trouverTokenReinitialisation(
  tokenHash: string
) {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token: tokenHash,
    },
    include: {
      user: true,
    },
  });

  if (!resetToken) {
    return null;
  }

  // Token déjà utilisé
  if (resetToken.used) {
    return null;
  }

  // Token expiré
  if (resetToken.expiresAt <= new Date()) {
    return null;
  }

  return resetToken;
}
export async function reinitialiserMotDePasse(
  userId: string,
  tokenId: string,
  nouveauMotDePasse: string
) {
  const nouveauMotDePasseHache = await bcrypt.hash(
    nouveauMotDePasse,
    12
  );

  return prisma.$transaction(async (tx) => {
    // Modification du mot de passe
    const utilisateur = await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: nouveauMotDePasseHache,
      },
    });

    // Le token devient immédiatement inutilisable
    await tx.passwordResetToken.update({
      where: {
        id: tokenId,
      },
      data: {
        used: true,
      },
    });

    // Toutes les sessions existantes sont supprimées.
    // Cela déconnecte les appareils qui utilisaient
    // l'ancien mot de passe.
    await tx.session.deleteMany({
      where: {
        userId,
      },
    });

    return utilisateur;
  });
}

export async function trouverUtilisateurParId(
  userId: string
) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      displayName: true,
      emailVerified: true,
      createdAt: true,
    },
  });
}
export async function modifierProfilUtilisateur(
  userId: string,
  displayName: string | null
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      displayName,
    },
    select: {
      id: true,
      email: true,
      displayName: true,
      emailVerified: true,
      createdAt: true,
    },
  });
}
/**
 * Créer un token de vérification d'email.
 */
export async function creerTokenVerificationEmail(
  userId: string
) {
  const token = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Validité : 24 heures
  const expiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  );

  // Supprimer les anciens tokens de cet utilisateur
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.emailVerificationToken.create({
    data: {
      userId,
      token: tokenHash,
      expiresAt,
    },
  });

  return token;
}

/**
 * Vérifier un token d'email.
 */
export async function verifierTokenEmail(
  tokenHash: string
) {
  const verificationToken =
    await prisma.emailVerificationToken.findUnique({
      where: {
        token: tokenHash,
      },
    });

  if (!verificationToken) {
    return null;
  }

  if (verificationToken.expiresAt <= new Date()) {
    await prisma.emailVerificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });

    return null;
  }

  return verificationToken;
}

/**
 * Valider définitivement l'adresse email.
 */
export async function validerEmailUtilisateur(
  userId: string,
  tokenId: string
) {
  return prisma.$transaction(async (tx) => {
    const utilisateur = await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: true,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        emailVerified: true,
      },
    });

    await tx.emailVerificationToken.delete({
      where: {
        id: tokenId,
      },
    });

    return utilisateur;
  });
}