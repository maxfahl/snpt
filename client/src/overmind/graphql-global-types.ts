/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateSnippetGroupInput {
  userId: number;
  name: string;
}

export interface CreateSnippetInput {
  userId: number;
  snippetGroupId: number;
  language: string;
  name: string;
  content: string;
}

export interface CreateSnippetVariableInput {
  key: string;
  value?: string | null;
}

export interface CreateSnippetVariableSetInput {
  name: string;
}

export interface UpdateSnippetGroupInput {
  name: string;
}

export interface UpdateSnippetInput {
  name?: string | null;
  content?: string | null;
}

export interface UpdateSnippetVariableInput {
  key: string;
  value: string;
}

export interface UpdateSnippetVariableSetInput {
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
