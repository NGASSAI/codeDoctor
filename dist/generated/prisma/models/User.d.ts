import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    displayName: string | null;
    emailVerified: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    role: $Enums.UserRole | null;
    recoveryAnswerHash: string | null;
    recoveryHint: string | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    displayName: string | null;
    emailVerified: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    role: $Enums.UserRole | null;
    recoveryAnswerHash: string | null;
    recoveryHint: string | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    passwordHash: number;
    displayName: number;
    emailVerified: number;
    createdAt: number;
    updatedAt: number;
    role: number;
    recoveryAnswerHash: number;
    recoveryHint: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    displayName?: true;
    emailVerified?: true;
    createdAt?: true;
    updatedAt?: true;
    role?: true;
    recoveryAnswerHash?: true;
    recoveryHint?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    displayName?: true;
    emailVerified?: true;
    createdAt?: true;
    updatedAt?: true;
    role?: true;
    recoveryAnswerHash?: true;
    recoveryHint?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    displayName?: true;
    emailVerified?: true;
    createdAt?: true;
    updatedAt?: true;
    role?: true;
    recoveryAnswerHash?: true;
    recoveryHint?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    passwordHash: string;
    displayName: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: $Enums.UserRole;
    recoveryAnswerHash: string | null;
    recoveryHint: string | null;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    displayName?: Prisma.StringNullableFilter<"User"> | string | null;
    emailVerified?: Prisma.BoolFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.StringNullableFilter<"User"> | string | null;
    recoveryHint?: Prisma.StringNullableFilter<"User"> | string | null;
    aiUsages?: Prisma.AIUsageListRelationFilter;
    comments?: Prisma.CommentListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    verificationTokens?: Prisma.EmailVerificationTokenListRelationFilter;
    exerciseAttempts?: Prisma.ExerciseAttemptListRelationFilter;
    moderatedExperiences?: Prisma.ExperienceListRelationFilter;
    experiences?: Prisma.ExperienceListRelationFilter;
    historyEntries?: Prisma.HistoryEntryListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    resetTokens?: Prisma.PasswordResetTokenListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
    progress?: Prisma.ProgressListRelationFilter;
    reactions?: Prisma.ReactionListRelationFilter;
    reports?: Prisma.ReportListRelationFilter;
    sessions?: Prisma.SessionListRelationFilter;
    subscriptions?: Prisma.XOR<Prisma.SubscriptionNullableScalarRelationFilter, Prisma.SubscriptionWhereInput> | null;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    displayName?: Prisma.SortOrderInput | Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    recoveryAnswerHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    recoveryHint?: Prisma.SortOrderInput | Prisma.SortOrder;
    aiUsages?: Prisma.AIUsageOrderByRelationAggregateInput;
    comments?: Prisma.CommentOrderByRelationAggregateInput;
    conversations?: Prisma.ConversationOrderByRelationAggregateInput;
    verificationTokens?: Prisma.EmailVerificationTokenOrderByRelationAggregateInput;
    exerciseAttempts?: Prisma.ExerciseAttemptOrderByRelationAggregateInput;
    moderatedExperiences?: Prisma.ExperienceOrderByRelationAggregateInput;
    experiences?: Prisma.ExperienceOrderByRelationAggregateInput;
    historyEntries?: Prisma.HistoryEntryOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    resetTokens?: Prisma.PasswordResetTokenOrderByRelationAggregateInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
    progress?: Prisma.ProgressOrderByRelationAggregateInput;
    reactions?: Prisma.ReactionOrderByRelationAggregateInput;
    reports?: Prisma.ReportOrderByRelationAggregateInput;
    sessions?: Prisma.SessionOrderByRelationAggregateInput;
    subscriptions?: Prisma.SubscriptionOrderByWithRelationInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    passwordHash?: Prisma.StringFilter<"User"> | string;
    displayName?: Prisma.StringNullableFilter<"User"> | string | null;
    emailVerified?: Prisma.BoolFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.StringNullableFilter<"User"> | string | null;
    recoveryHint?: Prisma.StringNullableFilter<"User"> | string | null;
    aiUsages?: Prisma.AIUsageListRelationFilter;
    comments?: Prisma.CommentListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    verificationTokens?: Prisma.EmailVerificationTokenListRelationFilter;
    exerciseAttempts?: Prisma.ExerciseAttemptListRelationFilter;
    moderatedExperiences?: Prisma.ExperienceListRelationFilter;
    experiences?: Prisma.ExperienceListRelationFilter;
    historyEntries?: Prisma.HistoryEntryListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    resetTokens?: Prisma.PasswordResetTokenListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
    progress?: Prisma.ProgressListRelationFilter;
    reactions?: Prisma.ReactionListRelationFilter;
    reports?: Prisma.ReportListRelationFilter;
    sessions?: Prisma.SessionListRelationFilter;
    subscriptions?: Prisma.XOR<Prisma.SubscriptionNullableScalarRelationFilter, Prisma.SubscriptionWhereInput> | null;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    displayName?: Prisma.SortOrderInput | Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    recoveryAnswerHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    recoveryHint?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    displayName?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    emailVerified?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    recoveryHint?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    recoveryAnswerHash?: Prisma.SortOrder;
    recoveryHint?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    recoveryAnswerHash?: Prisma.SortOrder;
    recoveryHint?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    emailVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    recoveryAnswerHash?: Prisma.SortOrder;
    recoveryHint?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type UserCreateNestedOneWithoutSessionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSessionsInput;
    upsert?: Prisma.UserUpsertWithoutSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput, Prisma.UserUpdateWithoutSessionsInput>, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserCreateNestedOneWithoutResetTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutResetTokensInput, Prisma.UserUncheckedCreateWithoutResetTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutResetTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutResetTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutResetTokensInput, Prisma.UserUncheckedCreateWithoutResetTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutResetTokensInput;
    upsert?: Prisma.UserUpsertWithoutResetTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutResetTokensInput, Prisma.UserUpdateWithoutResetTokensInput>, Prisma.UserUncheckedUpdateWithoutResetTokensInput>;
};
export type UserCreateNestedOneWithoutVerificationTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutVerificationTokensInput, Prisma.UserUncheckedCreateWithoutVerificationTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutVerificationTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutVerificationTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutVerificationTokensInput, Prisma.UserUncheckedCreateWithoutVerificationTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutVerificationTokensInput;
    upsert?: Prisma.UserUpsertWithoutVerificationTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutVerificationTokensInput, Prisma.UserUpdateWithoutVerificationTokensInput>, Prisma.UserUncheckedUpdateWithoutVerificationTokensInput>;
};
export type UserCreateNestedOneWithoutHistoryEntriesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutHistoryEntriesInput, Prisma.UserUncheckedCreateWithoutHistoryEntriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutHistoryEntriesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutHistoryEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutHistoryEntriesInput, Prisma.UserUncheckedCreateWithoutHistoryEntriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutHistoryEntriesInput;
    upsert?: Prisma.UserUpsertWithoutHistoryEntriesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutHistoryEntriesInput, Prisma.UserUpdateWithoutHistoryEntriesInput>, Prisma.UserUncheckedUpdateWithoutHistoryEntriesInput>;
};
export type UserCreateNestedOneWithoutConversationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutConversationsInput, Prisma.UserUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutConversationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutConversationsInput, Prisma.UserUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutConversationsInput;
    upsert?: Prisma.UserUpsertWithoutConversationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutConversationsInput, Prisma.UserUpdateWithoutConversationsInput>, Prisma.UserUncheckedUpdateWithoutConversationsInput>;
};
export type UserCreateNestedOneWithoutExerciseAttemptsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExerciseAttemptsInput, Prisma.UserUncheckedCreateWithoutExerciseAttemptsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExerciseAttemptsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutExerciseAttemptsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExerciseAttemptsInput, Prisma.UserUncheckedCreateWithoutExerciseAttemptsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExerciseAttemptsInput;
    upsert?: Prisma.UserUpsertWithoutExerciseAttemptsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutExerciseAttemptsInput, Prisma.UserUpdateWithoutExerciseAttemptsInput>, Prisma.UserUncheckedUpdateWithoutExerciseAttemptsInput>;
};
export type UserCreateNestedOneWithoutProgressInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProgressInput, Prisma.UserUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProgressInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutProgressNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProgressInput, Prisma.UserUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProgressInput;
    upsert?: Prisma.UserUpsertWithoutProgressInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutProgressInput, Prisma.UserUpdateWithoutProgressInput>, Prisma.UserUncheckedUpdateWithoutProgressInput>;
};
export type UserCreateNestedOneWithoutModeratedExperiencesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutModeratedExperiencesInput, Prisma.UserUncheckedCreateWithoutModeratedExperiencesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutModeratedExperiencesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutExperiencesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExperiencesInput, Prisma.UserUncheckedCreateWithoutExperiencesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExperiencesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutModeratedExperiencesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutModeratedExperiencesInput, Prisma.UserUncheckedCreateWithoutModeratedExperiencesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutModeratedExperiencesInput;
    upsert?: Prisma.UserUpsertWithoutModeratedExperiencesInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutModeratedExperiencesInput, Prisma.UserUpdateWithoutModeratedExperiencesInput>, Prisma.UserUncheckedUpdateWithoutModeratedExperiencesInput>;
};
export type UserUpdateOneRequiredWithoutExperiencesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutExperiencesInput, Prisma.UserUncheckedCreateWithoutExperiencesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutExperiencesInput;
    upsert?: Prisma.UserUpsertWithoutExperiencesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutExperiencesInput, Prisma.UserUpdateWithoutExperiencesInput>, Prisma.UserUncheckedUpdateWithoutExperiencesInput>;
};
export type UserCreateNestedOneWithoutCommentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCommentsInput, Prisma.UserUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCommentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCommentsInput, Prisma.UserUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCommentsInput;
    upsert?: Prisma.UserUpsertWithoutCommentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput, Prisma.UserUpdateWithoutCommentsInput>, Prisma.UserUncheckedUpdateWithoutCommentsInput>;
};
export type UserCreateNestedOneWithoutReactionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReactionsInput, Prisma.UserUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReactionsInput, Prisma.UserUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReactionsInput;
    upsert?: Prisma.UserUpsertWithoutReactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutReactionsInput, Prisma.UserUpdateWithoutReactionsInput>, Prisma.UserUncheckedUpdateWithoutReactionsInput>;
};
export type UserCreateNestedOneWithoutReportsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReportsInput, Prisma.UserUncheckedCreateWithoutReportsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReportsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutReportsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReportsInput, Prisma.UserUncheckedCreateWithoutReportsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReportsInput;
    upsert?: Prisma.UserUpsertWithoutReportsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutReportsInput, Prisma.UserUpdateWithoutReportsInput>, Prisma.UserUncheckedUpdateWithoutReportsInput>;
};
export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.UserUpsertWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput, Prisma.UserUpdateWithoutNotificationsInput>, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserCreateNestedOneWithoutSubscriptionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionsInput, Prisma.UserUncheckedCreateWithoutSubscriptionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubscriptionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionsInput, Prisma.UserUncheckedCreateWithoutSubscriptionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSubscriptionsInput;
    upsert?: Prisma.UserUpsertWithoutSubscriptionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionsInput, Prisma.UserUpdateWithoutSubscriptionsInput>, Prisma.UserUncheckedUpdateWithoutSubscriptionsInput>;
};
export type UserCreateNestedOneWithoutAiUsagesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAiUsagesInput, Prisma.UserUncheckedCreateWithoutAiUsagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAiUsagesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutAiUsagesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAiUsagesInput, Prisma.UserUncheckedCreateWithoutAiUsagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAiUsagesInput;
    upsert?: Prisma.UserUpsertWithoutAiUsagesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAiUsagesInput, Prisma.UserUpdateWithoutAiUsagesInput>, Prisma.UserUncheckedUpdateWithoutAiUsagesInput>;
};
export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPaymentsInput, Prisma.UserUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPaymentsInput, Prisma.UserUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.UserUpsertWithoutPaymentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPaymentsInput, Prisma.UserUpdateWithoutPaymentsInput>, Prisma.UserUncheckedUpdateWithoutPaymentsInput>;
};
export type UserCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutSessionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
};
export type UserUpsertWithoutSessionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSessionsInput, Prisma.UserUncheckedCreateWithoutSessionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSessionsInput, Prisma.UserUncheckedUpdateWithoutSessionsInput>;
};
export type UserUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutResetTokensInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutResetTokensInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutResetTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutResetTokensInput, Prisma.UserUncheckedCreateWithoutResetTokensInput>;
};
export type UserUpsertWithoutResetTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutResetTokensInput, Prisma.UserUncheckedUpdateWithoutResetTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutResetTokensInput, Prisma.UserUncheckedCreateWithoutResetTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutResetTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutResetTokensInput, Prisma.UserUncheckedUpdateWithoutResetTokensInput>;
};
export type UserUpdateWithoutResetTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutResetTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutVerificationTokensInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutVerificationTokensInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutVerificationTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutVerificationTokensInput, Prisma.UserUncheckedCreateWithoutVerificationTokensInput>;
};
export type UserUpsertWithoutVerificationTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutVerificationTokensInput, Prisma.UserUncheckedUpdateWithoutVerificationTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutVerificationTokensInput, Prisma.UserUncheckedCreateWithoutVerificationTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutVerificationTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutVerificationTokensInput, Prisma.UserUncheckedUpdateWithoutVerificationTokensInput>;
};
export type UserUpdateWithoutVerificationTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutVerificationTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutHistoryEntriesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutHistoryEntriesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutHistoryEntriesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutHistoryEntriesInput, Prisma.UserUncheckedCreateWithoutHistoryEntriesInput>;
};
export type UserUpsertWithoutHistoryEntriesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutHistoryEntriesInput, Prisma.UserUncheckedUpdateWithoutHistoryEntriesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutHistoryEntriesInput, Prisma.UserUncheckedCreateWithoutHistoryEntriesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutHistoryEntriesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutHistoryEntriesInput, Prisma.UserUncheckedUpdateWithoutHistoryEntriesInput>;
};
export type UserUpdateWithoutHistoryEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutHistoryEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutConversationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutConversationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutConversationsInput, Prisma.UserUncheckedCreateWithoutConversationsInput>;
};
export type UserUpsertWithoutConversationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutConversationsInput, Prisma.UserUncheckedUpdateWithoutConversationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutConversationsInput, Prisma.UserUncheckedCreateWithoutConversationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutConversationsInput, Prisma.UserUncheckedUpdateWithoutConversationsInput>;
};
export type UserUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutExerciseAttemptsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutExerciseAttemptsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutExerciseAttemptsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutExerciseAttemptsInput, Prisma.UserUncheckedCreateWithoutExerciseAttemptsInput>;
};
export type UserUpsertWithoutExerciseAttemptsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutExerciseAttemptsInput, Prisma.UserUncheckedUpdateWithoutExerciseAttemptsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutExerciseAttemptsInput, Prisma.UserUncheckedCreateWithoutExerciseAttemptsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutExerciseAttemptsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutExerciseAttemptsInput, Prisma.UserUncheckedUpdateWithoutExerciseAttemptsInput>;
};
export type UserUpdateWithoutExerciseAttemptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutExerciseAttemptsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutProgressInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutProgressInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutProgressInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutProgressInput, Prisma.UserUncheckedCreateWithoutProgressInput>;
};
export type UserUpsertWithoutProgressInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutProgressInput, Prisma.UserUncheckedUpdateWithoutProgressInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutProgressInput, Prisma.UserUncheckedCreateWithoutProgressInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutProgressInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutProgressInput, Prisma.UserUncheckedUpdateWithoutProgressInput>;
};
export type UserUpdateWithoutProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutModeratedExperiencesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutModeratedExperiencesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutModeratedExperiencesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutModeratedExperiencesInput, Prisma.UserUncheckedCreateWithoutModeratedExperiencesInput>;
};
export type UserCreateWithoutExperiencesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutExperiencesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutExperiencesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutExperiencesInput, Prisma.UserUncheckedCreateWithoutExperiencesInput>;
};
export type UserUpsertWithoutModeratedExperiencesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutModeratedExperiencesInput, Prisma.UserUncheckedUpdateWithoutModeratedExperiencesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutModeratedExperiencesInput, Prisma.UserUncheckedCreateWithoutModeratedExperiencesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutModeratedExperiencesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutModeratedExperiencesInput, Prisma.UserUncheckedUpdateWithoutModeratedExperiencesInput>;
};
export type UserUpdateWithoutModeratedExperiencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutModeratedExperiencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserUpsertWithoutExperiencesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutExperiencesInput, Prisma.UserUncheckedUpdateWithoutExperiencesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutExperiencesInput, Prisma.UserUncheckedCreateWithoutExperiencesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutExperiencesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutExperiencesInput, Prisma.UserUncheckedUpdateWithoutExperiencesInput>;
};
export type UserUpdateWithoutExperiencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutExperiencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutCommentsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutCommentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCommentsInput, Prisma.UserUncheckedCreateWithoutCommentsInput>;
};
export type UserUpsertWithoutCommentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCommentsInput, Prisma.UserUncheckedUpdateWithoutCommentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCommentsInput, Prisma.UserUncheckedCreateWithoutCommentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCommentsInput, Prisma.UserUncheckedUpdateWithoutCommentsInput>;
};
export type UserUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutReactionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutReactionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutReactionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutReactionsInput, Prisma.UserUncheckedCreateWithoutReactionsInput>;
};
export type UserUpsertWithoutReactionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutReactionsInput, Prisma.UserUncheckedUpdateWithoutReactionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutReactionsInput, Prisma.UserUncheckedCreateWithoutReactionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutReactionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutReactionsInput, Prisma.UserUncheckedUpdateWithoutReactionsInput>;
};
export type UserUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutReportsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutReportsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutReportsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutReportsInput, Prisma.UserUncheckedCreateWithoutReportsInput>;
};
export type UserUpsertWithoutReportsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutReportsInput, Prisma.UserUncheckedUpdateWithoutReportsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutReportsInput, Prisma.UserUncheckedCreateWithoutReportsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutReportsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutReportsInput, Prisma.UserUncheckedUpdateWithoutReportsInput>;
};
export type UserUpdateWithoutReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutNotificationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
};
export type UserUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutSubscriptionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutSubscriptionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutSubscriptionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionsInput, Prisma.UserUncheckedCreateWithoutSubscriptionsInput>;
};
export type UserUpsertWithoutSubscriptionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSubscriptionsInput, Prisma.UserUncheckedUpdateWithoutSubscriptionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSubscriptionsInput, Prisma.UserUncheckedCreateWithoutSubscriptionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSubscriptionsInput, Prisma.UserUncheckedUpdateWithoutSubscriptionsInput>;
};
export type UserUpdateWithoutSubscriptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutSubscriptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutAiUsagesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutAiUsagesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutAiUsagesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAiUsagesInput, Prisma.UserUncheckedCreateWithoutAiUsagesInput>;
};
export type UserUpsertWithoutAiUsagesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAiUsagesInput, Prisma.UserUncheckedUpdateWithoutAiUsagesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAiUsagesInput, Prisma.UserUncheckedCreateWithoutAiUsagesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAiUsagesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAiUsagesInput, Prisma.UserUncheckedUpdateWithoutAiUsagesInput>;
};
export type UserUpdateWithoutAiUsagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutAiUsagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutPaymentsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    displayName?: string | null;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.UserRole;
    recoveryAnswerHash?: string | null;
    recoveryHint?: string | null;
    aiUsages?: Prisma.AIUsageUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedCreateNestedManyWithoutUserInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedCreateNestedManyWithoutUserInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutModeratorInput;
    experiences?: Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput;
    historyEntries?: Prisma.HistoryEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;
    progress?: Prisma.ProgressUncheckedCreateNestedManyWithoutUserInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutUserInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionUncheckedCreateNestedManyWithoutUserInput;
    subscriptions?: Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPaymentsInput, Prisma.UserUncheckedCreateWithoutPaymentsInput>;
};
export type UserUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPaymentsInput, Prisma.UserUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPaymentsInput, Prisma.UserUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPaymentsInput, Prisma.UserUncheckedUpdateWithoutPaymentsInput>;
};
export type UserUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    recoveryAnswerHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recoveryHint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    aiUsages?: Prisma.AIUsageUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput;
    verificationTokens?: Prisma.EmailVerificationTokenUncheckedUpdateManyWithoutUserNestedInput;
    exerciseAttempts?: Prisma.ExerciseAttemptUncheckedUpdateManyWithoutUserNestedInput;
    moderatedExperiences?: Prisma.ExperienceUncheckedUpdateManyWithoutModeratorNestedInput;
    experiences?: Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    historyEntries?: Prisma.HistoryEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    resetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput;
    progress?: Prisma.ProgressUncheckedUpdateManyWithoutUserNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutUserNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput;
    subscriptions?: Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    aiUsages: number;
    comments: number;
    conversations: number;
    verificationTokens: number;
    exerciseAttempts: number;
    moderatedExperiences: number;
    experiences: number;
    historyEntries: number;
    notifications: number;
    resetTokens: number;
    payments: number;
    progress: number;
    reactions: number;
    reports: number;
    sessions: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    aiUsages?: boolean | UserCountOutputTypeCountAiUsagesArgs;
    comments?: boolean | UserCountOutputTypeCountCommentsArgs;
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs;
    verificationTokens?: boolean | UserCountOutputTypeCountVerificationTokensArgs;
    exerciseAttempts?: boolean | UserCountOutputTypeCountExerciseAttemptsArgs;
    moderatedExperiences?: boolean | UserCountOutputTypeCountModeratedExperiencesArgs;
    experiences?: boolean | UserCountOutputTypeCountExperiencesArgs;
    historyEntries?: boolean | UserCountOutputTypeCountHistoryEntriesArgs;
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs;
    resetTokens?: boolean | UserCountOutputTypeCountResetTokensArgs;
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs;
    progress?: boolean | UserCountOutputTypeCountProgressArgs;
    reactions?: boolean | UserCountOutputTypeCountReactionsArgs;
    reports?: boolean | UserCountOutputTypeCountReportsArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAiUsagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AIUsageWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountVerificationTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailVerificationTokenWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountExerciseAttemptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExerciseAttemptWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountModeratedExperiencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExperienceWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountExperiencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExperienceWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountHistoryEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HistoryEntryWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PasswordResetTokenWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProgressWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountReactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReactionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    displayName?: boolean;
    emailVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    role?: boolean;
    recoveryAnswerHash?: boolean;
    recoveryHint?: boolean;
    aiUsages?: boolean | Prisma.User$aiUsagesArgs<ExtArgs>;
    comments?: boolean | Prisma.User$commentsArgs<ExtArgs>;
    conversations?: boolean | Prisma.User$conversationsArgs<ExtArgs>;
    verificationTokens?: boolean | Prisma.User$verificationTokensArgs<ExtArgs>;
    exerciseAttempts?: boolean | Prisma.User$exerciseAttemptsArgs<ExtArgs>;
    moderatedExperiences?: boolean | Prisma.User$moderatedExperiencesArgs<ExtArgs>;
    experiences?: boolean | Prisma.User$experiencesArgs<ExtArgs>;
    historyEntries?: boolean | Prisma.User$historyEntriesArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    resetTokens?: boolean | Prisma.User$resetTokensArgs<ExtArgs>;
    payments?: boolean | Prisma.User$paymentsArgs<ExtArgs>;
    progress?: boolean | Prisma.User$progressArgs<ExtArgs>;
    reactions?: boolean | Prisma.User$reactionsArgs<ExtArgs>;
    reports?: boolean | Prisma.User$reportsArgs<ExtArgs>;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    subscriptions?: boolean | Prisma.User$subscriptionsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    displayName?: boolean;
    emailVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    role?: boolean;
    recoveryAnswerHash?: boolean;
    recoveryHint?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    displayName?: boolean;
    emailVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    role?: boolean;
    recoveryAnswerHash?: boolean;
    recoveryHint?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    displayName?: boolean;
    emailVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    role?: boolean;
    recoveryAnswerHash?: boolean;
    recoveryHint?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "passwordHash" | "displayName" | "emailVerified" | "createdAt" | "updatedAt" | "role" | "recoveryAnswerHash" | "recoveryHint", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    aiUsages?: boolean | Prisma.User$aiUsagesArgs<ExtArgs>;
    comments?: boolean | Prisma.User$commentsArgs<ExtArgs>;
    conversations?: boolean | Prisma.User$conversationsArgs<ExtArgs>;
    verificationTokens?: boolean | Prisma.User$verificationTokensArgs<ExtArgs>;
    exerciseAttempts?: boolean | Prisma.User$exerciseAttemptsArgs<ExtArgs>;
    moderatedExperiences?: boolean | Prisma.User$moderatedExperiencesArgs<ExtArgs>;
    experiences?: boolean | Prisma.User$experiencesArgs<ExtArgs>;
    historyEntries?: boolean | Prisma.User$historyEntriesArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    resetTokens?: boolean | Prisma.User$resetTokensArgs<ExtArgs>;
    payments?: boolean | Prisma.User$paymentsArgs<ExtArgs>;
    progress?: boolean | Prisma.User$progressArgs<ExtArgs>;
    reactions?: boolean | Prisma.User$reactionsArgs<ExtArgs>;
    reports?: boolean | Prisma.User$reportsArgs<ExtArgs>;
    sessions?: boolean | Prisma.User$sessionsArgs<ExtArgs>;
    subscriptions?: boolean | Prisma.User$subscriptionsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        aiUsages: Prisma.$AIUsagePayload<ExtArgs>[];
        comments: Prisma.$CommentPayload<ExtArgs>[];
        conversations: Prisma.$ConversationPayload<ExtArgs>[];
        verificationTokens: Prisma.$EmailVerificationTokenPayload<ExtArgs>[];
        exerciseAttempts: Prisma.$ExerciseAttemptPayload<ExtArgs>[];
        moderatedExperiences: Prisma.$ExperiencePayload<ExtArgs>[];
        experiences: Prisma.$ExperiencePayload<ExtArgs>[];
        historyEntries: Prisma.$HistoryEntryPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        resetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[];
        payments: Prisma.$PaymentPayload<ExtArgs>[];
        progress: Prisma.$ProgressPayload<ExtArgs>[];
        reactions: Prisma.$ReactionPayload<ExtArgs>[];
        reports: Prisma.$ReportPayload<ExtArgs>[];
        sessions: Prisma.$SessionPayload<ExtArgs>[];
        subscriptions: Prisma.$SubscriptionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        passwordHash: string;
        displayName: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        role: $Enums.UserRole;
        recoveryAnswerHash: string | null;
        recoveryHint: string | null;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    aiUsages<T extends Prisma.User$aiUsagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$aiUsagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AIUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    comments<T extends Prisma.User$commentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    conversations<T extends Prisma.User$conversationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    verificationTokens<T extends Prisma.User$verificationTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$verificationTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailVerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    exerciseAttempts<T extends Prisma.User$exerciseAttemptsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$exerciseAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExerciseAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    moderatedExperiences<T extends Prisma.User$moderatedExperiencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$moderatedExperiencesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    experiences<T extends Prisma.User$experiencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$experiencesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    historyEntries<T extends Prisma.User$historyEntriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$historyEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HistoryEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.User$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    resetTokens<T extends Prisma.User$resetTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$resetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    payments<T extends Prisma.User$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    progress<T extends Prisma.User$progressArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$progressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reactions<T extends Prisma.User$reactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reports<T extends Prisma.User$reportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sessions<T extends Prisma.User$sessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    subscriptions<T extends Prisma.User$subscriptionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$subscriptionsArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly displayName: Prisma.FieldRef<"User", 'String'>;
    readonly emailVerified: Prisma.FieldRef<"User", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly recoveryAnswerHash: Prisma.FieldRef<"User", 'String'>;
    readonly recoveryHint: Prisma.FieldRef<"User", 'String'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.aiUsages
 */
