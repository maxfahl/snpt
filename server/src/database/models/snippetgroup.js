'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SnippetGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
		SnippetGroup.hasMany(models.Snippet, {
			foreignKey: 'snippetGroupId',
			as: 'snippets',
			onDelete: 'CASCADE',
		});

		SnippetGroup.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
			onDelete: 'CASCADE',
		});
    }
  };
  SnippetGroup.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SnippetGroup',
  });
  return SnippetGroup;
};
