require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const auth = req.headers.authorization || '';
		return {
			auth
		};
	}
});

module.exports = server;
