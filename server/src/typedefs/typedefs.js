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
		
		createSnippetGroup(fields: CreateSnippetGroupInput!): SnippetGroup!
		updateSnippetGroup(snippetGroupId: Int!, fields: UpdateSnippetGroupInput!): SnippetGroup!
		
		createSnippet(fields: CreateSnippetInput!): Snippet!
		updateSnippet(snippetId: Int!, fields: UpdateSnippetInput!): Snippet!
		
		createSnippetVariableSet(fields: CreateSnippetVariableSetInput!): SnippetVariableSet!
		updateSnippetVariableSet(snippetVariableSetId: Int!, fields: UpdateSnippetVariableSetInput!): SnippetVariableSet!
		
		updateSnippetVariable(snippetVariableId: Int!, fields: UpdateSnippetVariableInput!): SnippetVariable!
		createMultipleSnippetVariables(snippetVariableSetId: Int!, variablesArray: [CreateSnippetVariableInput]!): [SnippetVariable!]
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
	
	input CreateSnippetGroupInput {
		name: String!
	}
	
	input UpdateSnippetGroupInput {
		name: String!
	}
	
	input CreateSnippetInput {
		name: String!
		content: String!
	}
	
	input UpdateSnippetInput {
		name: String
		content: String
	}
	
	input CreateSnippetVariableSetInput {
		name: String!
	}
	
	input UpdateSnippetVariableSetInput {
		name: String
	}
	
	input CreateSnippetVariableInput {
		key: String!
		value: String
	}
	
	input UpdateSnippetVariableInput {
		key: String!
		value: String!
	}
`;

module.exports = typeDefs;
