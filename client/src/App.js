import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { majorScale, Pane } from "evergreen-ui";
import Library from "./containers/library";
import Editor from "./containers/editor";

function App() {

	const client = new ApolloClient({
		uri: 'http://localhost:3001',
		cache: new InMemoryCache()
	});

	// client
	// 	.query({
	// 		query: gql`
	// 			query Users {
	// 			  users {
	// 				email
	// 			  }
	// 			}`
	// 	})
	// 	.then(result => console.log(result), console.error);

	return (
		<div className="app">
			<ApolloProvider client={client}>
				<Pane width="100%" height="100%" display="flex" flexDirection="column">
					<Pane className="header" height={majorScale(10)}>

					</Pane>
					<Pane className="main" flex="auto" display="flex">
						<Library />
						<Editor />
					</Pane>
				</Pane>
			</ApolloProvider>
		</div>
	);
}

export default App;
