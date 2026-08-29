import bcrypt from "bcrypt";
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
    const adminEmail =
    process.env.ADMIN_EMAIL?.trim().toLowerCase();

  const adminPassword =
    process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans les variables d'environnement."
    );
  }

  if (adminPassword.length < 8) {
    throw new Error(
      "ADMIN_PASSWORD doit contenir au moins 8 caractères."
    );
  }

  const adminPasswordHash =
    await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: {
      email: adminEmail,
    },
    update: {
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      emailVerified: true,
    },
    create: {
      email: adminEmail,
      passwordHash: adminPasswordHash,
      displayName: "Administrateur",
      role: "ADMIN",
      emailVerified: true,
    },
    select: {
      id: true,
      email: true,
      role: true,
      emailVerified: true,
    },
  });

  console.log(
    `✅ Administrateur configuré : ${admin.email}`
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

