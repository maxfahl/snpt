const models = require('../database/models');
const passport = require('passport');

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
		snippets: async (parent, args, context) => {
			console.log(context);
			// passport.
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

module.exports = resolvers;
