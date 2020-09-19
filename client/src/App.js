import React from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import './App.css';

function App() {
	const client = new ApolloClient({
		uri: 'http://localhost:3001',
		cache: new InMemoryCache()
	});

	client
		.query({
			query: gql`
				query {
				  users {
					name
				  }
				}`
		})
		.then(result => console.log(result), console.error);

	return (
		<div className="app">

		</div>
	);
}

export default App;
