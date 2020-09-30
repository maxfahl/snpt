"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SnippetVariable extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            SnippetVariable.belongsTo(models.SnippetVariableSet, {
                foreignKey: "snippetVariableSetId",
                as: "snippetVariableSet",
            });
        }
    }
    SnippetVariable.init(
        {
            key: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.STRING,
                defaultValue: "",
            },
            snippetVariableSetId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "SnippetVariable",
        }
    );
    SnippetVariable.addScope(
        "defaultScope",
        {
            order: [["key", "ASC"]]
        },
        { override: true }
    );
    return SnippetVariable;
};
