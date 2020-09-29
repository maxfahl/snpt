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
                onDelete: "CASCADE",
            });
            SnippetVariableSet.hasMany(models.SnippetVariable, {
                foreignKey: "snippetVariableSetId",
                as: "snippetVariables",
                onDelete: "CASCADE",
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
            sequelize,
            modelName: "SnippetVariableSet",
        }
    );
    SnippetVariableSet.addScope('defaultScope', {
        order: [['name', 'ASC']],
    }, { override: true })
    return SnippetVariableSet;
};
