
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { CODE_DOCTOR_RULES } from "../src/data/codeDoctorRules";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL est introuvable dans le fichier .env");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Début du seed CodeDoctor...");

  console.log(
    `📦 ${CODE_DOCTOR_RULES.length} règles trouvées dans codeDoctorRules.ts`
  );

  for (const rule of CODE_DOCTOR_RULES) {
    await prisma.rule.upsert({
      where: {
        code: rule.code,
      },
      update: {
        title: rule.title,
        category: rule.category,
        severity: rule.severity,
        explanation: rule.explanation,
        cause: rule.cause,
        howToFind: rule.howToFind,
        fixHint: rule.fixHint,
        beforeCode: rule.beforeCode,
        afterCode: rule.afterCode,
      },
      create: {
        code: rule.code,
        title: rule.title,
        category: rule.category,
        severity: rule.severity,
        explanation: rule.explanation,
        cause: rule.cause,
        howToFind: rule.howToFind,
        fixHint: rule.fixHint,
        beforeCode: rule.beforeCode,
        afterCode: rule.afterCode,
      },
    });
  }

  console.log(
    `✅ ${CODE_DOCTOR_RULES.length} règles ont été insérées/mises à jour.`
  );
}

main()
  .catch((error) => {
    console.error("❌ Erreur pendant le seed :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

