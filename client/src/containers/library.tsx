import React, { Component, Suspense } from "react";
import { atom } from 'recoil';
import { majorScale, Pane } from "evergreen-ui";
import SnippetGroupList from "../components/snippet-group-list";
import SnippetList from "../components/snippet-list";

export const snippetGroupsState = atom({
	key: 'snippetGroups',
	default: [],
});

export const selectedSnippetGroupState = atom({
	key: 'selectedSnippetGroup',
	default: null,
});

export default class Library extends Component {
	render() {
		return (<Pane id="library" width={majorScale(80)} display="flex">
			<Pane className="snippet-group-list-container" flex="1" display="flex" flexDirection="column">
				<Suspense fallback="Loading...">
					<SnippetGroupList />
				</Suspense>
			</Pane>
			<Pane className="snippet-list-container" flex="1">
				<SnippetList />
			</Pane>
		</Pane>);
	}
}
