import { Category } from "../generated/prisma/client";
/**
 * Liste les exercices disponibles.
 *
 * IMPORTANT :
 * La solution n'est jamais retournée au client.
 */
export declare function listerExercices(categorie?: Category, difficulte?: string): Promise<{
    buggyCode: string;
    category: Category;
    createdAt: Date;
    difficulty: string;
    id: string;
    title: string;
}[]>;
/**
 * Récupère un exercice par son identifiant.
 *
 * La solution et les mots-clés restent secrets.
 */
export declare function obtenirExercice(exerciceId: string): Promise<{
    buggyCode: string;
    category: Category;
    createdAt: Date;
    difficulty: string;
    hint1: string;
    hint2: string;
    hint3: string;
    id: string;
    title: string;
} | null>;
/**
 * Récupère un indice précis.
 *
 * 1 => hint1
 * 2 => hint2
 * 3 => hint3
 */
export declare function obtenirIndice(exerciceId: string, numeroIndice: number): Promise<{
    exerciceId: string;
    numeroIndice: number;
    indice: string | undefined;
} | null>;
/**
 * Vérifie la réponse d'un utilisateur.
 *
 * Les mots-clés restent côté serveur.
 * Le frontend ne reçoit jamais la solution.
 */
export declare function soumettreTentative(utilisateurId: string, exerciceId: string, reponse: string, indicesUtilises: number): Promise<{
    tentative: {
        correct: boolean;
        createdAt: Date;
        exerciseId: string;
        hintsUsed: number;
        id: string;
    };
    progression: {
        categorie: Category;
        compteur: number;
        id: string;
    } | null;
} | null>;
/**
 * Récupère l'historique des tentatives
 * de l'utilisateur pour un exercice.
 */
export declare function listerTentativesUtilisateur(utilisateurId: string, exerciceId?: string): Promise<{
    correct: boolean;
    createdAt: Date;
    exerciseId: string;
    hintsUsed: number;
    id: string;
    userAnswer: string;
}[]>;
/**
 * Récupère la progression globale de l'utilisateur.
 */
export declare function obtenirProgression(utilisateurId: string): Promise<{
    categorie: Category;
    compteur: number;
    id: string;
}[]>;
/**
 * Crée un nouvel exercice (réservé à l'admin).
 */
export declare function creerExercice(donnees: {
    title: string;
    category: Category;
    difficulty: string;
    buggyCode: string;
    hint1: string;
    hint2: string;
    hint3: string;
    solution: string;
    keywords: string[];
}): Promise<{
    id: string;
    title: string;
    category: Category;
    difficulty: string;
    buggyCode: string;
    hint1: string;
    hint2: string;
    hint3: string;
    solution: string;
    keywords: string[];
    createdAt: Date;
}>;
/**
 * Modifie un exercice existant (réservé à l'admin).
 */
export declare function modifierExercice(exerciceId: string, donnees: {
    title?: string;
    category?: Category;
    difficulty?: string;
    buggyCode?: string;
    hint1?: string;
    hint2?: string;
    hint3?: string;
    solution?: string;
    keywords?: string[];
}): Promise<{
    id: string;
    title: string;
    category: Category;
    difficulty: string;
    buggyCode: string;
    hint1: string;
    hint2: string;
    hint3: string;
    solution: string;
    keywords: string[];
    createdAt: Date;
}>;
/**
 * Supprime un exercice (réservé à l'admin).
 */
export declare function supprimerExercice(exerciceId: string): Promise<{
    id: string;
    title: string;
    category: Category;
    difficulty: string;
    buggyCode: string;
    hint1: string;
    hint2: string;
    hint3: string;
    solution: string;
    keywords: string[];
    createdAt: Date;
}>;
/**
 * Liste complète des exercices pour l'admin,
 * incluant la solution et les mots-clés.
 */
export declare function listerExercicesAdmin(): Promise<{
    id: string;
    title: string;
    category: Category;
    difficulty: string;
    buggyCode: string;
    hint1: string;
    hint2: string;
    hint3: string;
    solution: string;
    keywords: string[];
    createdAt: Date;
}[]>;
//# sourceMappingURL=exercice.service.d.ts.map