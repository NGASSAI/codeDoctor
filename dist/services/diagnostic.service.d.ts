import type { Category } from "../generated/prisma/client";
export interface DiagnosticResultat {
    regleId: string;
    code: string;
    titre: string;
    categorie: Category;
    severite: string;
    explication: string;
    cause: string;
    commentTrouver: string;
    correction: string;
    avant: string;
    apres: string;
}
/**
 * Recherche les règles correspondant au code fourni.
 *
 * Le moteur de diagnostic fonctionne localement :
 * - il vérifie d'abord la syntaxe réelle du code (Babel parser) ;
 * - si le code est syntaxiquement valide, il exécute les détections
 *   basées sur l'AST (plus fiables) ;
 * - il complète avec les détections regex pour les règles non
 *   encore migrées vers l'AST ;
 * - il retourne uniquement les problèmes détectés.
 *
 * L'IA reste disponible en complément pour tout ce que ce moteur
 * ne couvre pas.
 */
export declare function diagnostiquerCode(code: string, categorie: Category): Promise<DiagnosticResultat[]>;
/**
 * Récupère toutes les règles de diagnostic enregistrées
 * en base de données.
 */
export declare function listerReglesDiagnostic(categorie?: Category): Promise<{
    id: string;
    code: string;
    title: string;
    category: Category;
    severity: import("../generated/prisma/enums").Severity;
    explanation: string;
    cause: string;
    howToFind: string;
    fixHint: string;
    beforeCode: string;
    afterCode: string;
    createdAt: Date;
}[]>;
/**
 * Vérifie quelles règles du catalogue local
 * sont déjà présentes en base.
 */
export declare function verifierCatalogueDiagnostic(): Promise<{
    code: string;
    presente: boolean;
    regleId: string | null;
}[]>;
//# sourceMappingURL=diagnostic.service.d.ts.map