'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Snippet, {
				foreignKey: 'userId',
				as: 'snippets',
				onDelete: 'CASCADE',
			});
			User.hasMany(models.SnippetGroup, {
				foreignKey: 'userId',
				as: 'snippetGroups',
				onDelete: 'CASCADE',
			});
		}
	};
	User.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		salt: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};
