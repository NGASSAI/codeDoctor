import { Category, Severity, MessageRole } from "../generated/prisma/client";
/**
 * Créer une entrée d'historique.
 */
export declare function creerHistorique(utilisateurId: string, donnees: {
    ruleId?: string;
    categorie: Category;
    titre: string;
    severite?: Severity;
    extrait?: string;
}): Promise<{
    categorie: Category;
    createdAt: Date;
    extrait: string | null;
    id: string;
    ruleId: string | null;
    severite: Severity | null;
    titre: string;
}>;
/**
 * Lister l'historique d'un utilisateur.
 */
export declare function listerHistorique(utilisateurId: string): Promise<{
    categorie: Category;
    conversation: {
        id: string;
        title: string;
    } | null;
    createdAt: Date;
    extrait: string | null;
    id: string;
    ruleId: string | null;
    severite: Severity | null;
    titre: string;
}[]>;
/**
 * Récupérer une entrée précise de l'historique.
 */
export declare function obtenirHistorique(historiqueId: string, utilisateurId: string): Promise<{
    categorie: Category;
    conversation: {
        createdAt: Date;
        id: string;
        messages: {
            content: string;
            createdAt: Date;
            id: string;
            role: MessageRole;
        }[];
        title: string;
    } | null;
    createdAt: Date;
    extrait: string | null;
    id: string;
    ruleId: string | null;
    severite: Severity | null;
    titre: string;
} | null>;
/**
 * Supprimer une entrée d'historique.
 */
export declare function supprimerHistorique(historiqueId: string, utilisateurId: string): Promise<{
    id: string;
    userId: string;
    ruleId: string | null;
    categorie: Category;
    titre: string;
    severite: Severity | null;
    extrait: string | null;
    createdAt: Date;
} | null>;
/**
 * Créer une conversation liée à une entrée d'historique.
 */
export declare function creerConversation(historiqueId: string, utilisateurId: string, titre: string): Promise<{
    createdAt: Date;
    historyEntryId: string | null;
    id: string;
    title: string;
} | null>;
/**
 * Ajouter un message à une conversation.
 */
export declare function ajouterMessage(conversationId: string, utilisateurId: string, role: MessageRole, content: string): Promise<{
    content: string;
    conversationId: string;
    createdAt: Date;
    id: string;
    role: MessageRole;
} | null>;
/**
 * Récupérer une conversation complète.
 */
export declare function obtenirConversation(conversationId: string, utilisateurId: string): Promise<{
    createdAt: Date;
    historyEntryId: string | null;
    id: string;
    messages: {
        content: string;
        createdAt: Date;
        id: string;
        role: MessageRole;
    }[];
    title: string;
} | null>;
//# sourceMappingURL=historique.service.d.ts.map