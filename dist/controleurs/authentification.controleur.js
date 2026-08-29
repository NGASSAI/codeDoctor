"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inscription = inscription;
exports.connexion = connexion;
exports.deconnexion = deconnexion;
exports.rafraichir = rafraichir;
exports.motDePasseOublie = motDePasseOublie;
exports.reinitialiserMotDePasseControleur = reinitialiserMotDePasseControleur;
exports.demanderVerificationEmail = demanderVerificationEmail;
exports.verifierEmail = verifierEmail;
exports.moi = moi;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const utilisateur_service_1 = require("../services/utilisateur.service");
/**
 * =========================================================
 * INSCRIPTION
 * =========================================================
 */
async function inscription(req, res) {
    try {
        const { email, motDePasse, displayName, } = req.body;
        if (!email || !motDePasse) {
            return res.status(400).json({
                erreur: "Email et mot de passe requis.",
            });
        }
        if (typeof email !== "string") {
            return res.status(400).json({
                erreur: "Email invalide.",
            });
        }
        if (typeof motDePasse !== "string") {
            return res.status(400).json({
                erreur: "Mot de passe invalide.",
            });
        }
        if (displayName !== undefined &&
            typeof displayName !== "string") {
            return res.status(400).json({
                erreur: "Nom invalide.",
            });
        }
        const emailNormalise = email
            .trim()
            .toLowerCase();
        const nomNormalise = typeof displayName === "string"
            ? displayName.trim()
            : "";
        if (!emailNormalise) {
            return res.status(400).json({
                erreur: "Email requis.",
            });
        }
        if (nomNormalise.length < 2) {
            return res.status(400).json({
                erreur: "Le nom doit contenir au moins 2 caractères.",
            });
        }
        if (motDePasse.length < 8) {
            return res.status(400).json({
                erreur: "Le mot de passe doit contenir au moins 8 caractères.",
            });
        }
        const utilisateurExistant = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(emailNormalise);
        if (utilisateurExistant) {
            return res.status(409).json({
                erreur: "Un compte existe déjà avec cet email.",
            });
        }
        const utilisateur = await (0, utilisateur_service_1.creerUtilisateur)(emailNormalise, motDePasse, nomNormalise);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET n'est pas configuré.");
            return res.status(500).json({
                erreur: "Configuration serveur invalide.",
            });
        }
        /*
         * Création automatique du token de vérification
         * après l'inscription.
         */
        const tokenVerification = await (0, utilisateur_service_1.creerTokenVerificationEmail)(utilisateur.id);
        /*
         * JWT conservé pour compatibilité avec
         * le fonctionnement actuel du frontend.
         */
        const jeton = jsonwebtoken_1.default.sign({
            id: utilisateur.id,
        }, secret, {
            expiresIn: "7d",
        });
        return res.status(201).json({
            utilisateur: {
                id: utilisateur.id,
                email: utilisateur.email,
                displayName: utilisateur.displayName,
                emailVerified: utilisateur.emailVerified,
            },
            jeton,
            /*
             * TEMPORAIRE POUR LES TESTS.
             * À supprimer lorsque l'envoi d'email
             * sera réellement branché.
             */
            tokenVerification,
            message: "Compte créé avec succès. Veuillez vérifier votre adresse email.",
        });
    }
    catch (erreur) {
        console.error("Erreur lors de l'inscription :", erreur);
        return res.status(500).json({
            erreur: "Impossible de créer le compte.",
        });
    }
}
/**
 * =========================================================
 * CONNEXION
 * =========================================================
 */
