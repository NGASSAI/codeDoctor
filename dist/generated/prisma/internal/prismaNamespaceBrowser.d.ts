import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: 'User';
    readonly Session: 'Session';
    readonly PasswordResetToken: 'PasswordResetToken';
    readonly EmailVerificationToken: 'EmailVerificationToken';
    readonly Rule: 'Rule';
    readonly HistoryEntry: 'HistoryEntry';
    readonly Conversation: 'Conversation';
    readonly Message: 'Message';
    readonly Exercise: 'Exercise';
    readonly ExerciseAttempt: 'ExerciseAttempt';
    readonly Progress: 'Progress';
    readonly Experience: 'Experience';
    readonly Comment: 'Comment';
    readonly Reaction: 'Reaction';
    readonly Report: 'Report';
    readonly Notification: 'Notification';
    readonly Subscription: 'Subscription';
    readonly AIUsage: 'AIUsage';
    readonly Payment: 'Payment';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly email: 'email';
    readonly passwordHash: 'passwordHash';
    readonly displayName: 'displayName';
    readonly emailVerified: 'emailVerified';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly role: 'role';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly userAgent: 'userAgent';
    readonly createdAt: 'createdAt';
    readonly expiresAt: 'expiresAt';
    readonly refreshTokenHash: 'refreshTokenHash';
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const PasswordResetTokenScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly token: 'token';
    readonly used: 'used';
    readonly expiresAt: 'expiresAt';
    readonly createdAt: 'createdAt';
};
export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum];
export declare const EmailVerificationTokenScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly token: 'token';
    readonly expiresAt: 'expiresAt';
    readonly createdAt: 'createdAt';
};
export type EmailVerificationTokenScalarFieldEnum = (typeof EmailVerificationTokenScalarFieldEnum)[keyof typeof EmailVerificationTokenScalarFieldEnum];
export declare const RuleScalarFieldEnum: {
    readonly id: 'id';
    readonly code: 'code';
    readonly title: 'title';
    readonly category: 'category';
    readonly severity: 'severity';
    readonly explanation: 'explanation';
    readonly cause: 'cause';
    readonly howToFind: 'howToFind';
    readonly fixHint: 'fixHint';
    readonly beforeCode: 'beforeCode';
    readonly afterCode: 'afterCode';
    readonly createdAt: 'createdAt';
};
export type RuleScalarFieldEnum = (typeof RuleScalarFieldEnum)[keyof typeof RuleScalarFieldEnum];
export declare const HistoryEntryScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly ruleId: 'ruleId';
    readonly categorie: 'categorie';
    readonly titre: 'titre';
    readonly severite: 'severite';
    readonly extrait: 'extrait';
    readonly createdAt: 'createdAt';
};
export type HistoryEntryScalarFieldEnum = (typeof HistoryEntryScalarFieldEnum)[keyof typeof HistoryEntryScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly historyEntryId: 'historyEntryId';
    readonly title: 'title';
    readonly createdAt: 'createdAt';
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: 'id';
    readonly conversationId: 'conversationId';
    readonly role: 'role';
    readonly content: 'content';
    readonly createdAt: 'createdAt';
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const ExerciseScalarFieldEnum: {
    readonly id: 'id';
    readonly title: 'title';
    readonly category: 'category';
    readonly difficulty: 'difficulty';
    readonly buggyCode: 'buggyCode';
    readonly hint1: 'hint1';
    readonly hint2: 'hint2';
    readonly hint3: 'hint3';
    readonly solution: 'solution';
    readonly keywords: 'keywords';
    readonly createdAt: 'createdAt';
};
export type ExerciseScalarFieldEnum = (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum];
export declare const ExerciseAttemptScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly exerciseId: 'exerciseId';
    readonly userAnswer: 'userAnswer';
    readonly correct: 'correct';
    readonly hintsUsed: 'hintsUsed';
    readonly createdAt: 'createdAt';
};
export type ExerciseAttemptScalarFieldEnum = (typeof ExerciseAttemptScalarFieldEnum)[keyof typeof ExerciseAttemptScalarFieldEnum];
export declare const ProgressScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly categorie: 'categorie';
    readonly compteur: 'compteur';
};
export type ProgressScalarFieldEnum = (typeof ProgressScalarFieldEnum)[keyof typeof ProgressScalarFieldEnum];
export declare const ExperienceScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly titre: 'titre';
    readonly probleme: 'probleme';
    readonly code: 'code';
    readonly cause: 'cause';
    readonly solution: 'solution';
    readonly technologie: 'technologie';
    readonly categorie: 'categorie';
    readonly statut: 'statut';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly moderatedAt: 'moderatedAt';
    readonly moderatedBy: 'moderatedBy';
};
export type ExperienceScalarFieldEnum = (typeof ExperienceScalarFieldEnum)[keyof typeof ExperienceScalarFieldEnum];
export declare const CommentScalarFieldEnum: {
    readonly id: 'id';
    readonly experienceId: 'experienceId';
    readonly userId: 'userId';
    readonly contenu: 'contenu';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];
export declare const ReactionScalarFieldEnum: {
    readonly id: 'id';
    readonly experienceId: 'experienceId';
    readonly userId: 'userId';
    readonly type: 'type';
    readonly createdAt: 'createdAt';
};
export type ReactionScalarFieldEnum = (typeof ReactionScalarFieldEnum)[keyof typeof ReactionScalarFieldEnum];
export declare const ReportScalarFieldEnum: {
    readonly id: 'id';
    readonly experienceId: 'experienceId';
    readonly userId: 'userId';
    readonly raison: 'raison';
    readonly description: 'description';
    readonly statut: 'statut';
    readonly createdAt: 'createdAt';
    readonly resolvedAt: 'resolvedAt';
};
export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly type: 'type';
    readonly titre: 'titre';
    readonly message: 'message';
    readonly lien: 'lien';
    readonly lue: 'lue';
    readonly createdAt: 'createdAt';
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const SubscriptionScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly plan: 'plan';
    readonly statut: 'statut';
    readonly dateDebut: 'dateDebut';
    readonly dateRenouvellement: 'dateRenouvellement';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum];
export declare const AIUsageScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly dateJour: 'dateJour';
    readonly requetes: 'requetes';
    readonly tokensUtilises: 'tokensUtilises';
};
export type AIUsageScalarFieldEnum = (typeof AIUsageScalarFieldEnum)[keyof typeof AIUsageScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly montant: 'montant';
    readonly methode: 'methode';
    readonly statut: 'statut';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map