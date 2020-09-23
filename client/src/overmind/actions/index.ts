import { Action, AsyncAction } from "overmind";
import { Snippet } from "../../models/snippet";
import { SnippetGroup } from "../../models/snippet-group";

export const setSelectedSnippetGroup: Action<number> = ({ state, actions }, selectedId: number) => {
	const toSelect = state.selectedSnippetGroup === selectedId ? 0 : selectedId;
	actions.setSelectedSnippet(0);
	state.selectedSnippetGroup = toSelect;
};

export const setSelectedSnippet: Action<number> = ({ state }, selectedId: number) => {
	state.selectedSnippet = state.selectedSnippet === selectedId ? 0 : selectedId;
};

export const setEditedSnippet: Action<Snippet> = ({ state }, snippet) => {
	state.editedSnippet = snippet;
};

export const getUserSnippetGroups: AsyncAction<number, SnippetGroup[]> = async ({ effects }, userId) => {
	const { user: { snippetGroups } } = await effects.gql.queries.userSnippetGroups({ userId });
	return snippetGroups as SnippetGroup[];
};

export const getSnippetGroupsSnippets: AsyncAction<number, Snippet[]> = async ({ effects }, snippetGroupId) => {
	const { snippetGroup: { snippets } } = await effects.gql.queries.snippetGroupSnippets({ snippetGroupId });
	return snippets as Snippet[];
};

export const getSnippet: AsyncAction<number, Snippet> = async ({ effects }, snippetId) => {
	const { snippet } = await effects.gql.queries.snippet({ snippetId });
	return snippet as Snippet;
};

