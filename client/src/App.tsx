import './App.css';
import React, { FunctionComponent } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import Library from "./containers/library";
import Editor from "./containers/editor";
import { setContext } from "@apollo/client/link/context";
import { createOvermind } from "overmind";
import { config } from "./overmind";
import { Provider } from "overmind-react";

export const overmind = createOvermind(config, {
	devtools: false,
});

const App: FunctionComponent = () => {

	const httpLink = createHttpLink({
		uri: 'http://localhost:3001',
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		// const token = localStorage.getItem('token');
		const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXhAZmFobC5zZSIsImlhdCI6MTYwMDc4MDc5OCwiZXhwIjoxNjAwODY3MTk4fQ.h4W42kqp1U9rtn8MdqnlHtt6-SpWQb9kR-ZarTJ8n6A";
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${ token }` : "",
			},
		}
	});

	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});

	return (
		<div className="app">
			<Provider value={ overmind }>
				<ApolloProvider client={ client }>
					<div className="bg-gray-900 text-white h-screen" style={{ display: 'flex', flexDirection: "column"}}>
						<div className="header h-16 border-b border-gray-800">

						</div>
						<div className="main" style={{ flex: "1", display: "flex" }}>
							<Library/>
							<Editor/>
						</div>
					</div>
				</ApolloProvider>
			</Provider>
		</div>
	);
};

export default App;
