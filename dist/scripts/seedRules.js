"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const codeDoctorRules_1 = require("../data/codeDoctorRules");
async function main() {
    for (const rule of codeDoctorRules_1.CODE_DOCTOR_RULES) {
        await base_1.prisma.rule.upsert({
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
    console.log(`${codeDoctorRules_1.CODE_DOCTOR_RULES.length} règles CodeDoctor enregistrées.`);
}
main()
    .catch((error) => {
    console.error("Erreur lors du seed des règles :", error);
    process.exit(1);
})
    .finally(async () => {
    await base_1.prisma.$disconnect();
});
//# sourceMappingURL=seedRules.js.map