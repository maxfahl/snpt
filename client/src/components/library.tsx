import React, { FunctionComponent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import SnippetGroupLibraryItem from "./snippet-group-library-item";
import { SnippetGroup } from "../models/snippet-group";
import { sortByStringProp } from "../utils/array";
import { snippet } from "../overmind/effects/gql/queries";
import { Snippet } from "../models/snippet";
import { string } from "prop-types";

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
            className="px-4 pt-2 border-r border-gray-700 flex flex-col"
            style={{ width: "18rem" }}
        >
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
