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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const utilisateur_service_1 = require("../services/utilisateur.service");
/**
 * Inscription
 */
async function inscription(req, res) {
    const { email, motDePasse } = req.body;
    if (!email || !motDePasse) {
        return res.status(400).json({
            erreur: "Email et mot de passe requis.",
        });
    }
    if (motDePasse.length < 8) {
        return res.status(400).json({
            erreur: "Le mot de passe doit contenir au moins 8 caractères.",
        });
    }
    const utilisateurExistant = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(email);
    if (utilisateurExistant) {
        return res.status(409).json({
            erreur: "Un compte existe déjà avec cet email.",
        });
    }
    const utilisateur = await (0, utilisateur_service_1.creerUtilisateur)(email, motDePasse);
    const jeton = jsonwebtoken_1.default.sign({ id: utilisateur.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).json({
        utilisateur: {
            id: utilisateur.id,
            email: utilisateur.email,
        },
        jeton,
    });
}
/**
 * Connexion
 */
async function connexion(req, res) {
    const { email, motDePasse } = req.body;
    // Vérification des données reçues
    if (!email || !motDePasse) {
        return res.status(400).json({
            erreur: "Email et mot de passe requis.",
        });
    }
    // Recherche de l'utilisateur
    const utilisateur = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(email);
    // Message volontairement générique
    // pour ne pas révéler si l'email existe.
    if (!utilisateur) {
        return res.status(401).json({
            erreur: "Email ou mot de passe incorrect.",
        });
    }
    // Vérification du mot de passe avec bcrypt
    const motDePasseValide = await (0, utilisateur_service_1.verifierMotDePasse)(motDePasse, utilisateur.passwordHash);
    if (!motDePasseValide) {
        return res.status(401).json({
            erreur: "Email ou mot de passe incorrect.",
        });
    }
    // Récupération du User-Agent de l'appareil
    const userAgent = req.get("user-agent") ?? undefined;
    // Création de la session
    const { refreshToken } = await (0, utilisateur_service_1.creerSession)(utilisateur.id, userAgent);
    // Création du JWT    
    const jeton = jsonwebtoken_1.default.sign({ id: utilisateur.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({
        utilisateur: {
            id: utilisateur.id,
            email: utilisateur.email,
            displayName: utilisateur.displayName,
        },
        jeton,
        refreshToken,
    });
}
/**
 * Déconnexion
 */
/**
 * Déconnexion
 */
async function deconnexion(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken || typeof refreshToken !== "string") {
        return res.status(400).json({
            erreur: "Refresh token requis.",
        });
    }
    try {
        // Le refresh token n'est jamais recherché en clair en base.
        // On calcule son hash pour retrouver la session.
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
        // La session n'existe déjà plus :
        // l'utilisateur est malgré tout considéré comme déconnecté.
        if (erreur?.code === "P2025") {
            return res.status(200).json({
                message: "Déconnexion réussie.",
            });
        }
        console.error("Erreur lors de la déconnexion :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Rafraîchissement du JWT
 */
async function rafraichir(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken || typeof refreshToken !== "string") {
        return res.status(400).json({
            erreur: "Refresh token requis.",
        });
    }
    try {
        // On hash le refresh token reçu.
        // Le token original n'est jamais stocké en clair en base.
        const refreshTokenHash = crypto_1.default
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        // Recherche d'une session existante et non expirée
        const session = await (0, utilisateur_service_1.trouverSessionValide)(refreshTokenHash);
        if (!session) {
            return res.status(401).json({
                erreur: "Refresh token invalide ou expiré.",
            });
        }
        // Rotation du refresh token
        const { refreshToken: nouveauRefreshToken } = await (0, utilisateur_service_1.renouvelerSession)(session.id);
        // Création d'un nouveau JWT
        const nouveauJeton = jsonwebtoken_1.default.sign({ id: session.userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            jeton: nouveauJeton,
            refreshToken: nouveauRefreshToken,
        });
    }
    catch (erreur) {
        console.error("Erreur lors du rafraîchissement :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Demande de réinitialisation du mot de passe
 */
async function motDePasseOublie(req, res) {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
        return res.status(400).json({
            erreur: "Email requis.",
        });
    }
    // Normalisation
    const emailNormalise = email.trim().toLowerCase();
    const utilisateur = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(emailNormalise);
    /*
     * IMPORTANT :
     * On retourne exactement la même réponse
     * que l'utilisateur existe ou non.
     *
     * Cela empêche un attaquant de savoir
     * quels emails possèdent un compte.
     */
    if (!utilisateur) {
        return res.status(200).json({
            message: "Si un compte correspond à cet email, un lien de réinitialisation sera envoyé.",
        });
    }
    const token = await (0, utilisateur_service_1.creerTokenReinitialisation)(utilisateur.id);
    /*
     * TEMPORAIRE :
     * On affiche le token uniquement pour pouvoir
     * tester le système avant de brancher l'envoi d'email.
     *
     * À supprimer lorsque l'envoi d'email sera configuré.
     */
    return res.status(200).json({
        message: "Si un compte correspond à cet email, un lien de réinitialisation sera envoyé.",
        // TEMPORAIRE POUR LES TESTS
        token,
    });
}
/**
 * Réinitialisation du mot de passe
 */
async function reinitialiserMotDePasseControleur(req, res) {
    const { token, nouveauMotDePasse } = req.body;
    // Vérification des données
    if (!token ||
        typeof token !== "string" ||
        !nouveauMotDePasse ||
        typeof nouveauMotDePasse !== "string") {
        return res.status(400).json({
            erreur: "Token et nouveau mot de passe requis.",
        });
    }
    // Politique minimale du mot de passe
    if (nouveauMotDePasse.length < 8) {
        return res.status(400).json({
            erreur: "Le mot de passe doit contenir au moins 8 caractères.",
        });
    }
    try {
        // On ne recherche jamais le token en clair.
        const tokenHash = crypto_1.default
            .createHash("sha256")
            .update(token)
            .digest("hex");
        // Vérification du token
        const resetToken = await (0, utilisateur_service_1.trouverTokenReinitialisation)(tokenHash);
        if (!resetToken) {
            return res.status(401).json({
                erreur: "Token invalide, expiré ou déjà utilisé.",
            });
        }
        // Modification du mot de passe
        await (0, utilisateur_service_1.reinitialiserMotDePasse)(resetToken.userId, resetToken.id, nouveauMotDePasse);
        return res.status(200).json({
            message: "Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la réinitialisation du mot de passe :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
//# sourceMappingURL=authentification.controleur.js.map