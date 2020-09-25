import { SnippetVariable } from "./snippet-variable";

export interface SnippetVariableSet {
	id: number;
	name: string;
	snippetVariables?: SnippetVariable[];
}
