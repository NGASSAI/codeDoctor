"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lister = lister;
exports.obtenir = obtenir;
exports.creer = creer;
exports.supprimer = supprimer;
exports.nouvelleConversation = nouvelleConversation;
exports.conversation = conversation;
exports.message = message;
const historique_service_1 = require("../services/historique.service");
const client_1 = require("../generated/prisma/client");
function obtenirIdParametre(valeur) {
    if (typeof valeur === "string" && valeur.trim()) {
        return valeur.trim();
    }
    if (Array.isArray(valeur) && valeur[0]?.trim()) {
        return valeur[0].trim();
    }
    return null;
}
/**
 * GET /api/historique
 */
async function lister(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const historique = await (0, historique_service_1.listerHistorique)(utilisateurId);
        return res.status(200).json({
            historique,
            total: historique.length,
        });
    }
    catch (erreur) {
        console.error("Erreur historique :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer l'historique.",
        });
    }
}
/**
 * GET /api/historique/:id
 */
async function obtenir(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        const id = obtenirIdParametre(req.params.id);
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        if (!id) {
            return res.status(400).json({
                erreur: "Identifiant d'historique invalide.",
            });
        }
        const historique = await (0, historique_service_1.obtenirHistorique)(id, utilisateurId);
        if (!historique) {
            return res.status(404).json({
                erreur: "Entrée d'historique introuvable.",
            });
        }
        return res.status(200).json({
            historique,
        });
    }
    catch (erreur) {
        console.error("Erreur récupération historique :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer l'historique.",
        });
    }
}
/**
 * POST /api/historique
 */
async function creer(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        const { ruleId, categorie, titre, severite, extrait, } = req.body;
        if (typeof titre !== "string" ||
            !titre.trim() ||
            !Object.values(client_1.Category).includes(categorie)) {
            return res.status(400).json({
                erreur: "Titre et catégorie valides requis.",
            });
        }
        if (severite !== undefined &&
            !Object.values(client_1.Severity).includes(severite)) {
            return res.status(400).json({
                erreur: "Sévérité invalide.",
            });
        }
        const historique = await (0, historique_service_1.creerHistorique)(utilisateurId, {
            categorie,
            titre,
            ...(ruleId !== undefined ? { ruleId } : {}),
            ...(severite !== undefined ? { severite } : {}),
            ...(extrait !== undefined ? { extrait } : {}),
        });
        return res.status(201).json({
            message: "Analyse enregistrée dans l'historique.",
            historique,
        });
    }
    catch (erreur) {
        console.error("Erreur création historique :", erreur);
        return res.status(500).json({
            erreur: "Impossible d'enregistrer l'historique.",
        });
    }
}
/**
 * DELETE /api/historique/:id
 */
async function supprimer(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        const id = obtenirIdParametre(req.params.id);
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        if (!id) {
            return res.status(400).json({
                erreur: "Identifiant d'historique invalide.",
            });
        }
        const resultat = await (0, historique_service_1.supprimerHistorique)(id, utilisateurId);
        if (!resultat) {
            return res.status(404).json({
                erreur: "Entrée d'historique introuvable.",
            });
        }
        return res.status(200).json({
            message: "Entrée d'historique supprimée.",
        });
    }
    catch (erreur) {
        console.error("Erreur suppression historique :", erreur);
        return res.status(500).json({
            erreur: "Impossible de supprimer l'historique.",
        });
    }
}
/**
 * POST /api/historique/:id/conversation
 */
async function nouvelleConversation(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        const historiqueId = obtenirIdParametre(req.params.id);
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        if (!historiqueId) {
            return res.status(400).json({
                erreur: "Identifiant d'historique invalide.",
            });
        }
        const titre = typeof req.body.titre === "string" &&
            req.body.titre.trim()
            ? req.body.titre.trim()
            : "Nouvelle conversation";
        const conversation = await (0, historique_service_1.creerConversation)(historiqueId, utilisateurId, titre);
        if (!conversation) {
            return res.status(404).json({
                erreur: "Entrée d'historique introuvable.",
            });
        }
        return res.status(201).json({
            conversation,
        });
    }
    catch (erreur) {
        console.error("Erreur création conversation :", erreur);
        return res.status(500).json({
            erreur: "Impossible de créer la conversation.",
        });
    }
}
/**
 * GET /api/historique/conversations/:id
 */
async function conversation(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        const id = obtenirIdParametre(req.params.id);
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        if (!id) {
            return res.status(400).json({
                erreur: "Identifiant de conversation invalide.",
            });
        }
        const resultat = await (0, historique_service_1.obtenirConversation)(id, utilisateurId);
        if (!resultat) {
            return res.status(404).json({
                erreur: "Conversation introuvable.",
            });
        }
        return res.status(200).json({
            conversation: resultat,
        });
    }
    catch (erreur) {
        console.error("Erreur conversation :", erreur);
        return res.status(500).json({
            erreur: "Impossible de récupérer la conversation.",
        });
    }
}
/**
 * POST /api/historique/conversations/:id/messages
 */
async function message(req, res) {
    try {
        const utilisateurId = req.utilisateurId;
        const conversationId = obtenirIdParametre(req.params.id);
        if (!utilisateurId) {
            return res.status(401).json({
                erreur: "Authentification requise.",
            });
        }
        if (!conversationId) {
            return res.status(400).json({
                erreur: "Identifiant de conversation invalide.",
            });
        }
        const { role, content } = req.body;
        if (!Object.values(client_1.MessageRole).includes(role) ||
            typeof content !== "string" ||
            !content.trim()) {
            return res.status(400).json({
                erreur: "Rôle et contenu du message requis.",
            });
        }
        const resultat = await (0, historique_service_1.ajouterMessage)(conversationId, utilisateurId, role, content.trim());
        if (!resultat) {
            return res.status(404).json({
                erreur: "Conversation introuvable.",
            });
        }
        return res.status(201).json({
            message: resultat,
        });
    }
    catch (erreur) {
        console.error("Erreur ajout message :", erreur);
        return res.status(500).json({
            erreur: "Impossible d'ajouter le message.",
        });
    }
}
//# sourceMappingURL=historique.controleur.js.map