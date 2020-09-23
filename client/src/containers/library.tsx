import React, { Component } from "react";
import SnippetGroupList from "../components/snippet-group-list";
import SnippetList from "../components/snippet-list";

export default class Library extends Component<void> {


	render() {
		return (<div id="library" className="w-2/5 flex-shrink-0" style={ { display: 'flex' } }>
			<div className="snippet-group-list-container flex flex-col" style={ { flex: '1 0 50%', width: '50%' } }>
				<SnippetGroupList/>
			</div>
			<div className="snippet-list-container flex flex-col" style={ { flex: '1 0 50%', width: '50%' } }>
				<SnippetList/>
			</div>
		</div>);
	}
}
