/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserSnippetGroups
// ====================================================

export interface UserSnippetGroups_user_snippetGroups {
  id: number;
  name: string;
}

export interface UserSnippetGroups_user {
  snippetGroups: UserSnippetGroups_user_snippetGroups[] | null;
}

export interface UserSnippetGroups {
  user: UserSnippetGroups_user;
}

export interface UserSnippetGroupsVariables {
  userId: number;
}
