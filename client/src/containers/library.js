import React, { Component } from "react";
import { atom } from 'recoil';
import { majorScale, Pane } from "evergreen-ui";
import SnippetGroupList from "../components/snippet-group-list";
import SnippetList from "../components/snippet-list";
import { gql, useQuery } from '@apollo/client';

export const snippetGroupsState = atom({
	key: 'snippetGroups',
	default: [],
});

// export const selectedSnippetGroup = atom({
// 	key: 'selectedSnippetGroup',
// 	default: [],
// });

// export const snippets = atom({
// 	key: 'snippets',
// 	default: [],
// });

// export const getSnippetGroups = selector({
// 	key: 'getSnippetGroups',
// 	get: (get => {
// 		const
// 	})
// });

export default class Library extends Component {

	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	const { loading, error, data } = useQuery(GET_USER_SNIPPET_GROUPS, {
	// 		variables: { userId: 1 },
	// 	});
	// }

	render() {
		return (<Pane id="library" width={majorScale(80)} display="flex">
			<SnippetGroupList />
			<SnippetList />
		</Pane>);
	}
}
