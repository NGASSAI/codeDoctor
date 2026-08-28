"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerUtilisateur = creerUtilisateur;
exports.trouverUtilisateurParEmail = trouverUtilisateurParEmail;
exports.verifierMotDePasse = verifierMotDePasse;
exports.creerSession = creerSession;
exports.supprimerSession = supprimerSession;
exports.trouverSessionParRefreshTokenHash = trouverSessionParRefreshTokenHash;
exports.trouverSessionValide = trouverSessionValide;
exports.renouvelerSession = renouvelerSession;
exports.creerTokenReinitialisation = creerTokenReinitialisation;
exports.trouverTokenReinitialisation = trouverTokenReinitialisation;
exports.reinitialiserMotDePasse = reinitialiserMotDePasse;
exports.trouverUtilisateurParId = trouverUtilisateurParId;
exports.modifierProfilUtilisateur = modifierProfilUtilisateur;
exports.creerTokenVerificationEmail = creerTokenVerificationEmail;
exports.verifierTokenEmail = verifierTokenEmail;
exports.validerEmailUtilisateur = validerEmailUtilisateur;
const base_1 = require("../base");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Crée un nouvel utilisateur.
 */
async function creerUtilisateur(email, motDePasse) {
    const motDePasseHache = await bcrypt_1.default.hash(motDePasse, 10);
    return base_1.prisma.user.create({
        data: {
            email,
            passwordHash: motDePasseHache,
        },
    });
}
/**
 * Recherche un utilisateur à partir de son adresse email.
 */
async function trouverUtilisateurParEmail(email) {
    return base_1.prisma.user.findUnique({
        where: { email },
    });
}
/**
 * Vérifie qu'un mot de passe correspond au hash enregistré.
 */
async function verifierMotDePasse(motDePasse, motDePasseHache) {
    return bcrypt_1.default.compare(motDePasse, motDePasseHache);
}
/**
 * Crée une session sécurisée pour un utilisateur.
 *
 * Le refresh token original est retourné au serveur
 * afin qu'il puisse être transmis au client.
 *
 * Seul son hash SHA-256 est enregistré en base de données.
 */
async function creerSession(userId, userAgent) {
    // Génération d'un token cryptographiquement sécurisé.
    const refreshToken = crypto_1.default.randomBytes(64).toString("hex");
    // On ne stocke jamais le refresh token en clair en base.
    const refreshTokenHash = crypto_1.default
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");
    // Durée de vie de la session : 30 jours.
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = await base_1.prisma.session.create({
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
async function supprimerSession(refreshTokenHash) {
    return base_1.prisma.session.delete({
        where: {
            refreshTokenHash,
        },
    });
}
async function trouverSessionParRefreshTokenHash(refreshTokenHash) {
    return base_1.prisma.session.findUnique({
        where: {
            refreshTokenHash,
        },
    });
}
async function trouverSessionValide(refreshTokenHash) {
    const session = await base_1.prisma.session.findUnique({
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
        await base_1.prisma.session.delete({
            where: {
                id: session.id,
            },
        });
        return null;
    }
    return session;
}
async function renouvelerSession(sessionId) {
    // Génération d'un nouveau refresh token cryptographiquement sécurisé
    const nouveauRefreshToken = crypto_1.default.randomBytes(64).toString("hex");
    // Hash du nouveau refresh token avant stockage en base
    const nouveauRefreshTokenHash = crypto_1.default
        .createHash("sha256")
        .update(nouveauRefreshToken)
        .digest("hex");
    // On remplace l'ancien hash
    await base_1.prisma.session.update({
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
async function creerTokenReinitialisation(userId) {
    // Token aléatoire sécurisé de 32 octets
    const token = crypto_1.default.randomBytes(32).toString("hex");
    // On ne stocke jamais le token original en base
    const tokenHash = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    // Validité : 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await base_1.prisma.passwordResetToken.create({
        data: {
            userId,
            token: tokenHash,
            expiresAt,
        },
    });
    // Le token original est retourné uniquement au contrôleur
    return token;
}
async function trouverTokenReinitialisation(tokenHash) {
    const resetToken = await base_1.prisma.passwordResetToken.findUnique({
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
async function reinitialiserMotDePasse(userId, tokenId, nouveauMotDePasse) {
    const nouveauMotDePasseHache = await bcrypt_1.default.hash(nouveauMotDePasse, 12);
    return base_1.prisma.$transaction(async (tx) => {
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
async function trouverUtilisateurParId(userId) {
    return base_1.prisma.user.findUnique({
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
async function modifierProfilUtilisateur(userId, displayName) {
    return base_1.prisma.user.update({
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
async function creerTokenVerificationEmail(userId) {
    const token = crypto_1.default.randomBytes(32).toString("hex");
    const tokenHash = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    // Validité : 24 heures
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    // Supprimer les anciens tokens de cet utilisateur
    await base_1.prisma.emailVerificationToken.deleteMany({
        where: {
            userId,
        },
    });
    await base_1.prisma.emailVerificationToken.create({
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
async function verifierTokenEmail(tokenHash) {
    const verificationToken = await base_1.prisma.emailVerificationToken.findUnique({
        where: {
            token: tokenHash,
        },
    });
    if (!verificationToken) {
        return null;
    }
    if (verificationToken.expiresAt <= new Date()) {
        await base_1.prisma.emailVerificationToken.delete({
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
async function validerEmailUtilisateur(userId, tokenId) {
    return base_1.prisma.$transaction(async (tx) => {
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
//# sourceMappingURL=utilisateur.service.js.map