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
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const base_1 = require("../base");
const utilisateur_service_1 = require("../services/utilisateur.service");
/**
 * =========================================================
 * INSCRIPTION
 * =========================================================
 */
async function inscription(req, res) {
    try {
        const { email, motDePasse, displayName, recoveryAnswer, recoveryHint, } = req.body;
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
        if (typeof displayName !== "string" ||
            typeof recoveryAnswer !== "string" ||
            typeof recoveryHint !== "string") {
            return res.status(400).json({
                erreur: "Nom, phrase secrète et indice sont requis.",
            });
        }
        const emailNormalise = email.trim().toLowerCase();
        const nomNormalise = displayName.trim();
        const phraseRecuperation = recoveryAnswer.trim();
        const indiceRecuperation = recoveryHint.trim();
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
        if (phraseRecuperation.length < 8) {
            return res.status(400).json({
                erreur: "La phrase secrète doit contenir au moins 8 caractères.",
            });
        }
        if (indiceRecuperation.length < 3) {
            return res.status(400).json({
                erreur: "L'indice de récupération doit contenir au moins 3 caractères.",
            });
        }
        if (phraseRecuperation.toLowerCase() === motDePasse.toLowerCase()) {
            return res.status(400).json({
                erreur: "La phrase secrète doit être différente du mot de passe.",
            });
        }
        if (indiceRecuperation.toLowerCase() === phraseRecuperation.toLowerCase()) {
            return res.status(400).json({
                erreur: "L'indice doit aider à retrouver la phrase sans la révéler.",
            });
        }
        const utilisateurExistant = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(emailNormalise);
        if (utilisateurExistant) {
            return res.status(409).json({
                erreur: "Un compte existe déjà avec cet email.",
            });
        }
        const utilisateur = await (0, utilisateur_service_1.creerUtilisateur)(emailNormalise, motDePasse, nomNormalise, phraseRecuperation, indiceRecuperation);
        const tokenVerification = await (0, utilisateur_service_1.creerTokenVerificationEmail)(utilisateur.id);
        // Notification aux administrateurs pour informer du nouvel utilisateur enregistré
        const admins = await base_1.prisma.user.findMany({
            where: { role: "ADMIN" },
            select: { id: true },
        });
        if (admins.length > 0) {
            await base_1.prisma.notification.createMany({
                data: admins.map((admin) => ({
                    userId: admin.id,
                    type: "NOUVEL_UTILISATEUR",
                    titre: "Nouveau membre",
                    message: `L'utilisateur ${utilisateur.displayName} (${utilisateur.email}) vient de s'inscrire.`,
                    lien: "/admin/utilisateurs",
                })),
            });
        }
        return res.status(201).json({
            utilisateur: {
                id: utilisateur.id,
                email: utilisateur.email,
                displayName: utilisateur.displayName,
                emailVerified: utilisateur.emailVerified,
            },
            tokenVerification,
            message: "Compte créé avec succès. Veuillez vérifier votre adresse email avant de vous connecter.",
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
        const { email, motDePasse } = req.body;
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
        const emailNormalise = email.trim().toLowerCase();
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
        const emailAdmin = (process.env.EMAIL_ADMIN ?? "")
            .trim()
            .toLowerCase();
        const estAdminConfigure = emailAdmin !== "" &&
            utilisateur.email.toLowerCase() === emailAdmin &&
            utilisateur.role === "ADMIN";
        if (!utilisateur.emailVerified &&
            !estAdminConfigure) {
            return res.status(403).json({
                erreur: "Votre adresse email n'est pas encore vérifiée. Veuillez vérifier votre email avant de vous connecter.",
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET n'est pas configuré.");
            return res.status(500).json({
                erreur: "Configuration serveur invalide.",
            });
        }
        const jeton = jsonwebtoken_1.default.sign({
            id: utilisateur.id,
        }, secret, {
            expiresIn: "7d",
        });
        const userAgent = typeof req.headers["user-agent"] === "string"
            ? req.headers["user-agent"]
            : undefined;
        const { refreshToken } = await (0, utilisateur_service_1.creerSession)(utilisateur.id, userAgent);
        return res.status(200).json({
            utilisateur: {
                id: utilisateur.id,
                email: utilisateur.email,
                displayName: utilisateur.displayName,
                role: utilisateur.role,
                emailVerified: utilisateur.emailVerified || estAdminConfigure,
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
 * RAFRAÎCHISSEMENT DU JWT
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
        const session = await (0, utilisateur_service_1.trouverSessionValide)(refreshTokenHash);
        if (!session) {
            return res.status(401).json({
                erreur: "Refresh token invalide ou expiré.",
            });
        }
        const { refreshToken: nouveauRefreshToken } = await (0, utilisateur_service_1.renouvelerSession)(session.id);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET n'est pas configuré.");
            return res.status(500).json({
                erreur: "Configuration serveur invalide.",
            });
        }
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
 * MOT DE PASSE OUBLIÉ — ÉTAPE 1 ET 2
 * =========================================================
 */
async function motDePasseOublie(req, res) {
    try {
        const { email, recoveryAnswer } = req.body;
        if (!email || typeof email !== "string") {
            return res.status(400).json({
                erreur: "Email requis.",
            });
        }
        const emailNormalise = email.trim().toLowerCase();
        const utilisateur = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(emailNormalise);
        if (recoveryAnswer === undefined) {
            if (!utilisateur) {
                return res.status(200).json({
                    message: "Si un compte correspond à cet email, vous pouvez poursuivre la récupération.",
                });
            }
            if (!utilisateur.recoveryAnswerHash) {
                return res.status(403).json({
                    erreur: "Aucune phrase secrète de récupération n'est configurée pour ce compte.",
                });
            }
            return res.status(200).json({
                message: "Veuillez utiliser votre phrase secrète de récupération.",
                recoveryHint: utilisateur.recoveryHint,
            });
        }
        if (typeof recoveryAnswer !== "string") {
            return res.status(400).json({
                erreur: "Phrase secrète invalide.",
            });
        }
        if (!utilisateur) {
            return res.status(401).json({
                erreur: "Les informations de récupération sont incorrectes.",
            });
        }
        if (!utilisateur.recoveryAnswerHash) {
            return res.status(403).json({
                erreur: "Aucune phrase secrète de récupération n'est configurée pour ce compte.",
            });
        }
        const phraseCorrecte = await (0, utilisateur_service_1.verifierPhraseRecuperation)(utilisateur.id, recoveryAnswer);
        if (!phraseCorrecte) {
            return res.status(401).json({
                erreur: "Les informations de récupération sont incorrectes.",
            });
        }
        const token = await (0, utilisateur_service_1.creerTokenReinitialisation)(utilisateur.id);
        const frontendUrl = (process.env.FRONTEND_URL ??
            "https://code-doctor-front.vercel.app").replace(/\/+$/, "");
        const resetUrl = `${frontendUrl}/reinitialiser-mot-de-passe?token=${encodeURIComponent(token)}`;
        return res.status(200).json({
            message: "Phrase secrète correcte. Vous pouvez réinitialiser votre mot de passe.",
            resetUrl,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération du compte :", erreur);
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
    const { token, nouveauMotDePasse } = req.body;
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
        if (!email || typeof email !== "string") {
            return res.status(400).json({
                erreur: "Email requis.",
            });
        }
        const emailNormalise = email.trim().toLowerCase();
        const utilisateur = await (0, utilisateur_service_1.trouverUtilisateurParEmail)(emailNormalise);
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
 * UTILISATEUR COURANT
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