export type User$aiUsagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsage
     */
    select?: Prisma.AIUsageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AIUsage
     */
    omit?: Prisma.AIUsageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AIUsageInclude<ExtArgs> | null;
    where?: Prisma.AIUsageWhereInput;
    orderBy?: Prisma.AIUsageOrderByWithRelationInput | Prisma.AIUsageOrderByWithRelationInput[];
    cursor?: Prisma.AIUsageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AIUsageScalarFieldEnum | Prisma.AIUsageScalarFieldEnum[];
};
/**
 * User.comments
 */
export type User$commentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: Prisma.CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
/**
 * User.conversations
 */
export type User$conversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Conversation
     */
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
/**
 * User.verificationTokens
 */
export type User$verificationTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailVerificationToken
     */
    select?: Prisma.EmailVerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EmailVerificationToken
     */
    omit?: Prisma.EmailVerificationTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EmailVerificationTokenInclude<ExtArgs> | null;
    where?: Prisma.EmailVerificationTokenWhereInput;
    orderBy?: Prisma.EmailVerificationTokenOrderByWithRelationInput | Prisma.EmailVerificationTokenOrderByWithRelationInput[];
    cursor?: Prisma.EmailVerificationTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailVerificationTokenScalarFieldEnum | Prisma.EmailVerificationTokenScalarFieldEnum[];
};
/**
 * User.exerciseAttempts
 */
