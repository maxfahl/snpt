import { Snippet } from "./snippet";

export interface SnippetGroup {
	id: number;
	name: string;
	snippets?: Snippet[];
}
