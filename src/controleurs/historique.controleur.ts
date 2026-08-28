import { Response } from "express";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";

import {
  creerHistorique,
  listerHistorique,
  obtenirHistorique,
  supprimerHistorique,
  creerConversation,
  ajouterMessage,
  obtenirConversation,
} from "../services/historique.service";

import {
  Category,
  MessageRole,
  Severity,
} from "../generated/prisma/client";

function obtenirIdParametre(
  valeur: string | string[] | undefined
): string | null {
  if (typeof valeur === "string" && valeur.trim()) {
    return valeur.trim();
  }

  if (Array.isArray(valeur) && valeur[0]?.trim()) {
    return valeur[0].trim();
  }

  return null;
}

/**
 * GET /api/historique
 */
export async function lister(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;

    if (!utilisateurId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    const historique = await listerHistorique(utilisateurId);

    return res.status(200).json({
      historique,
      total: historique.length,
    });
  } catch (erreur) {
    console.error("Erreur historique :", erreur);

    return res.status(500).json({
      erreur: "Impossible de récupérer l'historique.",
    });
  }
}

/**
 * GET /api/historique/:id
 */
export async function obtenir(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;
    const id = obtenirIdParametre(req.params.id);

    if (!utilisateurId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    if (!id) {
      return res.status(400).json({
        erreur: "Identifiant d'historique invalide.",
      });
    }

    const historique = await obtenirHistorique(
      id,
      utilisateurId
    );

    if (!historique) {
      return res.status(404).json({
        erreur: "Entrée d'historique introuvable.",
      });
    }

    return res.status(200).json({
      historique,
    });
  } catch (erreur) {
    console.error("Erreur récupération historique :", erreur);

    return res.status(500).json({
      erreur: "Impossible de récupérer l'historique.",
    });
  }
}

/**
 * POST /api/historique
 */
export async function creer(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;

    if (!utilisateurId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    const {
      ruleId,
      categorie,
      titre,
      severite,
      extrait,
    } = req.body;

    if (
      typeof titre !== "string" ||
      !titre.trim() ||
      !Object.values(Category).includes(categorie)
    ) {
      return res.status(400).json({
        erreur: "Titre et catégorie valides requis.",
      });
    }

    if (
      severite !== undefined &&
      !Object.values(Severity).includes(severite)
    ) {
      return res.status(400).json({
        erreur: "Sévérité invalide.",
      });
    }

    const historique = await creerHistorique(
      utilisateurId,
      {
  categorie,
  titre,
  ...(ruleId !== undefined ? { ruleId } : {}),
  ...(severite !== undefined ? { severite } : {}),
  ...(extrait !== undefined ? { extrait } : {}),
}
    );

    return res.status(201).json({
      message: "Analyse enregistrée dans l'historique.",
      historique,
    });
  } catch (erreur) {
    console.error("Erreur création historique :", erreur);

    return res.status(500).json({
      erreur: "Impossible d'enregistrer l'historique.",
    });
  }
}

/**
 * DELETE /api/historique/:id
 */
export async function supprimer(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;
    const id = obtenirIdParametre(req.params.id);

    if (!utilisateurId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    if (!id) {
      return res.status(400).json({
        erreur: "Identifiant d'historique invalide.",
      });
    }

    const resultat = await supprimerHistorique(
      id,
      utilisateurId
    );

    if (!resultat) {
      return res.status(404).json({
        erreur: "Entrée d'historique introuvable.",
      });
    }

    return res.status(200).json({
      message: "Entrée d'historique supprimée.",
    });
  } catch (erreur) {
    console.error("Erreur suppression historique :", erreur);

    return res.status(500).json({
      erreur: "Impossible de supprimer l'historique.",
    });
  }
}

/**
 * POST /api/historique/:id/conversation
 */
export async function nouvelleConversation(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;
    const historiqueId = obtenirIdParametre(
      req.params.id
    );

    if (!utilisateurId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    if (!historiqueId) {
      return res.status(400).json({
        erreur: "Identifiant d'historique invalide.",
      });
    }

    const titre =
      typeof req.body.titre === "string" &&
      req.body.titre.trim()
        ? req.body.titre.trim()
        : "Nouvelle conversation";

    const conversation = await creerConversation(
      historiqueId,
      utilisateurId,
      titre
    );

    if (!conversation) {
      return res.status(404).json({
        erreur: "Entrée d'historique introuvable.",
      });
    }

    return res.status(201).json({
      conversation,
    });
  } catch (erreur) {
    console.error("Erreur création conversation :", erreur);

    return res.status(500).json({
      erreur: "Impossible de créer la conversation.",
    });
  }
}

/**
 * GET /api/historique/conversations/:id
 */
export async function conversation(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;
    const id = obtenirIdParametre(req.params.id);

    if (!utilisateurId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    if (!id) {
      return res.status(400).json({
        erreur: "Identifiant de conversation invalide.",
      });
    }

    const resultat = await obtenirConversation(
      id,
      utilisateurId
    );

    if (!resultat) {
      return res.status(404).json({
        erreur: "Conversation introuvable.",
      });
    }

    return res.status(200).json({
      conversation: resultat,
    });
  } catch (erreur) {
    console.error("Erreur conversation :", erreur);

    return res.status(500).json({
      erreur: "Impossible de récupérer la conversation.",
    });
  }
}

/**
 * POST /api/historique/conversations/:id/messages
 */
export async function message(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const utilisateurId = req.utilisateurId;
    const conversationId = obtenirIdParametre(
      req.params.id
    );

    if (!utilisateurId) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    if (!conversationId) {
      return res.status(400).json({
        erreur: "Identifiant de conversation invalide.",
      });
    }

    const { role, content } = req.body;

    if (
      !Object.values(MessageRole).includes(role) ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        erreur: "Rôle et contenu du message requis.",
      });
    }

    const resultat = await ajouterMessage(
      conversationId,
      utilisateurId,
      role,
      content.trim()
    );

    if (!resultat) {
      return res.status(404).json({
        erreur: "Conversation introuvable.",
      });
    }

    return res.status(201).json({
      message: resultat,
    });
  } catch (erreur) {
    console.error("Erreur ajout message :", erreur);

    return res.status(500).json({
      erreur: "Impossible d'ajouter le message.",
    });
  }
}