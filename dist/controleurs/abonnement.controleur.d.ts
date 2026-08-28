import { Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * Récupérer l'abonnement de l'utilisateur connecté.
 */
export declare function monAbonnement(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=abonnement.controleur.d.ts.map