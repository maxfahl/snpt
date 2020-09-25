import { gql } from 'overmind-graphql'

export const updateSnippet = gql`
    mutation UpdateSnippet($snippetId: Int!, $fields: UpdateSnippetInput!) {
        updateSnippet(snippetId: $snippetId, fields: $fields) {
            id,
            name,
            content
        }
    }
`;
