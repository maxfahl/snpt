import React, { FunctionComponent, useEffect, useState } from 'react'
import { gql, useApolloClient } from "@apollo/client";
import SnippetGroupListItem from "./snippet-group-list-item";
import { useOvermind } from "../overmind";
import { SnippetGroup } from "../models/snippet-group";

const GET_USER_SNIPPET_GROUPS = gql`
    query UserSnippetGroups($userId: Int!) {
        user(userId: $userId) {
            snippetGroups {
                id,
                name
            }
        }
    }
`;

const SnippetGroupList: FunctionComponent = () => {
	const [snippetGroups, setSnippetGroups] = useState<SnippetGroup[]>([]);
	const { state: { selectedSnippetGroup }, actions: { setSelectedSnipperGroup } } = useOvermind();
	const client = useApolloClient();

	useEffect(() => {
		const fetchSnippetGroups = async () => {
			const response = await client.query(
				{
					query: GET_USER_SNIPPET_GROUPS,
					variables: {
						userId: 1,
					}
				}
			);
			setSnippetGroups(response.data.user.snippetGroups as SnippetGroup[]);
		};
		fetchSnippetGroups();
	});

	const onGroupClick = (e: MouseEvent, sg) => {
		const toSelect = selectedSnippetGroup === sg.id ? undefined : sg.id;
		setSelectedSnipperGroup(toSelect);
	};

	return (<>
		{ snippetGroups.map((sg) => (
			<SnippetGroupListItem onSelect={ onGroupClick }
								  isSelected={ selectedSnippetGroup === sg.id }
								  snippetGroup={ sg }
								  key={ sg.id }/>
		)) }
	</>);
};

export default SnippetGroupList;
