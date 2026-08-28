import { prisma } from "../base";
import { CODE_DOCTOR_RULES } from "../data/codeDoctorRules";

async function main() {
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
    `${CODE_DOCTOR_RULES.length} règles CodeDoctor enregistrées.`
  );
}

main()
  .catch((error) => {
    console.error(
      "Erreur lors du seed des règles :",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });