import { Response } from "express";

import {
  RequeteAuthentifiee,
} from "../middlewares/authentification.middleware";

import { analyserCode } from "../services/ia.service";

import {
  verifierEtConsommerQuotaIA,
} from "../services/quota.service";

import {
  creerHistorique,
  creerConversation,
  ajouterMessage,
} from "../services/historique.service";

export async function analyserCodeControleur(
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

    const { code, langage, erreur } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({
        erreur: "Le code à analyser est requis.",
      });
    }

    if (!langage || typeof langage !== "string") {
      return res.status(400).json({
        erreur: "Le langage de programmation est requis.",
      });
    }

    if (code.length > 20000) {
      return res.status(413).json({
        erreur:
          "Le code est trop volumineux. La limite est de 20 000 caractères.",
      });
    }

    const parametres: {
      code: string;
      langage: string;
      erreur?: string;
    } = {
      code,
      langage,
    };

    if (typeof erreur === "string" && erreur.trim()) {
      parametres.erreur = erreur;
    }

    /*
     * Vérification et consommation du quota AVANT l'appel à Groq.
     */
    const quota = await verifierEtConsommerQuotaIA(
      utilisateurId
    );

    const analyse = await analyserCode({
      ...parametres,
      utilisateurId,
      dateJour: quota.dateJour,
    });

    /*
     * Enregistrement dans l'historique + création automatique
     * d'une conversation contenant le code envoyé et la réponse
     * de l'IA. On n'interrompt jamais la réponse principale si
     * cette partie échoue.
     */
    try {
      const categorieMappee = mapperLangageVersCategorie(langage);

      const historique = await creerHistorique(utilisateurId, {
        categorie: categorieMappee,
        titre: `Analyse IA — ${langage}`,
        extrait: code.slice(0, 2000),
      });

      const conversation = await creerConversation(
        historique.id,
        utilisateurId,
        `Analyse IA — ${langage}`
      );

      if (conversation) {
        await ajouterMessage(
          conversation.id,
          utilisateurId,
          "USER",
          parametres.erreur
            ? `${code}\n\nMessage d'erreur :\n${parametres.erreur}`
            : code
        );

        await ajouterMessage(
          conversation.id,
          utilisateurId,
          "SYSTEM",
          analyse
        );
      }
    } catch (erreurHistorique) {
      console.error(
        "Erreur enregistrement historique (IA) :",
        erreurHistorique
      );
    }

    return res.status(200).json({
      succes: true,
      analyse,
      quota: {
        plan: quota.plan,
        utilise: quota.utilise,
        limite: quota.limite,
        restant: quota.restant,
        illimite: quota.illimite,
        dateJour: quota.dateJour,
      },
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de l'analyse IA :",
      erreur
    );

    if (
      erreur instanceof Error &&
      erreur.message.startsWith("QUOTA_IA_ATTEINT:")
    ) {
      const [, plan, utilise, limite] =
        erreur.message.split(":");

      return res.status(429).json({
        erreur:
          "Votre quota quotidien d'analyses IA est atteint.",
        quota: {
          plan,
          utilise: Number(utilise),
          limite: Number(limite),
          restant: 0,
        },
      });
    }

    if (
      erreur instanceof Error &&
      erreur.message === "UTILISATEUR_INTRouvable"
    ) {
      return res.status(401).json({
        erreur: "Utilisateur introuvable.",
      });
    }

    return res.status(500).json({
      erreur:
        "Impossible d'effectuer l'analyse du code.",
    });
  }
}

/**
 * Convertit le libellé de langage envoyé par le front
 * (ex: "JavaScript", "TypeScript") vers une valeur de l'enum
 * Category attendue par l'historique.
 */
function mapperLangageVersCategorie(
  langage: string
):
  | "JAVASCRIPT"
  | "TYPESCRIPT"
  | "REACT"
  | "HTTP"
  | "API"
  | "HTML_CSS" {
  const normalise = langage.trim().toLowerCase();

  if (normalise.includes("typescript")) return "TYPESCRIPT";
  if (normalise.includes("react")) return "REACT";
  if (normalise.includes("http")) return "HTTP";
  if (normalise.includes("api")) return "API";
  if (normalise.includes("html") || normalise.includes("css"))
    return "HTML_CSS";

  return "JAVASCRIPT";
}