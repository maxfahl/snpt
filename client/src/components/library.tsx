import React, { FunctionComponent } from "react";
import SnippetGroupList from "./snippet-group-list";
import SnippetList from "./snippet-list";

const Editor: FunctionComponent = () => {

	return (<div id="library" className="" style={ { display: 'flex' } }>
		<div className="snippet-group-list-container w-56 flex flex-col">
			<SnippetGroupList/>
		</div>
		<div className="snippet-list-container w-56 flex flex-col">
			<SnippetList/>
		</div>
	</div>);
};

export default Editor;
