"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SnippetVariableSet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            SnippetVariableSet.belongsTo(models.Snippet, {
                foreignKey: "snippetId",
                as: "snippetGroup",
            });
            SnippetVariableSet.hasMany(models.SnippetVariable, {
                foreignKey: "snippetVariableSetId",
                as: "snippetVariables",
                onDelete: "CASCADE",
                hooks: true,
            });
        }
    }
    SnippetVariableSet.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            snippetId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            hooks: {
                beforeDestroy: async (snippetVariableSet, options) => {
                    await sequelize.models.SnippetVariable.destroy({
                        where: { snippetVariableSetId: snippetVariableSet.id },
                    });
                },
            },
            sequelize,
            modelName: "SnippetVariableSet",
        }
    );
    SnippetVariableSet.addScope(
        "defaultScope",
        {
            order: [["name", "ASC"]],
        },
        { override: true }
    );
    return SnippetVariableSet;
};
