import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.session`: Exposes CRUD operations for the **Session** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sessions
      * const sessions = await prisma.session.findMany()
      * ```
      */
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PasswordResetTokens
      * const passwordResetTokens = await prisma.passwordResetToken.findMany()
      * ```
      */
    get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.emailVerificationToken`: Exposes CRUD operations for the **EmailVerificationToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more EmailVerificationTokens
      * const emailVerificationTokens = await prisma.emailVerificationToken.findMany()
      * ```
      */
    get emailVerificationToken(): Prisma.EmailVerificationTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rule`: Exposes CRUD operations for the **Rule** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Rules
      * const rules = await prisma.rule.findMany()
      * ```
      */
    get rule(): Prisma.RuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.historyEntry`: Exposes CRUD operations for the **HistoryEntry** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HistoryEntries
      * const historyEntries = await prisma.historyEntry.findMany()
      * ```
      */
    get historyEntry(): Prisma.HistoryEntryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Conversations
      * const conversations = await prisma.conversation.findMany()
      * ```
      */
    get conversation(): Prisma.ConversationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.message`: Exposes CRUD operations for the **Message** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Messages
      * const messages = await prisma.message.findMany()
      * ```
      */
    get message(): Prisma.MessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Exercises
      * const exercises = await prisma.exercise.findMany()
      * ```
      */
    get exercise(): Prisma.ExerciseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.exerciseAttempt`: Exposes CRUD operations for the **ExerciseAttempt** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ExerciseAttempts
      * const exerciseAttempts = await prisma.exerciseAttempt.findMany()
      * ```
      */
    get exerciseAttempt(): Prisma.ExerciseAttemptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.progress`: Exposes CRUD operations for the **Progress** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Progresses
      * const progresses = await prisma.progress.findMany()
      * ```
      */
    get progress(): Prisma.ProgressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.experience`: Exposes CRUD operations for the **Experience** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Experiences
      * const experiences = await prisma.experience.findMany()
      * ```
      */
    get experience(): Prisma.ExperienceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Comments
      * const comments = await prisma.comment.findMany()
      * ```
      */
    get comment(): Prisma.CommentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.reaction`: Exposes CRUD operations for the **Reaction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reactions
      * const reactions = await prisma.reaction.findMany()
      * ```
      */
    get reaction(): Prisma.ReactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.report`: Exposes CRUD operations for the **Report** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reports
      * const reports = await prisma.report.findMany()
      * ```
      */
    get report(): Prisma.ReportDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Subscriptions
      * const subscriptions = await prisma.subscription.findMany()
      * ```
      */
    get subscription(): Prisma.SubscriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.aIUsage`: Exposes CRUD operations for the **AIUsage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AIUsages
      * const aIUsages = await prisma.aIUsage.findMany()
      * ```
      */
    get aIUsage(): Prisma.AIUsageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Payments
      * const payments = await prisma.payment.findMany()
      * ```
      */
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map