async function connexion(req, res) {
    try {
        const { email, motDePasse, } = req.body;
        if (!email || !motDePasse) {
            return res.status(400).json({
                erreur: "Email et mot de passe requis.",
            });
        }
        if (typeof email !== "string" ||
            typeof motDePasse !== "string") {
            return res.status(400).json({
                erreur: "Données invalides.",
            });
        }
        const emailNormalise = email
            .trim()
            .toLowerCase();
        const utilisateur = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(emailNormalise);
        if (!utilisateur) {
            return res.status(401).json({
                erreur: "Email ou mot de passe incorrect.",
            });
        }
        const motDePasseValide = await (0, utilisateur_service_1.verifierMotDePasse)(motDePasse, utilisateur.passwordHash);
        if (!motDePasseValide) {
            return res.status(401).json({
                erreur: "Email ou mot de passe incorrect.",
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET n'est pas configuré.");
            return res.status(500).json({
                erreur: "Configuration serveur invalide.",
            });
        }
        /*
         * Création du JWT d'accès.
         */
        const jeton = jsonwebtoken_1.default.sign({
            id: utilisateur.id,
        }, secret, {
            expiresIn: "7d",
        });
        /*
         * Création de la session et du refresh token.
         */
        const userAgent = typeof req.headers["user-agent"] ===
            "string"
            ? req.headers["user-agent"]
            : undefined;
        const { refreshToken } = await (0, utilisateur_service_1.creerSession)(utilisateur.id, userAgent);
        return res.status(200).json({
            utilisateur: {
                id: utilisateur.id,
                email: utilisateur.email,
                displayName: utilisateur.displayName,
                role: utilisateur.role,
                emailVerified: utilisateur.emailVerified,
            },
            jeton,
            refreshToken,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la connexion :", erreur);
        return res.status(500).json({
            erreur: "Impossible de se connecter.",
        });
    }
}
/**
 * =========================================================
 * DÉCONNEXION
 * =========================================================
 */
async function deconnexion(req, res) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken ||
            typeof refreshToken !== "string") {
            return res.status(400).json({
                erreur: "Refresh token requis.",
            });
        }
        /*
         * Le refresh token original n'est jamais
         * recherché directement en base.
         */
        const refreshTokenHash = crypto_1.default
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        await (0, utilisateur_service_1.supprimerSession)(refreshTokenHash);
        return res.status(200).json({
            message: "Déconnexion réussie.",
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la déconnexion :", erreur);
        return res.status(500).json({
            erreur: "Impossible de se déconnecter.",
        });
    }
}
/**
 * =========================================================
 * RAFRAÎCHIR LE JWT
 * =========================================================
 */
async function rafraichir(req, res) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken ||
            typeof refreshToken !== "string") {
            return res.status(400).json({
                erreur: "Refresh token requis.",
            });
        }
        const refreshTokenHash = crypto_1.default
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        /*
         * Recherche d'une session valide.
         */
        const session = await (0, utilisateur_service_1.trouverSessionValide)(refreshTokenHash);
        if (!session) {
            return res.status(401).json({
                erreur: "Refresh token invalide ou expiré.",
            });
        }
        /*
         * Rotation du refresh token.
         */
        const { refreshToken: nouveauRefreshToken, } = await (0, utilisateur_service_1.renouvelerSession)(session.id);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET n'est pas configuré.");
            return res.status(500).json({
                erreur: "Configuration serveur invalide.",
            });
        }
        /*
         * Nouveau JWT.
         */
        const jeton = jsonwebtoken_1.default.sign({
            id: session.userId,
        }, secret, {
            expiresIn: "7d",
        });
        return res.status(200).json({
            jeton,
            refreshToken: nouveauRefreshToken,
        });
    }
    catch (erreur) {
        console.error("Erreur lors du rafraîchissement :", erreur);
        return res.status(500).json({
            erreur: "Impossible de rafraîchir la session.",
        });
    }
}
/**
 * =========================================================
 * MOT DE PASSE OUBLIÉ
 * =========================================================
 */
