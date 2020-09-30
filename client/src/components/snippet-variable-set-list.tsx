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

    const fetchSnippetVariableSets = useCallback(async () => {
        const sets = await getSnippetVariableSets(editedSnippet.id);
        setSnippetVariableSets(sets as SnippetVariableSet[]);
        if (sets.length) onSelect(sets[0].id);
    }, [editedSnippet.id]);

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
        if (selected !== undefined) {
            await deleteSnippetVariableSet({ snippetVariableSetId: selected });
            // onSelect(undefined);
            await fetchSnippetVariableSets();
        }
    };

    return (
        <div className="w-56 border-r border-gray-700 flex flex-col">
            <div className="flex-1 flex flex-col overflow-auto">
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
