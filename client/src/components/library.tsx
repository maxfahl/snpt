import React, { FunctionComponent } from "react";
import SnippetGroupList from "./snippet-group-list";
import SnippetList from "./snippet-list";

const Editor: FunctionComponent = () => {

	return (<div id="library" className="w-1/3 flex-shrink-0" style={ { display: 'flex' } }>
		<div className="snippet-group-list-container flex flex-col" style={ { flex: '1 0 50%', width: '50%' } }>
			<SnippetGroupList/>
		</div>
		<div className="snippet-list-container flex flex-col" style={ { flex: '1 0 50%', width: '50%' } }>
			<SnippetList/>
		</div>
	</div>);
};

export default Editor;
