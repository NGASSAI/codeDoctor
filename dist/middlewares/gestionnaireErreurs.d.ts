import { Request, Response, NextFunction } from "express";
/**
 * Middleware global de gestion des erreurs.
 *
 * Il doit être enregistré en dernier dans index.ts.
 */
export declare function gestionnaireErreurs(erreur: unknown, _req: Request, res: Response, _next: NextFunction): Response<any, Record<string, any>>;
//# sourceMappingURL=gestionnaireErreurs.d.ts.map