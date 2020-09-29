import React, {
    FunctionComponent,
    Ref,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useOvermind } from "../overmind";
import AceEditor from "react-ace";
import { matchAll } from "../utils/regex";
import { addVariableHighlight } from "../utils/ace";
import * as _ from "lodash";
import useDebounce from "../hooks/use-debounce";
import produce from "immer";
import { Snippet } from "../models/snippet";

const SnippetEditor: FunctionComponent = () => {
    const {
        state: { editedSnippet },
        actions: {
            setEditedSnippet,
            updateSnippet,
            setAvailableSnippetVariables,
        },
    } = useOvermind();
    const aceEditor: Ref<AceEditor> = useRef();
    const delayedSaveSnippetChanges = useCallback(
        _.debounce((q) => saveSnippetChanges(q), 500),
        [editedSnippet.id]
    );

    const saveSnippetChanges = (snippet) => {
        updateSnippet({
            snippetId: editedSnippet.id,
            fields: {
                name: snippet.name,
                content: snippet.content,
            },
        });
    };

    const onEditorChange = (code) => {
        const newState = produce<Snippet>(editedSnippet, (draftState) => {
            draftState.content = code;
        });
        setEditedSnippet(newState);
        delayedSaveSnippetChanges(newState);
    };

    const updateAvailableSnippetVariables = () => {
        const variables = matchAll(
            editedSnippet.content,
            /{{{\s*([A-z0-9_-]+)\s*}}}/g
        );
        setAvailableSnippetVariables(_.uniq(variables));
    };

    const onBlur = () => {
        updateAvailableSnippetVariables();
    };

    useEffect(() => {
        addVariableHighlight(aceEditor);
    }, [aceEditor.current]);

    useEffect(() => {
        updateAvailableSnippetVariables();
    }, [editedSnippet.id]);

    return (
        <div
            className="border-b border-gray-700 flex"
            style={{ flex: "1 0 auto" }}
        >
            <AceEditor
                ref={aceEditor}
                width="100%"
                height="100%"
                value={editedSnippet.content}
                mode={editedSnippet.language}
                theme="solarized_dark"
                fontSize={16}
                showPrintMargin={false}
                onChange={onEditorChange}
                onBlur={onBlur}
                name="editor"
                editorProps={{ $blockScrolling: false }}
                setOptions={{
                    useWorker: false,
                    fontFamily: "Fira Code",
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                }}
            />
        </div>
    );
};

export default SnippetEditor;
