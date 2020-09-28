import React, { FunctionComponent, MouseEvent } from "react";
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
    selected
}) => {
    const {
        state: { editedSnippet },
        actions: { updateSnippetVariableSet },
    } = useOvermind();

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
                {editedSnippet.snippetVariableSets.map((svs) => (
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
