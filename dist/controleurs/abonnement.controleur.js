"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monAbonnement = monAbonnement;
const abonnement_service_1 = require("../services/abonnement.service");
/**
 * Récupérer l'abonnement de l'utilisateur connecté.
 */
async function monAbonnement(req, res) {
    const userId = req.utilisateurId;
    if (!userId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    try {
        const abonnement = await (0, abonnement_service_1.obtenirEtatAbonnement)(userId);
        return res.status(200).json({
            abonnement,
        });
    }
    catch (erreur) {
        console.error("Erreur récupération abonnement :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer l'abonnement.",
        });
    }
}
//# sourceMappingURL=abonnement.controleur.js.map