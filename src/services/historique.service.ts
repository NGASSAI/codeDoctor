import { prisma } from "../base";
import { Category, Severity, MessageRole } from "../generated/prisma/client";

/**
 * Créer une entrée d'historique.
 */
export async function creerHistorique(
  utilisateurId: string,
  donnees: {
    ruleId?: string;
    categorie: Category;
    titre: string;
    severite?: Severity;
    extrait?: string;
  }
) {
  return prisma.historyEntry.create({
    data: {
      userId: utilisateurId,
      categorie: donnees.categorie,
      titre: donnees.titre,
      ...(donnees.ruleId !== undefined
        ? { ruleId: donnees.ruleId }
        : {}),
      ...(donnees.severite !== undefined
        ? { severite: donnees.severite }
        : {}),
      ...(donnees.extrait !== undefined
        ? { extrait: donnees.extrait }
        : {}),
    },
    select: {
      id: true,
      ruleId: true,
      categorie: true,
      titre: true,
      severite: true,
      extrait: true,
      createdAt: true,
    },
  });
}
/**
 * Lister l'historique d'un utilisateur.
 */
export async function listerHistorique(
  utilisateurId: string
) {
  return prisma.historyEntry.findMany({
    where: {
      userId: utilisateurId,
    },
    select: {
      id: true,
      ruleId: true,
      categorie: true,
      titre: true,
      severite: true,
      extrait: true,
      createdAt: true,
      conversation: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Récupérer une entrée précise de l'historique.
 */
export async function obtenirHistorique(
  historiqueId: string,
  utilisateurId: string
) {
  return prisma.historyEntry.findFirst({
    where: {
      id: historiqueId,
      userId: utilisateurId,
    },
    select: {
      id: true,
      ruleId: true,
      categorie: true,
      titre: true,
      severite: true,
      extrait: true,
      createdAt: true,
      conversation: {
        select: {
          id: true,
          title: true,
          createdAt: true,
          messages: {
            select: {
              id: true,
              role: true,
              content: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
    },
  });
}

/**
 * Supprimer une entrée d'historique.
 */
export async function supprimerHistorique(
  historiqueId: string,
  utilisateurId: string
) {
  const historique = await prisma.historyEntry.findFirst({
    where: {
      id: historiqueId,
      userId: utilisateurId,
    },
    select: {
      id: true,
    },
  });

  if (!historique) {
    return null;
  }

  return prisma.historyEntry.delete({
    where: {
      id: historique.id,
    },
  });
}

/**
 * Créer une conversation liée à une entrée d'historique.
 */
export async function creerConversation(
  historiqueId: string,
  utilisateurId: string,
  titre: string
) {
  const historique = await prisma.historyEntry.findFirst({
    where: {
      id: historiqueId,
      userId: utilisateurId,
    },
    select: {
      id: true,
    },
  });

  if (!historique) {
    return null;
  }

  return prisma.conversation.create({
    data: {
      userId: utilisateurId,
      historyEntryId: historique.id,
      title: titre,
    },
    select: {
      id: true,
      historyEntryId: true,
      title: true,
      createdAt: true,
    },
  });
}

/**
 * Ajouter un message à une conversation.
 */
export async function ajouterMessage(
  conversationId: string,
  utilisateurId: string,
  role: MessageRole,
  content: string
) {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId: utilisateurId,
    },
    select: {
      id: true,
    },
  });

  if (!conversation) {
    return null;
  }

  return prisma.message.create({
    data: {
      conversationId,
      role,
      content,
    },
    select: {
      id: true,
      conversationId: true,
      role: true,
      content: true,
      createdAt: true,
    },
  });
}

/**
 * Récupérer une conversation complète.
 */
export async function obtenirConversation(
  conversationId: string,
  utilisateurId: string
) {
  return prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId: utilisateurId,
    },
    select: {
      id: true,
      historyEntryId: true,
      title: true,
      createdAt: true,
      messages: {
        select: {
          id: true,
          role: true,
          content: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}