require('dotenv').config();

const server = require('./src/server');

const PORT = process.env.PORT || 3001;

server.listen({ port: PORT }).then(
	() => console.log(`Server is running on localhost:${ PORT }`),
	console.error
);
