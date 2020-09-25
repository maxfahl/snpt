import { SnippetVariableSet } from "./snippet-variable-set";
import { NamedModel } from "./model";

export interface Snippet extends NamedModel {
	id: number;
	name: string;
	language: string;
	content?: string;
	snippetVariableSets?: SnippetVariableSet[];
}
