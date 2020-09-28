/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSnippet
// ====================================================

import { CreateSnippetInput } from "../../../graphql-global-types";

export interface CreateSnippet_createSnippet {
    id: number;
    name: string;
    content: string;
}

export interface CreateSnippet {
    createSnippet: CreateSnippet_createSnippet;
}

export interface CreateSnippetVariables {
    fields: CreateSnippetInput;
}
