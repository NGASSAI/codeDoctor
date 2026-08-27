import { Request, Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * Créer un commentaire
 * POST /api/experiences/:experienceId/commentaires
 */
export declare function creer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Récupérer les commentaires d'une expérience
 * GET /api/experiences/:experienceId/commentaires
 */
export declare function lister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Supprimer son propre commentaire
 * DELETE /api/commentaires/:id
 */
export declare function supprimer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=commentaire.controleur.d.ts.map