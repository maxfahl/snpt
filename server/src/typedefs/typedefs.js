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
		name: String!
		snippets: [Snippet!]
	}
	
	type Snippet {
		name: String!
		content: String!
	}

	type Query {
		users: [User]
		user(userId: Int!): User
	}
	
	type Mutation {
		LoginUser(email: String!, password: String!): UserCredentials!
		RegisterUser(email: String!, password: String!): UserCredentials!
	}
`;

module.exports = typeDefs;
