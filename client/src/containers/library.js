import React, { Component } from "react";
import { majorScale, Pane } from "evergreen-ui";
import SnippetGroupList from "../components/snippet-group-list";
import SnippetList from "../components/snippet-list";

export default class Library extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (<Pane id="library" width={majorScale(80)} display="flex">
			<SnippetGroupList />
			<SnippetList />
		</Pane>);
	}
}
