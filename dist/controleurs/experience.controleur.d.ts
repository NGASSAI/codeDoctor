import { Request, Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * Créer une expérience
 * POST /api/experiences
 */
export declare function creer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Obtenir toutes les expériences publiques
 * GET /api/experiences
 */
export declare function lister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Obtenir une expérience
 * GET /api/experiences/:id
 */
export declare function obtenir(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Modifier une expérience
 * PUT /api/experiences/:id
 */
export declare function modifier(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Supprimer une expérience
 * DELETE /api/experiences/:id
 */
export declare function supprimer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=experience.controleur.d.ts.map