"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
async function main() {
    const utilisateur = await base_1.prisma.user.create({
        data: {
            id: crypto.randomUUID(),
            email: "test-prisma-2@test.com",
            passwordHash: "test-hash",
            updatedAt: new Date(),
        },
    });
    console.log("Utilisateur créé :", utilisateur);
}
main()
    .catch(console.error)
    .finally(() => base_1.prisma.$disconnect());
//# sourceMappingURL=testCreation.js.map