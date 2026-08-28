"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerPaiement = creerPaiement;
exports.obtenirPaiement = obtenirPaiement;
exports.paiementsAdmin = paiementsAdmin;
exports.approuverPaiementAdmin = approuverPaiementAdmin;
exports.rejeterPaiementAdmin = rejeterPaiementAdmin;
exports.mesPaiements = mesPaiements;
const paiement_service_1 = require("../services/paiement.service");
/**
 * Créer une demande de paiement Premium.
 */
async function creerPaiement(req, res) {
    const utilisateurId = req.utilisateurId;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    const { montant } = req.body;
    if (typeof montant !== "number" ||
        !Number.isFinite(montant) ||
        montant <= 0) {
        return res.status(400).json({
            erreur: "Le montant doit être un nombre supérieur à 0.",
        });
    }
    try {
        const paiement = await (0, paiement_service_1.creerDemandePaiement)(utilisateurId, Math.round(montant));
        return res.status(201).json({
            message: "Demande de paiement créée avec succès.",
            paiement,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la création du paiement :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Lister les paiements de l'utilisateur connecté.
 */
async function obtenirPaiement(req, res) {
    const utilisateurId = req.utilisateurId;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    const paiementId = String(req.params.paiementId ?? "");
    if (!paiementId) {
        return res.status(400).json({
            erreur: "Identifiant du paiement requis.",
        });
    }
    try {
        const paiement = await (0, paiement_service_1.obtenirPaiementUtilisateur)(paiementId, utilisateurId);
        if (!paiement) {
            return res.status(404).json({
                erreur: "Paiement introuvable.",
            });
        }
        return res.status(200).json({
            paiement,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération du paiement :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Lister les paiements pour l'administration.
 */
async function paiementsAdmin(req, res) {
    const page = Math.max(1, Number.parseInt(String(req.query.page ?? "1"), 10) || 1);
    const limite = Math.min(100, Math.max(1, Number.parseInt(String(req.query.limite ?? "20"), 10) || 20));
    try {
        const resultat = await (0, paiement_service_1.listerPaiementsAdmin)(page, limite);
        return res.status(200).json(resultat);
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération des paiements admin :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Approuver un paiement.
 */
async function approuverPaiementAdmin(req, res) {
    const paiementId = String(req.params.paiementId ?? "");
    if (!paiementId) {
        return res.status(400).json({
            erreur: "Identifiant du paiement requis.",
        });
    }
    try {
        const paiement = await (0, paiement_service_1.approuverPaiement)(paiementId);
        return res.status(200).json({
            message: "Paiement approuvé avec succès.",
            paiement,
        });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({
                erreur: "Paiement introuvable.",
            });
        }
        console.error("Erreur lors de l'approbation du paiement :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
/**
 * Rejeter un paiement.
 */
async function rejeterPaiementAdmin(req, res) {
    const paiementId = String(req.params.paiementId ?? "");
    if (!paiementId) {
        return res.status(400).json({
            erreur: "Identifiant du paiement requis.",
        });
    }
    try {
        const paiement = await (0, paiement_service_1.rejeterPaiement)(paiementId);
        return res.status(200).json({
            message: "Paiement rejeté avec succès.",
            paiement,
        });
    }
    catch (erreur) {
        if (erreur?.code === "P2025") {
            return res.status(404).json({
                erreur: "Paiement introuvable.",
            });
        }
        console.error("Erreur lors du rejet du paiement :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
async function mesPaiements(req, res) {
    const utilisateurId = req.utilisateurId;
    if (!utilisateurId) {
        return res.status(401).json({
            erreur: "Authentification requise.",
        });
    }
    try {
        const paiements = await (0, paiement_service_1.listerPaiementsUtilisateur)(utilisateurId);
        return res.status(200).json({
            paiements,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de la récupération des paiements :", erreur);
        return res.status(500).json({
            erreur: "Erreur interne du serveur.",
        });
    }
}
//# sourceMappingURL=paiement.controleur.js.map