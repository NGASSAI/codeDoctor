import { Response } from "express";

import { RequeteAuthentifiee } from "../middlewares/authentification.middleware";
import { prisma } from "../base";

import {
  listerPaiementsAdmin,
  approuverPaiement,
  rejeterPaiement,
} from "../services/paiement.service";

/**
 * LISTER LES PAIEMENTS PREMIUM
 * GET /api/admin/paiements
 */
export async function paiementsAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  try {
    const page = Math.max(
      Number.parseInt(req.query.page as string) || 1,
      1
    );

    const limite = Math.min(
      Math.max(
        Number.parseInt(req.query.limite as string) || 20,
        1
      ),
      100
    );

    const resultat = await listerPaiementsAdmin(page, limite);

    return res.status(200).json(resultat);
  } catch (erreur) {
    console.error("Erreur lors de la récupération des paiements admin :", erreur);

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * APPROUVER UN PAIEMENT
 * PATCH /api/admin/paiements/:id/approuver
 */
export async function approuverPaiementAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  const paiementId = req.params.id;

  if (!paiementId || typeof paiementId !== "string") {
    return res.status(400).json({
      erreur: "Identifiant de paiement invalide.",
    });
  }

  try {
    const paiement = await approuverPaiement(paiementId);

    // Notification envoyée à l'utilisateur concerné
    await prisma.notification.create({
      data: {
        userId: paiement.userId,
        type: "PAIEMENT_APPROUVE",
        titre: "Paiement approuvé",
        message: `Votre paiement de ${paiement.montant} FCFA a été validé. Votre accès Premium est désormais actif.`,
        lien: "/profil",
      },
    });

    return res.status(200).json({
      message: "Paiement approuvé avec succès.",
      paiement,
    });
  } catch (erreur: any) {
    if (erreur?.message === "PAIEMENT_INTRouvable") {
      return res.status(404).json({
        erreur: "Paiement introuvable.",
      });
    }

    console.error("Erreur lors de l'approbation du paiement :", erreur);

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}

/**
 * REJETER UN PAIEMENT
 * PATCH /api/admin/paiements/:id/rejeter
 */
export async function rejeterPaiementAdmin(
  req: RequeteAuthentifiee,
  res: Response
) {
  const paiementId = req.params.id;

  if (!paiementId || typeof paiementId !== "string") {
    return res.status(400).json({
      erreur: "Identifiant de paiement invalide.",
    });
  }

  try {
    const paiement = await rejeterPaiement(paiementId);

    // Notification envoyée à l'utilisateur concerné
    await prisma.notification.create({
      data: {
        userId: paiement.userId,
        type: "PAIEMENT_REJETE",
        titre: "Paiement rejeté",
        message: `Votre demande de paiement de ${paiement.montant} FCFA n'a pas pu être validée.`,
        lien: "/profil",
      },
    });

    return res.status(200).json({
      message: "Paiement rejeté avec succès.",
      paiement,
    });
  } catch (erreur: any) {
    if (erreur?.message === "PAIEMENT_INTRouvable") {
      return res.status(404).json({
        erreur: "Paiement introuvable.",
      });
    }

    console.error("Erreur lors du rejet du paiement :", erreur);

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}