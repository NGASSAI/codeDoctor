"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
async function main() {
    const count = await base_1.prisma.user.count();
    console.log("Connexion OK. Nombre d'utilisateurs :", count);
}
main().finally(() => base_1.prisma.$disconnect());
//# sourceMappingURL=verifierBase.js.map