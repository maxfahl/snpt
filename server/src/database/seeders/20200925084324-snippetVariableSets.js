'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		'SnippetVariableSets',
		[
			{
				name: 'Default',
				snippetId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Default',
				snippetId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Default',
				snippetId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		],
		{},
	),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SnippetVariableSets', null, {}),
};
