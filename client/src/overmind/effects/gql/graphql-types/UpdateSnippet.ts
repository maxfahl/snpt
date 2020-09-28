/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSnippetInput } from "./../../../graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateSnippet
// ====================================================

export interface UpdateSnippet_updateSnippet {
    id: number;
    name: string;
    content: string;
}

export interface UpdateSnippet {
    updateSnippet: UpdateSnippet_updateSnippet;
}

export interface UpdateSnippetVariables {
    snippetId: number;
    fields: UpdateSnippetInput;
}
