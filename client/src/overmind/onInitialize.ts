export const onInitialize = ({ state, effects }, instance) => {
	const previouslySelectedSnippetGroup = localStorage.getItem('selectedSnippetGroup');
	if (!!previouslySelectedSnippetGroup) {
		state.selectedSnippetGroup = +previouslySelectedSnippetGroup;
		const previouslySelectedSnippet = localStorage.getItem('selectedSnippet');
		if (!!previouslySelectedSnippet)
			state.selectedSnippet = +previouslySelectedSnippet;
	}

	instance.reaction(
		({ selectedSnippetGroup }) => selectedSnippetGroup,
		(selectedSnippetGroup) => localStorage.setItem('selectedSnippetGroup', selectedSnippetGroup.toString()),
		{
			nested: false
		}
	);
	instance.reaction(
		({ selectedSnippet }) => selectedSnippet,
		(selectedSnippet) => localStorage.setItem('selectedSnippet', selectedSnippet.toString()),
		{
			nested: false
		}
	);

	effects.gql.initialize({
		endpoint: 'http://localhost:3001',
		headers: () => ({
			authorization: `Bearer ${state.auth.token}`
		}),
	}, {
		endpoint: 'ws://localhost:3001',
		params: () => ({
			token: state.auth.token
		})
	})
};
