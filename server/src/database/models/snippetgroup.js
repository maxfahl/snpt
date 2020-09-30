"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SnippetGroup extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            SnippetGroup.hasMany(
                models.Snippet,
                {
                    foreignKey: "snippetGroupId",
                    as: "snippets"
                }
            );

            SnippetGroup.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user"
            });
        }
    }

    SnippetGroup.init(
        {
            name: DataTypes.STRING
        },
        {
            // hooks: {
            //     beforeDestroy: async (snippetGroup, options) => {
            //         await sequelize.models.Snippet.destroy({
            //             where: { snippetGroupId: snippetGroup.id }
            //         });
            //     }
            // },
            sequelize,
            modelName: "SnippetGroup",
        },
        // {
        //     sequelize,
        //     modelName: "SnippetGroup"
        // }
    );
    SnippetGroup.addScope(
        "defaultScope",
        {
            order: [["name", "ASC"]]
        },
        { override: true }
    );
    return SnippetGroup;
};
