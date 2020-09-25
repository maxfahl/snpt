/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSnippetVariableInput } from "./../../../graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateMultipleSnippetVariables
// ====================================================

export interface CreateMultipleSnippetVariables_createMultipleSnippetVariables {
  id: number;
  key: string;
  value: string | null;
}

export interface CreateMultipleSnippetVariables {
  createMultipleSnippetVariables: CreateMultipleSnippetVariables_createMultipleSnippetVariables[] | null;
}

export interface CreateMultipleSnippetVariablesVariables {
  snippetVariableSetId: number;
  variablesArray: (CreateSnippetVariableInput | null)[];
}
