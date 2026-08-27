import { Category, ExperienceStatus } from "../generated/prisma/client";
/**
 * Créer une expérience
 */
export declare function creerExperience(userId: string, data: {
    titre: string;
    probleme: string;
    code?: string;
    cause: string;
    solution: string;
    technologie?: string;
    categorie: Category;
}): Promise<{
    id: string;
    userId: string;
    titre: string;
    probleme: string;
    code: string | null;
    cause: string;
    solution: string;
    technologie: string | null;
    categorie: Category;
    statut: ExperienceStatus;
    createdAt: Date;
    updatedAt: Date;
    moderatedAt: Date | null;
    moderatedBy: string | null;
}>;
/**
 * Récupérer toutes les expériences publiques
 */
export declare function obtenirExperiences(recherche?: string, categorie?: Category, page?: number, limite?: number): Promise<{
    experiences: ({
        _count: {
            comments: number;
            reactions: number;
        };
        user: {
            displayName: string | null;
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
        categorie: Category;
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
 * Récupérer une expérience par son ID
 */
export declare function obtenirExperienceParId(id: string): Promise<({
    _count: {
        comments: number;
        reactions: number;
        reports: number;
    };
    comments: ({
        user: {
            displayName: string | null;
            id: string;
        };
    } & {
        id: string;
        experienceId: string;
        userId: string;
        contenu: string;
        createdAt: Date;
        updatedAt: Date;
    })[];
    reactions: {
        id: string;
        experienceId: string;
        userId: string;
        type: import("../generated/prisma/enums").ReactionType;
        createdAt: Date;
    }[];
    user: {
        displayName: string | null;
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
    categorie: Category;
    statut: ExperienceStatus;
    createdAt: Date;
    updatedAt: Date;
    moderatedAt: Date | null;
    moderatedBy: string | null;
}) | null>;
/**
 * Vérifier qu'une expérience appartient bien à l'utilisateur
 */
export declare function trouverExperienceUtilisateur(experienceId: string, userId: string): Promise<{
    id: string;
    userId: string;
    titre: string;
    probleme: string;
    code: string | null;
    cause: string;
    solution: string;
    technologie: string | null;
    categorie: Category;
    statut: ExperienceStatus;
    createdAt: Date;
    updatedAt: Date;
    moderatedAt: Date | null;
    moderatedBy: string | null;
} | null>;
/**
 * Modifier une expérience
 */
export declare function modifierExperience(experienceId: string, userId: string, data: {
    titre?: string;
    probleme?: string;
    code?: string;
    cause?: string;
    solution?: string;
    technologie?: string;
    categorie?: Category;
}): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
/**
 * Supprimer une expérience
 *
 * On utilise une suppression logique :
 * l'expérience passe à DELETED au lieu
 * d'être immédiatement supprimée de PostgreSQL.
 */
export declare function supprimerExperience(experienceId: string, userId: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
//# sourceMappingURL=experience.service.d.ts.map