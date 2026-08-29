import { Request, Response } from "express";
import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
/**
 * =========================================================
 * INSCRIPTION
 * =========================================================
 */
export declare function inscription(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * CONNEXION
 * =========================================================
 */
export declare function connexion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * DÉCONNEXION
 * =========================================================
 */
export declare function deconnexion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * RAFRAÎCHISSEMENT DU JWT
 * =========================================================
 */
export declare function rafraichir(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * MOT DE PASSE OUBLIÉ — ÉTAPE 1 ET 2
 * =========================================================
 *
 * Étape 1 :
 *   email uniquement
 *   → retourne l'indice de récupération
 *
 * Étape 2 :
 *   email + phrase secrète
 *   → vérifie la phrase
 *   → génère un token valable 5 minutes
 */
export declare function motDePasseOublie(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * RÉINITIALISATION DU MOT DE PASSE
 * =========================================================
 */
export declare function reinitialiserMotDePasseControleur(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * DEMANDER LA VÉRIFICATION EMAIL
 * =========================================================
 */
export declare function demanderVerificationEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * VÉRIFIER L'ADRESSE EMAIL
 * =========================================================
 */
export declare function verifierEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * =========================================================
 * UTILISATEUR COURANT
 * =========================================================
 */
export declare function moi(req: RequeteAuthentifiee, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=authentification.controleur.d.ts.map