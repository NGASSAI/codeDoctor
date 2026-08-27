  import { Request, Response, NextFunction } from "express";
  import jwt from "jsonwebtoken";

  interface PayloadJWT {
    id: string;
  }

  export interface RequeteAuthentifiee extends Request {
    utilisateurId?: string;
  }

  export function authentificationMiddleware(
    req: RequeteAuthentifiee,
    res: Response,
    next: NextFunction
  ) {
    const enteteAutorisation = req.headers.authorization;

    // Aucun token fourni
    if (!enteteAutorisation) {
      return res.status(401).json({
        erreur: "Authentification requise.",
      });
    }

    // Vérifie le format : Bearer <token>
    const [type, token] = enteteAutorisation.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        erreur: "Format du token invalide.",
      });
    }

    try {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        console.error("JWT_SECRET n'est pas configuré.");
        return res.status(500).json({
          erreur: "Erreur de configuration du serveur.",
        });
      }

      const payload = jwt.verify(token, secret) as PayloadJWT;

      // Vérification supplémentaire du contenu du JWT
      if (!payload.id || typeof payload.id !== "string") {
        return res.status(401).json({
          erreur: "Token invalide.",
        });
      }

      // On transmet l'identifiant à la prochaine étape
      req.utilisateurId = payload.id;

      next();
    } catch {
      return res.status(401).json({
        erreur: "Token invalide ou expiré.",
      });
    }
  }