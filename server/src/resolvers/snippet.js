const models = require("../database/models");

// noinspection JSUnusedGlobalSymbols
const resolvers = {
    Query: {
        snippet: async (parent, { snippetId }, { auth }) => {
            return await models.Snippet.findOne({ where: { id: snippetId } });
        },
    },

    Snippet: {
        snippetVariableSets: async (parent, args, context) => {
            return await models.SnippetVariableSet.findAll({
                where: { snippetId: parent.dataValues.id },
            });
        },
    },

    Mutation: {
        createSnippet: async (parent, { fields: fields }) => {
            return models.Snippet.create(fields);
        },
        updateSnippet: async (
            parent,
            { snippetId, fields: { name, content } }
        ) => {
            const snippet = await models.Snippet.findOne({
                where: { id: snippetId },
            });
            await snippet.update({ name, content });
            return snippet;
        },
    },
};

module.exports = resolvers;
