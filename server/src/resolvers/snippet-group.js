const models = require("../database/models");

// noinspection JSUnusedGlobalSymbols
const resolvers = {
    Query: {
        snippetGroups: async (parent, { userId }, { auth }) => {
            return await models.SnippetGroup.findAll({
                where: { userId: userId },
            });
        },
        snippetGroup: async (parent, { snippetGroupId }, { auth }) => {
            return await models.SnippetGroup.findOne({
                where: { id: snippetGroupId },
            });
        },
    },
    Mutation: {
        createSnippetGroup: async (parent, { fields }) => {
            return models.SnippetGroup.create(fields);
        },
        updateSnippetGroup: async (parent, { snippetGroupId, fields: { name } }) => {
            const snippetGroup = await models.SnippetGroup.findOne({
                where: { id: snippetGroupId },
            });
            await snippetGroup.update({ name });
            return snippetGroup;
        },
        deleteSnippetGroup: async (
            parent,
            { snippetGroupId }
        ) => {
            return await models.SnippetGroup.destroy({
                where: { id: snippetGroupId },
                individualHooks: true
            });
        },
    },
    SnippetGroup: {
        snippets: async (parent) => {
            return await models.Snippet.findAll({
                where: { snippetGroupId: parent.dataValues.id },
            });
        },
    },
};

module.exports = resolvers;
