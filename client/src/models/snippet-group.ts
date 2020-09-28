import { Snippet } from "./snippet";
import { NamedModel } from "./model";

export interface SnippetGroup extends NamedModel {
    id: number;
    name: string;
    snippets?: Snippet[];
}
