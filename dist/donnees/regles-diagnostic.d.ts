import { Category, Severity } from "../generated/prisma/client";
export interface RegleDiagnostic {
    code: string;
    title: string;
    category: Category;
    severity: Severity;
    explanation: string;
    cause: string;
    howToFind: string;
    fixHint: string;
    beforeCode: string;
    afterCode: string;
}
export declare const REGLES_DIAGNOSTIC: RegleDiagnostic[];
//# sourceMappingURL=regles-diagnostic.d.ts.map