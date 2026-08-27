"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creer = creer;
exports.lister = lister;
exports.obtenir = obtenir;
exports.modifierStatut = modifierStatut;
const report_service_1 = require("../services/report.service");
/**
 * Créer un signalement
 * POST /api/experiences/:experienceId/signalements
 */
async function creer(req, res) {
    try {
        const userId = req.utilisateurId;
        if (!userId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const experienceId = req.params.experienceId;
        if (typeof experienceId !== "string") {
            return res.status(400).json({
                erreur: "Identifiant d'expérience invalide.",
            });
        }
        const { raison, description } = req.body;
        const raisonsAutorisees = [
            "SPAM",
            "HARCELEMENT",
            "CONTENU_INAPPROPRIE",
            "CODE_DANGEREUX",
            "INFORMATIONS_FAUSSES",
            "AUTRE",
        ];
        if (typeof raison !== "string" ||
            !raisonsAutorisees.includes(raison)) {
            return res.status(400).json({
                erreur: "Raison du signalement invalide.",
            });
        }
        if (description !== undefined &&
            typeof description !== "string") {
            return res.status(400).json({
                erreur: "La description doit être une chaîne de caractères.",
            });
        }
        const signalementExistant = await (0, report_service_1.trouverSignalement)(userId, experienceId);
        if (signalementExistant) {
            return res.status(409).json({
                erreur: "Vous avez déjà signalé cette expérience.",
            });
        }
        const signalement = await (0, report_service_1.creerSignalement)(userId, experienceId, raison, description);
        return res.status(201).json({
            message: "Signalement envoyé avec succès.",
            signalement,
        });
    }
    catch (erreur) {
        console.error("Erreur création signalement :", erreur);
        return res.status(500).json({
            erreur: "Impossible de créer le signalement.",
        });
    }
}
/**
 * Voir les signalements
 * GET /api/signalements
 *
 * Cette route sera réservée à l'administration plus tard.
 */
async function lister(req, res) {
    try {
        const statut = req.query.statut;
        let statutValide;
        if (typeof statut === "string") {
            const statutsAutorises = [
                "PENDING",
                "REVIEWED",
                "RESOLVED",
                "DISMISSED",
            ];
            if (!statutsAutorises.includes(statut)) {
                return res.status(400).json({
                    erreur: "Statut invalide.",
                });
            }
            statutValide = statut;
        }
        const signalements = await (0, report_service_1.obtenirSignalements)(statutValide);
        return res.status(200).json({
            signalements,
        });
    }
    catch (erreur) {
        console.error("Erreur récupération signalements :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer les signalements.",
        });
    }
}
/**
 * Voir un signalement
 * GET /api/signalements/:id
 *
 * Cette route sera réservée à l'administration plus tard.
 */
async function obtenir(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            return res.status(400).json({
                erreur: "Identifiant de signalement invalide.",
            });
        }
        const signalement = await (0, report_service_1.obtenirSignalementParId)(id);
        if (!signalement) {
            return res.status(404).json({
                erreur: "Signalement introuvable.",
            });
        }
        return res.status(200).json({
            signalement,
        });
    }
    catch (erreur) {
        console.error("Erreur récupération signalement :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer le signalement.",
        });
    }
}
/**
 * Modifier le statut d'un signalement
 * PATCH /api/signalements/:id/statut
 *
 * Cette route sera réservée à l'administration plus tard.
 */
async function modifierStatut(req, res) {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            return res.status(400).json({
                erreur: "Identifiant de signalement invalide.",
            });
        }
        const { statut } = req.body;
        const statutsAutorises = [
            "PENDING",
            "REVIEWED",
            "RESOLVED",
            "DISMISSED",
        ];
        if (typeof statut !== "string" ||
            !statutsAutorises.includes(statut)) {
            return res.status(400).json({
                erreur: "Statut invalide.",
            });
        }
        const signalement = await (0, report_service_1.modifierStatutSignalement)(id, statut);
        return res.status(200).json({
            message: "Statut du signalement modifié avec succès.",
            signalement,
        });
    }
    catch (erreur) {
        console.error("Erreur modification signalement :", erreur);
        return res.status(500).json({
            erreur: "Impossible de modifier le statut du signalement.",
        });
    }
}
//# sourceMappingURL=report.controleur.js.map