"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gestionnaireErreurs = gestionnaireErreurs;
const client_1 = require("../generated/prisma/client");
/**
 * Middleware global de gestion des erreurs.
 *
 * Il doit être enregistré en dernier dans index.ts.
 */
function gestionnaireErreurs(erreur, _req, res, _next) {
    console.error("Erreur serveur :", erreur);
    /*
     * Erreurs Prisma connues
     */
    if (erreur instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (erreur.code) {
            /*
             * Contrainte unique violée.
             */
            case "P2002":
                return res.status(409).json({
                    erreur: "Cette donnée existe déjà.",
                });
            /*
             * Enregistrement introuvable.
             */
            case "P2025":
                return res.status(404).json({
                    erreur: "Ressource introuvable.",
                });
            default:
                return res.status(400).json({
                    erreur: "Erreur lors de l'opération en base de données.",
                });
        }
    }
    /*
     * Erreur Prisma de validation.
     */
    if (erreur instanceof client_1.Prisma.PrismaClientValidationError) {
        return res.status(400).json({
            erreur: "Données invalides.",
        });
    }
    /*
     * Erreur JavaScript classique.
     */
    if (erreur instanceof Error) {
        return res.status(500).json({
            erreur: "Une erreur interne est survenue.",
        });
    }
    /*
     * Erreur inconnue.
     */
    return res.status(500).json({
        erreur: "Une erreur interne est survenue.",
    });
}
//# sourceMappingURL=gestionnaireErreurs.js.map