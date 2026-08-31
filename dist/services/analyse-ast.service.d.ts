import type { Category } from "../generated/prisma/client";
/**
 * Exécute les détections basées sur l'AST pour une catégorie donnée.
 * Retourne les codes de règles (format réel : "JS-001", "REACT-001", etc.)
 * détectés dans le code fourni.
 */
export declare function detecterViaAST(code: string, categorie: Category): Set<string>;
//# sourceMappingURL=analyse-ast.service.d.ts.map