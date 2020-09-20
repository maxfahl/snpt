import React from 'react'
import { Pane } from "evergreen-ui";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRecoilState } from 'recoil';
import { snippetGroupsState } from "../containers/library";
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
	const { loading, data } = useQuery(
		GET_USER_SNIPPET_GROUPS,
		{
			variables: { userId: 1 }
		}
	);

	if (loading) return <p>Loading ...</p>;

	if (data && data.user.snippetGroups) {
		setSnippetGroups(data.user.snippetGroups);
	}

	return (<>
		{ snippetGroups.map(sg => (
			<SnippetGroupListItem snippetGroup={ sg } key={ sg.id }/>
		)) }
	</>);
}

export default SnippetGroupList;
