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
        createSnippet: (parent, { fields: fields }) => {
            return models.Snippet.create(fields);
            // const newSnippet = await models.Snippet.create(fields);
            // console.log(newSnippet);
            // return newSnippet.dataValues;
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
    },
};

module.exports = resolvers;
