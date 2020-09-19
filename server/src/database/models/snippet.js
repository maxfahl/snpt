'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Snippet extends Model {
		static associate(models) {
			Snippet.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user',
				onDelete: 'CASCADE',
			})
		}
	};
	Snippet.init({
		name: DataTypes.STRING,
		content: DataTypes.STRING,
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'Snippet',
	});
	return Snippet;
};
