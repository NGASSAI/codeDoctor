import { Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * Créer une demande de paiement Premium.
 */
export declare function creerPaiement(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Lister les paiements de l'utilisateur connecté.
 */
export declare function mesPaiements(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Récupérer un paiement précis.
 */
export declare function obtenirPaiement(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Lister les paiements pour l'administration.
 */
export declare function paiementsAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Approuver un paiement.
 */
export declare function approuverPaiementAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Rejeter un paiement.
 */
export declare function rejeterPaiementAdmin(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=paiement.controleur.d.ts.map