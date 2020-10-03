import React, { FunctionComponent, useEffect, useState } from "react";
import { SnippetGroup } from "../models/snippet-group";
import { useOvermind } from "../overmind";
import { Snippet } from "../models/snippet";
import { AnimatePresence, motion } from "framer-motion";
import { ListHighlightType } from "../overmind/state";
import EditableTextButton from "./editable-text-button/editable-text-button";
import { sortByStringProp } from "../utils/array";
import { useHotkeys } from "react-hotkeys-hook";

type SnippetGroupLibraryItemProps = {
    snippetGroup: SnippetGroup;
    onNameChange: (snippetGroup: SnippetGroup, newName: string) => void;
};

const SnippetGroupLibraryItem: FunctionComponent<SnippetGroupLibraryItemProps> = ({
    snippetGroup,
    onNameChange,
}) => {
    const {
        state: {
            selectedSnippet,
            currentListHighlight,
            expandedGroups,
            auth: {
                user: { id: userId },
            },
        },
        actions: {
            setCurrentListHighlight,
            addExpandedGroup,
            removeExpandedGroup,
            setSelectedSnippet,
            getSnippets,
            updateSnippet,
            isItemHighlighted,
            createSnippet,
            deleteSnippet,
        },
    } = useOvermind();
    const [isOpen, setIsOpen] = useState<boolean>();
    const [snippets, setSnippets] = useState([]);

    useEffect(() => {
        const fetchSnippets = async () => {
            setSnippets(await getSnippets(snippetGroup.id));
        };
        fetchSnippets();
    }, []);

    useEffect(() => {
        if (expandedGroups) setIsOpen(expandedGroups.includes(snippetGroup.id));
    }, [expandedGroups.length]);

    const onGroupClick = () => {
        if (!isOpen) addExpandedGroup(snippetGroup.id);
        else removeExpandedGroup(snippetGroup.id);
        setCurrentListHighlight({
            type: ListHighlightType.SnippetGroup,
            id: snippetGroup.id,
        });
    };

    const onSnippetClick = (snippetId: number) => {
        setSelectedSnippet(snippetId);
        setCurrentListHighlight({
            type: ListHighlightType.Snippet,
            id: snippetId,
        });
    };

    const snippetNameChange = async (snippet: Snippet, newName: string) => {
        const oldIx = snippets.indexOf(snippet);
        await updateSnippet({
            snippetId: snippet.id,
            fields: {
                name: newName,
            },
        });
        const newSnippets = snippets.slice();
        newSnippets[oldIx].name = newName;
        setSnippets(sortByStringProp(newSnippets, "name"));
    };

    const addSnippet = () => {
        if (
            (currentListHighlight.type === ListHighlightType.SnippetGroup &&
                currentListHighlight.id === snippetGroup.id) ||
            (currentListHighlight.type === ListHighlightType.Snippet &&
                snippets.some((s) => s.id === currentListHighlight.id))
        ) {
            createSnippet({
                fields: {
                    userId: userId,
                    snippetGroupId: snippetGroup.id,
                    language: "text",
                    name: "New snippet",
                    content: "",
                },
            }).then((newSnippet) => {
                let newSnippets = snippets.slice(0);
                newSnippets.unshift(newSnippet);
                setSnippets(newSnippets);
                setSelectedSnippet(newSnippet.id);
                setCurrentListHighlight({
                    type: ListHighlightType.Snippet,
                    id: newSnippet.id,
                });
                if (!isOpen) addExpandedGroup(snippetGroup.id);
            });
        }
    };
    useHotkeys("ctrl+n", addSnippet, [currentListHighlight, isOpen, snippets.length]);

    const deleteSelectedSnippet = () => {
        if (currentListHighlight.type === ListHighlightType.Snippet) {
            const selectedSnippet = currentListHighlight.id;

            if (snippets.some((s) => s.id === selectedSnippet)) {
                deleteSnippet({ snippetId: selectedSnippet }).then(() => {
                    const oldIx: number = snippets.findIndex((s) => s.id === selectedSnippet);
                    let newSnippets = snippets.slice();
                    newSnippets.splice(oldIx, 1);
                    setSnippets(newSnippets);
                    if (newSnippets.length) {
                        setCurrentListHighlight({
                            type: ListHighlightType.Snippet,
                            id: newSnippets[oldIx === 0 ? oldIx : oldIx - 1].id,
                        });
                    } else {
                        setCurrentListHighlight({
                            type: ListHighlightType.SnippetGroup,
                            id: snippetGroup.id,
                        });
                    }
                });
            }
        }
    };
    useHotkeys("backspace", deleteSelectedSnippet, [
        snippets.length,
        currentListHighlight,
    ]);

    return (
        <>
            <EditableTextButton
                model={snippetGroup}
                isSelected={isOpen}
                isHighlighted={isItemHighlighted({
                    type: ListHighlightType.SnippetGroup,
                    id: snippetGroup.id,
                })}
                onSelect={onGroupClick}
                onTextChange={(model, newName) => onNameChange(model, newName)}
                hasChildren={true}
            />
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                            duration: 0.25,
                            ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                    >
                        {snippets.map((snippet: Snippet, i) => (
                            <motion.div
                                key={snippet.id}
                                className="flex flex-col"
                                variants={{
                                    open: { opacity: 1, translateX: 0 },
                                    collapsed: { opacity: 0, translateX: -20 },
                                }}
                                transition={{
                                    duration: 0.25,
                                    delay: i * 0.05,
                                    ease: [0.04, 0.62, 0.23, 0.98],
                                }}
                            >
                                <EditableTextButton
                                    model={snippet}
                                    isSelected={selectedSnippet === snippet.id}
                                    isHighlighted={isItemHighlighted({
                                        type: ListHighlightType.Snippet,
                                        id: snippet.id,
                                    })}
                                    onSelect={() => onSnippetClick(snippet.id)}
                                    onTextChange={snippetNameChange}
                                    className="pl-3 ml-4"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SnippetGroupLibraryItem;
