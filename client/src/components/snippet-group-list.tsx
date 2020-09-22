import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
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
	const { state: { selectedSnippetGroup }, actions: { setSelectedSnippetGroup } } = useOvermind();
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

	const onGroupClick = (e: MouseEvent, sg: SnippetGroup) => {
		const toSelect = selectedSnippetGroup === sg.id ? 0 : sg.id;
		setSelectedSnippetGroup(toSelect);
	};

	return (<div className="snippet-group-list divide-y divide-gray-800 border-r border-gray-800 flex-1 flex flex-col">
		{ snippetGroups.map((sg) => (
			<SnippetGroupListItem onSelect={ onGroupClick }
								  isSelected={ selectedSnippetGroup === sg.id }
								  snippetGroup={ sg }
								  key={ sg.id }/>
		)) }
	</div>);
};

export default SnippetGroupList;
