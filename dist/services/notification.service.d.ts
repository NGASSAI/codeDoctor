import type { NotificationType } from "../generated/prisma/client";
/**
 * Créer une notification pour un utilisateur
 */
export declare function creerNotification(userId: string, type: NotificationType, titre: string, message: string, lien?: string): Promise<{
    id: string;
    userId: string;
    type: NotificationType;
    titre: string;
    message: string;
    lien: string | null;
    lue: boolean;
    createdAt: Date;
}>;
/**
 * Récupérer les notifications d'un utilisateur
 */
export declare function obtenirNotifications(userId: string): Promise<{
    id: string;
    userId: string;
    type: NotificationType;
    titre: string;
    message: string;
    lien: string | null;
    lue: boolean;
    createdAt: Date;
}[]>;
/**
 * Récupérer uniquement les notifications non lues
 */
export declare function obtenirNotificationsNonLues(userId: string): Promise<{
    id: string;
    userId: string;
    type: NotificationType;
    titre: string;
    message: string;
    lien: string | null;
    lue: boolean;
    createdAt: Date;
}[]>;
/**
 * Compter les notifications non lues
 */
export declare function compterNotificationsNonLues(userId: string): Promise<number>;
/**
 * Marquer une notification comme lue
 */
export declare function marquerNotificationCommeLue(notificationId: string, userId: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
/**
 * Marquer toutes les notifications comme lues
 */
export declare function marquerToutesCommeLues(userId: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
/**
 * Supprimer une notification
 */
export declare function supprimerNotification(notificationId: string, userId: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
//# sourceMappingURL=notification.service.d.ts.map