export type User$exerciseAttemptsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseAttempt
     */
    select?: Prisma.ExerciseAttemptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseAttempt
     */
    omit?: Prisma.ExerciseAttemptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExerciseAttemptInclude<ExtArgs> | null;
    where?: Prisma.ExerciseAttemptWhereInput;
    orderBy?: Prisma.ExerciseAttemptOrderByWithRelationInput | Prisma.ExerciseAttemptOrderByWithRelationInput[];
    cursor?: Prisma.ExerciseAttemptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExerciseAttemptScalarFieldEnum | Prisma.ExerciseAttemptScalarFieldEnum[];
};
/**
 * User.moderatedExperiences
 */
export type User$moderatedExperiencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where?: Prisma.ExperienceWhereInput;
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    cursor?: Prisma.ExperienceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExperienceScalarFieldEnum | Prisma.ExperienceScalarFieldEnum[];
};
/**
 * User.experiences
 */
export type User$experiencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where?: Prisma.ExperienceWhereInput;
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    cursor?: Prisma.ExperienceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExperienceScalarFieldEnum | Prisma.ExperienceScalarFieldEnum[];
};
/**
 * User.historyEntries
 */
export type User$historyEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoryEntry
     */
    select?: Prisma.HistoryEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HistoryEntry
     */
    omit?: Prisma.HistoryEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HistoryEntryInclude<ExtArgs> | null;
    where?: Prisma.HistoryEntryWhereInput;
    orderBy?: Prisma.HistoryEntryOrderByWithRelationInput | Prisma.HistoryEntryOrderByWithRelationInput[];
    cursor?: Prisma.HistoryEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HistoryEntryScalarFieldEnum | Prisma.HistoryEntryScalarFieldEnum[];
};
/**
 * User.notifications
 */
