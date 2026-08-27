"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierProfil = modifierProfil;
exports.profil = profil;
const utilisateur_service_1 = require("../services/utilisateur.service");
async function modifierProfil(req, res) {
    const utilisateurId = req.utilisateurId;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    const { displayName } = req.body;
    if (displayName !== null &&
        displayName !== undefined &&
        typeof displayName !== "string") {
        return res.status(400).json({
            erreur: "Le nom affiché doit être une chaîne de caractères.",
        });
    }
    const nomAffiche = displayName === undefined
        ? undefined
        : displayName.trim() || null;
    if (nomAffiche !== undefined && nomAffiche !== null) {
        if (nomAffiche.length > 50) {
            return res.status(400).json({
                erreur: "Le nom affiché ne peut pas dépasser 50 caractères.",
            });
        }
    }
    try {
        const utilisateur = await (0, utilisateur_service_1.modifierProfilUtilisateur)(utilisateurId, nomAffiche ?? null);
        return res.status(200).json({
            message: "Profil mis à jour avec succès.",
            utilisateur,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la modification du profil :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Récupérer le profil de l'utilisateur connecté
 */
async function profil(req, res) {
    const utilisateurId = req.utilisateurId;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    try {
        const utilisateur = await (0, utilisateur_service_1.trouverUtilisateurParId)(utilisateurId);
        if (!utilisateur) {
            return res.status(404).json({
                erreur: "Utilisateur introuvable.",
            });
        }
        return res.status(200).json({
            utilisateur,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération du profil :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
//# sourceMappingURL=utilisateur.controleur.js.map