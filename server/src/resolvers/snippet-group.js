const models = require('../database/models');

// noinspection JSUnusedGlobalSymbols
const resolvers = {
	Query: {
		snippetGroup: async(parent, { snippetGroupId }, { auth }) => {
			return await models.SnippetGroup.findOne({ where: { id: snippetGroupId } });
		}
	},
	SnippetGroup: {
		snippets: async (parent) => {
			return await models.Snippet.findAll({ where: { snippetGroupId: parent.dataValues.id } });
		},
	}
};

module.exports = resolvers;
