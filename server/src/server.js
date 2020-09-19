const { GraphQLServer } = require('graphql-yoga');
const bodyParser = require('body-parser');
const session = require('express-session');
const typeDefs = require('./components/graphql.types');
const resolvers = require('./components/graphql.resolvers');
const setupAuth = require('./components/auth');

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => { req, res },
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

setupAuth(server);

module.exports = server;
