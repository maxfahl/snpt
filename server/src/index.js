require('dotenv').config();

const server = require('./server');

const PORT = process.env.PORT || 3000;

server.start({ port: PORT }).then(
	() => console.log(`Server is running on localhost:${ PORT }`),
	console.error
);
