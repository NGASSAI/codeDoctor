import { Request, Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * Ajouter une réaction
 * POST /api/experiences/:experienceId/reactions
 */
export declare function ajouter(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Récupérer les réactions d'une expérience
 * GET /api/experiences/:experienceId/reactions
 */
export declare function lister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Supprimer une réaction
 * DELETE /api/experiences/:experienceId/reactions/:type
 */
export declare function supprimer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=reaction.controleur.d.ts.map