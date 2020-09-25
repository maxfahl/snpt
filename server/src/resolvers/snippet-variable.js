const models = require('../database/models');

// noinspection JSUnusedGlobalSymbols
const resolvers = {
	Query: {
		// snippetVariable: async (parent, { snippetId }, { auth }) => {
		// 	return await models.SnippetVariableSet.findAll({ where: { snippetId: snippetId } });
		// }
	},
	// Mutation: {
	// 	updateSnippet: async (parent, { snippetId, fields: { name, content } }) => {
	// 		const snippet = await models.Snippet.findOne({ where: { id: snippetId } });
	// 		snippet.update({ name, content });
	// 		// const updatedSnippet = await models.Snippet.update({ name, content }, { where: { id: snippetId } });
	// 		console.log(snippet);
	// 		return snippet;
	// 	}
	// }
};

module.exports = resolvers;
