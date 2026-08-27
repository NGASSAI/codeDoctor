import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Experience
 *
 */
export type ExperienceModel = runtime.Types.Result.DefaultSelection<Prisma.$ExperiencePayload>;
export type AggregateExperience = {
    _count: ExperienceCountAggregateOutputType | null;
    _min: ExperienceMinAggregateOutputType | null;
    _max: ExperienceMaxAggregateOutputType | null;
};
export type ExperienceMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    titre: string | null;
    probleme: string | null;
    code: string | null;
    cause: string | null;
    solution: string | null;
    technologie: string | null;
    categorie: $Enums.Category | null;
    statut: $Enums.ExperienceStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    moderatedAt: Date | null;
    moderatedBy: string | null;
};
export type ExperienceMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    titre: string | null;
    probleme: string | null;
    code: string | null;
    cause: string | null;
    solution: string | null;
    technologie: string | null;
    categorie: $Enums.Category | null;
    statut: $Enums.ExperienceStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    moderatedAt: Date | null;
    moderatedBy: string | null;
};
export type ExperienceCountAggregateOutputType = {
    id: number;
    userId: number;
    titre: number;
    probleme: number;
    code: number;
    cause: number;
    solution: number;
    technologie: number;
    categorie: number;
    statut: number;
    createdAt: number;
    updatedAt: number;
    moderatedAt: number;
    moderatedBy: number;
    _all: number;
};
export type ExperienceMinAggregateInputType = {
    id?: true;
    userId?: true;
    titre?: true;
    probleme?: true;
    code?: true;
    cause?: true;
    solution?: true;
    technologie?: true;
    categorie?: true;
    statut?: true;
    createdAt?: true;
    updatedAt?: true;
    moderatedAt?: true;
    moderatedBy?: true;
};
export type ExperienceMaxAggregateInputType = {
    id?: true;
    userId?: true;
    titre?: true;
    probleme?: true;
    code?: true;
    cause?: true;
    solution?: true;
    technologie?: true;
    categorie?: true;
    statut?: true;
    createdAt?: true;
    updatedAt?: true;
    moderatedAt?: true;
    moderatedBy?: true;
};
export type ExperienceCountAggregateInputType = {
    id?: true;
    userId?: true;
    titre?: true;
    probleme?: true;
    code?: true;
    cause?: true;
    solution?: true;
    technologie?: true;
    categorie?: true;
    statut?: true;
    createdAt?: true;
    updatedAt?: true;
    moderatedAt?: true;
    moderatedBy?: true;
    _all?: true;
};
export type ExperienceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Experience to aggregate.
     */
    where?: Prisma.ExperienceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Experiences to fetch.
     */
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ExperienceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Experiences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Experiences
    **/
    _count?: true | ExperienceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ExperienceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ExperienceMaxAggregateInputType;
};
export type GetExperienceAggregateType<T extends ExperienceAggregateArgs> = {
    [P in keyof T & keyof AggregateExperience]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExperience[P]> : Prisma.GetScalarType<T[P], AggregateExperience[P]>;
};
export type ExperienceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExperienceWhereInput;
    orderBy?: Prisma.ExperienceOrderByWithAggregationInput | Prisma.ExperienceOrderByWithAggregationInput[];
    by: Prisma.ExperienceScalarFieldEnum[] | Prisma.ExperienceScalarFieldEnum;
    having?: Prisma.ExperienceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExperienceCountAggregateInputType | true;
    _min?: ExperienceMinAggregateInputType;
    _max?: ExperienceMaxAggregateInputType;
};
export type ExperienceGroupByOutputType = {
    id: string;
    userId: string;
    titre: string;
    probleme: string;
    code: string | null;
    cause: string;
    solution: string;
    technologie: string | null;
    categorie: $Enums.Category;
    statut: $Enums.ExperienceStatus;
    createdAt: Date;
    updatedAt: Date;
    moderatedAt: Date | null;
    moderatedBy: string | null;
    _count: ExperienceCountAggregateOutputType | null;
    _min: ExperienceMinAggregateOutputType | null;
    _max: ExperienceMaxAggregateOutputType | null;
};
export type GetExperienceGroupByPayload<T extends ExperienceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExperienceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExperienceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExperienceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExperienceGroupByOutputType[P]>;
}>>;
export type ExperienceWhereInput = {
    AND?: Prisma.ExperienceWhereInput | Prisma.ExperienceWhereInput[];
    OR?: Prisma.ExperienceWhereInput[];
    NOT?: Prisma.ExperienceWhereInput | Prisma.ExperienceWhereInput[];
    id?: Prisma.StringFilter<"Experience"> | string;
    userId?: Prisma.StringFilter<"Experience"> | string;
    titre?: Prisma.StringFilter<"Experience"> | string;
    probleme?: Prisma.StringFilter<"Experience"> | string;
    code?: Prisma.StringNullableFilter<"Experience"> | string | null;
    cause?: Prisma.StringFilter<"Experience"> | string;
    solution?: Prisma.StringFilter<"Experience"> | string;
    technologie?: Prisma.StringNullableFilter<"Experience"> | string | null;
    categorie?: Prisma.EnumCategoryFilter<"Experience"> | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFilter<"Experience"> | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
    moderatedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    moderatedBy?: Prisma.StringNullableFilter<"Experience"> | string | null;
    comments?: Prisma.CommentListRelationFilter;
    moderator?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reactions?: Prisma.ReactionListRelationFilter;
    reports?: Prisma.ReportListRelationFilter;
};
export type ExperienceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    titre?: Prisma.SortOrder;
    probleme?: Prisma.SortOrder;
    code?: Prisma.SortOrderInput | Prisma.SortOrder;
    cause?: Prisma.SortOrder;
    solution?: Prisma.SortOrder;
    technologie?: Prisma.SortOrderInput | Prisma.SortOrder;
    categorie?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    moderatedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    comments?: Prisma.CommentOrderByRelationAggregateInput;
    moderator?: Prisma.UserOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    reactions?: Prisma.ReactionOrderByRelationAggregateInput;
    reports?: Prisma.ReportOrderByRelationAggregateInput;
};
export type ExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ExperienceWhereInput | Prisma.ExperienceWhereInput[];
    OR?: Prisma.ExperienceWhereInput[];
    NOT?: Prisma.ExperienceWhereInput | Prisma.ExperienceWhereInput[];
    userId?: Prisma.StringFilter<"Experience"> | string;
    titre?: Prisma.StringFilter<"Experience"> | string;
    probleme?: Prisma.StringFilter<"Experience"> | string;
    code?: Prisma.StringNullableFilter<"Experience"> | string | null;
    cause?: Prisma.StringFilter<"Experience"> | string;
    solution?: Prisma.StringFilter<"Experience"> | string;
    technologie?: Prisma.StringNullableFilter<"Experience"> | string | null;
    categorie?: Prisma.EnumCategoryFilter<"Experience"> | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFilter<"Experience"> | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
    moderatedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    moderatedBy?: Prisma.StringNullableFilter<"Experience"> | string | null;
    comments?: Prisma.CommentListRelationFilter;
    moderator?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reactions?: Prisma.ReactionListRelationFilter;
    reports?: Prisma.ReportListRelationFilter;
}, "id">;
export type ExperienceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    titre?: Prisma.SortOrder;
    probleme?: Prisma.SortOrder;
    code?: Prisma.SortOrderInput | Prisma.SortOrder;
    cause?: Prisma.SortOrder;
    solution?: Prisma.SortOrder;
    technologie?: Prisma.SortOrderInput | Prisma.SortOrder;
    categorie?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    moderatedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ExperienceCountOrderByAggregateInput;
    _max?: Prisma.ExperienceMaxOrderByAggregateInput;
    _min?: Prisma.ExperienceMinOrderByAggregateInput;
};
export type ExperienceScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExperienceScalarWhereWithAggregatesInput | Prisma.ExperienceScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExperienceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExperienceScalarWhereWithAggregatesInput | Prisma.ExperienceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    titre?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    probleme?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    code?: Prisma.StringNullableWithAggregatesFilter<"Experience"> | string | null;
    cause?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    solution?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    technologie?: Prisma.StringNullableWithAggregatesFilter<"Experience"> | string | null;
    categorie?: Prisma.EnumCategoryWithAggregatesFilter<"Experience"> | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusWithAggregatesFilter<"Experience"> | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Experience"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Experience"> | Date | string;
    moderatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Experience"> | Date | string | null;
    moderatedBy?: Prisma.StringNullableWithAggregatesFilter<"Experience"> | string | null;
};
export type ExperienceCreateInput = {
    id?: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    comments?: Prisma.CommentCreateNestedManyWithoutExperienceInput;
    moderator?: Prisma.UserCreateNestedOneWithoutModeratedExperiencesInput;
    user: Prisma.UserCreateNestedOneWithoutExperiencesInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportCreateNestedManyWithoutExperienceInput;
};
export type ExperienceUncheckedCreateInput = {
    id?: string;
    userId: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    moderatedBy?: string | null;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutExperienceInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutExperienceInput;
};
export type ExperienceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comments?: Prisma.CommentUpdateManyWithoutExperienceNestedInput;
    moderator?: Prisma.UserUpdateOneWithoutModeratedExperiencesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutExperiencesNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    moderatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutExperienceNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceCreateManyInput = {
    id?: string;
    userId: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    moderatedBy?: string | null;
};
export type ExperienceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExperienceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    moderatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ExperienceListRelationFilter = {
    every?: Prisma.ExperienceWhereInput;
    some?: Prisma.ExperienceWhereInput;
    none?: Prisma.ExperienceWhereInput;
};
export type ExperienceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExperienceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    titre?: Prisma.SortOrder;
    probleme?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    cause?: Prisma.SortOrder;
    solution?: Prisma.SortOrder;
    technologie?: Prisma.SortOrder;
    categorie?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrder;
    moderatedBy?: Prisma.SortOrder;
};
export type ExperienceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    titre?: Prisma.SortOrder;
    probleme?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    cause?: Prisma.SortOrder;
    solution?: Prisma.SortOrder;
    technologie?: Prisma.SortOrder;
    categorie?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrder;
    moderatedBy?: Prisma.SortOrder;
};
export type ExperienceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    titre?: Prisma.SortOrder;
    probleme?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    cause?: Prisma.SortOrder;
    solution?: Prisma.SortOrder;
    technologie?: Prisma.SortOrder;
    categorie?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    moderatedAt?: Prisma.SortOrder;
    moderatedBy?: Prisma.SortOrder;
};
export type ExperienceScalarRelationFilter = {
    is?: Prisma.ExperienceWhereInput;
    isNot?: Prisma.ExperienceWhereInput;
};
export type ExperienceCreateNestedManyWithoutModeratorInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutModeratorInput, Prisma.ExperienceUncheckedCreateWithoutModeratorInput> | Prisma.ExperienceCreateWithoutModeratorInput[] | Prisma.ExperienceUncheckedCreateWithoutModeratorInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutModeratorInput | Prisma.ExperienceCreateOrConnectWithoutModeratorInput[];
    createMany?: Prisma.ExperienceCreateManyModeratorInputEnvelope;
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
};
export type ExperienceCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput> | Prisma.ExperienceCreateWithoutUserInput[] | Prisma.ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutUserInput | Prisma.ExperienceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExperienceCreateManyUserInputEnvelope;
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
};
export type ExperienceUncheckedCreateNestedManyWithoutModeratorInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutModeratorInput, Prisma.ExperienceUncheckedCreateWithoutModeratorInput> | Prisma.ExperienceCreateWithoutModeratorInput[] | Prisma.ExperienceUncheckedCreateWithoutModeratorInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutModeratorInput | Prisma.ExperienceCreateOrConnectWithoutModeratorInput[];
    createMany?: Prisma.ExperienceCreateManyModeratorInputEnvelope;
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
};
export type ExperienceUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput> | Prisma.ExperienceCreateWithoutUserInput[] | Prisma.ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutUserInput | Prisma.ExperienceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExperienceCreateManyUserInputEnvelope;
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
};
export type ExperienceUpdateManyWithoutModeratorNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutModeratorInput, Prisma.ExperienceUncheckedCreateWithoutModeratorInput> | Prisma.ExperienceCreateWithoutModeratorInput[] | Prisma.ExperienceUncheckedCreateWithoutModeratorInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutModeratorInput | Prisma.ExperienceCreateOrConnectWithoutModeratorInput[];
    upsert?: Prisma.ExperienceUpsertWithWhereUniqueWithoutModeratorInput | Prisma.ExperienceUpsertWithWhereUniqueWithoutModeratorInput[];
    createMany?: Prisma.ExperienceCreateManyModeratorInputEnvelope;
    set?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    disconnect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    delete?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    update?: Prisma.ExperienceUpdateWithWhereUniqueWithoutModeratorInput | Prisma.ExperienceUpdateWithWhereUniqueWithoutModeratorInput[];
    updateMany?: Prisma.ExperienceUpdateManyWithWhereWithoutModeratorInput | Prisma.ExperienceUpdateManyWithWhereWithoutModeratorInput[];
    deleteMany?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
};
export type ExperienceUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput> | Prisma.ExperienceCreateWithoutUserInput[] | Prisma.ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutUserInput | Prisma.ExperienceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput | Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExperienceCreateManyUserInputEnvelope;
    set?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    disconnect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    delete?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    update?: Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput | Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExperienceUpdateManyWithWhereWithoutUserInput | Prisma.ExperienceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
};
export type ExperienceUncheckedUpdateManyWithoutModeratorNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutModeratorInput, Prisma.ExperienceUncheckedCreateWithoutModeratorInput> | Prisma.ExperienceCreateWithoutModeratorInput[] | Prisma.ExperienceUncheckedCreateWithoutModeratorInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutModeratorInput | Prisma.ExperienceCreateOrConnectWithoutModeratorInput[];
    upsert?: Prisma.ExperienceUpsertWithWhereUniqueWithoutModeratorInput | Prisma.ExperienceUpsertWithWhereUniqueWithoutModeratorInput[];
    createMany?: Prisma.ExperienceCreateManyModeratorInputEnvelope;
    set?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    disconnect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    delete?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    update?: Prisma.ExperienceUpdateWithWhereUniqueWithoutModeratorInput | Prisma.ExperienceUpdateWithWhereUniqueWithoutModeratorInput[];
    updateMany?: Prisma.ExperienceUpdateManyWithWhereWithoutModeratorInput | Prisma.ExperienceUpdateManyWithWhereWithoutModeratorInput[];
    deleteMany?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
};
export type ExperienceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput> | Prisma.ExperienceCreateWithoutUserInput[] | Prisma.ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutUserInput | Prisma.ExperienceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput | Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExperienceCreateManyUserInputEnvelope;
    set?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    disconnect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    delete?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    update?: Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput | Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExperienceUpdateManyWithWhereWithoutUserInput | Prisma.ExperienceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
};
export type EnumExperienceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExperienceStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type ExperienceCreateNestedOneWithoutCommentsInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutCommentsInput, Prisma.ExperienceUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutCommentsInput;
    connect?: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutCommentsInput, Prisma.ExperienceUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutCommentsInput;
    upsert?: Prisma.ExperienceUpsertWithoutCommentsInput;
    connect?: Prisma.ExperienceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExperienceUpdateToOneWithWhereWithoutCommentsInput, Prisma.ExperienceUpdateWithoutCommentsInput>, Prisma.ExperienceUncheckedUpdateWithoutCommentsInput>;
};
export type ExperienceCreateNestedOneWithoutReactionsInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutReactionsInput, Prisma.ExperienceUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutReactionsInput;
    connect?: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutReactionsInput, Prisma.ExperienceUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutReactionsInput;
    upsert?: Prisma.ExperienceUpsertWithoutReactionsInput;
    connect?: Prisma.ExperienceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExperienceUpdateToOneWithWhereWithoutReactionsInput, Prisma.ExperienceUpdateWithoutReactionsInput>, Prisma.ExperienceUncheckedUpdateWithoutReactionsInput>;
};
export type ExperienceCreateNestedOneWithoutReportsInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutReportsInput, Prisma.ExperienceUncheckedCreateWithoutReportsInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutReportsInput;
    connect?: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceUpdateOneRequiredWithoutReportsNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutReportsInput, Prisma.ExperienceUncheckedCreateWithoutReportsInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutReportsInput;
    upsert?: Prisma.ExperienceUpsertWithoutReportsInput;
    connect?: Prisma.ExperienceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExperienceUpdateToOneWithWhereWithoutReportsInput, Prisma.ExperienceUpdateWithoutReportsInput>, Prisma.ExperienceUncheckedUpdateWithoutReportsInput>;
};
export type ExperienceCreateWithoutModeratorInput = {
    id?: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    comments?: Prisma.CommentCreateNestedManyWithoutExperienceInput;
    user: Prisma.UserCreateNestedOneWithoutExperiencesInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportCreateNestedManyWithoutExperienceInput;
};
export type ExperienceUncheckedCreateWithoutModeratorInput = {
    id?: string;
    userId: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutExperienceInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutExperienceInput;
};
export type ExperienceCreateOrConnectWithoutModeratorInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutModeratorInput, Prisma.ExperienceUncheckedCreateWithoutModeratorInput>;
};
export type ExperienceCreateManyModeratorInputEnvelope = {
    data: Prisma.ExperienceCreateManyModeratorInput | Prisma.ExperienceCreateManyModeratorInput[];
    skipDuplicates?: boolean;
};
export type ExperienceCreateWithoutUserInput = {
    id?: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    comments?: Prisma.CommentCreateNestedManyWithoutExperienceInput;
    moderator?: Prisma.UserCreateNestedOneWithoutModeratedExperiencesInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportCreateNestedManyWithoutExperienceInput;
};
export type ExperienceUncheckedCreateWithoutUserInput = {
    id?: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    moderatedBy?: string | null;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutExperienceInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutExperienceInput;
};
export type ExperienceCreateOrConnectWithoutUserInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput>;
};
export type ExperienceCreateManyUserInputEnvelope = {
    data: Prisma.ExperienceCreateManyUserInput | Prisma.ExperienceCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ExperienceUpsertWithWhereUniqueWithoutModeratorInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExperienceUpdateWithoutModeratorInput, Prisma.ExperienceUncheckedUpdateWithoutModeratorInput>;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutModeratorInput, Prisma.ExperienceUncheckedCreateWithoutModeratorInput>;
};
export type ExperienceUpdateWithWhereUniqueWithoutModeratorInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateWithoutModeratorInput, Prisma.ExperienceUncheckedUpdateWithoutModeratorInput>;
};
export type ExperienceUpdateManyWithWhereWithoutModeratorInput = {
    where: Prisma.ExperienceScalarWhereInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateManyMutationInput, Prisma.ExperienceUncheckedUpdateManyWithoutModeratorInput>;
};
export type ExperienceScalarWhereInput = {
    AND?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
    OR?: Prisma.ExperienceScalarWhereInput[];
    NOT?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
    id?: Prisma.StringFilter<"Experience"> | string;
    userId?: Prisma.StringFilter<"Experience"> | string;
    titre?: Prisma.StringFilter<"Experience"> | string;
    probleme?: Prisma.StringFilter<"Experience"> | string;
    code?: Prisma.StringNullableFilter<"Experience"> | string | null;
    cause?: Prisma.StringFilter<"Experience"> | string;
    solution?: Prisma.StringFilter<"Experience"> | string;
    technologie?: Prisma.StringNullableFilter<"Experience"> | string | null;
    categorie?: Prisma.EnumCategoryFilter<"Experience"> | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFilter<"Experience"> | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
    moderatedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    moderatedBy?: Prisma.StringNullableFilter<"Experience"> | string | null;
};
export type ExperienceUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExperienceUpdateWithoutUserInput, Prisma.ExperienceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput>;
};
export type ExperienceUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateWithoutUserInput, Prisma.ExperienceUncheckedUpdateWithoutUserInput>;
};
export type ExperienceUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ExperienceScalarWhereInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateManyMutationInput, Prisma.ExperienceUncheckedUpdateManyWithoutUserInput>;
};
export type ExperienceCreateWithoutCommentsInput = {
    id?: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    moderator?: Prisma.UserCreateNestedOneWithoutModeratedExperiencesInput;
    user: Prisma.UserCreateNestedOneWithoutExperiencesInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportCreateNestedManyWithoutExperienceInput;
};
export type ExperienceUncheckedCreateWithoutCommentsInput = {
    id?: string;
    userId: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    moderatedBy?: string | null;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutExperienceInput;
};
export type ExperienceCreateOrConnectWithoutCommentsInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutCommentsInput, Prisma.ExperienceUncheckedCreateWithoutCommentsInput>;
};
export type ExperienceUpsertWithoutCommentsInput = {
    update: Prisma.XOR<Prisma.ExperienceUpdateWithoutCommentsInput, Prisma.ExperienceUncheckedUpdateWithoutCommentsInput>;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutCommentsInput, Prisma.ExperienceUncheckedCreateWithoutCommentsInput>;
    where?: Prisma.ExperienceWhereInput;
};
export type ExperienceUpdateToOneWithWhereWithoutCommentsInput = {
    where?: Prisma.ExperienceWhereInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateWithoutCommentsInput, Prisma.ExperienceUncheckedUpdateWithoutCommentsInput>;
};
export type ExperienceUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    moderator?: Prisma.UserUpdateOneWithoutModeratedExperiencesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutExperiencesNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    moderatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceCreateWithoutReactionsInput = {
    id?: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    comments?: Prisma.CommentCreateNestedManyWithoutExperienceInput;
    moderator?: Prisma.UserCreateNestedOneWithoutModeratedExperiencesInput;
    user: Prisma.UserCreateNestedOneWithoutExperiencesInput;
    reports?: Prisma.ReportCreateNestedManyWithoutExperienceInput;
};
export type ExperienceUncheckedCreateWithoutReactionsInput = {
    id?: string;
    userId: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    moderatedBy?: string | null;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutExperienceInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutExperienceInput;
};
export type ExperienceCreateOrConnectWithoutReactionsInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutReactionsInput, Prisma.ExperienceUncheckedCreateWithoutReactionsInput>;
};
export type ExperienceUpsertWithoutReactionsInput = {
    update: Prisma.XOR<Prisma.ExperienceUpdateWithoutReactionsInput, Prisma.ExperienceUncheckedUpdateWithoutReactionsInput>;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutReactionsInput, Prisma.ExperienceUncheckedCreateWithoutReactionsInput>;
    where?: Prisma.ExperienceWhereInput;
};
export type ExperienceUpdateToOneWithWhereWithoutReactionsInput = {
    where?: Prisma.ExperienceWhereInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateWithoutReactionsInput, Prisma.ExperienceUncheckedUpdateWithoutReactionsInput>;
};
export type ExperienceUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comments?: Prisma.CommentUpdateManyWithoutExperienceNestedInput;
    moderator?: Prisma.UserUpdateOneWithoutModeratedExperiencesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutExperiencesNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    moderatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceCreateWithoutReportsInput = {
    id?: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    comments?: Prisma.CommentCreateNestedManyWithoutExperienceInput;
    moderator?: Prisma.UserCreateNestedOneWithoutModeratedExperiencesInput;
    user: Prisma.UserCreateNestedOneWithoutExperiencesInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutExperienceInput;
};
export type ExperienceUncheckedCreateWithoutReportsInput = {
    id?: string;
    userId: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    moderatedBy?: string | null;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutExperienceInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutExperienceInput;
};
export type ExperienceCreateOrConnectWithoutReportsInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutReportsInput, Prisma.ExperienceUncheckedCreateWithoutReportsInput>;
};
export type ExperienceUpsertWithoutReportsInput = {
    update: Prisma.XOR<Prisma.ExperienceUpdateWithoutReportsInput, Prisma.ExperienceUncheckedUpdateWithoutReportsInput>;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutReportsInput, Prisma.ExperienceUncheckedCreateWithoutReportsInput>;
    where?: Prisma.ExperienceWhereInput;
};
export type ExperienceUpdateToOneWithWhereWithoutReportsInput = {
    where?: Prisma.ExperienceWhereInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateWithoutReportsInput, Prisma.ExperienceUncheckedUpdateWithoutReportsInput>;
};
export type ExperienceUpdateWithoutReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comments?: Prisma.CommentUpdateManyWithoutExperienceNestedInput;
    moderator?: Prisma.UserUpdateOneWithoutModeratedExperiencesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutExperiencesNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateWithoutReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    moderatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutExperienceNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceCreateManyModeratorInput = {
    id?: string;
    userId: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
};
export type ExperienceCreateManyUserInput = {
    id?: string;
    titre: string;
    probleme: string;
    code?: string | null;
    cause: string;
    solution: string;
    technologie?: string | null;
    categorie: $Enums.Category;
    statut?: $Enums.ExperienceStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    moderatedAt?: Date | string | null;
    moderatedBy?: string | null;
};
export type ExperienceUpdateWithoutModeratorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comments?: Prisma.CommentUpdateManyWithoutExperienceNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutExperiencesNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateWithoutModeratorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutExperienceNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateManyWithoutModeratorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ExperienceUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    comments?: Prisma.CommentUpdateManyWithoutExperienceNestedInput;
    moderator?: Prisma.UserUpdateOneWithoutModeratedExperiencesNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    moderatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutExperienceNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutExperienceNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.StringFieldUpdateOperationsInput | string;
    probleme?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cause?: Prisma.StringFieldUpdateOperationsInput | string;
    solution?: Prisma.StringFieldUpdateOperationsInput | string;
    technologie?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorie?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    statut?: Prisma.EnumExperienceStatusFieldUpdateOperationsInput | $Enums.ExperienceStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    moderatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
