import type { Category } from "../generated/prisma/client";
export interface DetectionAST {
    code: string;
    trouve: boolean;
}
/**
 * Exécute les détections basées sur l'AST pour une catégorie donnée.
 * Retourne uniquement les codes de règles trouvés.
 */
export declare function detecterViaAST(code: string, categorie: Category): Set<string>;
//# sourceMappingURL=analyse-ast.service.d.ts.map