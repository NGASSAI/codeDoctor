export interface EtatQuotaIA {
    plan: "FREE" | "PREMIUM" | "ADMIN";
    utilise: number;
    limite: number | null;
    restant: number | null;
    illimite: boolean;
    dateJour: string;
}
export declare function verifierEtConsommerQuotaIA(utilisateurId: string): Promise<EtatQuotaIA>;
export declare function enregistrerTokensIA(utilisateurId: string, dateJour: string, tokens: number): Promise<void>;
export declare function obtenirEtatQuotaIA(utilisateurId: string): Promise<EtatQuotaIA>;
//# sourceMappingURL=quota.service.d.ts.map