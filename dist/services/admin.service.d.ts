import { ExperienceStatus } from "../generated/prisma/client";
export declare function obtenirStatistiquesAdmin(): Promise<{
    utilisateurs: number;
    experiences: {
        total: number;
        publiees: number;
        cachees: number;
    };
    commentaires: number;
    reactions: number;
    signalements: {
        total: number;
        enAttente: number;
    };
    exercices: number;
    conversations: number;
    notifications: number;
}>;
/**
 * Liste des utilisateurs pour l'administration.
 */
export declare function listerUtilisateursAdmin(page: number, limite: number): Promise<{
    utilisateurs: {
        _count: {
            comments: number;
            experiences: number;
            reports: number;
        };
        createdAt: Date;
        displayName: string | null;
        email: string;
        emailVerified: boolean;
        id: string;
        role: import("../generated/prisma/enums").UserRole;
    }[];
    pagination: {
        page: number;
        limite: number;
        total: number;
        pages: number;
    };
}>;
/**
 * Liste toutes les expériences pour l'administration.
 * Contrairement à l'API publique, l'admin voit
 * également les expériences HIDDEN et DELETED.
 */
export declare function listerExperiencesAdmin(page: number, limite: number): Promise<{
    experiences: ({
        _count: {
            comments: number;
            reactions: number;
            reports: number;
        };
        moderator: {
            displayName: string | null;
            email: string;
            id: string;
        } | null;
        user: {
            displayName: string | null;
            email: string;
            id: string;
        };
    } & {
        id: string;
        userId: string;
        titre: string;
        probleme: string;
        code: string | null;
        cause: string;
        solution: string;
        technologie: string | null;
        categorie: import("../generated/prisma/enums").Category;
        statut: ExperienceStatus;
        createdAt: Date;
        updatedAt: Date;
        moderatedAt: Date | null;
        moderatedBy: string | null;
    })[];
    pagination: {
        page: number;
        limite: number;
        total: number;
        pages: number;
    };
}>;
/**
 * Modifier le statut d'une expérience.
 */
export declare function modifierStatutExperienceAdmin(experienceId: string, statut: ExperienceStatus, adminId: string): Promise<{
    user: {
        displayName: string | null;
        email: string;
        id: string;
    };
} & {
    id: string;
    userId: string;
    titre: string;
    probleme: string;
    code: string | null;
    cause: string;
    solution: string;
    technologie: string | null;
    categorie: import("../generated/prisma/enums").Category;
    statut: ExperienceStatus;
    createdAt: Date;
    updatedAt: Date;
    moderatedAt: Date | null;
    moderatedBy: string | null;
}>;
/**
 * Modifier le rôle d'un utilisateur (ex: USER <-> ADMIN).
 */
export declare function modifierRoleUtilisateurAdmin(userId: string, role: "USER" | "ADMIN"): Promise<{
    displayName: string | null;
    email: string;
    id: string;
    role: import("../generated/prisma/enums").UserRole;
}>;
/**
 * Modifier le statut d'activation / bannissement d'un utilisateur.
 */
export declare function modifierStatutUtilisateurAdmin(userId: string, estActif: boolean): Promise<{
    displayName: string | null;
    email: string;
    id: string;
    role: import("../generated/prisma/enums").UserRole;
}>;
/**
 * Supprimer définitivement un utilisateur.
 */
export declare function supprimerUtilisateurAdmin(userId: string): Promise<{
    id: string;
    email: string;
    passwordHash: string;
    displayName: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: import("../generated/prisma/enums").UserRole;
    recoveryAnswerHash: string | null;
    recoveryHint: string | null;
}>;
/**
 * Notifications de l'administrateur connecté.
 */
export declare function obtenirNotificationsAdmin(adminId: string, page: number, limite: number): Promise<{
    notifications: {
        id: string;
        userId: string;
        type: import("../generated/prisma/enums").NotificationType;
        titre: string;
        message: string;
        lien: string | null;
        lue: boolean;
        createdAt: Date;
    }[];
    pagination: {
        page: number;
        limite: number;
        total: number;
        pages: number;
    };
}>;
//# sourceMappingURL=admin.service.d.ts.map