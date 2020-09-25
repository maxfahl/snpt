import { SnippetVariableSet } from "./snippet-variable-set";

export interface Snippet {
	id: number;
	name: string;
	language: string;
	content?: string;
	snippetVariableSets?: SnippetVariableSet[];
}
