const models = require("../database/models");

// noinspection JSUnusedGlobalSymbols
const resolvers = {
    Query: {
    	snippetVariableSets: async (parent, { snippetId }, { auth }) => {
    		return await models.SnippetVariableSet.findAll({ where: { snippetId: snippetId } });
    	}
    },
    Mutation: {
        createSnippetVariableSet: async (parent, { fields }) => {
            return models.SnippetVariableSet.create(fields);
        },
        updateSnippetVariableSet: async (
            parent,
            { snippetVariableSetId, fields: { name } }
        ) => {
            const snippetVariableSet = await models.SnippetVariableSet.findOne({
                where: { id: snippetVariableSetId },
            });
            await snippetVariableSet.update({ name });
            return snippetVariableSet;
        },
    },
};

module.exports = resolvers;
