import { prisma } from "../base";

import type { NotificationType } from "../generated/prisma/client";
import { envoyerNotificationTempsReel } from "../socket";

/**
 * Créer une notification pour un utilisateur
 */
export async function creerNotification(
  userId: string,
  type: NotificationType,
  titre: string,
  message: string,
  lien?: string
) {
const notification = await prisma.notification.create({
    data: {
      userId,
      type,
      titre,
      message,
      lien: lien ?? null,
    },
    
  });
  envoyerNotificationTempsReel(userId, notification);

return notification;
}

/**
 * Récupérer les notifications d'un utilisateur
 */
export async function obtenirNotifications(
  userId: string
) {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });
}

/**
 * Récupérer uniquement les notifications non lues
 */
export async function obtenirNotificationsNonLues(
  userId: string
) {
  return prisma.notification.findMany({
    where: {
      userId,
      lue: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Compter les notifications non lues
 */
export async function compterNotificationsNonLues(
  userId: string
) {
  return prisma.notification.count({
    where: {
      userId,
      lue: false,
    },
  });
}

/**
 * Marquer une notification comme lue
 */
export async function marquerNotificationCommeLue(
  notificationId: string,
  userId: string
) {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
    },
    data: {
      lue: true,
    },
  });
}

/**
 * Marquer toutes les notifications comme lues
 */
export async function marquerToutesCommeLues(
  userId: string
) {
  return prisma.notification.updateMany({
    where: {
      userId,
      lue: false,
    },
    data: {
      lue: true,
    },
  });
}

/**
 * Supprimer une notification
 */
export async function supprimerNotification(
  notificationId: string,
  userId: string
) {
  return prisma.notification.deleteMany({
    where: {
      id: notificationId,
      userId,
    },
  });
}