import { prisma } from "./base";

async function main() {
  const count = await prisma.user.count();
  console.log("Connexion OK. Nombre d'utilisateurs :", count);
}

main().finally(() => prisma.$disconnect());