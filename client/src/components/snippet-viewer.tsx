import React, { FunctionComponent } from 'react'
import SnippetEditor from "./snippet-editor";
import SnippetRunner from "./snippet-runner";

const SnippetViewer: FunctionComponent = () => {
	return (
		<div className="flex-1 flex flex-col">
			<SnippetEditor/>
			<SnippetRunner/>
		</div>
	);
};

export default SnippetViewer;
