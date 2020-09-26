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

export const updateSnippetVariable = gql`
    mutation UpdateSnippetVariable($snippetVariableId: Int!, $fields: UpdateSnippetVariableInput!) {
        updateSnippetVariable(snippetVariableId: $snippetVariableId, fields: $fields) {
            id,
			key,
			value
        }
    }
`;

export const createMultipleSnippetVariables = gql`
	mutation CreateMultipleSnippetVariables($snippetVariableSetId: Int!, $variablesArray: [CreateSnippetVariableInput]!) {
        createMultipleSnippetVariables(snippetVariableSetId: $snippetVariableSetId, variablesArray: $variablesArray) {
			id,
			key,
			value
		}
    }
`;
