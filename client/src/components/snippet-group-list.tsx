import React, { FunctionComponent, useEffect, useState } from 'react'
import { gql, useApolloClient } from "@apollo/client";
import SnippetGroupListItem from "./snippet-group-list-item";
import { useApp } from "../overmind";

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
	const [snippetGroups, setSnippetGroups] = useState([]);
	// const [snippetGroups, setSnippetGroups] = useRecoilState(snippetGroupsState);
	// const [selectedSnippetGroup, setSelectedSnippetGroup] = useRecoilState(selectedSnippetGroupState);
	const { state: { selectedSnippetGroup }, actions: { setSelectedSnipperGroup } } = useApp();
	const client = useApolloClient();

	useEffect(() => {
		const fetchSnippetGroups = async () => {
			await client.query(
				{
					query: GET_USER_SNIPPET_GROUPS,
					variables: {
						userId: 1,
					}
				}
			).then(
				response => setSnippetGroups(response.data.user.snippetGroups),
				error => {
					console.error(error);
				}
			);
		};
		fetchSnippetGroups();
	});

	const onGroupClick = (e: MouseEvent, sg) => {
		const toSelect = selectedSnippetGroup === sg.id ? null : sg.id;
		setSelectedSnipperGroup(toSelect);
	};

	return (<>
		{ snippetGroups.map(sg => (
			<SnippetGroupListItem onSelect={ onGroupClick }
								  isSelected={ selectedSnippetGroup === sg.id }
								  snippetGroup={ sg }
								  key={ sg.id }/>
		)) }
	</>);
};

export default SnippetGroupList;
