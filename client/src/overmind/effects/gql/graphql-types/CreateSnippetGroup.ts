/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSnippetGroupInput } from "./../../../graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateSnippetGroup
// ====================================================

export interface CreateSnippetGroup_createSnippetGroup {
  id: number;
  name: string;
}

export interface CreateSnippetGroup {
  createSnippetGroup: CreateSnippetGroup_createSnippetGroup;
}

export interface CreateSnippetGroupVariables {
  fields: CreateSnippetGroupInput;
}
