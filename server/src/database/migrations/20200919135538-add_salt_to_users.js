'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn(
				'Users',
				'salt',
				{
					type: Sequelize.STRING
				}
			)
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn('Users', 'salt'),
		]);
	}
};
