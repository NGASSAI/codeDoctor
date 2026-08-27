import { Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * Récupérer toutes les notifications de l'utilisateur connecté
 */
export declare function listerNotifications(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Récupérer uniquement les notifications non lues
 */
export declare function listerNotificationsNonLues(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Compter les notifications non lues
 */
export declare function compterNonLues(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Marquer une notification comme lue
 */
export declare function marquerCommeLue(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Marquer toutes les notifications comme lues
 */
export declare function marquerToutesCommeLuesControleur(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Supprimer une notification
 */
export declare function supprimer(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=notification.controleur.d.ts.map