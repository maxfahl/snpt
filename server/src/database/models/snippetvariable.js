'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SnippetVariable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
		SnippetVariableSet.belongsTo(models.Snippet, {
			foreignKey: 'snippetVariableSetId',
			as: 'snippetVariableSet',
			onDelete: 'CASCADE',
		});
    }
  };
  SnippetVariable.init({
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    snippetVariableSetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SnippetVariable',
  });
  return SnippetVariable;
};
