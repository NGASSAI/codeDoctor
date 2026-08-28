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
 * - il récupère les règles correspondant à la catégorie ;
 * - il applique un détecteur spécifique à chaque règle ;
 * - il retourne uniquement les problèmes détectés.
 *
 * L'IA pourra être ajoutée plus tard comme couche complémentaire.
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