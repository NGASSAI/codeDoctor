
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { CODE_DOCTOR_RULES } from "../src/data/codeDoctorRules";
import {
  API_EXERCISES,
  JAVASCRIPT_EXERCISES,
  TYPESCRIPT_EXERCISES,
  REACT_EXERCISES,
  HTTP_EXERCISES,
  HTML_CSS_EXERCISES,
} from "../src/data/exercises";
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
const ALL_EXERCISES = [
  ...API_EXERCISES,
  ...JAVASCRIPT_EXERCISES,
  ...TYPESCRIPT_EXERCISES,
  ...REACT_EXERCISES,
  ...HTTP_EXERCISES,
  ...HTML_CSS_EXERCISES,
];

async function main() {
  console.log("🌱 Début du seed CodeDoctor...");

  console.log(
    `📦 ${CODE_DOCTOR_RULES.length} règles trouvées dans codeDoctorRules.ts`
  );
for (const exercise of ALL_EXERCISES) {
    await prisma.exercise.create({
      data: {
        title: exercise.title,
        category: exercise.category,
        difficulty: exercise.difficulty,
        buggyCode: exercise.buggyCode,
        hint1: exercise.hint1,
        hint2: exercise.hint2,
        hint3: exercise.hint3,
        solution: exercise.solution,
        keywords: exercise.keywords,
      },
    });
  }
   console.log(
    `✅ ${ALL_EXERCISES.length} exercices insérés dans la base de données.`
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

