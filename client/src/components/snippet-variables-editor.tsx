import React, { FunctionComponent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import * as _ from "lodash";
import SnippetVariableItem from "./snippet-variable-item";
import { SnippetVariable } from "../models/snippet-variable";

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

    const [previousVariableSet, setPreviousVariableSet] = useState();
    const [snippetVariables, setSnippetVariables] = useState();
    const [listSnippetVariables, setListSnippetVariables] = useState();
    const [
        runnableSnippetVariableKeys,
        setRunnableSnippetVariableKeys,
    ] = useState([]);

    useEffect(() => {
        const fetchSnippetVariables = async () => {
            const snippetVariables = await getSnippetVariables(
                selectedSnippetVariableSet
            );
            setSnippetVariables(snippetVariables);
        };

        if (!!selectedSnippetVariableSet) {
            if (previousVariableSet !== selectedSnippetVariableSet) {
                setListSnippetVariables(undefined);
                setSnippetVariables(undefined);
                fetchSnippetVariables();
                setPreviousVariableSet(selectedSnippetVariableSet);
            }
        }
    }, [selectedSnippetVariableSet]);

    useEffect(() => {
        const createAndFillSnippetVariables = async () => {
            const existingVariablesKeys = snippetVariables.map((sv) => sv.key);
            const variableKeysToCreate = _.without(
                availableSnippetVariables,
                ...existingVariablesKeys
            ) as string[];
            const variablesArray = variableKeysToCreate.map((varKey) => {
                return { key: varKey, value: "" };
            });
            const addedSnippets = await createMultipleSnippetVariables({
                snippetVariableSetId: selectedSnippetVariableSet,
                variablesArray,
            });
            setSnippetVariables([...snippetVariables, ...addedSnippets]);
        };
        if (
            !!snippetVariables &&
            previousVariableSet === selectedSnippetVariableSet
        )
            createAndFillSnippetVariables();
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
            } else setListSnippetVariables(undefined);
        };
        buildListSnippetRunnerContext();
    }, [snippetVariables]);

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
        <div className="flex-1 flex flex-col overflow-auto" style={{}}>
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
    );
};

export default SnippetVariablesEditor;
