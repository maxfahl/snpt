import React, { FunctionComponent, MouseEvent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import { SnippetGroup } from "../models/snippet-group";
import ListItem from "./list-item";
import SimpleButton from "./simple-button";

const SnippetGroupList: FunctionComponent = () => {
    const {
        state: { selectedSnippetGroup },
        actions: {
            setSelectedSnippetGroup,
            getUserSnippetGroups,
            updateSnippetGroup,
        },
    } = useOvermind();
    const [snippetGroups, setSnippetGroups] = useState<SnippetGroup[]>([]);

    useEffect(() => {
        const fetchSnippetGroups = async () => {
            setSnippetGroups((await getUserSnippetGroups(1)) as SnippetGroup[]);
        };
        fetchSnippetGroups();
    }, []);

    const onGroupClick = (e: MouseEvent, sg: SnippetGroup) => {
        setSelectedSnippetGroup(sg.id);
    };

    const renameSnippetGroup = async (
        snippetGroup: SnippetGroup,
        newName: string
    ) => {
        await updateSnippetGroup({
            snippetGroupId: snippetGroup.id,
            fields: { name: newName },
        });

        let newSnippetGroups = snippetGroups.slice(0);
        let snippetGroupPos = snippetGroups.indexOf(snippetGroup);
        newSnippetGroups[snippetGroupPos].name = newName;
        setSnippetGroups(newSnippetGroups);
    };

    const createGroup = () => {};

    const deleteSelectedGroup = () => {};

    return (
        <div className="border-r border-gray-700 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col overflow-auto">
                {snippetGroups.map((sg) => (
                    <ListItem
                        isSelected={selectedSnippetGroup === sg.id}
                        onSelect={onGroupClick}
                        onTextChange={renameSnippetGroup}
                        model={sg}
                        key={sg.id}
                    />
                ))}
            </div>
            <div className="h-10 relative flex">
                <SimpleButton onClick={createGroup} className="bg-blue-800">
                    <span>+</span>
                </SimpleButton>
                <SimpleButton
                    onClick={deleteSelectedGroup}
                    className="bg-blue-800"
                >
                    <span>-</span>
                </SimpleButton>
            </div>
        </div>
    );
};

export default SnippetGroupList;
