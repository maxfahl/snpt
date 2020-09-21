require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const auth = req.headers.authorization || '';
		// console.log(auth);
		return {
			auth
		};
	}
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));
// app.use(session({
// 	secret: "maxIsBrilliant!2?_",
// 	resave: true,
// 	saveUninitialized: true
// }));

module.exports = server;
