import React, {
    FunctionComponent,
    MouseEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useOvermind } from "../overmind";
import ListItem from "./list-item";
import { SnippetVariableSet } from "../models/snippet-variable-set";
import SimpleButton from "./simple-button";

type SnippetVariableSetListProps = {
    onSelect: (id: number) => void;
    selected: number;
};

enum FetchSnippetVariablesReason {
    Delete,
    Initial
}

const SnippetVariableSetList: FunctionComponent<SnippetVariableSetListProps> = ({
    onSelect,
    selected,
}) => {
    const {
        state: { editedSnippet },
        actions: {
            getSnippetVariableSets,
            updateSnippetVariableSet,
            createSnippetVariableSet,
            deleteSnippetVariableSet,
        },
    } = useOvermind();
    const [snippetVariableSets, setSnippetVariableSets] = useState<
        SnippetVariableSet[]
    >([]);

    const fetchSnippetVariableSets = useCallback(
        async (reason: FetchSnippetVariablesReason = FetchSnippetVariablesReason.Initial) => {
            const oldIx: number = selected !== undefined ? snippetVariableSets.findIndex(svs => svs.id === selected) : 0;
            const sets = await getSnippetVariableSets(editedSnippet.id);
            setSnippetVariableSets(sets as SnippetVariableSet[]);
            if (sets.length) {
                if (reason === FetchSnippetVariablesReason.Initial) {
                    onSelect(sets[0].id);
                }
                else if (reason === FetchSnippetVariablesReason.Delete) {
                    onSelect(sets[oldIx === 0 ? oldIx : oldIx - 1].id);
                }
            } else {
                onSelect(undefined);
            }
        },
        [editedSnippet.id, snippetVariableSets, selected]
    );

    useEffect(() => {
        fetchSnippetVariableSets();
    }, [editedSnippet.id]);

    const onVariableSetClick = (e: MouseEvent, svs: SnippetVariableSet) => {
        onSelect(svs.id);
    };

    const renameSnippetVariableSet = async (
        snippetVariableSet: SnippetVariableSet,
        newName: string
    ) => {
        await updateSnippetVariableSet({
            snippetVariableSetId: snippetVariableSet.id,
            fields: { name: newName },
        });

        let newSnippetVariableSets = snippetVariableSets.slice(0);
        let snippetVariableSetPos = snippetVariableSets.indexOf(
            snippetVariableSet
        );
        newSnippetVariableSets[snippetVariableSetPos].name = newName;
        setSnippetVariableSets(newSnippetVariableSets);
    };

    const doCreateVariableSet = async () => {
        const newSnippetVariableSet = await createSnippetVariableSet({
            fields: {
                snippetId: editedSnippet.id,
                name: "New variable set",
            },
        });

        let newSnippetsVariableSets = snippetVariableSets.slice(0);
        newSnippetsVariableSets.push(newSnippetVariableSet);
        setSnippetVariableSets(newSnippetsVariableSets);
        onSelect(newSnippetVariableSet.id);
    };

    const doDeleteSelectedVariableSet = async (e) => {
        if (selected !== undefined && snippetVariableSets.length > 1) {
            await deleteSnippetVariableSet({ snippetVariableSetId: selected });
            await fetchSnippetVariableSets(FetchSnippetVariablesReason.Delete);
        }
    };

    return (
        <div className="w-56 border-r border-gray-700 flex flex-col">
            <div className="flex-1 overflow-auto">
                <div>
                    {snippetVariableSets.map((svs) => (
                        <ListItem
                            isSelected={selected === svs.id}
                            onSelect={onVariableSetClick}
                            onTextChange={renameSnippetVariableSet}
                            model={svs}
                            key={svs.id}
                        />
                    ))}
                </div>
            </div>
            <div className="h-10 relative flex">
                <SimpleButton
                    onClick={doCreateVariableSet}
                    className="bg-blue-800"
                >
                    <span>+</span>
                </SimpleButton>
                <SimpleButton
                    onClick={doDeleteSelectedVariableSet}
                    className="bg-blue-800"
                >
                    <span>-</span>
                </SimpleButton>
            </div>
        </div>
    );
};

export default SnippetVariableSetList;
