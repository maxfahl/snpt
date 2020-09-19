const typeDefs = `
	type User {
		email: String!
		snippets: [Snippet!]
		snippetGroups: [SnippetGroup!]
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
`;

module.exports = typeDefs;
