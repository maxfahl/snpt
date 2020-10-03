import React, { FunctionComponent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import SnippetGroupLibraryItem from "./snippet-group-library-item";
import { SnippetGroup } from "../models/snippet-group";
import { sortByStringProp } from "../utils/array";
import { useHotkeys } from "react-hotkeys-hook";
import { setCurrentListHighlight } from "../overmind/actions";
import { ListHighlightType } from "../overmind/state";
import produce from "immer";

const Editor: FunctionComponent = () => {
    const {
        state: {
            auth: {
                user: { id: userId },
            },
            currentListHighlight,
            expandedGroups,
        },
        actions: {
            getSnippetGroups,
            updateSnippetGroup,
            createSnippetGroup,
            deleteSnippetGroup,
            setCurrentListHighlight,
            removeExpandedGroup,
            setSelectedSnippet,
        },
    } = useOvermind();
    const [snippetGroups, setSnippetGroups] = useState([]);
    const [snippetGroupsChildren, setSnippetGroupsChildren] = useState<
        Map<number, number[]>
    >(new Map());

    useEffect(() => {
        const fetchSnippetGroups = async () => {
            const snippetGroups = await getSnippetGroups(1);
            setSnippetGroups(snippetGroups);
            if (snippetGroups.length) {
                setCurrentListHighlight({
                    type: ListHighlightType.SnippetGroup,
                    id: snippetGroups[0].id,
                });
            }
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
                type: ListHighlightType.SnippetGroup,
                id: newGroup.id,
            });
        });
    };
    useHotkeys("ctrl+shift+n", addSnippetGroup, [snippetGroups]);

    const deleteSelectedGroup = () => {
        if (currentListHighlight.type === ListHighlightType.SnippetGroup) {
            const selectedSnippetGroup = currentListHighlight.id;

            deleteSnippetGroup({ snippetGroupId: selectedSnippetGroup }).then(
                () => {
                    if (expandedGroups.includes(selectedSnippetGroup))
                        removeExpandedGroup(selectedSnippetGroup);

                    const oldIx: number = !!selectedSnippetGroup
                        ? snippetGroups.findIndex(
                              (sg) => sg.id === selectedSnippetGroup
                          )
                        : 0;
                    let newSnippetGroups = snippetGroups.slice();
                    newSnippetGroups.splice(oldIx, 1);
                    setSnippetGroups(newSnippetGroups);

                    if (snippetGroupsChildren.get(selectedSnippetGroup)) {
                        setSnippetGroupsChildren(
                            produce(snippetGroupsChildren, (draft) => {
                                draft.delete(selectedSnippetGroup);
                            })
                        );
                    }

                    if (newSnippetGroups.length) {
                        setCurrentListHighlight({
                            type: ListHighlightType.SnippetGroup,
                            id:
                                newSnippetGroups[
                                    oldIx === 0 ? oldIx : oldIx - 1
                                ].id,
                        });
                    } else {
                        setCurrentListHighlight(undefined);
                    }
                }
            );
        }
    };
    useHotkeys("backspace", deleteSelectedGroup, [
        snippetGroups,
        currentListHighlight,
        expandedGroups
    ]);

    const highlightAndSelectSnippet = snippetId => {
        setSelectedSnippet(snippetId);
        setCurrentListHighlight({
            type: ListHighlightType.Snippet,
            id: snippetId
        })
    };

    const navigateList = (keyboardEvent: KeyboardEvent) => {
        if (currentListHighlight.type === ListHighlightType.SnippetGroup) {
            const oldIx: number = snippetGroups.findIndex(
                (s) => s.id === currentListHighlight.id
            );
            if (oldIx !== -1) {
                const navUp = keyboardEvent.code === "ArrowUp";

                const eventualNextIx = Math.min(
                    snippetGroups.length - 1,
                    Math.max(0, oldIx + (navUp ? -1 : 1))
                );
                const eventualNextGroupId = snippetGroups[eventualNextIx].id;

                const currentGroupSnippetIds = snippetGroupsChildren.get(currentListHighlight.id);
                const prevGroupSnippetIds = snippetGroupsChildren.get(eventualNextGroupId);

                if (
                    !navUp &&
                    expandedGroups.includes(currentListHighlight.id) &&
                    currentGroupSnippetIds.length
                ) {
                    highlightAndSelectSnippet(currentGroupSnippetIds[0]);
                } else if (
                    oldIx !== 0 &&
                    navUp &&
                    expandedGroups.includes(eventualNextGroupId) &&
                    prevGroupSnippetIds.length
                ) {
                    highlightAndSelectSnippet(prevGroupSnippetIds[prevGroupSnippetIds.length - 1]);
                } else {
                    setCurrentListHighlight({
                        type: ListHighlightType.SnippetGroup,
                        id: eventualNextGroupId,
                    });
                }
            }
        }
    };
    useHotkeys("up,down", navigateList, [
        currentListHighlight,
        snippetGroupsChildren,
        snippetGroups,
        expandedGroups
    ]);

    const navigateOutFromGroup = (
        snippetGroup: SnippetGroup,
        up: boolean
    ): void => {
        const currentGroupIx = snippetGroups.indexOf(snippetGroup);
        const nextIx = Math.min(snippetGroups.length - 1, Math.max(0, currentGroupIx + (up ? 0 : 1)));
        if (up || (!up && currentGroupIx !== nextIx)) {
            setCurrentListHighlight({
                type: ListHighlightType.SnippetGroup,
                id: snippetGroups[nextIx].id,
            });
        }
    };

    const groupChildrenChange = (
        snippetGroup: SnippetGroup,
        snippetIds: number[]
    ) => {
        setSnippetGroupsChildren(
            produce(snippetGroupsChildren, (draft) => {
                draft.set(snippetGroup.id, snippetIds);
            })
        );
    };

    return (
        <div
            id="library"
            className="w-64 px-4 py-3 border-r border-gray-700 overflow-auto"
        >
            {snippetGroups.map((sg) => (
                <SnippetGroupLibraryItem
                    snippetGroup={sg}
                    onNameChange={groupNameChanged}
                    notifyChildrenIds={groupChildrenChange}
                    navigateOut={navigateOutFromGroup}
                    key={sg.id}
                />
            ))}
        </div>
    );
};

export default Editor;
