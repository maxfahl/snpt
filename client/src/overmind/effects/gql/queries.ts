import { gql, Query } from "overmind-graphql";
import {
    UserSnippetGroups,
    UserSnippetGroupsVariables,
} from "./graphql-types/UserSnippetGroups";
import {
    SnippetGroupSnippets,
    SnippetGroupSnippetsVariables,
} from "./graphql-types/SnippetGroupSnippets";
import { Snippet } from "./graphql-types/Snippet";
import {
    SnippetVariables,
    SnippetVariablesVariables,
} from "./graphql-types/SnippetVariables";
import {
    SnippetVariableSets_snippetVariableSets,
    SnippetVariableSetsVariables
} from "./graphql-types/SnippetVariableSets";
import { SnippetVariableSet } from "../../../models/snippet-variable-set";

export const userSnippetGroups: Query<
    UserSnippetGroups,
    UserSnippetGroupsVariables
> = gql`
    query UserSnippetGroups($userId: Int!) {
        user(userId: $userId) {
            snippetGroups {
                id
                name
            }
        }
    }
`;

export const snippetGroupSnippets: Query<
    SnippetGroupSnippets,
    SnippetGroupSnippetsVariables
> = gql`
    query SnippetGroupSnippets($snippetGroupId: Int!) {
        snippetGroup(snippetGroupId: $snippetGroupId) {
            snippets {
                id
                name
            }
        }
    }
`;

export const snippet: Query<Snippet, any> = gql`
    query Snippet($snippetId: Int!) {
        snippet(snippetId: $snippetId) {
            id
            name
            language
            content
        }
    }
`;

export const snippetVariables: Query<
    SnippetVariables,
    SnippetVariablesVariables
> = gql`
    query SnippetVariables($snippetVariableSetId: Int!) {
        snippetVariables(snippetVariableSetId: $snippetVariableSetId) {
            id
            key
            value
        }
    }
`;

export const snippetVariableSets: Query<
    SnippetVariableSet[],
    SnippetVariableSetsVariables
> = gql`
    query SnippetVariableSets($snippetId: Int!) {
        snippetVariableSets(snippetId: $snippetId) {
            id,
            name
        }
    }
`;
