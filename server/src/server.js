const { GraphQLServer } = require('graphql-yoga');
const models = require('./database/models');

const typeDefs = `
	type User {
		name: String!
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
		user: async (parent, { userId }, { graphModels }) => {
			return await models.User.findByPk(userId);
		}
		// userSnippets: async (root, { userId }, { graphModels }) => {
		// 	return await models.Snippet.findAll({ where: { userId }});
		// }
	},
	User: {
		snippets: async (parent, args, { graphModels }) => {
			return await models.Snippet.findAll({ where: { userId: parent.dataValues.id }});
		},
		snippetGroups: async (parent, args, { graphModels }) => {
			return await models.SnippetGroup.findAll({ where: { userId: parent.dataValues.id }});
		},
	},
	SnippetGroup: {
		snippets: async (parent, args, { graphModels }) => {
			return await models.Snippet.findAll({ where: { snippetGroupId: parent.dataValues.id }});
		},
	}
};

const server = new GraphQLServer({ typeDefs, resolvers });
module.exports = server;
