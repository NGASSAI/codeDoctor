"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ia_controleur_1 = require("../controleurs/ia.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const routeur = (0, express_1.Router)();
routeur.post("/analyser", authentification_middleware_1.authentificationMiddleware, ia_controleur_1.analyserCodeControleur);
exports.default = routeur;
//# sourceMappingURL=ia.routes.js.map