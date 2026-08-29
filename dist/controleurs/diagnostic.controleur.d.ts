import type { Request, Response } from "express";
/**
 * POST /api/diagnostic
 *
 * Analyse un code avec le moteur de règles local.
 *
 * L'IA n'intervient pas ici.
 */
export declare function diagnostiquer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=diagnostic.controleur.d.ts.map