export type User$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
/**
 * User.resetTokens
 */
export type User$resetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: Prisma.PasswordResetTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: Prisma.PasswordResetTokenOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PasswordResetTokenInclude<ExtArgs> | null;
    where?: Prisma.PasswordResetTokenWhereInput;
    orderBy?: Prisma.PasswordResetTokenOrderByWithRelationInput | Prisma.PasswordResetTokenOrderByWithRelationInput[];
    cursor?: Prisma.PasswordResetTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PasswordResetTokenScalarFieldEnum | Prisma.PasswordResetTokenScalarFieldEnum[];
};
/**
 * User.payments
 */
export type User$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
/**
 * User.progress
 */
export type User$progressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Progress
     */
    select?: Prisma.ProgressSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Progress
     */
    omit?: Prisma.ProgressOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProgressInclude<ExtArgs> | null;
    where?: Prisma.ProgressWhereInput;
    orderBy?: Prisma.ProgressOrderByWithRelationInput | Prisma.ProgressOrderByWithRelationInput[];
    cursor?: Prisma.ProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProgressScalarFieldEnum | Prisma.ProgressScalarFieldEnum[];
};
/**
 * User.reactions
 */
export type User$reactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: Prisma.ReactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Reaction
     */
    omit?: Prisma.ReactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReactionInclude<ExtArgs> | null;
    where?: Prisma.ReactionWhereInput;
    orderBy?: Prisma.ReactionOrderByWithRelationInput | Prisma.ReactionOrderByWithRelationInput[];
    cursor?: Prisma.ReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReactionScalarFieldEnum | Prisma.ReactionScalarFieldEnum[];
};
/**
 * User.reports
 */
export type User$reportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: Prisma.ReportSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Report
     */
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
/**
 * User.sessions
 */
export type User$sessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: Prisma.SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: Prisma.SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SessionInclude<ExtArgs> | null;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput | Prisma.SessionOrderByWithRelationInput[];
    cursor?: Prisma.SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionScalarFieldEnum | Prisma.SessionScalarFieldEnum[];
};
/**
 * User.subscriptions
 */
export type User$subscriptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subscription
     */
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionWhereInput;
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
//# sourceMappingURL=User.d.ts.map