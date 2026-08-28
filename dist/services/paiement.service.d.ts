/**
 * Créer une demande de paiement Premium.
 */
export declare function creerDemandePaiement(userId: string, montant: number): Promise<{
    createdAt: Date;
    id: string;
    methode: string;
    montant: number;
    statut: string;
    userId: string;
}>;
/**
 * Récupérer les demandes de paiement d'un utilisateur.
 */
export declare function listerPaiementsUtilisateur(userId: string): Promise<{
    createdAt: Date;
    id: string;
    methode: string;
    montant: number;
    statut: string;
    updatedAt: Date;
}[]>;
/**
 * Récupérer un paiement précis appartenant à un utilisateur.
 */
export declare function obtenirPaiementUtilisateur(paiementId: string, userId: string): Promise<{
    createdAt: Date;
    id: string;
    methode: string;
    montant: number;
    statut: string;
    updatedAt: Date;
} | null>;
/**
 * Lister les paiements pour l'administration.
 */
export declare function listerPaiementsAdmin(page: number, limite: number): Promise<{
    paiements: ({
        user: {
            displayName: string | null;
            email: string;
            id: string;
        };
    } & {
        id: string;
        userId: string;
        montant: number;
        methode: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    })[];
    pagination: {
        page: number;
        limite: number;
        total: number;
        pages: number;
    };
}>;
/**
 * Approuver un paiement.
 */
/**
 * Approuver un paiement et activer le Premium.
 */
export declare function approuverPaiement(paiementId: string): Promise<{
    id: string;
    userId: string;
    montant: number;
    methode: string;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Rejeter un paiement.
 */
export declare function rejeterPaiement(paiementId: string): Promise<{
    id: string;
    userId: string;
    montant: number;
    methode: string;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=paiement.service.d.ts.map