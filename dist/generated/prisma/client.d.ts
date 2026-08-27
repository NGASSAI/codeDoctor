import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Session
 *
 */
export type Session = Prisma.SessionModel;
/**
 * Model PasswordResetToken
 *
 */
export type PasswordResetToken = Prisma.PasswordResetTokenModel;
/**
 * Model EmailVerificationToken
 *
 */
export type EmailVerificationToken = Prisma.EmailVerificationTokenModel;
/**
 * Model Rule
 *
 */
export type Rule = Prisma.RuleModel;
/**
 * Model HistoryEntry
 *
 */
export type HistoryEntry = Prisma.HistoryEntryModel;
/**
 * Model Conversation
 *
 */
export type Conversation = Prisma.ConversationModel;
/**
 * Model Message
 *
 */
export type Message = Prisma.MessageModel;
/**
 * Model Exercise
 *
 */
export type Exercise = Prisma.ExerciseModel;
/**
 * Model ExerciseAttempt
 *
 */
export type ExerciseAttempt = Prisma.ExerciseAttemptModel;
/**
 * Model Progress
 *
 */
export type Progress = Prisma.ProgressModel;
/**
 * Model Experience
 *
 */
export type Experience = Prisma.ExperienceModel;
/**
 * Model Comment
 *
 */
export type Comment = Prisma.CommentModel;
/**
 * Model Reaction
 *
 */
export type Reaction = Prisma.ReactionModel;
/**
 * Model Report
 *
 */
export type Report = Prisma.ReportModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
//# sourceMappingURL=client.d.ts.map