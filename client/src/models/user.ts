import { SnippetGroup } from "./snippet-group";

export interface User {
	id: number;
	email: string;
	snippetGroups?: SnippetGroup[];
}
