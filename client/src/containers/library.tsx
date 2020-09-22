import React, { Component, Suspense } from "react";
import SnippetGroupList from "../components/snippet-group-list";
import SnippetList from "../components/snippet-list";


export default class Library extends Component {
	render() {
		return (<div id="library" className="w-2/5" style={ { display: 'flex' } }>
			<div className="snippet-group-list-container" style={ { display: 'flex', flex: '1', flexDirection: 'column' } }>
				{/*<Suspense fallback="Loading...">*/}
				<SnippetGroupList/>
				{/*</Suspense>*/}
			</div>
			<div className="snippet-list-container" style={ { display: 'flex', flex: '1', flexDirection: 'column' } }>
				<SnippetList/>
			</div>
		</div>);
	}
}
