"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ia_controleur_1 = require("../controleurs/ia.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const quota_service_1 = require("../services/quota.service");
const routeur = (0, express_1.Router)();
routeur.post("/analyser", authentification_middleware_1.authentificationMiddleware, ia_controleur_1.analyserCodeControleur);
routeur.get("/quota", authentification_middleware_1.authentificationMiddleware, async (req, res) => {
    try {
        if (!req.utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const quota = await (0, quota_service_1.obtenirEtatQuotaIA)(req.utilisateurId);
        return res.status(200).json(quota);
    }
    catch (erreur) {
        console.error("Erreur diagnostic quota :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer le quota.",
        });
    }
});
exports.default = routeur;
//# sourceMappingURL=ia.routes.js.map