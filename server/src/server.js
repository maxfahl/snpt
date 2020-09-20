require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const bodyParser = require('body-parser');
const session = require('express-session');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		if (req) {
			const auth = req.headers.authorization || '';
			return {
				auth
			};
		} else {
			// console.error('req not defined.');
		}
	}
});

server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({
	extended: true
}));
server.express.use(session({
	secret: "maxIsBrilliant!2?_",
	resave: true,
	saveUninitialized: true
}));

module.exports = server;
