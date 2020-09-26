module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.bulkInsert(
			"Snippets",
			[
				{
					userId: 1,
					snippetGroupId: 1,
					name: "JS Snippet",
					language: "javascript",
					content: "console.log({{{ whatToLog }}});",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: 1,
					snippetGroupId: 2,
					name: "HTML Boilerplate",
					language: "html",
					content: `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        
        <title>Yo!</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
        
        <link rel="stylesheet" href="css/styles.css?v=1.0">
    
    </head>
    
    <body>
        <script src="js/scripts.js"></script>
        {{{ bodyContent }}}
    </body>
</html>`,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userId: 1,
					snippetGroupId: 2,
					name: "Hello world",
					language: "text",
					content: "Hello world",
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],

			{}
		),

	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete("Snippets", null, {})
};
