export interface EtatAbonnement {
    plan: string;
    statut: string;
    dateDebut: Date;
    dateRenouvellement: Date;
    premiumActif: boolean;
}
/**
 * Récupérer ou créer l'abonnement FREE d'un utilisateur.
 */
export declare function obtenirOuCreerAbonnement(userId: string): Promise<{
    id: string;
    userId: string;
    plan: string;
    statut: string;
    dateDebut: Date;
    dateRenouvellement: Date;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Récupérer l'état actuel de l'abonnement.
 */
export declare function obtenirEtatAbonnement(userId: string): Promise<EtatAbonnement>;
/**
 * Vérifier si un utilisateur possède Premium.
 */
export declare function utilisateurPremium(userId: string): Promise<boolean>;
/**
 * Activer Premium.
 *
 * Cette fonction sera utilisée par le système
 * de validation du paiement.
 */
export declare function activerPremium(userId: string): Promise<{
    id: string;
    userId: string;
    plan: string;
    statut: string;
    dateDebut: Date;
    dateRenouvellement: Date;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Désactiver Premium.
 */
export declare function desactiverPremium(userId: string): Promise<{
    id: string;
    userId: string;
    plan: string;
    statut: string;
    dateDebut: Date;
    dateRenouvellement: Date;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=abonnement.service.d.ts.map