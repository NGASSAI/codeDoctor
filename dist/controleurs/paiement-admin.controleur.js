"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paiementsAdmin = paiementsAdmin;
exports.approuverPaiementAdmin = approuverPaiementAdmin;
exports.rejeterPaiementAdmin = rejeterPaiementAdmin;
const paiement_service_1 = require("../services/paiement.service");
/**
 * =========================================================
 * LISTER LES PAIEMENTS PREMIUM
 *
 * GET /api/admin/paiements
 * =========================================================
 */
async function paiementsAdmin(req, res) {
    try {
        const page = Math.max(Number.parseInt(req.query.page) || 1, 1);
        const limite = Math.min(Math.max(Number.parseInt(req.query.limite) || 20, 1), 100);
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
 * =========================================================
 * APPROUVER UN PAIEMENT
 *
 * PATCH /api/admin/paiements/:id/approuver
 *
 * L'approbation active automatiquement le Premium
 * de l'utilisateur pendant 30 jours.
 * =========================================================
 */
async function approuverPaiementAdmin(req, res) {
    const paiementId = req.params.id;
    if (!paiementId || typeof paiementId !== "string") {
        return res.status(400).json({
            erreur: "Identifiant de paiement invalide.",
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
        if (erreur?.message === "PAIEMENT_INTRouvable") {
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
 * =========================================================
 * REJETER UN PAIEMENT
 *
 * PATCH /api/admin/paiements/:id/rejeter
 * =========================================================
 */
async function rejeterPaiementAdmin(req, res) {
    const paiementId = req.params.id;
    if (!paiementId || typeof paiementId !== "string") {
        return res.status(400).json({
            erreur: "Identifiant de paiement invalide.",
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
        if (erreur?.message === "PAIEMENT_INTRouvable") {
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
//# sourceMappingURL=paiement-admin.controleur.js.map