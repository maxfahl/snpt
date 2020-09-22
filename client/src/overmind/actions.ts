import { Action } from "overmind";

export const setSelectedSnipperGroup: Action<number> = ({ state }, selectedId: number) => {
	state.selectedSnippetGroup = selectedId;
};
