import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import * as _ from "lodash";
import SnippetVariableItem from "./snippet-variable-item";
import { SnippetVariable } from "../models/snippet-variable";
import { SnippetVariableSet } from "../models/snippet-variable-set";

type SnippetVariablesEditorProps = {
    selectedSnippetVariableSet: number;
};

const SnippetVariablesEditor: FunctionComponent<SnippetVariablesEditorProps> = ({
    selectedSnippetVariableSet,
}) => {
    const {
        state: { editedSnippet, availableSnippetVariables },
        actions: {
            getSnippetVariables,
            createMultipleSnippetVariables,
            updateSnippetVariable,
            setSnippetRunnerContext,
        },
    } = useOvermind();

    const [
        triedToFillVariablesForSnippet,
        setTriedToFillVariablesForSnippet,
    ] = useState<number>();
    const [snippetVariables, setSnippetVariables] = useState<
        SnippetVariable[]
    >();
    const [listSnippetVariables, setListSnippetVariables] = useState<
        SnippetVariable[]
    >();
    const [
        runnableSnippetVariableKeys,
        setRunnableSnippetVariableKeys,
    ] = useState([]);

    const createAndFillSnippetVariables = useCallback(
        async (existingVariables = snippetVariables) => {
                const existingVariablesKeys = existingVariables.map((sv) => sv.key);
                const variableKeysToCreate = _.without(
                    availableSnippetVariables,
                    ...existingVariablesKeys
                ) as string[];

                if (variableKeysToCreate.length) {
                    const variablesArray = variableKeysToCreate.map((varKey) => {
                        return { key: varKey, value: "" };
                    });
                    const addedSnippets = await createMultipleSnippetVariables({
                        snippetVariableSetId: selectedSnippetVariableSet,
                        variablesArray,
                    });
                    setSnippetVariables([...existingVariables, ...addedSnippets]);
                }
        },
        [availableSnippetVariables, selectedSnippetVariableSet]
    );

    useEffect(() => {
        const fetchSnippetVariables = async () => {
            const fetchedSnippetVariables = await getSnippetVariables(
                selectedSnippetVariableSet
            );

            await setSnippetVariables(fetchedSnippetVariables);
            await createAndFillSnippetVariables(fetchedSnippetVariables);
        };

        if (!!selectedSnippetVariableSet) {
            setListSnippetVariables(undefined);
            fetchSnippetVariables();
        }
    }, [selectedSnippetVariableSet]);

    useEffect(() => {
        /**
         * Only fill snippet variables the second time this is called with
         * the same edited snippet.
         */
        if (
            !!snippetVariables &&
            triedToFillVariablesForSnippet === editedSnippet.id
        ) {
            createAndFillSnippetVariables();
        }
        setTriedToFillVariablesForSnippet(editedSnippet.id);
    }, [availableSnippetVariables]);

    useEffect(() => {
        const buildListSnippetRunnerContext = () => {
            if (snippetVariables) {
                const runnableSnippetVariables = snippetVariables.filter((sv) =>
                    availableSnippetVariables.includes(sv.key)
                );
                const runnableSnippetVariableKeys = runnableSnippetVariables.map(
                    (sv) => sv.key
                );
                setRunnableSnippetVariableKeys(runnableSnippetVariableKeys);
                setSnippetRunnerContext({
                    code: editedSnippet.content,
                    variables: runnableSnippetVariables,
                });

                const listSnippetVariables = snippetVariables
                    .slice(0)
                    .sort((a, b) => a.key.localeCompare(b.key))
                    .sort((a, b) => {
                        const aIsViable = runnableSnippetVariableKeys.includes(
                            a.key
                        );
                        const bIsViable = runnableSnippetVariableKeys.includes(
                            b.key
                        );
                        return aIsViable === bIsViable ? 0 : aIsViable ? -1 : 1;
                    });

                setListSnippetVariables(listSnippetVariables);
            } else {
                setListSnippetVariables(undefined);
            }
        };
        buildListSnippetRunnerContext();
    }, [snippetVariables, availableSnippetVariables]);

    const onSnippetChange = async (
        snippetVariable: SnippetVariable,
        newValue: string
    ) => {
        const updatedSnippetVariable = await updateSnippetVariable({
            snippetVariableId: snippetVariable.id,
            fields: {
                key: snippetVariable.key,
                value: newValue,
            },
        });
        setSnippetVariables((oldSnippetVariables) => {
            return oldSnippetVariables.map((sv) => {
                if (sv.id === updatedSnippetVariable.id)
                    return updatedSnippetVariable;
                return sv;
            });
        });
    };

    return (
        <div className="flex-1 overflow-auto" style={{}}>
            <div>
                {listSnippetVariables &&
                    listSnippetVariables.map((sv) => (
                        <SnippetVariableItem
                            key={sv.id}
                            snippetVariable={sv}
                            runnable={runnableSnippetVariableKeys.includes(sv.key)}
                            onChange={onSnippetChange}
                        />
                    ))}
            </div>
        </div>
    );
};

export default SnippetVariablesEditor;
