import { Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * Dashboard administrateur
 */
export declare function dashboardAdmin(_req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Modifier le rôle d'un utilisateur
 * PATCH /api/admin/utilisateurs/:id/role
 */
export declare function modifierRoleUtilisateur(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Lister les utilisateurs pour l'administration
 */
export declare function utilisateursAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Supprimer une expérience
 * DELETE /api/admin/experiences/:id
 */
export declare function supprimerExperience(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Supprimer un utilisateur
 * DELETE /api/admin/utilisateurs/:id
 */
export declare function supprimerUtilisateur(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Notifications de l'administrateur connecté
 * GET /api/admin/notifications
 */
export declare function notificationsAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Lister les expériences pour l'administration
 */
export declare function experiencesAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Modifier le statut d'une expérience
 */
export declare function modifierStatutExperience(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Lister les signalements pour l'administration
 *
 * GET /api/admin/signalements
 *
 * Exemple :
 * /api/admin/signalements
 * /api/admin/signalements?statut=PENDING
 */
export declare function signalementsAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Modifier le statut d'un signalement
 *
 * PATCH /api/admin/signalements/:id/statut
 */
export declare function modifierStatutSignalementAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=admin.controleur.d.ts.map