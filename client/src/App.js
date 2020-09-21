import './App.css';
import React from 'react';
import { RecoilRoot } from "recoil";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { majorScale, Pane } from "evergreen-ui";
import Library from "./containers/library";
import Editor from "./containers/editor";
import { setContext } from "@apollo/client/link/context";

function App() {

	const httpLink = createHttpLink({
		uri: 'http://localhost:3001'
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		// const token = localStorage.getItem('token');
		const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXhAZmFobC5zZSIsImlhdCI6MTYwMDY4OTE0OCwiZXhwIjoxNjAwNzc1NTQ4fQ.KnV-i8R9J4aD_OAG91PvBl5s8ogHF9lO0d2MKCT23Xk";
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			}
		}
	});

	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		// uri: 'http://localhost:3001',
		cache: new InMemoryCache()
	});

	return (
		<div className="app">
			<RecoilRoot>
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
			</RecoilRoot>
		</div>
	);
}

export default App;
