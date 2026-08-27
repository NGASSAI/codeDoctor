import { prisma } from "./base";

async function main() {
  const utilisateur = await prisma.user.create({
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
  .finally(() => prisma.$disconnect());