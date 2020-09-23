import { Snippet } from "../models/snippet";

export type Auth = {
	token: string;
}

export type State = {
	auth: Auth
	selectedSnippetGroup: number,
	selectedSnippet: number,
	editedSnippet: Snippet
};

export const state: State = {
	auth: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXhAZmFobC5zZSIsImlhdCI6MTYwMDg2OTUzMSwiZXhwIjoxNjAwOTU1OTMxfQ.DOuB5ueAQJ3gDNtkI7vIeJAEeHZrK10wJVI0u2F1XWQ',
	},
	selectedSnippetGroup: 0,
	selectedSnippet: 0,
	editedSnippet: undefined,
};

/**
 export const state: State = {
	currentTodos: derived(({ todos, filter }: State) => {
		return Object.values(todos).filter(todo => {
			switch (filter) {
			case 'active':
				return !todo.completed;
			case 'completed':
				return todo.completed;
			default:
				return true;
			}
		});
	}),
	activeTodoCount: derived(({ todos }: State) => {
		return Object.values(todos).filter(todo => !todo.completed).length;
	}),
	hasCompletedTodos: derived(({ todos }: State) => {
		return Object.values(todos).some(todo => todo.completed);
	}),
	isAllTodosChecked: derived(({ currentTodos }: State) => {
		return currentTodos.every(todo => todo.completed);
	}),
};
 */
