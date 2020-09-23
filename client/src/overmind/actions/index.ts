import { Action, AsyncAction } from "overmind";
import { Snippet } from "../../models/snippet";
import { SnippetGroup } from "../../models/snippet-group";

export const setSelectedSnippetGroup: Action<number> = ({ state, actions }, selectedId: number) => {
	const toSelect = state.selectedSnippetGroup === selectedId ? 0 : selectedId;
	// localStorage.setItem('selectedSnippetGroup', toSelect.toString());
	actions.setSelectedSnippet(0);
	state.selectedSnippetGroup = toSelect;
};

export const setSelectedSnippet: Action<number> = ({ state }, selectedId: number) => {
	const toSelect = state.selectedSnippet === selectedId ? 0 : selectedId;
	// localStorage.setItem('selectedSnippet', toSelect.toString());
	state.selectedSnippet = toSelect;
};

export const getUserSnippetGroups: AsyncAction<number, SnippetGroup[]> = async ({ effects }, userId) => {
	// @ts-ignore
	const { user: { snippetGroups } } = await effects.gql.queries.userSnippetGroups({ userId });
	return snippetGroups as SnippetGroup[];
};

export const getSnippetGroupsSnippets: AsyncAction<number, Snippet[]> = async ({ effects }, snippetGroupId) => {
	const { snippetGroup: { snippets } } = await effects.gql.queries.snippetGroupSnippets({ snippetGroupId });
	return snippets as Snippet[];
};
