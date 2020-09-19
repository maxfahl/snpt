module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
		'Users',
		[
			{
				name: 'Max Fahl',
				email: 'max@fahl.se',
				password: 'none',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Elin Fahl',
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
