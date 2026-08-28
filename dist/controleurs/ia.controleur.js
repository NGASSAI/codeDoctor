"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyserCodeControleur = analyserCodeControleur;
const ia_service_1 = require("../services/ia.service");
async function analyserCodeControleur(req, res) {
    try {
        const { code, langage, erreur } = req.body;
        if (!code || typeof code !== "string") {
            return res.status(400).json({
                erreur: "Le code à analyser est requis.",
            });
        }
        if (!langage || typeof langage !== "string") {
            return res.status(400).json({
                erreur: "Le langage de programmation est requis.",
            });
        }
        if (code.length > 20000) {
            return res.status(413).json({
                erreur: "Le code est trop volumineux. La limite est de 20 000 caractères.",
            });
        }
        const parametres = {
            code,
            langage,
        };
        if (typeof erreur === "string" && erreur.trim()) {
            parametres.erreur = erreur;
        }
        const analyse = await (0, ia_service_1.analyserCode)(parametres);
        return res.status(200).json({
            succes: true,
            analyse,
        });
    }
    catch (erreur) {
        console.error("Erreur lors de l'analyse IA :", erreur);
        return res.status(500).json({
            erreur: "Impossible d'effectuer l'analyse du code.",
        });
    }
}
//# sourceMappingURL=ia.controleur.js.map