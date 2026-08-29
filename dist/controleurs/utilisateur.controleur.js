"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierProfil = modifierProfil;
exports.profil = profil;
exports.modifierSecuriteRecuperationControleur = modifierSecuriteRecuperationControleur;
const utilisateur_service_1 = require("../services/utilisateur.service");
/**
 * =========================================================
 * MODIFIER LE PROFIL
 * =========================================================
 */
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
    if (nomAffiche !== undefined &&
        nomAffiche !== null &&
        nomAffiche.length > 50) {
        return res.status(400).json({
            erreur: "Le nom affiché ne peut pas dépasser 50 caractères.",
        });
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
 * =========================================================
 * RÉCUPÉRER LE PROFIL
 * =========================================================
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
/**
 * =========================================================
 * MODIFIER LA SÉCURITÉ DE RÉCUPÉRATION
 * =========================================================
 *
 * Permet à l'utilisateur connecté de définir ou modifier :
 *
 * - sa phrase secrète ;
 * - son indice de récupération.
 *
 * La phrase secrète n'est jamais stockée en clair.
 */
async function modifierSecuriteRecuperationControleur(req, res) {
    const utilisateurId = req.utilisateurId;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    const { recoveryAnswer, recoveryHint, motDePasseActuel, } = req.body;
    if (typeof recoveryAnswer !== "string" ||
        typeof recoveryHint !== "string") {
        return res.status(400).json({
            erreur: "Phrase secrète et indice requis.",
        });
    }
    const phraseRecuperation = recoveryAnswer.trim();
    const indiceRecuperation = recoveryHint.trim();
    if (phraseRecuperation.length < 8) {
        return res.status(400).json({
            erreur: "La phrase secrète doit contenir au moins 8 caractères.",
        });
    }
    if (indiceRecuperation.length < 3) {
        return res.status(400).json({
            erreur: "L'indice doit contenir au moins 3 caractères.",
        });
    }
    if (phraseRecuperation.toLowerCase() ===
        indiceRecuperation.toLowerCase()) {
        return res.status(400).json({
            erreur: "L'indice ne doit pas révéler directement la phrase secrète.",
        });
    }
    /*
     * Pour modifier une phrase existante depuis un espace
     * connecté, nous demandons le mot de passe actuel.
     *
     * Lors de la première configuration, il peut être
     * absent si aucune phrase n'existe encore.
     */
    if (motDePasseActuel !== undefined &&
        typeof motDePasseActuel !== "string") {
        return res.status(400).json({
            erreur: "Le mot de passe actuel est invalide.",
        });
    }
    try {
        const utilisateur = await (0, utilisateur_service_1.modifierSecuriteRecuperation)(utilisateurId, phraseRecuperation, indiceRecuperation, motDePasseActuel);
        return res.status(200).json({
            message: "Les informations de récupération ont été mises à jour avec succès.",
            utilisateur,
        });
    }
    catch (erreur) {
        if (erreur instanceof Error &&
            erreur.message ===
                "MOT_DE_PASSE_ACTUEL_INVALIDE") {
            return res.status(401).json({
                erreur: "Votre mot de passe actuel est incorrect.",
            });
        }
        console.error("Erreur lors de la modification des informations de récupération :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
//# sourceMappingURL=utilisateur.controleur.js.map