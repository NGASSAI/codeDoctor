import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";    
import {
  creerUtilisateur,
  trouverUtilisateurParEmail,
  verifierMotDePasse,
  creerSession,
  supprimerSession,
  trouverSessionValide,
  renouvelerSession,
  creerTokenReinitialisation,
   trouverTokenReinitialisation,
  reinitialiserMotDePasse,
   
} from "../services/utilisateur.service";

/**
 * Inscription
 */
export async function inscription(req: Request, res: Response) {
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

  const utilisateurExistant = await trouverUtilisateurParEmail(email);

  if (utilisateurExistant) {
    return res.status(409).json({
      erreur: "Un compte existe déjà avec cet email.",
    });
  }

  const utilisateur = await creerUtilisateur(email, motDePasse);

  const jeton = jwt.sign(
    { id: utilisateur.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

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
export async function connexion(req: Request, res: Response) {
  const { email, motDePasse } = req.body;

  // Vérification des données reçues
  if (!email || !motDePasse) {
    return res.status(400).json({
      erreur: "Email et mot de passe requis.",
    });
  }

  // Recherche de l'utilisateur
  const utilisateur = await trouverUtilisateurParEmail(email);

  // Message volontairement générique
  // pour ne pas révéler si l'email existe.
  if (!utilisateur) {
    return res.status(401).json({
      erreur: "Email ou mot de passe incorrect.",
    });
  }

  // Vérification du mot de passe avec bcrypt
  const motDePasseValide = await verifierMotDePasse(
    motDePasse,
    utilisateur.passwordHash
  );

  if (!motDePasseValide) {
    return res.status(401).json({
      erreur: "Email ou mot de passe incorrect.",
    });
  }

  // Récupération du User-Agent de l'appareil
  const userAgent = req.get("user-agent") ?? undefined;

  // Création de la session
  const { refreshToken } = await creerSession(
    utilisateur.id,
    userAgent
  );

  // Création du JWT    
  const jeton = jwt.sign(
    { id: utilisateur.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );


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
export async function deconnexion(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken || typeof refreshToken !== "string") {
    return res.status(400).json({
      erreur: "Refresh token requis.",
    });
  }

  try {
    // Le refresh token n'est jamais recherché en clair en base.
    // On calcule son hash pour retrouver la session.
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await supprimerSession(refreshTokenHash);

    return res.status(200).json({
      message: "Déconnexion réussie.",
    });
  } catch (erreur: any) {
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
export async function rafraichir(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken || typeof refreshToken !== "string") {
    return res.status(400).json({
      erreur: "Refresh token requis.",
    });
  }

  try {
    // On hash le refresh token reçu.
    // Le token original n'est jamais stocké en clair en base.
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Recherche d'une session existante et non expirée
    const session = await trouverSessionValide(refreshTokenHash);

    if (!session) {
      return res.status(401).json({
        erreur: "Refresh token invalide ou expiré.",
      });
    }

    // Rotation du refresh token
    const { refreshToken: nouveauRefreshToken } =
      await renouvelerSession(session.id);

    // Création d'un nouveau JWT
    const nouveauJeton = jwt.sign(
      { id: session.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      jeton: nouveauJeton,
      refreshToken: nouveauRefreshToken,
    });
  } catch (erreur) {
    console.error("Erreur lors du rafraîchissement :", erreur);

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}
/**
 * Demande de réinitialisation du mot de passe
 */
export async function motDePasseOublie(
  req: Request,
  res: Response
) {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      erreur: "Email requis.",
    });
  }

  // Normalisation
  const emailNormalise = email.trim().toLowerCase();

  const utilisateur = await trouverUtilisateurParEmail(
    emailNormalise
  );

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
      message:
        "Si un compte correspond à cet email, un lien de réinitialisation sera envoyé.",
    });
  }

  const token = await creerTokenReinitialisation(
    utilisateur.id
  );

  /*
   * TEMPORAIRE :
   * On affiche le token uniquement pour pouvoir
   * tester le système avant de brancher l'envoi d'email.
   *
   * À supprimer lorsque l'envoi d'email sera configuré.
   */
  

  return res.status(200).json({
    message:
      "Si un compte correspond à cet email, un lien de réinitialisation sera envoyé.",
  });
}

/**
 * Réinitialisation du mot de passe
 */
export async function reinitialiserMotDePasseControleur(
  req: Request,
  res: Response
) {
  const { token, nouveauMotDePasse } = req.body;

  // Vérification des données
  if (
    !token ||
    typeof token !== "string" ||
    !nouveauMotDePasse ||
    typeof nouveauMotDePasse !== "string"
  ) {
    return res.status(400).json({
      erreur: "Token et nouveau mot de passe requis.",
    });
  }

  // Politique minimale du mot de passe
  if (nouveauMotDePasse.length < 8) {
    return res.status(400).json({
      erreur:
        "Le mot de passe doit contenir au moins 8 caractères.",
    });
  }

  try {
    // On ne recherche jamais le token en clair.
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Vérification du token
    const resetToken = await trouverTokenReinitialisation(
      tokenHash
    );

    if (!resetToken) {
      return res.status(401).json({
        erreur: "Token invalide, expiré ou déjà utilisé.",
      });
    }

    // Modification du mot de passe
    await reinitialiserMotDePasse(
      resetToken.userId,
      resetToken.id,
      nouveauMotDePasse
    );

    return res.status(200).json({
      message:
        "Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}