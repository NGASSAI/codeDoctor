import { Router } from "express";

import {
  inscription,
  connexion,
  deconnexion,
    rafraichir,
 motDePasseOublie,
   reinitialiserMotDePasseControleur,
} from "../controleurs/authentification.controleur";

import {
  authentificationMiddleware,
  RequeteAuthentifiee,
} from "../middlewares/authentification.middleware";

const routeur = Router();

routeur.post("/inscription", inscription);
routeur.post("/connexion", connexion);
routeur.post("/deconnexion", deconnexion);
routeur.post("/rafraichir", rafraichir);
routeur.post("/mot-de-passe-oublie", motDePasseOublie);
routeur.post(
  "/reinitialiser",
  reinitialiserMotDePasseControleur
);

routeur.get(
  "/moi",
  authentificationMiddleware,
  (req: RequeteAuthentifiee, res) => {
    res.json({
      message: "Authentification réussie.",
      utilisateurId: req.utilisateurId,
    });
  }
);

export default routeur;