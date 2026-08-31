"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diagnostic_controleur_1 = require("../controleurs/diagnostic.controleur");
const authentification_middleware_1 = require("../middlewares/authentification.middleware");
const diagnostic_controleur_2 = require("../controleurs/diagnostic.controleur");
const router = (0, express_1.Router)();
/**
 * Analyse locale du code.
 *
 * Le moteur utilise les règles CodeDoctor
 * enregistrées en base de données.
 */
router.post("/", authentification_middleware_1.authentificationMiddleware, diagnostic_controleur_1.diagnostiquer);
router.get("/capacites", diagnostic_controleur_2.listerCapacites);
exports.default = router;
//# sourceMappingURL=diagnostic.routes.js.map