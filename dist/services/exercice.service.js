"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listerExercices = listerExercices;
exports.obtenirExercice = obtenirExercice;
exports.obtenirIndice = obtenirIndice;
exports.soumettreTentative = soumettreTentative;
exports.listerTentativesUtilisateur = listerTentativesUtilisateur;
exports.obtenirProgression = obtenirProgression;
exports.creerExercice = creerExercice;
exports.modifierExercice = modifierExercice;
exports.supprimerExercice = supprimerExercice;
exports.listerExercicesAdmin = listerExercicesAdmin;
const base_1 = require("../base");
/**
 * Liste les exercices disponibles.
 *
 * IMPORTANT :
 * La solution n'est jamais retournée au client.
 */
async function listerExercices(categorie, difficulte) {
    return base_1.prisma.exercise.findMany({
        where: {
            ...(categorie ? { category: categorie } : {}),
            ...(difficulte
                ? { difficulty: difficulte }
                : {}),
        },
        select: {
            id: true,
            title: true,
            category: true,
            difficulty: true,
            buggyCode: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
/**
 * Récupère un exercice par son identifiant.
 *
 * La solution et les mots-clés restent secrets.
 */
async function obtenirExercice(exerciceId) {
    return base_1.prisma.exercise.findUnique({
        where: {
            id: exerciceId,
        },
        select: {
            id: true,
            title: true,
            category: true,
            difficulty: true,
            buggyCode: true,
            hint1: true,
            hint2: true,
            hint3: true,
            createdAt: true,
        },
    });
}
/**
 * Récupère un indice précis.
 *
 * 1 => hint1
 * 2 => hint2
 * 3 => hint3
 */
async function obtenirIndice(exerciceId, numeroIndice) {
    const exercice = await base_1.prisma.exercise.findUnique({
        where: {
            id: exerciceId,
        },
        select: {
            id: true,
            hint1: true,
            hint2: true,
            hint3: true,
        },
    });
    if (!exercice) {
        return null;
    }
    const indices = {
        1: exercice.hint1,
        2: exercice.hint2,
        3: exercice.hint3,
    };
    return {
        exerciceId: exercice.id,
        numeroIndice,
        indice: indices[numeroIndice],
    };
}
/**
 * Vérifie la réponse d'un utilisateur.
 *
 * Les mots-clés restent côté serveur.
 * Le frontend ne reçoit jamais la solution.
 */
async function soumettreTentative(utilisateurId, exerciceId, reponse, indicesUtilises) {
    const exercice = await base_1.prisma.exercise.findUnique({
        where: {
            id: exerciceId,
        },
        select: {
            id: true,
            category: true,
            solution: true,
            keywords: true,
        },
    });
    if (!exercice) {
        return null;
    }
    const reponseNormalisee = reponse
        .trim()
        .toLowerCase();
    /*
     * Une réponse vide ne peut évidemment pas être correcte.
     */
    let correcte = false;
    if (reponseNormalisee.length > 0) {
        /*
         * La réponse est considérée correcte si elle contient
         * tous les mots-clés définis pour l'exercice.
         *
         * Si aucun mot-clé n'est défini, on compare alors
         * directement avec la solution normalisée.
         */
        if (exercice.keywords.length > 0) {
            correcte = exercice.keywords.every((keyword) => reponseNormalisee.includes(keyword.trim().toLowerCase()));
        }
        else {
            correcte =
                reponseNormalisee ===
                    exercice.solution.trim().toLowerCase();
        }
    }
    const resultat = await base_1.prisma.$transaction(async (tx) => {
        const tentative = await tx.exerciseAttempt.create({
            data: {
                userId: utilisateurId,
                exerciseId: exerciceId,
                userAnswer: reponse,
                correct: correcte,
                hintsUsed: indicesUtilises,
            },
            select: {
                id: true,
                exerciseId: true,
                correct: true,
                hintsUsed: true,
                createdAt: true,
            },
        });
        /*
         * La progression est mise à jour uniquement
         * lorsque l'exercice est réussi.
         */
        let progression = null;
        if (correcte) {
            progression = await tx.progress.upsert({
                where: {
                    userId_categorie: {
                        userId: utilisateurId,
                        categorie: exercice.category,
                    },
                },
                create: {
                    userId: utilisateurId,
                    categorie: exercice.category,
                    compteur: 1,
                },
                update: {
                    compteur: {
                        increment: 1,
                    },
                },
                select: {
                    id: true,
                    categorie: true,
                    compteur: true,
                },
            });
        }
        return {
            tentative,
            progression,
        };
    });
    return resultat;
}
/**
 * Récupère l'historique des tentatives
 * de l'utilisateur pour un exercice.
 */
async function listerTentativesUtilisateur(utilisateurId, exerciceId) {
    return base_1.prisma.exerciseAttempt.findMany({
        where: {
            userId: utilisateurId,
            ...(exerciceId
                ? { exerciseId: exerciceId }
                : {}),
        },
        select: {
            id: true,
            exerciseId: true,
            userAnswer: true,
            correct: true,
            hintsUsed: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
/**
 * Récupère la progression globale de l'utilisateur.
 */
async function obtenirProgression(utilisateurId) {
    return base_1.prisma.progress.findMany({
        where: {
            userId: utilisateurId,
        },
        select: {
            id: true,
            categorie: true,
            compteur: true,
        },
        orderBy: {
            categorie: "asc",
        },
    });
}
/**
 * Crée un nouvel exercice (réservé à l'admin).
 */
async function creerExercice(donnees) {
    return base_1.prisma.exercise.create({
        data: donnees,
    });
}
/**
 * Modifie un exercice existant (réservé à l'admin).
 */
async function modifierExercice(exerciceId, donnees) {
    return base_1.prisma.exercise.update({
        where: { id: exerciceId },
        data: donnees,
    });
}
/**
 * Supprime un exercice (réservé à l'admin).
 */
async function supprimerExercice(exerciceId) {
    return base_1.prisma.exercise.delete({
        where: { id: exerciceId },
    });
}
/**
 * Liste complète des exercices pour l'admin,
 * incluant la solution et les mots-clés.
 */
async function listerExercicesAdmin() {
    return base_1.prisma.exercise.findMany({
        orderBy: { createdAt: "desc" },
    });
}
//# sourceMappingURL=exercice.service.js.map