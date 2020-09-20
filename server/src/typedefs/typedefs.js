const typeDefs = `
	type User {
		email: String!
		token: String!
		snippets: [Snippet!]
		snippetGroups: [SnippetGroup!]
	}
	input RegisterUserInput {
		email: String!
		password: String!
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
		LoginUser(email: String!, password: String!): User!
		RegisterUser(user: RegisterUserInput!): User!
	}
`;

module.exports = typeDefs;
