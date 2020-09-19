'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Snippets', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			content: {
				type: Sequelize.TEXT('long')
			},
			userId: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Snippets');
	}
};
