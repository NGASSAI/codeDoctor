import { Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * GET /api/historique
 */
export declare function lister(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/historique/:id
 */
export declare function obtenir(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/historique
 */
export declare function creer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * DELETE /api/historique/:id
 */
export declare function supprimer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/historique/:id/conversation
 */
export declare function nouvelleConversation(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/historique/conversations/:id
 */
export declare function conversation(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/historique/conversations/:id/messages
 */
export declare function message(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=historique.controleur.d.ts.map