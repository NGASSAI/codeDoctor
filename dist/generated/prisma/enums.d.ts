export declare const UserRole: {
    readonly USER: 'USER';
    readonly ADMIN: 'ADMIN';
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const ExperienceStatus: {
    readonly PUBLISHED: 'PUBLISHED';
    readonly HIDDEN: 'HIDDEN';
    readonly DELETED: 'DELETED';
};
export type ExperienceStatus = (typeof ExperienceStatus)[keyof typeof ExperienceStatus];
export declare const ReactionType: {
    readonly LIKE: 'LIKE';
    readonly USEFUL: 'USEFUL';
};
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];
export declare const ReportReason: {
    readonly SPAM: 'SPAM';
    readonly HARCELEMENT: 'HARCELEMENT';
    readonly CONTENU_INAPPROPRIE: 'CONTENU_INAPPROPRIE';
    readonly CODE_DANGEREUX: 'CODE_DANGEREUX';
    readonly INFORMATIONS_FAUSSES: 'INFORMATIONS_FAUSSES';
    readonly AUTRE: 'AUTRE';
};
export type ReportReason = (typeof ReportReason)[keyof typeof ReportReason];
export declare const ReportStatus: {
    readonly PENDING: 'PENDING';
    readonly REVIEWED: 'REVIEWED';
    readonly RESOLVED: 'RESOLVED';
    readonly REJECTED: 'REJECTED';
};
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];
export declare const Category: {
    readonly JAVASCRIPT: 'JAVASCRIPT';
    readonly TYPESCRIPT: 'TYPESCRIPT';
    readonly REACT: 'REACT';
    readonly HTTP: 'HTTP';
    readonly API: 'API';
    readonly HTML_CSS: 'HTML_CSS';
};
export type Category = (typeof Category)[keyof typeof Category];
export declare const Severity: {
    readonly FAIBLE: 'FAIBLE';
    readonly MOYENNE: 'MOYENNE';
    readonly CRITIQUE: 'CRITIQUE';
};
export type Severity = (typeof Severity)[keyof typeof Severity];
export declare const MessageRole: {
    readonly USER: 'USER';
    readonly SYSTEM: 'SYSTEM';
};
export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];
export declare const NotificationType: {
    readonly NOUVEL_UTILISATEUR: 'NOUVEL_UTILISATEUR';
    readonly NOUVELLE_EXPERIENCE: 'NOUVELLE_EXPERIENCE';
    readonly NOUVEAU_COMMENTAIRE: 'NOUVEAU_COMMENTAIRE';
    readonly NOUVELLE_REACTION: 'NOUVELLE_REACTION';
    readonly NOUVEAU_SIGNALEMENT: 'NOUVEAU_SIGNALEMENT';
    readonly EXPERIENCE_APPROUVEE: 'EXPERIENCE_APPROUVEE';
    readonly EXPERIENCE_REFUSEE: 'EXPERIENCE_REFUSEE';
    readonly EXPERIENCE_SIGNALEE: 'EXPERIENCE_SIGNALEE';
    readonly PAIEMENT_APPROUVE: 'PAIEMENT_APPROUVE';
    readonly PAIEMENT_REJETE: 'PAIEMENT_REJETE';
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
//# sourceMappingURL=enums.d.ts.map