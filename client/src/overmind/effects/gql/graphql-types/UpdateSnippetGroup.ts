/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSnippetGroupInput } from "./../../../graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateSnippetGroup
// ====================================================

export interface UpdateSnippetGroup_updateSnippetGroup {
    id: number;
    name: string;
}

export interface UpdateSnippetGroup {
    updateSnippetGroup: UpdateSnippetGroup_updateSnippetGroup;
}

export interface UpdateSnippetGroupVariables {
    snippetGroupId: number;
    fields: UpdateSnippetGroupInput;
}
