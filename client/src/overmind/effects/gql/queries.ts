import { gql, Query } from "overmind-graphql";
import { UserSnippetGroups, UserSnippetGroupsVariables } from "./graphql-types/UserSnippetGroups";
import { SnippetGroupSnippets, SnippetGroupSnippetsVariables } from "./graphql-types/SnippetGroupSnippets";
import { Snippet, SnippetVariables } from "./graphql-types/Snippet";

export const userSnippetGroups: Query<UserSnippetGroups, UserSnippetGroupsVariables> = gql`
    query UserSnippetGroups($userId: Int!) {
        user(userId: $userId) {
            snippetGroups {
                id,
                name
            }
        }
    }
`;

export const snippetGroupSnippets: Query<SnippetGroupSnippets, SnippetGroupSnippetsVariables> = gql`
    query SnippetGroupSnippets($snippetGroupId: Int!) {
        snippetGroup(snippetGroupId: $snippetGroupId) {
            snippets {
                id,
                name
            }
        }
    }
`;

export const snippet: Query<Snippet, SnippetVariables> = gql`
    query Snippet($snippetId: Int!) {
        snippet(snippetId: $snippetId) {
			id,
			name,
			content
        }
    }
`;
