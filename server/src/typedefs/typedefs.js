const typeDefs = `
	type Query {
		snippetGroups(userId: Int!): [SnippetGroup]!
		snippetGroup(snippetGroupId: Int!): SnippetGroup!
		snippet(snippetId: Int!): Snippet!
		snippets(snippetGroupId: Int!): [Snippet]!
		snippetVariableSets(snippetId: Int!): [SnippetVariableSet]!
		snippetVariables(snippetVariableSetId: Int!): [SnippetVariable]!
		user(userId: Int!): User!
		users: [User]
	}
	
	type Mutation {
		loginUser(email: String!, password: String!): UserCredentials!
		registerUser(email: String!, password: String!): UserCredentials!
		
		createSnippetGroup(fields: CreateSnippetGroupInput!): SnippetGroup!
		updateSnippetGroup(snippetGroupId: Int!, fields: UpdateSnippetGroupInput!): SnippetGroup!
		deleteSnippetGroup(snippetGroupId: Int!): Int!
		
		createSnippet(fields: CreateSnippetInput!): Snippet!
		updateSnippet(snippetId: Int!, fields: UpdateSnippetInput!): Snippet!
		deleteSnippet(snippetId: Int!): Int!
		
		createSnippetVariableSet(fields: CreateSnippetVariableSetInput!): SnippetVariableSet!
		updateSnippetVariableSet(snippetVariableSetId: Int!, fields: UpdateSnippetVariableSetInput!): SnippetVariableSet!
		deleteSnippetVariableSet(snippetVariableSetId: Int!): Int!
		
		createMultipleSnippetVariables(snippetVariableSetId: Int!, variablesArray: [CreateSnippetVariableInput]!): [SnippetVariable!]
		updateSnippetVariable(snippetVariableId: Int!, fields: UpdateSnippetVariableInput!): SnippetVariable!
		deleteSnippetVariable(snippetVariableId: Int!): Int!
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
	    userId: Int!
		name: String!
	}
	
	input UpdateSnippetGroupInput {
		name: String!
	}
	
	input CreateSnippetInput {
	    userId: Int!
	    snippetGroupId: Int!
	    language: String!
		name: String!
		content: String!
	}
	
	input UpdateSnippetInput {
		name: String
		language: String
		content: String
	}
	
	input CreateSnippetVariableSetInput {
	    snippetId: Int!
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
