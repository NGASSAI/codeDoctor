interface AnalyserCodeParams {
    code: string;
    langage: string;
    erreur?: string;
    utilisateurId: string;
    dateJour: string;
}
export declare function analyserCode({ code, langage, erreur, utilisateurId, dateJour, }: AnalyserCodeParams): Promise<string>;
export {};
//# sourceMappingURL=ia.service.d.ts.map