const models = require("../database/models");

// noinspection JSUnusedGlobalSymbols
const resolvers = {
    Query: {
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
            // const sg = await models.SnippetGroup.findOne({ where: { id: snippetGroupId } })
            // await sg.destroy();

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
