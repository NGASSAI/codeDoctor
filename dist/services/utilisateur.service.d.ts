/**
 * Crée un nouvel utilisateur.
 */
export declare function creerUtilisateur(email: string, motDePasse: string, displayName?: string): Promise<{
    id: string;
    email: string;
    passwordHash: string;
    displayName: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: import("../generated/prisma/enums").UserRole;
}>;
/**
 * Recherche un utilisateur à partir de son adresse email.
 */
export declare function trouverUtilisateurParEmail(email: string): Promise<{
    id: string;
    email: string;
    passwordHash: string;
    displayName: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: import("../generated/prisma/enums").UserRole;
} | null>;
/**
 * Vérifie qu'un mot de passe correspond au hash enregistré.
 */
export declare function verifierMotDePasse(motDePasse: string, motDePasseHache: string): Promise<boolean>;
/**
 * Crée une session sécurisée pour un utilisateur.
 *
 * Le refresh token original est retourné au serveur
 * afin qu'il puisse être transmis au client.
 *
 * Seul son hash SHA-256 est enregistré en base de données.
 */
export declare function creerSession(userId: string, userAgent?: string): Promise<{
    session: {
        id: string;
        userId: string;
        userAgent: string | null;
        createdAt: Date;
        expiresAt: Date;
        refreshTokenHash: string;
    };
    refreshToken: string;
}>;
export declare function supprimerSession(refreshTokenHash: string): Promise<{
    id: string;
    userId: string;
    userAgent: string | null;
    createdAt: Date;
    expiresAt: Date;
    refreshTokenHash: string;
}>;
export declare function trouverSessionParRefreshTokenHash(refreshTokenHash: string): Promise<{
    id: string;
    userId: string;
    userAgent: string | null;
    createdAt: Date;
    expiresAt: Date;
    refreshTokenHash: string;
} | null>;
export declare function trouverSessionValide(refreshTokenHash: string): Promise<({
    user: {
        id: string;
        email: string;
        passwordHash: string;
        displayName: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        role: import("../generated/prisma/enums").UserRole;
    };
} & {
    id: string;
    userId: string;
    userAgent: string | null;
    createdAt: Date;
    expiresAt: Date;
    refreshTokenHash: string;
}) | null>;
export declare function renouvelerSession(sessionId: string): Promise<{
    refreshToken: string;
}>;
export declare function creerTokenReinitialisation(userId: string): Promise<string>;
export declare function trouverTokenReinitialisation(tokenHash: string): Promise<({
    user: {
        id: string;
        email: string;
        passwordHash: string;
        displayName: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        role: import("../generated/prisma/enums").UserRole;
    };
} & {
    id: string;
    userId: string;
    token: string;
    used: boolean;
    expiresAt: Date;
    createdAt: Date;
}) | null>;
export declare function reinitialiserMotDePasse(userId: string, tokenId: string, nouveauMotDePasse: string): Promise<{
    id: string;
    email: string;
    passwordHash: string;
    displayName: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: import("../generated/prisma/enums").UserRole;
}>;
export declare function trouverUtilisateurParId(userId: string): Promise<{
    createdAt: Date;
    displayName: string | null;
    email: string;
    emailVerified: boolean;
    id: string;
} | null>;
export declare function modifierProfilUtilisateur(userId: string, displayName: string | null): Promise<{
    createdAt: Date;
    displayName: string | null;
    email: string;
    emailVerified: boolean;
    id: string;
}>;
/**
 * Créer un token de vérification d'email.
 */
export declare function creerTokenVerificationEmail(userId: string): Promise<string>;
/**
 * Vérifier un token d'email.
 */
export declare function verifierTokenEmail(tokenHash: string): Promise<{
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
} | null>;
/**
 * Valider définitivement l'adresse email.
 */
export declare function validerEmailUtilisateur(userId: string, tokenId: string): Promise<{
    displayName: string | null;
    email: string;
    emailVerified: boolean;
    id: string;
}>;
//# sourceMappingURL=utilisateur.service.d.ts.map