import type { ReportReason, ReportStatus } from "../generated/prisma/client";
/**
 * Créer un signalement
 */
export declare function creerSignalement(userId: string, experienceId: string, raison: ReportReason, description?: string): Promise<{
    id: string;
    experienceId: string;
    userId: string;
    raison: ReportReason;
    description: string | null;
    statut: ReportStatus;
    createdAt: Date;
    resolvedAt: Date | null;
}>;
/**
 * Vérifier si l'utilisateur a déjà signalé cette expérience
 */
export declare function trouverSignalement(userId: string, experienceId: string): Promise<{
    id: string;
    experienceId: string;
    userId: string;
    raison: ReportReason;
    description: string | null;
    statut: ReportStatus;
    createdAt: Date;
    resolvedAt: Date | null;
} | null>;
/**
 * Récupérer les signalements
 * Utilisé plus tard par l'administration
 */
export declare function obtenirSignalements(statut?: ReportStatus): Promise<({
    experience: {
        categorie: import("../generated/prisma/enums").Category;
        id: string;
        probleme: string;
        titre: string;
    };
    user: {
        displayName: string | null;
        email: string;
        id: string;
    };
} & {
    id: string;
    experienceId: string;
    userId: string;
    raison: ReportReason;
    description: string | null;
    statut: ReportStatus;
    createdAt: Date;
    resolvedAt: Date | null;
})[]>;
/**
 * Récupérer un signalement par son ID
 */
export declare function obtenirSignalementParId(id: string): Promise<({
    experience: {
        id: string;
        userId: string;
        titre: string;
        probleme: string;
        code: string | null;
        cause: string;
        solution: string;
        technologie: string | null;
        categorie: import("../generated/prisma/enums").Category;
        statut: import("../generated/prisma/enums").ExperienceStatus;
        createdAt: Date;
        updatedAt: Date;
        moderatedAt: Date | null;
        moderatedBy: string | null;
    };
    user: {
        displayName: string | null;
        email: string;
        id: string;
    };
} & {
    id: string;
    experienceId: string;
    userId: string;
    raison: ReportReason;
    description: string | null;
    statut: ReportStatus;
    createdAt: Date;
    resolvedAt: Date | null;
}) | null>;
/**
 * Modifier le statut d'un signalement
 * Utilisé par l'administrateur
 */
export declare function modifierStatutSignalement(id: string, statut: ReportStatus): Promise<{
    id: string;
    experienceId: string;
    userId: string;
    raison: ReportReason;
    description: string | null;
    statut: ReportStatus;
    createdAt: Date;
    resolvedAt: Date | null;
}>;
//# sourceMappingURL=report.service.d.ts.map