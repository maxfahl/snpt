import { gql } from "overmind-graphql";

export const createSnippetGroup = gql`
    mutation CreateSnippetGroup($fields: CreateSnippetGroupInput!) {
        createSnippetGroup(fields: $fields) {
            id
            name
        }
    }
`;

export const updateSnippetGroup = gql`
    mutation UpdateSnippetGroup(
        $snippetGroupId: Int!
        $fields: UpdateSnippetGroupInput!
    ) {
        updateSnippetGroup(snippetGroupId: $snippetGroupId, fields: $fields) {
            id
            name
            snippets {
                id
                name
            }
        }
    }
`;

export const deleteSnippetGroup = gql`
    mutation DeleteSnippetGroup($snippetGroupId: Int!) {
        deleteSnippetGroup(snippetGroupId: $snippetGroupId)
    }
`;

export const createSnippet = gql`
    mutation CreateSnippet($fields: CreateSnippetInput!) {
        createSnippet(fields: $fields) {
            id
            language
            name
            content
        }
    }
`;

export const updateSnippet = gql`
    mutation UpdateSnippet($snippetId: Int!, $fields: UpdateSnippetInput!) {
        updateSnippet(snippetId: $snippetId, fields: $fields) {
            id
            name
            language
            content
        }
    }
`;

export const deleteSnippet = gql`
    mutation DeleteSnippet($snippetId: Int!) {
        deleteSnippet(snippetId: $snippetId)
    }
`;

export const createSnippetVariableSet = gql`
    mutation CreateSnippetVariableSet($fields: CreateSnippetVariableSetInput!) {
        createSnippetVariableSet(fields: $fields) {
            id
            name
        }
    }
`;

export const updateSnippetVariableSet = gql`
    mutation UpdateSnippetVariableSet(
        $snippetVariableSetId: Int!
        $fields: UpdateSnippetVariableSetInput!
    ) {
        updateSnippetVariableSet(
            snippetVariableSetId: $snippetVariableSetId
            fields: $fields
        ) {
            id
            name
        }
    }
`;

export const deleteSnippetVariableSet = gql`
    mutation DeleteSnippetVariableSet($snippetVariableSetId: Int!) {
        deleteSnippetVariableSet(snippetVariableSetId: $snippetVariableSetId)
    }
`;

export const createMultipleSnippetVariables = gql`
    mutation CreateMultipleSnippetVariables(
        $snippetVariableSetId: Int!
        $variablesArray: [CreateSnippetVariableInput]!
    ) {
        createMultipleSnippetVariables(
            snippetVariableSetId: $snippetVariableSetId
            variablesArray: $variablesArray
        ) {
            id
            key
            value
        }
    }
`;

export const updateSnippetVariable = gql`
    mutation UpdateSnippetVariable(
        $snippetVariableId: Int!
        $fields: UpdateSnippetVariableInput!
    ) {
        updateSnippetVariable(
            snippetVariableId: $snippetVariableId
            fields: $fields
        ) {
            id
            key
            value
        }
    }
`;
