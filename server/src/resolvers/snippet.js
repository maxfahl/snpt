const models = require('../database/models');

// noinspection JSUnusedGlobalSymbols
const resolvers = {
	Query: {
		snippet: async(parent, { snippetId }, { auth }) => {
			return await models.Snippet.findOne({ where: { id: snippetId } });
		}
	}
};

module.exports = resolvers;