/**
 * Count Type ExperienceCountOutputType
 */
export type ExperienceCountOutputType = {
    comments: number;
    reactions: number;
    reports: number;
};
export type ExperienceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    comments?: boolean | ExperienceCountOutputTypeCountCommentsArgs;
    reactions?: boolean | ExperienceCountOutputTypeCountReactionsArgs;
    reports?: boolean | ExperienceCountOutputTypeCountReportsArgs;
};
/**
 * ExperienceCountOutputType without action
 */
export type ExperienceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperienceCountOutputType
     */
    select?: Prisma.ExperienceCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ExperienceCountOutputType without action
 */
export type ExperienceCountOutputTypeCountCommentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
};
/**
 * ExperienceCountOutputType without action
 */
export type ExperienceCountOutputTypeCountReactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReactionWhereInput;
};
/**
 * ExperienceCountOutputType without action
 */
export type ExperienceCountOutputTypeCountReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
};
export type ExperienceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    titre?: boolean;
    probleme?: boolean;
    code?: boolean;
    cause?: boolean;
    solution?: boolean;
    technologie?: boolean;
    categorie?: boolean;
    statut?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    moderatedAt?: boolean;
    moderatedBy?: boolean;
    comments?: boolean | Prisma.Experience$commentsArgs<ExtArgs>;
    moderator?: boolean | Prisma.Experience$moderatorArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reactions?: boolean | Prisma.Experience$reactionsArgs<ExtArgs>;
    reports?: boolean | Prisma.Experience$reportsArgs<ExtArgs>;
    _count?: boolean | Prisma.ExperienceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["experience"]>;
