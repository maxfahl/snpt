/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SnippetGroupSnippets
// ====================================================

export interface SnippetGroupSnippets_snippetGroup_snippets {
  id: number;
  name: string;
}

export interface SnippetGroupSnippets_snippetGroup {
  snippets: SnippetGroupSnippets_snippetGroup_snippets[] | null;
}

export interface SnippetGroupSnippets {
  snippetGroup: SnippetGroupSnippets_snippetGroup;
}

export interface SnippetGroupSnippetsVariables {
  snippetGroupId: number;
}
