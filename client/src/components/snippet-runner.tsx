import React, { FunctionComponent } from "react";
import { useOvermind } from "../overmind";
import { copyToClipboard } from "../utils/clipboard";
import SimpleButton from "./simple-button";

type SnippetRunnerProps = {};

const SnippetRunner: FunctionComponent<SnippetRunnerProps> = () => {
    const {
        state: { snippetRunnerContext },
    } = useOvermind();
    // const props = useSpring({ opacity: 1, from: { opacity: 0 } });

    const copySnippet = () => {
        let content = snippetRunnerContext.code;
        let variableReg;
        snippetRunnerContext.variables.forEach((v) => {
            variableReg = new RegExp(`\{\{\{\\s*${v.key}\\s*\}\}\}`, "gi");
            content = content.replace(variableReg, v.value);
        });
        copyToClipboard(content);
    };

    return (
        <div className="h-10 relative">
            <SimpleButton onClick={copySnippet}>
                <span>Copy snippet!</span>
            </SimpleButton>
        </div>
    );
};

export default SnippetRunner;
