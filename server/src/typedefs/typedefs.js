const typeDefs = `
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
	
	input UpdateSnippetInput {
		name: String!
		content: String!
	}
	
	type Query {
		users: [User]
		user(userId: Int!): User!
		snippetGroup(snippetGroupId: Int!): SnippetGroup!
		snippet(snippetId: Int!): Snippet!
	}
	
	type Mutation {
		loginUser(email: String!, password: String!): UserCredentials!
		registerUser(email: String!, password: String!): UserCredentials!
		updateSnippet(snippetId: Int!, fields: UpdateSnippetInput!): Snippet!
	}
`;

module.exports = typeDefs;
