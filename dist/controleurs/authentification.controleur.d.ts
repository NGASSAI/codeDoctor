import { Request, Response } from "express";
/**
 * Inscription
 */
export declare function inscription(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Connexion
 */
export declare function connexion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Déconnexion
 */
/**
 * Déconnexion
 */
export declare function deconnexion(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Rafraîchissement du JWT
 */
export declare function rafraichir(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Demande de réinitialisation du mot de passe
 */
export declare function motDePasseOublie(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Réinitialisation du mot de passe
 */
export declare function reinitialiserMotDePasseControleur(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Demander la vérification de l'adresse email.
 */
export declare function demanderVerificationEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Vérifier l'adresse email avec le token reçu.
 */
export declare function verifierEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=authentification.controleur.d.ts.map