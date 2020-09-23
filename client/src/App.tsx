import './App.css';
import React, { FunctionComponent } from 'react';
import Library from "./containers/library";
import Editor from "./containers/editor";
import { createOvermind } from "overmind";
import { config } from "./overmind";
import { Provider } from "overmind-react";

export const overmind = createOvermind(config, {
	devtools: false,
});

const App: FunctionComponent = () => {
	return (
		<div className="app">
			<Provider value={ overmind }>
				<div className="bg-gray-900 text-white h-screen" style={{ display: 'flex', flexDirection: "column"}}>
					<div className="header h-16 border-b border-gray-700 flex items-center justify-start">
						<h1 className="text-4xl font-bold ml-8">SNPT</h1>
					</div>
					<div className="main" style={{ flex: "1", display: "flex" }}>
						<Library/>
						<Editor/>
					</div>
				</div>
			</Provider>
		</div>
	);
};

export default App;
