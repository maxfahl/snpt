"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Snippet extends Model {
        static associate(models) {
            Snippet.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
                onDelete: "CASCADE",
            });
            Snippet.belongsTo(models.SnippetGroup, {
                foreignKey: "snippetGroupId",
                as: "snippetGroup",
                onDelete: "CASCADE",
            });
            Snippet.hasMany(models.SnippetVariableSet, {
                foreignKey: "snippetId",
                as: "snippetVariableSets",
                onDelete: "CASCADE",
            });
        }
    }
    Snippet.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: DataTypes.STRING,
            language: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "text",
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            snippetGroupId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            hooks: {
                afterCreate: async (snippet, options) => {
                    await sequelize.models.SnippetVariableSet.create({
                        snippetId: snippet.id,
                        name: 'Default'
                    });
                },
            },
            sequelize
        },
        {
            sequelize,
            modelName: "Snippet",
        }
    );
    Snippet.addScope('defaultScope', {
        order: [['name', 'ASC']],
    }, { override: true })
    return Snippet;
};
