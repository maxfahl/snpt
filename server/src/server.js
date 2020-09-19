const { GraphQLServer } = require('graphql-yoga');
const models = require('./database/models');

const typeDefs = `
	type User {
		name: String!
		email: String!
		snippets: [Snippet!]
	}
	
	type Snippet {
		name: String!
		content: String!
	}

	type Query {
		users: [User]
	}
`;

// noinspection JSUnusedGlobalSymbols
/**
	type Query {
		userSnippets(userId: Int!): [Snippet]
	}
 */

const resolvers = {
	Query: {
		users: async (parent, args, { graphModels }) => {
			return await models.User.findAll();
		},
		// userSnippets: async (root, { userId }, { graphModels }) => {
		// 	return await models.Snippet.findAll({ where: { userId }});
		// }
	},
	User: {
		snippets: async (parent, args, { graphModels }) => {
			return await models.Snippet.findAll({ where: { userId: parent.dataValues.id }});
		}
	}
};

const server = new GraphQLServer({ typeDefs, resolvers });
module.exports = server;
