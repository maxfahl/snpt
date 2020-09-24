import { gql } from 'overmind-graphql'

export const createPost = gql`
    mutation UpdateSnippet($snippetId: Int!, $fields) {
        updateSnippet(snippetId: $snippetId) {
            id,
			name,
			content
        }
    }
`;
