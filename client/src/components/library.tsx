import React, { FunctionComponent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import SnippetGroupLibraryItem from "./snippet-group-library-item";
import { SnippetGroup } from "../models/snippet-group";
import { sortByStringProp } from "../utils/array";
import { useHotkeys } from "react-hotkeys-hook";
import { addExpandedGroup, setCurrentListHighlight } from "../overmind/actions";
import { ListHighlightType } from "../overmind/state";

const Editor: FunctionComponent = () => {
    const {
        state: {
            auth: {
                user: { id: userId },
            },
            currentListHighlight,
        },
        actions: {
            getSnippetGroups,
            updateSnippetGroup,
            createSnippetGroup,
            deleteSnippetGroup,
            setCurrentListHighlight,
        },
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

    const addSnippetGroup = () => {
        createSnippetGroup({
            fields: {
                userId: userId,
                name: "New group",
            },
        }).then((newGroup) => {
            let newSnippetGroups = snippetGroups.slice();
            newSnippetGroups.unshift(newGroup);
            setSnippetGroups(newSnippetGroups);
            setCurrentListHighlight({
                type: ListHighlightType.SnippetVariableSet,
                id: newGroup.id
            });
        });
    };
    useHotkeys("ctrl+shift+n", addSnippetGroup, [snippetGroups.length]);

    const deleteSelectedGroup = () => {
        if (currentListHighlight.type === ListHighlightType.SnippetGroup) {
            const selectedSnippetGroup = currentListHighlight.id;

            deleteSnippetGroup({ snippetGroupId: selectedSnippetGroup }).then(
                () => {
                    const oldIx: number = !!selectedSnippetGroup
                        ? snippetGroups.findIndex(
                              (sg) => sg.id === selectedSnippetGroup
                          )
                        : 0;
                    let newSnippetGroups = snippetGroups.slice();
                    newSnippetGroups.splice(oldIx, 1);
                    setSnippetGroups(newSnippetGroups);
                    if (newSnippetGroups.length) {
                        setCurrentListHighlight({
                            type: ListHighlightType.SnippetGroup,
                            id:
                                newSnippetGroups[
                                    oldIx === 0 ? oldIx : oldIx - 1
                                ].id,
                        });
                    }
                }
            );
        }
    };
    useHotkeys("backspace", deleteSelectedGroup, [
        snippetGroups.length,
        currentListHighlight,
    ]);

    return (
        <div
            id="library"
            className="w-64 px-4 pt-2 border-r border-gray-700 overflow-auto"
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
