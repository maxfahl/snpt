import React, {
    FunctionComponent,
    MouseEvent, useCallback,
    useEffect,
    useState
} from "react";
import { useOvermind } from "../overmind";
import { SnippetGroup } from "../models/snippet-group";
import ListItem from "./list-item";
import SimpleButton from "./simple-button";
import { Snippet } from "../models/snippet";
import { sortByStringProp } from "../utils/array";

const SnippetGroupList: FunctionComponent = () => {
    const {
        state: {
            selectedSnippetGroup,
            auth: {
                user: { id: userId },
            },
        },
        actions: {
            setSelectedSnippetGroup,
            getUserSnippetGroups,
            createSnippetGroup,
            updateSnippetGroup,
            deleteSnippetGroup
        },
    } = useOvermind();
    const [snippetGroups, setSnippetGroups] = useState<SnippetGroup[]>([]);
    const fetchSnippetGroups = useCallback(async () => {
        setSnippetGroups((await getUserSnippetGroups(1)) as SnippetGroup[]);
    }, []);

    useEffect(() => {
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
        setSnippetGroups(sortByStringProp(newSnippetGroups, 'name'));
    };

    const doCreateSnippetGroup = async () => {
        const newSnippetGroup = await createSnippetGroup({
            fields: {
                userId: userId,
                name: "New group",
            },
        });

        let newSnippetGroups = snippetGroups.slice(0);
        newSnippetGroups.push(newSnippetGroup);
        setSnippetGroups(newSnippetGroups);
        setSelectedSnippetGroup(newSnippetGroup.id);
    };

    const deleteSelectedGroup = async () => {
        if (selectedSnippetGroup !== undefined) {
            await deleteSnippetGroup({ snippetGroupId: selectedSnippetGroup });
            setSelectedSnippetGroup(undefined);
            await fetchSnippetGroups();
        }
    };

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
                <SimpleButton
                    onClick={doCreateSnippetGroup}
                    className="bg-blue-800"
                >
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
