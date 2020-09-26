/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Snippet
// ====================================================

export interface Snippet_snippet_snippetVariableSets {
  id: number;
  name: string;
}

export interface Snippet_snippet {
  id: number;
  name: string;
  language: string;
  content: string;
  snippetVariableSets: (Snippet_snippet_snippetVariableSets | null)[] | null;
}

export interface Snippet {
  snippet: Snippet_snippet;
}

export interface SnippetVariables {
  snippetId: number;
}
