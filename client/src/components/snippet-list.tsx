import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { gql, useApolloClient } from "@apollo/client";
import SnippetListItem from "./snippet-list-item";
import { useOvermind } from "../overmind";
import { Snippet } from "../models/snippet";

const GET_SNIPPET_GROUP_SNIPPETS = gql`
    query SnippetGroupSnippets($snippetGroupId: Int!) {
		snippetGroup(snippetGroupId: $snippetGroupId) {
			snippets {
				id,
				name
			}
		}
    }
`;

const SnippetList: FunctionComponent = () => {
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const { state: { selectedSnippet, selectedSnippetGroup }, actions: { setSelectedSnippet } } = useOvermind();
	const client = useApolloClient();

	useEffect(() => {
		const fetchSnippetGroupSnippets = async () => {
			const response = await client.query(
				{
					query: GET_SNIPPET_GROUP_SNIPPETS,
					variables: {
						snippetGroupId: selectedSnippetGroup
					}
				}
			);
			setSnippets(response.data.snippetGroup.snippets as Snippet[]);
		};
		if (!!selectedSnippetGroup)
			fetchSnippetGroupSnippets();
		else
			setSnippets([]);
	}, [selectedSnippetGroup]);

	const onSnippetClick = (e: MouseEvent, s: Snippet) => {
		const toSelect = selectedSnippet === s.id ? 0 : s.id;
		setSelectedSnippet(toSelect);
	};

	return (<div className="snippet-list divide-y divide-gray-800 border-r border-gray-800 flex-1 flex flex-col">
		{ snippets.map(s => (
			<SnippetListItem isSelected={ selectedSnippet === s.id }
							 onSelect={ onSnippetClick }
							 snippet={ s }
							 key={ s.id }/>
		)) }
	</div>);
};

export default SnippetList;
