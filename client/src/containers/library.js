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

// export const snippets = atom({
// 	key: 'snippets',
// 	default: [],
// });

// const GET_USER_SNIPPET_GROUPS = gql`
//   query UserSnippetGroups($userId: Int!) {
//     user(userId: $userId) {
//       snippetGroups {
//       	id,
//       	name
//       }
//     }
//   }
// `;

// export const snippetGroupsSelector = selector({
// 	key: 'getSnippetGroups',
// 	get: (() => {
// 		return new Promise((resolve, reject) => {
// 			const client = useApolloClient();
// 			return client.query(
// 				{
// 					query: GET_USER_SNIPPET_GROUPS,
// 					fetchPolicy: 'network',
// 					variables: {
// 						userId: 1,
// 					}
// 				}
// 			).then(data => console.log(data));
//
// 			// console.log(useApolloClient());
// 			// const { loading, error } = useQuery(
// 			// 	GET_USER_SNIPPET_GROUPS,
// 			// 	{
// 			// 		variables: {
// 			// 			userId: 1,
// 			// 		},
// 			// 		// fetchPolicy: 'no-cache',
// 			// 		fetchPolicy: 'network',
// 			// 		nextFetchPolicy: 'network',
// 			// 		notifyOnNetworkStatusChange: true,
// 			// 		onCompleted: (data) => {
// 			// 			console.log(data);
// 			// 			resolve(data.user.snippetGroups);
// 			// 		},
// 			// 		onError: () => {
// 			// 			console.log('error');
// 			// 			reject();
// 			// 		}
// 			// 	}
// 			// );
// 			// // load();
// 		});
// 	})
// });

export default class Library extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	// componentDidMount() {
	// 	const { loading, error, data } = useQuery(GET_USER_SNIPPET_GROUPS, {
	// 		variables: { userId: 1 },
	// 	});
	// }

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
