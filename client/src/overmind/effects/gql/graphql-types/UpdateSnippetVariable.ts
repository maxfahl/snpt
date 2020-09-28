/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSnippetVariableInput } from "./../../../graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateSnippetVariable
// ====================================================

export interface UpdateSnippetVariable_updateSnippetVariable {
    id: number;
    key: string;
    value: string | null;
}

export interface UpdateSnippetVariable {
    updateSnippetVariable: UpdateSnippetVariable_updateSnippetVariable;
}

export interface UpdateSnippetVariableVariables {
    snippetVariableId: number;
    fields: UpdateSnippetVariableInput;
}
