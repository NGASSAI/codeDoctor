import { Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * =========================================================
 * LISTER LES PAIEMENTS PREMIUM
 *
 * GET /api/admin/paiements
 * =========================================================
 */
export declare function paiementsAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * APPROUVER UN PAIEMENT
 *
 * PATCH /api/admin/paiements/:id/approuver
 *
 * L'approbation active automatiquement le Premium
 * de l'utilisateur pendant 30 jours.
 * =========================================================
 */
export declare function approuverPaiementAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * REJETER UN PAIEMENT
 *
 * PATCH /api/admin/paiements/:id/rejeter
 * =========================================================
 */
export declare function rejeterPaiementAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=paiement-admin.controleur.d.ts.map