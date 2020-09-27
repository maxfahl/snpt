const typeDefs = `
	type Query {
		snippet(snippetId: Int!): Snippet!
		snippetGroup(snippetGroupId: Int!): SnippetGroup!
		snippetVariables(snippetVariableSetId: Int!): [SnippetVariable]!
		user(userId: Int!): User!
		users: [User]
	}
	
	type Mutation {
		loginUser(email: String!, password: String!): UserCredentials!
		registerUser(email: String!, password: String!): UserCredentials!
		updateSnippet(snippetId: Int!, fields: UpdateSnippetInput!): Snippet!
		updateSnippetVariable(snippetVariableId: Int!, fields: UpdateSnippetVariableInput!): SnippetVariable!
		createMultipleSnippetVariables(snippetVariableSetId: Int!, variablesArray: [CreateSnippetVariableInput]!): [SnippetVariable!]
	}
	
	input UpdateSnippetInput {
		name: String
		content: String
	}
	
	input UpdateSnippetVariableInput {
		key: String!
		value: String!
	}
	
	input CreateSnippetVariableInput {
		key: String!
		value: String
	}

	type User {
		email: String!
		snippets: [Snippet!]
		snippetGroups: [SnippetGroup!]
	}
	
	type SnippetGroup {
		id: Int!
		name: String!
		snippets: [Snippet!]
	}
	
	type Snippet {
		id: Int!
		name: String!
		language: String!
		content: String!
		snippetVariableSets: [SnippetVariableSet]
	}
	
	type SnippetVariableSet {
		id: Int!
		name: String!
		snippetVariables: [SnippetVariable]
	}
	
	type SnippetVariable {
		id: Int!
		key: String!
		value: String
	}
	
	type UserCredentials {
		user: User!
		token: String!
	}
`;

module.exports = typeDefs;