export type ExperienceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    titre?: boolean;
    probleme?: boolean;
    code?: boolean;
    cause?: boolean;
    solution?: boolean;
    technologie?: boolean;
    categorie?: boolean;
    statut?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    moderatedAt?: boolean;
    moderatedBy?: boolean;
    moderator?: boolean | Prisma.Experience$moderatorArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["experience"]>;
export type ExperienceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    titre?: boolean;
    probleme?: boolean;
    code?: boolean;
    cause?: boolean;
    solution?: boolean;
    technologie?: boolean;
    categorie?: boolean;
    statut?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    moderatedAt?: boolean;
    moderatedBy?: boolean;
    moderator?: boolean | Prisma.Experience$moderatorArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["experience"]>;
export type ExperienceSelectScalar = {
    id?: boolean;
    userId?: boolean;
    titre?: boolean;
    probleme?: boolean;
    code?: boolean;
    cause?: boolean;
    solution?: boolean;
    technologie?: boolean;
    categorie?: boolean;
    statut?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    moderatedAt?: boolean;
    moderatedBy?: boolean;
};
export type ExperienceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "titre" | "probleme" | "code" | "cause" | "solution" | "technologie" | "categorie" | "statut" | "createdAt" | "updatedAt" | "moderatedAt" | "moderatedBy", ExtArgs["result"]["experience"]>;
export type ExperienceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    comments?: boolean | Prisma.Experience$commentsArgs<ExtArgs>;
    moderator?: boolean | Prisma.Experience$moderatorArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reactions?: boolean | Prisma.Experience$reactionsArgs<ExtArgs>;
    reports?: boolean | Prisma.Experience$reportsArgs<ExtArgs>;
    _count?: boolean | Prisma.ExperienceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ExperienceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    moderator?: boolean | Prisma.Experience$moderatorArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ExperienceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    moderator?: boolean | Prisma.Experience$moderatorArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ExperiencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Experience";
    objects: {
        comments: Prisma.$CommentPayload<ExtArgs>[];
        moderator: Prisma.$UserPayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs>;
        reactions: Prisma.$ReactionPayload<ExtArgs>[];
        reports: Prisma.$ReportPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        titre: string;
        probleme: string;
        code: string | null;
        cause: string;
        solution: string;
        technologie: string | null;
        categorie: $Enums.Category;
        statut: $Enums.ExperienceStatus;
        createdAt: Date;
        updatedAt: Date;
        moderatedAt: Date | null;
        moderatedBy: string | null;
    }, ExtArgs["result"]["experience"]>;
    composites: {};
};
export type ExperienceGetPayload<S extends boolean | null | undefined | ExperienceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExperiencePayload, S>;
export type ExperienceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExperienceCountAggregateInputType | true;
};
export interface ExperienceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Experience'];
        meta: {
            name: 'Experience';
        };
    };
    /**
     * Find zero or one Experience that matches the filter.
     * @param {ExperienceFindUniqueArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperienceFindUniqueArgs>(args: Prisma.SelectSubset<T, ExperienceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Experience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperienceFindUniqueOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperienceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Experience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperienceFindFirstArgs>(args?: Prisma.SelectSubset<T, ExperienceFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Experience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperienceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Experiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Experiences
     * const experiences = await prisma.experience.findMany()
     *
     * // Get first 10 Experiences
     * const experiences = await prisma.experience.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const experienceWithIdOnly = await prisma.experience.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ExperienceFindManyArgs>(args?: Prisma.SelectSubset<T, ExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Experience.
     * @param {ExperienceCreateArgs} args - Arguments to create a Experience.
     * @example
     * // Create one Experience
     * const Experience = await prisma.experience.create({
     *   data: {
     *     // ... data to create a Experience
     *   }
     * })
     *
     */
    create<T extends ExperienceCreateArgs>(args: Prisma.SelectSubset<T, ExperienceCreateArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Experiences.
     * @param {ExperienceCreateManyArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ExperienceCreateManyArgs>(args?: Prisma.SelectSubset<T, ExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Experiences and returns the data saved in the database.
     * @param {ExperienceCreateManyAndReturnArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ExperienceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Experience.
     * @param {ExperienceDeleteArgs} args - Arguments to delete one Experience.
     * @example
     * // Delete one Experience
     * const Experience = await prisma.experience.delete({
     *   where: {
     *     // ... filter to delete one Experience
     *   }
     * })
     *
     */
    delete<T extends ExperienceDeleteArgs>(args: Prisma.SelectSubset<T, ExperienceDeleteArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Experience.
     * @param {ExperienceUpdateArgs} args - Arguments to update one Experience.
     * @example
     * // Update one Experience
     * const experience = await prisma.experience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ExperienceUpdateArgs>(args: Prisma.SelectSubset<T, ExperienceUpdateArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Experiences.
     * @param {ExperienceDeleteManyArgs} args - Arguments to filter Experiences to delete.
     * @example
     * // Delete a few Experiences
     * const { count } = await prisma.experience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ExperienceDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ExperienceUpdateManyArgs>(args: Prisma.SelectSubset<T, ExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Experiences and returns the data updated in the database.
     * @param {ExperienceUpdateManyAndReturnArgs} args - Arguments to update many Experiences.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.updateManyAndReturn({
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
    updateManyAndReturn<T extends ExperienceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Experience.
     * @param {ExperienceUpsertArgs} args - Arguments to update or create a Experience.
     * @example
     * // Update or create a Experience
     * const experience = await prisma.experience.upsert({
     *   create: {
     *     // ... data to create a Experience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Experience we want to update
     *   }
     * })
     */
    upsert<T extends ExperienceUpsertArgs>(args: Prisma.SelectSubset<T, ExperienceUpsertArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceCountArgs} args - Arguments to filter Experiences to count.
     * @example
     * // Count the number of Experiences
     * const count = await prisma.experience.count({
     *   where: {
     *     // ... the filter for the Experiences we want to count
     *   }
     * })
    **/
    count<T extends ExperienceCountArgs>(args?: Prisma.Subset<T, ExperienceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExperienceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExperienceAggregateArgs>(args: Prisma.Subset<T, ExperienceAggregateArgs>): Prisma.PrismaPromise<GetExperienceAggregateType<T>>;
    /**
     * Group by Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ExperienceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExperienceGroupByArgs['orderBy'];
    } : {
        orderBy?: ExperienceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Experience model
     */
    readonly fields: ExperienceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Experience.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ExperienceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    comments<T extends Prisma.Experience$commentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Experience$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    moderator<T extends Prisma.Experience$moderatorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Experience$moderatorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reactions<T extends Prisma.Experience$reactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Experience$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reports<T extends Prisma.Experience$reportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Experience$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Experience model
 */
export interface ExperienceFieldRefs {
    readonly id: Prisma.FieldRef<"Experience", 'String'>;
    readonly userId: Prisma.FieldRef<"Experience", 'String'>;
    readonly titre: Prisma.FieldRef<"Experience", 'String'>;
    readonly probleme: Prisma.FieldRef<"Experience", 'String'>;
    readonly code: Prisma.FieldRef<"Experience", 'String'>;
    readonly cause: Prisma.FieldRef<"Experience", 'String'>;
    readonly solution: Prisma.FieldRef<"Experience", 'String'>;
    readonly technologie: Prisma.FieldRef<"Experience", 'String'>;
    readonly categorie: Prisma.FieldRef<"Experience", 'Category'>;
    readonly statut: Prisma.FieldRef<"Experience", 'ExperienceStatus'>;
    readonly createdAt: Prisma.FieldRef<"Experience", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Experience", 'DateTime'>;
    readonly moderatedAt: Prisma.FieldRef<"Experience", 'DateTime'>;
    readonly moderatedBy: Prisma.FieldRef<"Experience", 'String'>;
}
/**
 * Experience findUnique
 */
export type ExperienceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Experience to fetch.
     */
    where: Prisma.ExperienceWhereUniqueInput;
};
/**
 * Experience findUniqueOrThrow
 */
export type ExperienceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Experience to fetch.
     */
    where: Prisma.ExperienceWhereUniqueInput;
};
/**
 * Experience findFirst
 */
export type ExperienceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Experience to fetch.
     */
    where?: Prisma.ExperienceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Experiences to fetch.
     */
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Experiences.
     */
    cursor?: Prisma.ExperienceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Experiences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Experiences.
     */
    distinct?: Prisma.ExperienceScalarFieldEnum | Prisma.ExperienceScalarFieldEnum[];
};
/**
 * Experience findFirstOrThrow
 */
export type ExperienceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Experience to fetch.
     */
    where?: Prisma.ExperienceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Experiences to fetch.
     */
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Experiences.
     */
    cursor?: Prisma.ExperienceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Experiences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Experiences.
     */
    distinct?: Prisma.ExperienceScalarFieldEnum | Prisma.ExperienceScalarFieldEnum[];
};
/**
 * Experience findMany
 */
export type ExperienceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Experiences to fetch.
     */
    where?: Prisma.ExperienceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Experiences to fetch.
     */
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Experiences.
     */
    cursor?: Prisma.ExperienceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Experiences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Experiences.
     */
    distinct?: Prisma.ExperienceScalarFieldEnum | Prisma.ExperienceScalarFieldEnum[];
};
/**
 * Experience create
 */
export type ExperienceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Experience.
     */
    data: Prisma.XOR<Prisma.ExperienceCreateInput, Prisma.ExperienceUncheckedCreateInput>;
};
/**
 * Experience createMany
 */
export type ExperienceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Experiences.
     */
    data: Prisma.ExperienceCreateManyInput | Prisma.ExperienceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Experience createManyAndReturn
 */
export type ExperienceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: Prisma.ExperienceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    /**
     * The data used to create many Experiences.
     */
    data: Prisma.ExperienceCreateManyInput | Prisma.ExperienceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExperienceIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Experience update
 */
export type ExperienceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Experience.
     */
    data: Prisma.XOR<Prisma.ExperienceUpdateInput, Prisma.ExperienceUncheckedUpdateInput>;
    /**
     * Choose, which Experience to update.
     */
    where: Prisma.ExperienceWhereUniqueInput;
};
/**
 * Experience updateMany
 */
export type ExperienceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Experiences.
     */
    data: Prisma.XOR<Prisma.ExperienceUpdateManyMutationInput, Prisma.ExperienceUncheckedUpdateManyInput>;
    /**
     * Filter which Experiences to update
     */
    where?: Prisma.ExperienceWhereInput;
    /**
     * Limit how many Experiences to update.
     */
    limit?: number;
};
/**
 * Experience updateManyAndReturn
 */
export type ExperienceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: Prisma.ExperienceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    /**
     * The data used to update Experiences.
     */
    data: Prisma.XOR<Prisma.ExperienceUpdateManyMutationInput, Prisma.ExperienceUncheckedUpdateManyInput>;
    /**
     * Filter which Experiences to update
     */
    where?: Prisma.ExperienceWhereInput;
    /**
     * Limit how many Experiences to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExperienceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Experience upsert
 */
export type ExperienceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Experience to update in case it exists.
     */
    where: Prisma.ExperienceWhereUniqueInput;
    /**
     * In case the Experience found by the `where` argument doesn't exist, create a new Experience with this data.
     */
    create: Prisma.XOR<Prisma.ExperienceCreateInput, Prisma.ExperienceUncheckedCreateInput>;
    /**
     * In case the Experience was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ExperienceUpdateInput, Prisma.ExperienceUncheckedUpdateInput>;
};
/**
 * Experience delete
 */
export type ExperienceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Experience to delete.
     */
    where: Prisma.ExperienceWhereUniqueInput;
};
/**
 * Experience deleteMany
 */
export type ExperienceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Experiences to delete
     */
    where?: Prisma.ExperienceWhereInput;
    /**
     * Limit how many Experiences to delete.
     */
    limit?: number;
};
/**
 * Experience.comments
 */
export type Experience$commentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Experience.moderator
 */
export type Experience$moderatorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.UserWhereInput;
};
/**
 * Experience.reactions
 */
export type Experience$reactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Experience.reports
 */
export type Experience$reportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Experience without action
 */
export type ExperienceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=Experience.d.ts.map