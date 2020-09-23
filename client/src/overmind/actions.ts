import { Action } from "overmind";

export const setSelectedSnippetGroup: Action<number> = ({ state }, selectedId: number) => {
	state.selectedSnippetGroup = selectedId;
};

export const setSelectedSnippet: Action<number> = ({ state }, selectedId: number) => {
	state.selectedSnippet = selectedId;
};

export const getUserSnippetGroups = async ({ state, effects }, userId) => {
	console.log(effects.gql);
	const { user: { snippetGroups } } = await effects.gql.queries.userSnippetGroups({userId});
	return snippetGroups;
};

export const getSnippetGroupsSnippets = async ({ state, effects },snippetGroupId) => {
	const { snippetGroup: { snippets } } = await effects.gql.queries.snippetGroupSnippets({snippetGroupId});
	return snippets;
};
