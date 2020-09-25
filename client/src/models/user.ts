import { SnippetGroup } from "./snippet-group";
import { Model } from "./model";

export interface User extends Model {
	id: number;
	email: string;
	snippetGroups?: SnippetGroup[];
}