async function motDePasseOublie(req, res) {
    try {
        const { email } = req.body;
        if (!email ||
            typeof email !== "string") {
            return res.status(400).json({
                erreur: "Email requis.",
            });
        }
        const emailNormalise = email
            .trim()
            .toLowerCase();
        const utilisateur = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(emailNormalise);
        /*
         * Même réponse que le compte existe
         * ou non pour éviter l'énumération
         * des comptes.
         */
        if (!utilisateur) {
            return res.status(200).json({
                message: "Si un compte correspond à cet email, un lien de réinitialisation sera envoyé.",
            });
        }
        const token = await (0, utilisateur_service_1.creerTokenReinitialisation)(utilisateur.id);
        /*
         * TEMPORAIRE POUR LES TESTS.
         * Ne plus retourner le token lorsque
         * l'envoi d'emails sera configuré.
         */
        return res.status(200).json({
            message: "Si un compte correspond à cet email, un lien de réinitialisation sera envoyé.",
            token,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la demande de réinitialisation :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * =========================================================
 * RÉINITIALISATION DU MOT DE PASSE
 * =========================================================
 */
async function reinitialiserMotDePasseControleur(req, res) {
    const { token, nouveauMotDePasse, } = req.body;
    if (!token ||
        typeof token !== "string" ||
        !nouveauMotDePasse ||
        typeof nouveauMotDePasse !== "string") {
        return res.status(400).json({
            erreur: "Token et nouveau mot de passe requis.",
        });
    }
    if (nouveauMotDePasse.length < 8) {
        return res.status(400).json({
            erreur: "Le mot de passe doit contenir au moins 8 caractères.",
        });
    }
    try {
        /*
         * Le token n'est jamais stocké en clair.
         */
        const tokenHash = crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        const resetToken = await (0, utilisateur_service_1.trouverTokenReinitialisation)(tokenHash);
        if (!resetToken) {
            return res.status(401).json({
                erreur: "Token invalide, expiré ou déjà utilisé.",
            });
        }
        await (0, utilisateur_service_1.reinitialiserMotDePasse)(resetToken.userId, resetToken.id, nouveauMotDePasse);
        return res.status(200).json({
            message: "Mot de passe réinitialisé avec succès.",
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la réinitialisation du mot de passe :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * =========================================================
 * DEMANDER LA VÉRIFICATION EMAIL
 * =========================================================
 */
async function demanderVerificationEmail(req, res) {
    try {
        const { email } = req.body;
        if (!email ||
            typeof email !== "string") {
            return res.status(400).json({
                erreur: "Email requis.",
            });
        }
        const emailNormalise = email
            .trim()
            .toLowerCase();
        const utilisateur = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(emailNormalise);
        /*
         * Même réponse si le compte existe
         * ou non.
         */
        if (!utilisateur) {
            return res.status(200).json({
                message: "Si un compte correspond à cet email, un lien de vérification sera envoyé.",
            });
        }
        if (utilisateur.emailVerified) {
            return res.status(200).json({
                message: "Cette adresse email est déjà vérifiée.",
            });
        }
        const token = await (0, utilisateur_service_1.creerTokenVerificationEmail)(utilisateur.id);
        /*
         * TEMPORAIRE POUR LES TESTS.
         */
        return res.status(200).json({
            message: "Si un compte correspond à cet email, un lien de vérification sera envoyé.",
            token,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la demande de vérification email :", erreur);
        return res.status(500).json({
            erreur: "Impossible de demander la vérification email.",
        });
    }
}
/**
 * =========================================================
 * VÉRIFIER L'ADRESSE EMAIL
 * =========================================================
 */
async function verifierEmail(req, res) {
    const token = typeof req.query.token === "string"
        ? req.query.token
        : undefined;
    if (!token) {
        return res.status(400).json({
            erreur: "Token de vérification requis.",
        });
    }
    try {
        const tokenHash = crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        const verificationToken = await (0, utilisateur_service_1.verifierTokenEmail)(tokenHash);
        if (!verificationToken) {
            return res.status(401).json({
                erreur: "Token invalide ou expiré.",
            });
        }
        const utilisateur = await (0, utilisateur_service_1.validerEmailUtilisateur)(verificationToken.userId, verificationToken.id);
        return res.status(200).json({
            message: "Adresse email vérifiée avec succès.",
            utilisateur,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la vérification de l'email :", erreur);
        return res.status(500).json({
            erreur: "Impossible de vérifier l'adresse email.",
        });
    }
}
/**
 * =========================================================
 * VÉRIFICATION DE LA SESSION COURANTE
 * =========================================================
 */
async function moi(req, res) {
    if (!req.utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    return res.status(200).json({
        message: "Authentification réussie.",
        utilisateurId: req.utilisateurId,
    });
}
//# sourceMappingURL=authentification.controleur.js.map