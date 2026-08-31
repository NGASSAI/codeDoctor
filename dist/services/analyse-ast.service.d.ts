import type { Category } from "../generated/prisma/client";
/**
 * Exécute les détections basées sur l'AST pour une catégorie donnée.
 * Retourne les codes de règles (format réel : "JS-001", "REACT-001", etc.)
 * détectés dans le code.
 *
 * Les détecteurs seront ajoutés progressivement, catégorie par catégorie,
 * en utilisant les vrais codes de src/data/codeDoctorRules.ts.
 */
export declare function detecterViaAST(code: string, categorie: Category): Set<string>;
//# sourceMappingURL=analyse-ast.service.d.ts.map