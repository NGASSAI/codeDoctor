import { Request, Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * Créer un signalement
 * POST /api/experiences/:experienceId/signalements
 */
export declare function creer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Voir les signalements
 * GET /api/signalements
 *
 * Cette route sera réservée à l'administration plus tard.
 */
export declare function lister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Voir un signalement
 * GET /api/signalements/:id
 *
 * Cette route sera réservée à l'administration plus tard.
 */
export declare function obtenir(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Modifier le statut d'un signalement
 * PATCH /api/signalements/:id/statut
 *
 * Cette route sera réservée à l'administration plus tard.
 */
export declare function modifierStatut(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=report.controleur.d.ts.map