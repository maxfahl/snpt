import React, { FunctionComponent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import { Snippet } from "../models/snippet";
import SnippetViewer from "./snippet-viewer";

const Main: FunctionComponent = () => {
    const {
        state: { selectedSnippet, editedSnippet },
        actions: { getSnippet, setEditedSnippet },
    } = useOvermind();

    useEffect(() => {
        // console.log('Main useEffect[selectedSnippet]', selectedSnippet);
        const fetchSnippet = async () => {
            // console.log('Main fetchSnippet');
            setEditedSnippet((await getSnippet(selectedSnippet)) as Snippet);
        };
        if (!!selectedSnippet) fetchSnippet();
        else setEditedSnippet(undefined);
    }, [selectedSnippet]);

    let child;
    if (editedSnippet) child = <SnippetViewer />;
    else
        child = (
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl font-thin text-white text-opacity-10">
                    Select a snippet
                </p>
            </div>
        );

    return <div className="relative flex-1 flex-shrink-0 flex">{child}</div>;
};

export default Main;
