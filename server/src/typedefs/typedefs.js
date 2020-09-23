const typeDefs = `
	type User {
		email: String!
		snippets: [Snippet!]
		snippetGroups: [SnippetGroup!]
	}
	
	type UserCredentials {
		user: User!
		token: String!
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
	}

	type Query {
		users: [User]
		user(userId: Int!): User
		snippetGroup(snippetGroupId: Int!): SnippetGroup!
		snippet(snippetId: Int!): Snippet!
	}
	
	type Mutation {
		LoginUser(email: String!, password: String!): UserCredentials!
		RegisterUser(email: String!, password: String!): UserCredentials!
	}
`;

module.exports = typeDefs;
