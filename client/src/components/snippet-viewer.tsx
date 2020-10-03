import React, { FunctionComponent } from "react";
import SnippetEditor from "./snippet-editor";
import SnippetDetails from "./snippet-details";

const SnippetViewer: FunctionComponent = () => {
    return (
        <div className="lol flex-1 flex flex-col">
            <SnippetEditor />
            <SnippetDetails />
        </div>
    );
};

export default SnippetViewer;
