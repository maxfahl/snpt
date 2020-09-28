import React, { FunctionComponent, MouseEvent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import ListItem from "./list-item";
import { SnippetVariableSet } from "../models/snippet-variable-set";
import SimpleButton from "./simple-button";
import { SnippetGroup } from "../models/snippet-group";

type SnippetVariableSetListProps = {
    onSelect: (id: number) => void;
    selected: number;
};

const SnippetVariableSetList: FunctionComponent<SnippetVariableSetListProps> = ({
    onSelect,
    selected
}) => {
    const {
        state: { editedSnippet },
        actions: { getSnippetVariableSets, updateSnippetVariableSet },
    } = useOvermind();
    const [snippetVariableSets, setSnippetVariableSets] = useState<SnippetVariableSet[]>([]);

    useEffect(() => {
        const fetchSnippetVariableSets = async () => {
            const sets = await getSnippetVariableSets(editedSnippet.id);
            setSnippetVariableSets((sets) as SnippetVariableSet[]);
            onSelect(sets[0].id)
        };
        fetchSnippetVariableSets();
    }, [editedSnippet.id]);

    const onVariableSetClick = (e: MouseEvent, svs: SnippetVariableSet) => {
        onSelect(svs.id);
    };

    const renameSnippetVariableSet = async (
        snippetVariableSet: SnippetVariableSet,
        newName: string
    ) => {
        // await updateSnippetVariableSet({
        //     snippetVariableSetId: snippetVariableSet.id,
        //     fields: { name: newName },
        // });
        //
        // editedSnippet.snippetVariableSets
        // let newSnippetGroups = snippetGroups.slice(0);
        // let snippetGroupPos = snippetGroups.indexOf(snippetGroup);
        // newSnippetGroups[snippetGroupPos].name = newName;
        // setSnippetGroups(newSnippetGroups);
    };

    const createVariable = (e: MouseEvent) => {};

    const deleteSelectedVariable = (e: MouseEvent) => {};

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
                <SimpleButton onClick={createVariable} className="bg-blue-800">
                    <span>+</span>
                </SimpleButton>
                <SimpleButton
                    onClick={deleteSelectedVariable}
                    className="bg-blue-800"
                >
                    <span>-</span>
                </SimpleButton>
            </div>
        </div>
    );
};

export default SnippetVariableSetList;
