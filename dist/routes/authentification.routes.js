"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentification_controleur_1 = require("../controleurs/authentification.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const routeur = (0, express_1.Router)();
routeur.post("/inscription", authentification_controleur_1.inscription);
routeur.post("/connexion", authentification_controleur_1.connexion);
routeur.post("/deconnexion", authentification_controleur_1.deconnexion);
routeur.post("/rafraichir", authentification_controleur_1.rafraichir);
routeur.post("/mot-de-passe-oublie", authentification_controleur_1.motDePasseOublie);
routeur.post("/reinitialiser", authentification_controleur_1.reinitialiserMotDePasseControleur);
routeur.get("/moi", authentification_middleware_1.authentificationMiddleware, (req, res) => {
    res.json({
        message: "Authentification réussie.",
        utilisateurId: req.utilisateurId,
    });
});
exports.default = routeur;
//# sourceMappingURL=authentification.routes.js.map