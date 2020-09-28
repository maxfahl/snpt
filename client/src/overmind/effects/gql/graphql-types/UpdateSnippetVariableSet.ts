/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSnippetVariableSetInput } from "./../../../graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateSnippetVariableSet
// ====================================================

export interface UpdateSnippetVariableSet_updateSnippetVariableSet {
    id: number;
    name: string;
}

export interface UpdateSnippetVariableSet {
    updateSnippetVariableSet: UpdateSnippetVariableSet_updateSnippetVariableSet;
}

export interface UpdateSnippetVariableSetVariables {
    snippetVariableSetId: number;
    fields: UpdateSnippetVariableSetInput;
}
