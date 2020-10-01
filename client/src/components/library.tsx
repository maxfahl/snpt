import React, { FunctionComponent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import SnippetGroupLibraryItem from "./snippet-group-library-item";

const Editor: FunctionComponent = () => {
    const {
        state: {},
        actions: { getSnippetGroups },
    } = useOvermind();
    const [snippetGroups, setSnippetGroups] = useState([]);

    useEffect(() => {
        const fetchSnippetGroups = async () => {
            setSnippetGroups(await getSnippetGroups(1));
        };
        fetchSnippetGroups();
    }, []);

    return (
        <div id="library" className="w-64 flex flex-col">
            {snippetGroups.map((sg) => (
                <SnippetGroupLibraryItem snippetGroup={sg} key={sg.id} />
            ))}
        </div>
    );
};

export default Editor;
