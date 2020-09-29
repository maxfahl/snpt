const models = require("../database/models");

// noinspection JSUnusedGlobalSymbols
const resolvers = {
    Query: {
        snippetVariables: async (
            parent,
            { snippetVariableSetId },
            { auth }
        ) => {
            return await models.SnippetVariable.findAll({
                where: { snippetVariableSetId: snippetVariableSetId },
            });
        },
    },
    Mutation: {
        updateSnippetVariable: async (
            _,
            { snippetVariableId, fields: { key, value } },
            { auth }
        ) => {
            const snippetVariable = await models.SnippetVariable.findOne({
                where: { id: snippetVariableId },
            });
            await snippetVariable.update({ key, value });
            return snippetVariable;
        },
        createMultipleSnippetVariables: async (
            _,
            { snippetVariableSetId, variablesArray },
            { auth }
        ) => {
            const snippetVariableDataArray = variablesArray.map((item) => {
                item["snippetVariableSetId"] = snippetVariableSetId;
                return item;
            });
            return await models.SnippetVariable.bulkCreate(
                snippetVariableDataArray
            );
        },
    },
};

module.exports = resolvers;
