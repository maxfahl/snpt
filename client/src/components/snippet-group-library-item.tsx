import React, { FunctionComponent, useEffect, useState } from "react";
import EditableTextButton from "./editable-text-button";
import { SnippetGroup } from "../models/snippet-group";
import { useOvermind } from "../overmind";
import { Snippet } from "../models/snippet";
import { AnimatePresence, motion } from "framer-motion";
import { ListHighlightType } from "../overmind/state";
import { NamedModel } from "../models/model";

type SnippetGroupLibraryItemProps = {
    snippetGroup: SnippetGroup;
};

const SnippetGroupLibraryItem: FunctionComponent<SnippetGroupLibraryItemProps> = ({
    snippetGroup,
}) => {
    const {
        state: { selectedSnippet, currentListHighlight, expandedGroups },
        actions: {
            setCurrentListHighlight,
            addExpandedGroup,
            removeExpandedGroup,
            setSelectedSnippet,
        },
    } = useOvermind();

    const [isOpen, setIsOpen] = useState<boolean>();

    useEffect(() => {
        if (expandedGroups)
            setIsOpen(expandedGroups.includes(snippetGroup.id));
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

    const isItemHighlighted = (currentType: ListHighlightType, item: NamedModel) => {
        if (!currentListHighlight) return false;
        return currentType === currentListHighlight.type && item.id === currentListHighlight.id;
    };

    return (
        <div className="">
            <EditableTextButton
                model={snippetGroup}
                isSelected={isOpen}
                isHighlighted={isItemHighlighted(ListHighlightType.SnippetGroup, snippetGroup)}
                onSelect={onGroupClick}
                hasChildren={true}
            />
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className="mt-1 space-y-1 flex flex-col"
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
                        {snippetGroup.snippets.map((s: Snippet, i) => (
                            <motion.div
                                key={s.id}
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
                                    model={s}
                                    isSelected={selectedSnippet === s.id}
                                    isHighlighted={isItemHighlighted(ListHighlightType.Snippet, s)}
                                    onSelect={() => onSnippetClick(s.id)}
                                    className="pl-3 ml-3"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SnippetGroupLibraryItem;
