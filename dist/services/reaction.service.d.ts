import type { ReactionType } from "../generated/prisma/client";
/**
 * Ajouter une réaction
 */
export declare function ajouterReaction(userId: string, experienceId: string, type: ReactionType): Promise<{
    id: string;
    experienceId: string;
    userId: string;
    type: ReactionType;
    createdAt: Date;
}>;
/**
 * Récupérer les réactions d'une expérience
 */
export declare function obtenirReactions(experienceId: string): Promise<({
    user: {
        displayName: string | null;
        id: string;
    };
} & {
    id: string;
    experienceId: string;
    userId: string;
    type: ReactionType;
    createdAt: Date;
})[]>;
/**
 * Vérifier si l'utilisateur possède déjà cette réaction
 */
export declare function trouverReaction(userId: string, experienceId: string, type: ReactionType): Promise<{
    id: string;
    experienceId: string;
    userId: string;
    type: ReactionType;
    createdAt: Date;
} | null>;
/**
 * Supprimer une réaction
 */
export declare function supprimerReaction(userId: string, experienceId: string, type: ReactionType): Promise<{
    id: string;
    experienceId: string;
    userId: string;
    type: ReactionType;
    createdAt: Date;
}>;
//# sourceMappingURL=reaction.service.d.ts.map