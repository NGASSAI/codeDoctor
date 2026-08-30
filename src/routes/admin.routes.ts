import { Router } from "express";
import {
  paiementsAdmin,
  approuverPaiementAdmin,
  rejeterPaiementAdmin,
} from "../controleurs/paiement-admin.controleur";

import {
  dashboardAdmin,
  utilisateursAdmin,
  modifierRoleUtilisateur,
  supprimerUtilisateur,
  experiencesAdmin,
  modifierStatutExperience,
  signalementsAdmin,
  modifierStatutSignalementAdmin,
  notificationsAdmin,
} from "../controleurs/admin.controleur";

import { authentificationMiddleware } from "../middlewares/authentification.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const routeur = Router();

// Application des middlewares de sécurité pour toutes les routes d'administration
routeur.use(authentificationMiddleware, adminMiddleware);

// --- DASHBOARD ---
routeur.get("/dashboard", dashboardAdmin);

// --- UTILISATEURS ---
routeur.get("/utilisateurs", utilisateursAdmin);
routeur.patch("/utilisateurs/:id/role", modifierRoleUtilisateur);

// --- EXPERIENCES ---
routeur.get("/experiences", experiencesAdmin);
routeur.patch("/experiences/:id/statut", modifierStatutExperience);
routeur.delete("/utilisateurs/:id", supprimerUtilisateur);

// --- NOTIFICATIONS ---
routeur.get("/notifications", notificationsAdmin);

// --- SIGNALEMENTS ---
routeur.get("/signalements", signalementsAdmin);
routeur.patch(
  "/signalements/:id/statut",
  modifierStatutSignalementAdmin
);

// --- PAIEMENTS ---
routeur.get("/paiements", paiementsAdmin);
routeur.patch("/paiements/:id/approuver", approuverPaiementAdmin);
routeur.patch("/paiements/:id/rejeter", rejeterPaiementAdmin);

export default routeur;