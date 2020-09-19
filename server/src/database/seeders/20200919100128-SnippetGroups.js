'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		'SnippetGroups',
		[
			{
				name: 'Ugly',
				userId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'General',
				userId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{},
	),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SnippetGroups', null, {}),
};
