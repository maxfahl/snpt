const { GraphQLServer } = require('graphql-yoga');
const models = require('./database/models');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
crypto.DEFAULT_ENCODING = 'hex';

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
server.express.use(passport.initialize());
server.express.use(session({
	secret: "maxIsBrilliant!2?_",
	resave: true,
	saveUninitialized: true
}));
server.express.use(passport.session());

// Login
passport.use('local', new LocalStrategy(
	async (username, password, done) => {
		const user = await models.User.findOne({ where: { email: username } });
		if (!!user && await isPasswordCorrect(user.password, user.salt, password))
			return done(null, user);
		return done(null, false, { message: 'Could not login.' });
	}
));
server.express.post(
	'/login',
	passport.authenticate('local'),
	(req, res) => {
		console.log('Logging in as: ' + req.user);
		let user = Object.assign({}, req.user.dataValues);
		delete user.password;
		delete user.salt;
		return res.json({ user });
	}
);

// Register user
server.express.post(
	'/register',
	async (req, res) => {
		const { username, password } = req.body;
		const existingUser = await models.User.findOne({ where: { email: username } });

		if (!!existingUser) {
			return res.status(406).json({
				error: "User with that email already exists."
			});
		} else {
			const { salt, hash } = await hashPassword(password);
			const now = new Date();
			const user = models.User.build({
				email: username,
				password: hash,
				salt: salt,
				createdAt: now,
				updatedAt: now
			});

			try {
				let result = await user.save();
				return res.status(200).json({
					id: result.id
				});
			} catch (ex) {
				return res.status(500).json({
					error: "Something went wrong when creating the user."
				});
			}
		}
	}
);


const HASH_ITERATIONS = 10000;

function hashPassword(password) {
	const salt = crypto.randomBytes(128).toString('base64');
	return new Promise((resolve, reject) => {
		crypto.pbkdf2(
			password,
			salt,
			HASH_ITERATIONS,
			64,
			'sha512',
			(error, hash) => {
				if (error) reject(error);
				resolve({
					salt,
					hash
				});
			}
		);
	});
}

function isPasswordCorrect(userHash, userSalt, enteredPassword) {
	return new Promise((resolve, reject) => {
		crypto.pbkdf2(
			enteredPassword,
			userSalt,
			HASH_ITERATIONS,
			64,
			'sha512',
			(error, calculatedHash) => {
				if (error)
					reject();
				else
					resolve(userHash === calculatedHash);
			}
		);
	});
}

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

module.exports = server;
