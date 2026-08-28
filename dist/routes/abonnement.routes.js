"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const abonnement_controleur_1 = require("../controleurs/abonnement.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const routeur = (0, express_1.Router)();
routeur.get("/", authentification_middleware_1.authentificationMiddleware, abonnement_controleur_1.monAbonnement);
exports.default = routeur;
//# sourceMappingURL=abonnement.routes.js.map