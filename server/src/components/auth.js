const models = require('../database/models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const setupAuth = (server) => {

	const HASH_ITERATIONS = 10000;

	crypto.DEFAULT_ENCODING = 'hex';

	server.express.use(passport.initialize());
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
};

module.exports = setupAuth;
