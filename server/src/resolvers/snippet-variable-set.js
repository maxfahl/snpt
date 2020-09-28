const models = require("../database/models");

// noinspection JSUnusedGlobalSymbols
const resolvers = {
    // Query: {
    // 	snippetVariableSets: async (parent, { snippetId }, { auth }) => {
    // 		return await models.SnippetVariableSet.findAll({ where: { snippetId: snippetId } });
    // 	}
    // },
    Mutation: {
        createSnippetVariableSet: async (parent, { fields }) => {
            return await models.SnippetVariableSet.create(fields);
        },
        updateSnippetVariableSet: async (
            parent,
            { snippetVariableSetId, fields: { name } }
        ) => {
            const snippetVariableSet = await models.SnippetVariableSet.findOne({
                where: { id: snippetVariableSetId },
            });
            snippetVariableSet.update({ name, content });
            return snippetVariableSet;
        },
    },
};

module.exports = resolvers;
