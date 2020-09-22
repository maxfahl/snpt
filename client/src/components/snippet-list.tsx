import React, { useEffect, useState } from 'react'
import { useRecoilValue } from "recoil";
import { selectedSnippetGroupState } from "../containers/library";
import { gql, useApolloClient } from "@apollo/client";
import SnippetListItem from "./snippet-list-item";

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

function SnippetList() {
	const selectedSnippetGroup = useRecoilValue(selectedSnippetGroupState);
	const [snippets, setSnippets] = useState([]);
	const client = useApolloClient();

	useEffect(() => {
		const fetchSnippetGroupSnippets = async () => {
			await client.query(
				{
					query: GET_SNIPPET_GROUP_SNIPPETS,
					variables: {
						snippetGroupId: selectedSnippetGroup
					}
				}
			).then(
				response => {
					setSnippets(response.data.snippetGroup.snippets);
				},
				error => {
					console.error(error);
				}
			);
		};
		if (!!selectedSnippetGroup)
			fetchSnippetGroupSnippets();
		else
			setSnippets([]);
	}, [selectedSnippetGroup, client]);

	return (<>
		{ snippets.map(s => (
			<SnippetListItem snippet={ s } key={ s.id }/>
		)) }
	</>);
}

export default SnippetList;
