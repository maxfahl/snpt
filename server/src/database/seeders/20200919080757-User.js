module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		'Users',
		[
			{
				email: 'max@fahl.se',
				password: 'none',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				email: 'eliinbj@hotmail.com',
				password: 'none',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{},
	),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
