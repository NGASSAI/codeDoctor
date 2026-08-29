import { Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * =========================================================
 * MODIFIER LE PROFIL
 * =========================================================
 */
export declare function modifierProfil(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * RÉCUPÉRER LE PROFIL
 * =========================================================
 */
export declare function profil(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * MODIFIER LA SÉCURITÉ DE RÉCUPÉRATION
 * =========================================================
 *
 * Permet à l'utilisateur connecté de définir ou modifier :
 *
 * - sa phrase secrète ;
 * - son indice de récupération.
 *
 * La phrase secrète n'est jamais stockée en clair.
 */
export declare function modifierSecuriteRecuperationControleur(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=utilisateur.controleur.d.ts.map