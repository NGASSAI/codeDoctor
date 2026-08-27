import * as $Enums from "./enums";
import type * as Prisma from "./internal/prismaNamespace";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type EnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | Prisma.EnumCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.Category[] | Prisma.ListEnumCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Category[] | Prisma.ListEnumCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category;
};
export type EnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | Prisma.EnumSeverityFieldRefInput<$PrismaModel>;
    in?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity;
};
export type EnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | Prisma.EnumCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.Category[] | Prisma.ListEnumCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Category[] | Prisma.ListEnumCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCategoryFilter<$PrismaModel>;
};
export type EnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | Prisma.EnumSeverityFieldRefInput<$PrismaModel>;
    in?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeverityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeverityFilter<$PrismaModel>;
};
export type EnumSeverityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | Prisma.EnumSeverityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumSeverityNullableFilter<$PrismaModel> | $Enums.Severity | null;
};
export type EnumSeverityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | Prisma.EnumSeverityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumSeverityNullableWithAggregatesFilter<$PrismaModel> | $Enums.Severity | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeverityNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeverityNullableFilter<$PrismaModel>;
};
export type EnumMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | Prisma.EnumMessageRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageRole[] | Prisma.ListEnumMessageRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MessageRole[] | Prisma.ListEnumMessageRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMessageRoleFilter<$PrismaModel> | $Enums.MessageRole;
};
export type EnumMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | Prisma.EnumMessageRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageRole[] | Prisma.ListEnumMessageRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MessageRole[] | Prisma.ListEnumMessageRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.MessageRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMessageRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMessageRoleFilter<$PrismaModel>;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type EnumExperienceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceStatus | Prisma.EnumExperienceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExperienceStatus[] | Prisma.ListEnumExperienceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExperienceStatus[] | Prisma.ListEnumExperienceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExperienceStatusFilter<$PrismaModel> | $Enums.ExperienceStatus;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type EnumExperienceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceStatus | Prisma.EnumExperienceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExperienceStatus[] | Prisma.ListEnumExperienceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExperienceStatus[] | Prisma.ListEnumExperienceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExperienceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumExperienceStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumExperienceStatusFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type EnumReactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReactionType | Prisma.EnumReactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel> | $Enums.ReactionType;
};
export type EnumReactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReactionType | Prisma.EnumReactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel>;
};
export type EnumReportReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportReason | Prisma.EnumReportReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportReasonFilter<$PrismaModel> | $Enums.ReportReason;
};
export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus;
};
export type EnumReportReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportReason | Prisma.EnumReportReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportReasonWithAggregatesFilter<$PrismaModel> | $Enums.ReportReason;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportReasonFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportReasonFilter<$PrismaModel>;
};
export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
};
export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type NestedEnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | Prisma.EnumCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.Category[] | Prisma.ListEnumCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Category[] | Prisma.ListEnumCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category;
};
export type NestedEnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | Prisma.EnumSeverityFieldRefInput<$PrismaModel>;
    in?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity;
};
export type NestedEnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | Prisma.EnumCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.Category[] | Prisma.ListEnumCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Category[] | Prisma.ListEnumCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCategoryFilter<$PrismaModel>;
};
export type NestedEnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | Prisma.EnumSeverityFieldRefInput<$PrismaModel>;
    in?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeverityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeverityFilter<$PrismaModel>;
};
export type NestedEnumSeverityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | Prisma.EnumSeverityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumSeverityNullableFilter<$PrismaModel> | $Enums.Severity | null;
};
export type NestedEnumSeverityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | Prisma.EnumSeverityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Severity[] | Prisma.ListEnumSeverityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumSeverityNullableWithAggregatesFilter<$PrismaModel> | $Enums.Severity | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeverityNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeverityNullableFilter<$PrismaModel>;
};
export type NestedEnumMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | Prisma.EnumMessageRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageRole[] | Prisma.ListEnumMessageRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MessageRole[] | Prisma.ListEnumMessageRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMessageRoleFilter<$PrismaModel> | $Enums.MessageRole;
};
export type NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | Prisma.EnumMessageRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageRole[] | Prisma.ListEnumMessageRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MessageRole[] | Prisma.ListEnumMessageRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.MessageRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMessageRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMessageRoleFilter<$PrismaModel>;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedEnumExperienceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceStatus | Prisma.EnumExperienceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExperienceStatus[] | Prisma.ListEnumExperienceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExperienceStatus[] | Prisma.ListEnumExperienceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExperienceStatusFilter<$PrismaModel> | $Enums.ExperienceStatus;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedEnumExperienceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceStatus | Prisma.EnumExperienceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ExperienceStatus[] | Prisma.ListEnumExperienceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ExperienceStatus[] | Prisma.ListEnumExperienceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumExperienceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumExperienceStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumExperienceStatusFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedEnumReactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReactionType | Prisma.EnumReactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel> | $Enums.ReactionType;
};
export type NestedEnumReactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReactionType | Prisma.EnumReactionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReactionType[] | Prisma.ListEnumReactionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReactionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReactionTypeFilter<$PrismaModel>;
};
export type NestedEnumReportReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportReason | Prisma.EnumReportReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportReasonFilter<$PrismaModel> | $Enums.ReportReason;
};
export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus;
};
export type NestedEnumReportReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportReason | Prisma.EnumReportReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportReason[] | Prisma.ListEnumReportReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportReasonWithAggregatesFilter<$PrismaModel> | $Enums.ReportReason;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportReasonFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportReasonFilter<$PrismaModel>;
};
export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | Prisma.EnumReportStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ReportStatus[] | Prisma.ListEnumReportStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumReportStatusFilter<$PrismaModel>;
};
export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType;
};
export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | Prisma.EnumNotificationTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationType[] | Prisma.ListEnumNotificationTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTypeFilter<$PrismaModel>;
};
//# sourceMappingURL=commonInputTypes.d.ts.map