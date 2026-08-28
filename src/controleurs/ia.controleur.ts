import { Request, Response } from "express";
import { analyserCode } from "../services/ia.service";

export async function analyserCodeControleur(
  req: Request,
  res: Response
) {
  try {
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

    const analyse = await analyserCode(parametres);

    return res.status(200).json({
      succes: true,
      analyse,
    });
  } catch (erreur) {
    console.error(
      "Erreur lors de l'analyse IA :",
      erreur
    );

    return res.status(500).json({
      erreur:
        "Impossible d'effectuer l'analyse du code.",
    });
  }
}