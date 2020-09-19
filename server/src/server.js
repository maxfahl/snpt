const { GraphQLServer } = require('graphql-yoga');
const models = require('./database/models');
const bodyParser = require('body-parser');
const session = require('express-session');

const setupAuth = require('./components/auth');

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
const resolvers = {
	Query: {
		users: async () => {
			return await models.User.findAll();
		},
		user: async (parent, { userId }) => {
			return await models.User.findByPk(userId);
		}
	},
	User: {
		snippets: async (parent) => {
			return await models.Snippet.findAll({ where: { userId: parent.dataValues.id } });
		},
		snippetGroups: async (parent) => {
			return await models.SnippetGroup.findAll({ where: { userId: parent.dataValues.id } });
		},
	},
	SnippetGroup: {
		snippets: async (parent) => {
			return await models.Snippet.findAll({ where: { snippetGroupId: parent.dataValues.id } });
		},
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.express.use(bodyParser.json());       // to support JSON-encoded bodies
server.express.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));
server.express.use(session({
	secret: "maxIsBrilliant!2?_",
	resave: true,
	saveUninitialized: true
}));

setupAuth(server);

module.exports = server;
