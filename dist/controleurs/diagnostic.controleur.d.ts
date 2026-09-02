import type { Request, Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * POST /api/diagnostic
 *
 * Analyse un code avec le moteur de règles local.
 *
 * L'IA n'intervient pas ici.
 *
 * Si l'utilisateur est connecté et qu'au moins un problème
 * est détecté, une entrée est ajoutée à son historique.
 */
export declare function diagnostiquer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/diagnostic/capacites
 */
export declare function listerCapacites(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=diagnostic.controleur.d.ts.map