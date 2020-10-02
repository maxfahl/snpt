const models = require("../database/models");

// noinspection JSUnusedGlobalSymbols
const resolvers = {
    Query: {
        snippet: async (parent, { snippetId }, { auth }) => {
            return await models.Snippet.findOne({ where: { id: snippetId } });
        },
        snippets: async (parent, { snippetGroupId }, { auth }) => {
            return await models.Snippet.findAll({
                where: { snippetGroupId: snippetGroupId },
            });
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
        createSnippet: (parent, { fields: fields }) => {
            return models.Snippet.create(fields);
        },
        updateSnippet: async (
            parent,
            { snippetId, fields: { userId, snippetGroupId, name, content } }
        ) => {
            const snippet = await models.Snippet.findOne({
                where: { id: snippetId },
            });
            await snippet.update({ userId, snippetGroupId, name, content });
            return snippet;
        },
        deleteSnippet: async (parent, { snippetId }) => {
            // const s = await models.Snippet.findOne({ where: { id: snippetId } })
            // await s.destroy();

            return await models.Snippet.destroy({
                where: { id: snippetId },
                individualHooks: true,
            });
        },
    },
};

module.exports = resolvers;
