import { Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
export declare function modifierProfil(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Récupérer le profil de l'utilisateur connecté
 */
export declare function profil(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=utilisateur.controleur.d.ts.map