import { Snippet } from "../models/snippet";

export type Auth = {
	token: string;
}

export type State = {
	auth: Auth
	selectedSnippetGroup: number,
	selectedSnippet: number,
	editedSnippet: Snippet,
	availableSnippetVariables: string[]
};

export const state: State = {
	auth: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXhAZmFobC5zZSIsImlhdCI6MTYwMDk2NjM1NywiZXhwIjoxNjAxMDUyNzU3fQ.jxGjM16SrkXOCiNay4jhB_dzueNbQRZR6R87VUTqZco',
	},
	selectedSnippetGroup: 0,
	selectedSnippet: 0,
	editedSnippet: undefined,
	availableSnippetVariables: []
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
