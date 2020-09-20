module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		'Users',
		[
			{
				email: 'max@fahl.se',
				password: '$2a$10$vaugLwfYKX1gdMWuQsjFhOUGj1NAF8/JIEkqI/hKOrau2kkVw9.9a',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{},
	),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
