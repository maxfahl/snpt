import { Snippet } from "../models/snippet";
import { SnippetVariable } from "../models/snippet-variable";

export type Auth = {
    token: string;
    user: {
        id: number;
    }
};

export type SnippetRunnerContext = {
    code: string;
    variables: SnippetVariable[];
};

export type State = {
    auth: Auth;
    selectedSnippetGroup: number;
    selectedSnippet: number;
    editedSnippet: Snippet;
    availableSnippetVariables: string[];
    snippetRunnerContext: SnippetRunnerContext;
};

export const state: State = {
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXhAZmFobC5zZSIsImlhdCI6MTYwMTM2MzAxNSwiZXhwIjoxNjAxNDQ5NDE1fQ.ZVfPOvMBNC5eRF1S6lD7aejiL5sMNMIeQoZW9RiXBHc",
        user: {
            id: 1
        }
    },
    selectedSnippetGroup: 0,
    selectedSnippet: 0,
    editedSnippet: undefined,
    availableSnippetVariables: [],
    snippetRunnerContext: undefined,
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
