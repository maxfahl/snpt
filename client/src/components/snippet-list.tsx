import React, { FunctionComponent, useEffect, useState } from 'react'
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
	const { state: { selectedSnippetGroup } } = useOvermind();
	const [snippets, setSnippets] = useState<Snippet[]>([]);
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

	return (<>
		{ snippets.map(s => (
			<SnippetListItem snippet={ s } key={ s.id }/>
		)) }
	</>);
};

export default SnippetList;
