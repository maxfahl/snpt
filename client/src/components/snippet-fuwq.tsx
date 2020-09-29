import React, { FunctionComponent, useEffect, useState } from "react";
import { useOvermind } from "../overmind";
import SnippetVariableSetList from "./snippet-variable-set-list";
import SnippetVariablesEditor from "./snippet-variables-editor";
import SnippetRunner from "./snippet-runner";

const SnippetFuwq: FunctionComponent = () => {
    const {
        state: { editedSnippet },
    } = useOvermind();
    const [selectedVariableSet, setSelectedVariableSet] = useState<number>();

    return (
        <div className="flex h-64">
            <SnippetVariableSetList
                onSelect={setSelectedVariableSet}
                selected={selectedVariableSet}
            />
            <div className="flex-1 flex flex-col">
                <SnippetVariablesEditor
                    selectedSnippetVariableSet={selectedVariableSet}
                />
                <SnippetRunner />
            </div>
        </div>
    );
};

export default SnippetFuwq;
