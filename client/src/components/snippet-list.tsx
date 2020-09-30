import React, {
    FunctionComponent,
    MouseEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useOvermind } from "../overmind";
import { Snippet } from "../models/snippet";
import ListItem from "./list-item";
import SimpleButton from "./simple-button";
import { sortByStringProp } from "../utils/array";

const SnippetList: FunctionComponent = () => {
    const {
        state: {
            auth: {
                user: { id: userId },
            },
            selectedSnippet,
            selectedSnippetGroup,
        },
        actions: {
            setSelectedSnippet,
            getSnippetGroupsSnippets,
            createSnippet,
            updateSnippet,
            deleteSnippet,
        },
    } = useOvermind();
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const fetchSnippets = useCallback(async () => {
        setSnippets(await getSnippetGroupsSnippets(selectedSnippetGroup));
    }, [selectedSnippetGroup]);

    useEffect(() => {
        if (!!selectedSnippetGroup) fetchSnippets();
        else setSnippets([]);
    }, [selectedSnippetGroup]);

    const onSnippetClick = (e: MouseEvent, s: Snippet) => {
        setSelectedSnippet(s.id);
    };

    const renameSnippet = async (snippet: Snippet, newName: string) => {
        await updateSnippet({
            snippetId: snippet.id,
            fields: { name: newName },
        });

        let newSnippets = snippets.slice(0);
        let snippetPos = snippets.indexOf(snippet);
        newSnippets[snippetPos].name = newName;
        setSnippets(sortByStringProp(newSnippets, "name"));
    };

    const doCreateSnippet = async (e: MouseEvent) => {
        const newSnippet = await createSnippet({
            fields: {
                userId: userId,
                snippetGroupId: selectedSnippetGroup,
                language: "text",
                name: "New snippet",
                content: "",
            },
        });

        let newSnippets = snippets.slice(0);
        newSnippets.push(newSnippet);
        setSnippets(newSnippets);
        setSelectedSnippet(newSnippet.id);
    };

    const doDeleteSelectedSnippet = async () => {
        if (selectedSnippet !== undefined) {
            await deleteSnippet({ snippetId: selectedSnippet });

            const oldIx: number = !!selectedSnippet
                ? snippets.findIndex((s) => s.id === selectedSnippet)
                : 0;
            let newSnippets = snippets.slice();
            newSnippets.splice(oldIx, 1);
            if (newSnippets.length) {
                setSelectedSnippet(
                    newSnippets[oldIx === 0 ? oldIx : oldIx - 1].id
                );
            } else {
                setSelectedSnippet(undefined);
            }
            setSnippets(newSnippets);
        }
    };

    return (
        <div className="snippet-list border-r border-gray-700 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col overflow-auto">
                {snippets.map((s) => (
                    <ListItem
                        isSelected={selectedSnippet === s.id}
                        onSelect={onSnippetClick}
                        onTextChange={renameSnippet}
                        model={s}
                        key={s.id}
                    />
                ))}
            </div>
            <div className="h-10 relative flex">
                <SimpleButton onClick={doCreateSnippet} className="bg-blue-800">
                    <span>+</span>
                </SimpleButton>
                <SimpleButton
                    onClick={doDeleteSelectedSnippet}
                    className="bg-blue-800"
                >
                    <span>-</span>
                </SimpleButton>
            </div>
        </div>
    );
};

export default SnippetList;
