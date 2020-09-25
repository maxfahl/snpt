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

export const createMultipleSnippetVariables = gql`
	mutation CreateMultipleSnippetVariables($snippetVariableSetId: Int!, $variablesObject: [CreateSnippetVariableInput]!) {
        createMultipleSnippetVariables(snippetVariableSetId: $snippetVariableSetId, variablesObject: $variablesObject) {
			id,
			key,
			value
		}
    }
`;
