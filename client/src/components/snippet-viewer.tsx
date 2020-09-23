import React, { FunctionComponent } from 'react'
import { Snippet } from "../models/snippet";
import SnippetEditor from "./snippet-editor";
import SnippetRunner from "./snippet-runner";

type SnippetViewerProps = {
	snippet: Snippet
}

const SnippetViewer: FunctionComponent<SnippetViewerProps> = ({ snippet }) => {
	return (
		<>
			<SnippetEditor snippet={ snippet }/>
			<SnippetRunner snippet={ snippet } />
		</>
	);
};

export default SnippetViewer;
