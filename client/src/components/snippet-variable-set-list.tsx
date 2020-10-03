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
import { sortByStringProp } from "../utils/array";
import EditableTextButton from "./editable-text-button/editable-text-button";
import { ListHighlight, ListHighlightType } from "../overmind/state";
import { NamedModel } from "../models/model";
import { useHotkeys } from "react-hotkeys-hook";

type SnippetVariableSetListProps = {
    onSelect: (id: number) => void;
    selected: number;
};

enum FetchSnippetVariablesReason {
    Delete,
    Initial,
}

const SnippetVariableSetList: FunctionComponent<SnippetVariableSetListProps> = ({
    onSelect: setSelectedSnippetVariableSet,
    selected: selectedSnippetVariableSet,
}) => {
    const {
        state: { editedSnippet, currentListHighlight },
        actions: {
            getSnippetVariableSets,
            updateSnippetVariableSet,
            createSnippetVariableSet,
            deleteSnippetVariableSet,
            setCurrentListHighlight,
            isItemHighlighted,
        },
    } = useOvermind();
    const [snippetVariableSets, setSnippetVariableSets] = useState<
        SnippetVariableSet[]
    >([]);

    const fetchSnippetVariableSets = useCallback(
        async (
            reason: FetchSnippetVariablesReason = FetchSnippetVariablesReason.Initial
        ) => {
            const oldIx: number =
                selectedSnippetVariableSet !== undefined
                    ? snippetVariableSets.findIndex(
                          (svs) => svs.id === selectedSnippetVariableSet
                      )
                    : 0;
            const sets = await getSnippetVariableSets(editedSnippet.id);
            setSnippetVariableSets(sets as SnippetVariableSet[]);
            if (sets.length) {
                if (reason === FetchSnippetVariablesReason.Initial) {
                    setSelectedSnippetVariableSet(sets[0].id);
                } else if (reason === FetchSnippetVariablesReason.Delete) {
                    setSelectedSnippetVariableSet(
                        sets[oldIx === 0 ? oldIx : oldIx - 1].id
                    );
                }
            } else {
                setSelectedSnippetVariableSet(undefined);
            }
        },
        [editedSnippet.id, snippetVariableSets, selectedSnippetVariableSet]
    );

    useEffect(() => {
        fetchSnippetVariableSets();
    }, [editedSnippet.id]);

    const onVariableSetClick = (e: MouseEvent, svs: SnippetVariableSet) => {
        setSelectedSnippetVariableSet(svs.id);
        setCurrentListHighlight({
            type: ListHighlightType.SnippetVariableSet,
            id: svs.id,
        });
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
        setSnippetVariableSets(
            sortByStringProp(newSnippetVariableSets, "name")
        );
    };

    const createVariableSet = () => {
        createSnippetVariableSet({
            fields: {
                snippetId: editedSnippet.id,
                name: "New variable set",
            },
        }).then(newSnippetVariableSet => {
            let newSnippetsVariableSets = snippetVariableSets.slice(0);
            newSnippetsVariableSets.unshift(newSnippetVariableSet);
            setSnippetVariableSets(newSnippetsVariableSets);
            setSelectedSnippetVariableSet(newSnippetVariableSet.id);
            setCurrentListHighlight({
                type: ListHighlightType.SnippetVariableSet,
                id: newSnippetVariableSet.id,
            });
        });
    };
    useHotkeys("ctrl+shift+option+n", createVariableSet, [currentListHighlight, snippetVariableSets.length]);

    const deleteSelectedVariableSet = () => {
        if (snippetVariableSets.length > 1 && currentListHighlight.type === ListHighlightType.SnippetVariableSet) {
            const selectedSnippetVariableSet = currentListHighlight.id;

            if (snippetVariableSets.some((s) => s.id === selectedSnippetVariableSet)) {
                deleteSnippetVariableSet({
                    snippetVariableSetId: selectedSnippetVariableSet,
                }).then(() => {
                    const oldIx: number = snippetVariableSets.findIndex((s) => s.id === selectedSnippetVariableSet);
                    let newSnippetsVariableSets = snippetVariableSets.slice();
                    newSnippetsVariableSets.splice(oldIx, 1);
                    setSnippetVariableSets(newSnippetsVariableSets);
                    setCurrentListHighlight({
                        type: ListHighlightType.SnippetVariableSet,
                        id: newSnippetsVariableSets[oldIx === 0 ? oldIx : oldIx - 1].id,
                    });
                });
            }
        }
    };
    useHotkeys("backspace", deleteSelectedVariableSet, [
        snippetVariableSets.length,
        currentListHighlight,
    ]);

    // const addSnippet = () => {
    //     if (
    //         (currentListHighlight.type === ListHighlightType.SnippetGroup &&
    //             currentListHighlight.id === snippetGroup.id) ||
    //         (currentListHighlight.type === ListHighlightType.Snippet &&
    //             snippets.some((s) => s.id === currentListHighlight.id))
    //     ) {
    //         createSnippet({
    //             fields: {
    //                 userId: userId,
    //                 snippetGroupId: snippetGroup.id,
    //                 language: "text",
    //                 name: "New snippet",
    //                 content: "",
    //             },
    //         }).then((newSnippet) => {
    //             let newSnippets = snippets.slice(0);
    //             newSnippets.unshift(newSnippet);
    //             setSnippets(newSnippets);
    //             setSelectedSnippet(newSnippet.id);
    //             if (newSnippets.length) {
    //                 setCurrentListHighlight({
    //                     type: ListHighlightType.Snippet,
    //                     id: newSnippet.id,
    //                 });
    //             } else {
    //                 setCurrentListHighlight({
    //                     type: ListHighlightType.SnippetGroup,
    //                     id: snippetGroup.id,
    //                 });
    //             }
    //             if (!isOpen) addExpandedGroup(snippetGroup.id);
    //         });
    //     }
    // };

    return (
        <div className="w-64 px-4 pt-2 border-r border-gray-700 flex flex-col">
            <div className="flex-1 overflow-auto">
                <div>
                    {snippetVariableSets.map((svs) => (
                        <EditableTextButton
                            isSelected={selectedSnippetVariableSet === svs.id}
                            isHighlighted={isItemHighlighted({
                                type: ListHighlightType.SnippetVariableSet,
                                id: svs.id
                            })}
                            onSelect={onVariableSetClick}
                            onTextChange={renameSnippetVariableSet}
                            model={svs}
                            key={svs.id}
                            className="pl-3"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SnippetVariableSetList;
