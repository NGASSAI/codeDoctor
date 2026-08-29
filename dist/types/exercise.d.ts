import type { Category } from "../generated/prisma/enums";
export interface Exercise {
    title: string;
    category: Category;
    difficulty: string;
    buggyCode: string;
    hint1: string;
    hint2: string;
    hint3: string;
    solution: string;
    keywords: string[];
}
//# sourceMappingURL=exercise.d.ts.map