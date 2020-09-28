const models = require('../database/models');

// noinspection JSUnusedGlobalSymbols
const resolvers = {
	Query: {
		snippetGroup: async(parent, { snippetGroupId }, { auth }) => {
			return await models.SnippetGroup.findOne({ where: { id: snippetGroupId } });
		}
	},
	Mutation: {
		createSnippetGroup: async (parent, { fields }) => {
			return await models.SnippetGroup.create(fields);
		},
		updateSnippet: async (parent, { snippetGroupId, fields: { name } }) => {
			const snippetGroup = await models.SnippetGroup.findOne({ where: { id: snippetGroupId } });
			snippetGroup.update({ name });
			return snippetGroup;
		}
	},
	SnippetGroup: {
		snippets: async (parent) => {
			return await models.Snippet.findAll({ where: { snippetGroupId: parent.dataValues.id } });
		},
	}
};

module.exports = resolvers;
