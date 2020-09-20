const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const {
	AuthenticationError,
} = require('apollo-server');

const userComponent = {
	getUser: async auth => {
		if (!auth) throw new AuthenticationError('you must be logged in!');

		const token = auth.split('Bearer ')[1];
		if (!token) throw new AuthenticationError('you should provide a token!');

		const user = await jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) throw new AuthenticationError('invalid token!');
			return decoded;
		});
		return user;
	}
};

module.exports = userComponent;
