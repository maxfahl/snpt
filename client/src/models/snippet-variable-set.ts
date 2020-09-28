import { SnippetVariable } from "./snippet-variable";
import { NamedModel } from "./model";

export interface SnippetVariableSet extends NamedModel {
    id: number;
    name: string;
    snippetVariables?: SnippetVariable[];
}
