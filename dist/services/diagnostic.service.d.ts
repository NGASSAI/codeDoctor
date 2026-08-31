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
 * Étapes :
 * 1. Vérification de la syntaxe réelle (Babel parser).
 * 2. Détections basées sur l'AST (règles migrées, une par une).
 * 3. Détections regex (fallback, pour les règles pas encore migrées).
 *
 * Les codes de règles utilisés ici doivent EXACTEMENT correspondre
 * à ceux définis dans src/data/codeDoctorRules.ts (format avec tiret,
 * ex: "JS-001", "REACT-001", "HTML-001").
 */
export declare function diagnostiquerCode(code: string, categorie: Category): Promise<DiagnosticResultat[]>;
/**
 * Récupère toutes les règles de diagnostic enregistrées en base.
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
 * Vérifie quelles règles du catalogue local (CODE_DOCTOR_RULES)
 * sont déjà présentes en base.
 */
export declare function verifierCatalogueDiagnostic(): Promise<{
    code: string;
    presente: boolean;
    regleId: string | null;
}[]>;
//# sourceMappingURL=diagnostic.service.d.ts.map