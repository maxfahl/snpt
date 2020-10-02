import React, { FunctionComponent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import SnippetGroupLibraryItem from "./snippet-group-library-item";
import { SnippetGroup } from "../models/snippet-group";
import { sortByStringProp } from "../utils/array";

const Editor: FunctionComponent = () => {
    const {
        state: {},
        actions: { getSnippetGroups, updateSnippetGroup },
    } = useOvermind();
    const [snippetGroups, setSnippetGroups] = useState([]);

    useEffect(() => {
        const fetchSnippetGroups = async () => {
            setSnippetGroups(await getSnippetGroups(1));
        };
        fetchSnippetGroups();
    }, []);

    const groupNameChanged = async (
        snippetGroup: SnippetGroup,
        newName: string
    ) => {
        const oldIx = snippetGroups.indexOf(snippetGroup);
        await updateSnippetGroup({
            snippetGroupId: snippetGroup.id,
            fields: {
                name: newName,
            },
        });
        const newSnippetGroups = snippetGroups.slice();
        newSnippetGroups[oldIx].name = newName;
        setSnippetGroups(sortByStringProp(newSnippetGroups, "name"));
    };

    return (
        <div
            id="library"
            className="w-64 px-4 pt-2 border-r border-gray-700 flex flex-col" >
            {snippetGroups.map((sg) => (
                <SnippetGroupLibraryItem
                    snippetGroup={sg}
                    onNameChange={groupNameChanged}
                    key={sg.id}
                />
            ))}
        </div>
    );
};

export default Editor;
