import { Router } from "express";

import {
  lister,
  obtenir,
  creer,
  supprimer,
  nouvelleConversation,
  conversation,
  message,
} from "../controleurs/historique.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";

const router = Router();

router.use(authentificationMiddleware);

router.get("/", lister);

router.post("/", creer);

router.get("/:id", obtenir);

router.delete("/:id", supprimer);

router.post(
  "/:id/conversation",
  nouvelleConversation
);

router.get(
  "/conversations/:id",
  conversation
);

router.post(
  "/conversations/:id/messages",
  message
);

export default router;