import { Snippet } from "../models/snippet";
import { SnippetVariable } from "../models/snippet-variable";
import { NamedModel } from "../models/model";

export type Auth = {
    token: string;
    user: {
        id: number;
    }
};

export enum ListHighlightType {
    SnippetGroup,
    Snippet,
    SnippetVariableSet
}

export type ListHighlight = {
    type: ListHighlightType;
    id: number;
}

export type SnippetRunnerContext = {
    code: string;
    variables: SnippetVariable[];
};

export type State = {
    auth: Auth;
    expandedGroups: number[],
    selectedSnippet: number;
    currentListHighlight: ListHighlight;
    editedSnippet: Snippet;
    availableSnippetVariables: string[];
    snippetRunnerContext: SnippetRunnerContext;
};

export const state: State = {
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXhAZmFobC5zZSIsImlhdCI6MTYwMTQ0OTUzOSwiZXhwIjoxNjAxNTM1OTM5fQ.yNvuTveJBgfhkTyUCMN-Tc0D2f7dvJ2yNlbpkwrLvU0",
        user: {
            id: 1
        }
    },
    expandedGroups: [],
    selectedSnippet: 0,
    currentListHighlight: undefined,
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
