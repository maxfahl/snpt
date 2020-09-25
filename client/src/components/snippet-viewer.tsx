import React, { FunctionComponent } from 'react'
import SnippetEditor from "./snippet-editor";
import SnippetFuwq from "./snippet-fuwq";

const SnippetViewer: FunctionComponent = () => {
	return (
		<div className="flex-1 flex flex-col">
			<SnippetEditor/>
			<SnippetFuwq/>
		</div>
	);
};

export default SnippetViewer;
