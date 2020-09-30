import { Action, AsyncAction } from "overmind";
import { Snippet } from "../../models/snippet";
import { SnippetGroup } from "../../models/snippet-group";
import { SnippetVariable } from "../../models/snippet-variable";
import { UpdateSnippetVariableVariables } from "../effects/gql/graphql-types/UpdateSnippetVariable";
import { SnippetRunnerContext } from "../state";
import { CreateSnippetVariables } from "../effects/gql/graphql-types/CreateSnippet";
import { CreateSnippetGroupVariables } from "../effects/gql/graphql-types/CreateSnippetGroup";
import { UpdateSnippetGroupVariables } from "../effects/gql/graphql-types/UpdateSnippetGroup";
import { CreateSnippetVariableSetVariables } from "../effects/gql/graphql-types/CreateSnippetVariableSet";
import { SnippetVariableSet } from "../../models/snippet-variable-set";
import { UpdateSnippetVariableSetVariables } from "../effects/gql/graphql-types/UpdateSnippetVariableSet";

// State management

export const setSelectedSnippetGroup: Action<number> = (
    { state, actions },
    selectedId: number
) => {
    if (state.selectedSnippetGroup !== selectedId) {
        actions.setSelectedSnippet(0);
        state.selectedSnippetGroup = selectedId;
    }
};

export const setSelectedSnippet: Action<number> = (
    { state },
    selectedId: number
) => {
    if (state.selectedSnippet !== selectedId)
        state.selectedSnippet = selectedId;
};

export const setEditedSnippet: Action<Snippet> = ({ state }, snippet) => {
    state.editedSnippet = snippet;
};

export const setAvailableSnippetVariables: Action<string[]> = (
    { state },
    variables
) => {
    state.availableSnippetVariables = variables;
};

export const setSnippetRunnerContext: Action<SnippetRunnerContext> = (
    { state },
    context
) => {
    state.snippetRunnerContext = context;
};

// GraphQL queries

export const getUserSnippetGroups: AsyncAction<number, SnippetGroup[]> = async (
    { effects },
    userId
) => {
    const {
        user: { snippetGroups },
    } = await effects.gql.queries.userSnippetGroups({ userId });
    return snippetGroups as SnippetGroup[];
};

export const getSnippetGroupsSnippets: AsyncAction<number, Snippet[]> = async (
    { effects },
    snippetGroupId
) => {
    const {
        snippetGroup: { snippets },
    } = await effects.gql.queries.snippetGroupSnippets({ snippetGroupId });
    return snippets as Snippet[];
};

export const getSnippet: AsyncAction<number, Snippet> = async (
    { effects },
    snippetId
) => {
    const { snippet } = await effects.gql.queries.snippet({ snippetId });
    return snippet as Snippet;
};

export const getSnippetVariableSets: AsyncAction<
    number,
    SnippetVariableSet[]
> = async ({ effects }, snippetId) => {
    const {
        snippetVariableSets,
    } = await effects.gql.queries.snippetVariableSets({
        snippetId,
    });
    return snippetVariableSets as SnippetVariableSet[];
};

export const getSnippetVariables: AsyncAction<
    number,
    SnippetVariable[]
> = async ({ effects }, snippetVariableSetId) => {
    const { snippetVariables } = await effects.gql.queries.snippetVariables({
        snippetVariableSetId,
    });
    return snippetVariables as SnippetVariable[];
};

// GraphQL mutations

export const createSnippetGroup: AsyncAction<
    CreateSnippetGroupVariables,
    SnippetGroup
> = async ({ effects }, { fields }) => {
    const {
        createSnippetGroup: snippetGroup,
    } = await effects.gql.mutations.createSnippetGroup({
        fields,
    });
    return snippetGroup as SnippetGroup;
};

export const updateSnippetGroup: AsyncAction<
    UpdateSnippetGroupVariables,
    SnippetGroup
> = async ({ effects }, { snippetGroupId, fields }) => {
    const { updateSnippetGroup: snippetGroup } = await effects.gql.mutations.updateSnippetGroup({
        snippetGroupId,
        fields,
    });
    return snippetGroup as SnippetGroup;
};

export const deleteSnippetGroup: AsyncAction<
    any,
    number
> = async ({ effects }, { snippetGroupId }) => {
    const { deleteSnippetGroup } = await effects.gql.mutations.deleteSnippetGroup({
        snippetGroupId
    });
    return deleteSnippetGroup as number;
};

export const createSnippet: AsyncAction<
    CreateSnippetVariables,
    Snippet
> = async ({ effects }, { fields }) => {
    const {
        createSnippet: snippet,
    } = await effects.gql.mutations.createSnippet({ fields });
    return snippet as Snippet;
};

export const updateSnippet: AsyncAction<any, Snippet> = async (
    { effects },
    { snippetId, fields }
) => {
    const { snippet } = await effects.gql.mutations.updateSnippet({
        snippetId,
        fields,
    });
    return snippet as Snippet;
};

export const deleteSnippet: AsyncAction<
    any,
    number
    > = async ({ effects }, { snippetId }) => {
    const { deleteSnippet } = await effects.gql.mutations.deleteSnippet({
        snippetId
    });
    return deleteSnippet as number;
};

export const createSnippetVariableSet: AsyncAction<
    CreateSnippetVariableSetVariables,
    SnippetVariableSet
> = async ({ effects }, { fields }) => {
    const {
        createSnippetVariableSet: snippetVariableSet,
    } = await effects.gql.mutations.createSnippetVariableSet({ fields });
    return snippetVariableSet as SnippetVariableSet;
};

export const updateSnippetVariableSet: AsyncAction<
    UpdateSnippetVariableSetVariables,
    SnippetVariableSet
> = async ({ effects }, { snippetVariableSetId, fields }) => {
    const {
        snippetVariableSet,
    } = await effects.gql.mutations.updateSnippetVariableSet({
        snippetVariableSetId,
        fields,
    });
    return snippetVariableSet as SnippetVariableSet;
};

export const deleteSnippetVariableSet: AsyncAction<
    any,
    number
    > = async ({ effects }, { snippetVariableSetId }) => {
    const { deleteSnippetVariableSet } = await effects.gql.mutations.deleteSnippetVariableSet({
        snippetVariableSetId
    });
    return deleteSnippetVariableSet as number;
};

export const updateSnippetVariable: AsyncAction<
    UpdateSnippetVariableVariables,
    SnippetVariable
> = async ({ effects }, { snippetVariableId, fields }) => {
    const {
        updateSnippetVariable: snippetVariable,
    } = await effects.gql.mutations.updateSnippetVariable({
        snippetVariableId,
        fields,
    });
    return snippetVariable as SnippetVariable;
};

export const createMultipleSnippetVariables: AsyncAction<
    { snippetVariableSetId: number; variablesArray: { key: string }[] },
    SnippetVariable[]
> = async ({ effects }, { snippetVariableSetId, variablesArray }) => {
    const {
        createMultipleSnippetVariables: snippetVariables,
    } = await effects.gql.mutations.createMultipleSnippetVariables({
        snippetVariableSetId,
        variablesArray,
    });
    return snippetVariables as SnippetVariable[];
};
