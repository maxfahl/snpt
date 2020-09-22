import { Action } from "overmind";

export const setSelectedSnippetGroup: Action<number> = ({ state }, selectedId: number) => {
	state.selectedSnippetGroup = selectedId;
};

export const setSelectedSnippet: Action<number> = ({ state }, selectedId: number) => {
	state.selectedSnippet = selectedId;
};
