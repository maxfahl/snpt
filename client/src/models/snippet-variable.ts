import { Model } from "./model";

export interface SnippetVariable extends Model {
	id: number;
	key: string;
	value?: string;
}
