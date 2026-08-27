import { Response, NextFunction } from "express";
import { prisma } from "../base";
import { RequeteAuthentifiee } from "./authentification.middleware";

export async function adminMiddleware(
  req: RequeteAuthentifiee,
  res: Response,
  next: NextFunction
) {
  const utilisateurId = req.utilisateurId;

  if (!utilisateurId) {
    return res.status(401).json({
      erreur: "Authentification requise.",
    });
  }

  try {
    const utilisateur = await prisma.user.findUnique({
      where: {
        id: utilisateurId,
      },
      select: {
        role: true,
      },
    });

    if (!utilisateur) {
      return res.status(401).json({
        erreur: "Utilisateur introuvable.",
      });
    }

    if (utilisateur.role !== "ADMIN") {
      return res.status(403).json({
        erreur: "Accès réservé aux administrateurs.",
      });
    }

    next();
  } catch (erreur) {
    console.error(
      "Erreur lors de la vérification du rôle administrateur :",
      erreur
    );

    return res.status(500).json({
      erreur: "Erreur interne du serveur.",
    });
  }
}