/**
 * Créer un commentaire sur une expérience
 */
export declare function creerCommentaire(userId: string, experienceId: string, contenu: string): Promise<{
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
}>;
/**
 * Récupérer les commentaires d'une expérience
 */
export declare function obtenirCommentaires(experienceId: string): Promise<({
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
})[]>;
/**
 * Vérifier qu'un commentaire appartient bien à un utilisateur
 */
export declare function trouverCommentaireUtilisateur(commentId: string, userId: string): Promise<{
    id: string;
    experienceId: string;
    userId: string;
    contenu: string;
    createdAt: Date;
    updatedAt: Date;
} | null>;
/**
 * Supprimer un commentaire appartenant à l'utilisateur
 */
export declare function supprimerCommentaire(commentId: string, userId: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
//# sourceMappingURL=commentaire.service.d.ts.map