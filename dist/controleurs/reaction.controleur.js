"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajouter = ajouter;
exports.lister = lister;
exports.supprimer = supprimer;
const base_1 = require("../base");
const reaction_service_1 = require("../services/reaction.service");
/**
 * Ajouter une réaction
 * POST /api/experiences/:experienceId/reactions
 */
async function ajouter(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
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
        const { type } = req.body;
        const typesAutorises = ["LIKE", "USEFUL"];
        if (typeof type !== "string" ||
            !typesAutorises.includes(type)) {
            return res.status(400).json({
                erreur: "Type de réaction invalide.",
            });
        }
        const reactionExistante = await (0, reaction_service_1.trouverReaction)(utilisateurId, experienceId, type);
        if (reactionExistante) {
            return res.status(409).json({
                erreur: "Vous avez déjà ajouté cette réaction.",
            });
        }
        const reaction = await (0, reaction_service_1.ajouterReaction)(utilisateurId, experienceId, type);
        // Récupération des informations sur l'expérience et l'auteur de la réaction
        const [experience, utilisateur] = await Promise.all([
            base_1.prisma.experience.findUnique({
                where: { id: experienceId },
                select: { userId: true, titre: true },
            }),
            base_1.prisma.user.findUnique({
                where: { id: utilisateurId },
                select: { displayName: true },
            }),
        ]);
        // Notification envoyée à l'auteur si ce n'est pas lui qui réagit
        if (experience && experience.userId !== utilisateurId) {
            const nomAuteur = utilisateur?.displayName || "Un utilisateur";
            const libelleType = type === "LIKE" ? "aimé" : "trouvé utile";
            await base_1.prisma.notification.create({
                data: {
                    userId: experience.userId,
                    type: "NOUVELLE_REACTION",
                    titre: "Nouvelle réaction",
                    message: `${nomAuteur} a ${libelleType} votre expérience "${experience.titre}".`,
                    lien: `/experiences/${experienceId}`,
                },
            });
        }
        return res.status(201).json({
            message: "Réaction ajoutée avec succès.",
            reaction,
        });
    }
    catch (erreur) {
        console.error("Erreur ajout réaction :", erreur);
        return res.status(500).json({
            erreur: "Impossible d'ajouter la réaction.",
        });
    }
}
/**
 * Récupérer les réactions d'une expérience
 * GET /api/experiences/:experienceId/reactions
 */
async function lister(req, res) {
    try {
        const experienceId = req.params.experienceId;
        if (typeof experienceId !== "string") {
            return res.status(400).json({
                erreur: "Identifiant d'expérience invalide.",
            });
        }
        const reactions = await (0, reaction_service_1.obtenirReactions)(experienceId);
        return res.status(200).json({
            reactions,
        });
    }
    catch (erreur) {
        console.error("Erreur récupération réactions :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer les réactions.",
        });
    }
}
/**
 * Supprimer une réaction
 * DELETE /api/experiences/:experienceId/reactions/:type
 */
async function supprimer(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const experienceId = req.params.experienceId;
        const type = req.params.type;
        if (typeof experienceId !== "string" ||
            typeof type !== "string") {
            return res.status(400).json({
                erreur: "Paramètres invalides.",
            });
        }
        const typesAutorises = ["LIKE", "USEFUL"];
        if (!typesAutorises.includes(type)) {
            return res.status(400).json({
                erreur: "Type de réaction invalide.",
            });
        }
        const reaction = await (0, reaction_service_1.trouverReaction)(utilisateurId, experienceId, type);
        if (!reaction) {
            return res.status(404).json({
                erreur: "Réaction introuvable.",
            });
        }
        await (0, reaction_service_1.supprimerReaction)(utilisateurId, experienceId, type);
        return res.status(200).json({
            message: "Réaction supprimée avec succès.",
        });
    }
    catch (erreur) {
        console.error("Erreur suppression réaction :", erreur);
        return res.status(500).json({
            erreur: "Impossible de supprimer la réaction.",
        });
    }
}
//# sourceMappingURL=reaction.controleur.js.map