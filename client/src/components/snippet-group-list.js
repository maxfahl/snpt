import React, { useEffect } from 'react'
import { gql, useApolloClient } from "@apollo/client";
import { useRecoilState } from 'recoil';
import { selectedSnippetGroupState, snippetGroupsState } from "../containers/library";
import SnippetGroupListItem from "./snippet-group-list-item";

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

function SnippetGroupList() {
	const [snippetGroups, setSnippetGroups] = useRecoilState(snippetGroupsState);
	const [selectedSnippetGroup, setSelectedSnippetGroup] = useRecoilState(selectedSnippetGroupState);
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

	const onGroupClick = (e, sg) => {
		const toSelect = selectedSnippetGroup === sg.id ? null : sg.id;
		setSelectedSnippetGroup(toSelect);
	};

	return (<>
		{ snippetGroups.map(sg => (
			<SnippetGroupListItem onSelect={ onGroupClick }
								  isSelected={ selectedSnippetGroup === sg.id }
								  snippetGroup={ sg }
								  key={ sg.id }/>
		)) }
	</>);
}

export default SnippetGroupList;
