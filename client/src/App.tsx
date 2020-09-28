import "./App.css";
import React, { FunctionComponent } from "react";
import Library from "./components/library";
import Main from "./components/main";
import { createOvermind } from "overmind";
import { config } from "./overmind";
import { Provider } from "overmind-react";

export const overmind = createOvermind(config, {
    devtools: false,
});

const App: FunctionComponent = () => {
    return (
        <div className="app">
            <Provider value={overmind}>
                <div className="bg-gray-900 text-white h-screen flex flex-col">
                    <div className="h-16 border-b border-gray-700 flex items-center justify-start">
                        <h1 className="text-4xl font-bold ml-4">SNPT</h1>
                    </div>
                    <div className="flex-1 flex">
                        <Library />
                        <Main />
                    </div>
                </div>
            </Provider>
        </div>
    );
};

export default App;
