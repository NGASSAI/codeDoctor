import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma/client";

/**
 * Middleware global de gestion des erreurs.
 *
 * Il doit être enregistré en dernier dans index.ts.
 */
export function gestionnaireErreurs(
  erreur: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Erreur serveur :", erreur);

  /*
   * Erreurs Prisma connues
   */
  if (erreur instanceof Prisma.PrismaClientKnownRequestError) {
    switch (erreur.code) {
      /*
       * Contrainte unique violée.
       */
      case "P2002":
        return res.status(409).json({
          erreur: "Cette donnée existe déjà.",
        });

      /*
       * Enregistrement introuvable.
       */
      case "P2025":
        return res.status(404).json({
          erreur: "Ressource introuvable.",
        });

      default:
        return res.status(400).json({
          erreur: "Erreur lors de l'opération en base de données.",
        });
    }
  }

  /*
   * Erreur Prisma de validation.
   */
  if (erreur instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      erreur: "Données invalides.",
    });
  }

  /*
   * Erreur JavaScript classique.
   */
  if (erreur instanceof Error) {
    return res.status(500).json({
      erreur: "Une erreur interne est survenue.",
    });
  }

  /*
   * Erreur inconnue.
   */
  return res.status(500).json({
    erreur: "Une erreur interne est survenue.",
  });
}