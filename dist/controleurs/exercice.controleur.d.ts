import { Request, Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * GET /api/exercices
 *
 * Liste les exercices.
 *
 * Filtres optionnels :
 * ?categorie=JAVASCRIPT
 * ?difficulte=FACILE
 */
export declare function lister(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/exercices/:id
 */
export declare function obtenir(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/exercices/:id/indices/:numero
 */
export declare function indice(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/exercices/:id/tenter
 *
 * Body :
 * {
 *   "reponse": "...",
 *   "indicesUtilises": 0
 * }
 */
export declare function tenter(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/exercices/mes-tentatives
 *
 * Historique des tentatives de l'utilisateur connecté.
 */
export declare function mesTentatives(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/exercices/ma-progression
 */
export declare function maProgression(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/exercices/admin/tous
 *
 * Liste complète pour l'admin (avec solution et mots-clés).
 */
export declare function listerPourAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * POST /api/exercices/admin
 *
 * Crée un exercice.
 */
export declare function creer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * PUT /api/exercices/admin/:id
 *
 * Modifie un exercice.
 */
export declare function modifier(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * DELETE /api/exercices/admin/:id
 *
 * Supprime un exercice.
 */
export declare function supprimer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=exercice.controleur.d.ts.map