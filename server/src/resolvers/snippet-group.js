const models = require('../database/models');

// noinspection JSUnusedGlobalSymbols
const resolvers = {
	SnippetGroup: {
		snippets: async (parent) => {
			return await models.Snippet.findAll({ where: { snippetGroupId: parent.dataValues.id } });
		},
	}
};

module.exports = resolvers;
