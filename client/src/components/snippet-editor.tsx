import React, {
    FunctionComponent,
    Ref,
    useCallback,
    useEffect,
    useRef,
} from "react";
import { useOvermind } from "../overmind";
import AceEditor from "react-ace";
import { matchAll } from "../utils/regex";
import { addVariableHighlight } from "../utils/ace";
import * as _ from "lodash";
import produce from "immer";
import { Snippet } from "../models/snippet";
import Selector, { SelectorItem } from "./selector";

const languageSeelectorItems: SelectorItem[] = [
    { value: "css", label: "CSS" },
    { value: "graphqlschema", label: "GraphQL Schema" },
    { value: "html", label: "HTML" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "Javascript" },
    { value: "json", label: "JSON" },
    { value: "jsx", label: "JSX" },
    { value: "sass", label: "SASS" },
    { value: "scss", label: "SCSS" },
    { value: "sh", label: "SH" },
    { value: "svg", label: "SVG" },
    { value: "text", label: "Text" },
    { value: "tsx", label: "TSX" },
    { value: "typescript", label: "Typescript" },
];

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
                language: snippet.language
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

    const onLanguageChange = (language: string) => {
        console.log(language);
        const newState = produce<Snippet>(editedSnippet, (draftState) => {
            draftState.language = language;
        });
        setEditedSnippet(newState);
        delayedSaveSnippetChanges(newState);
    }

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
            <div
                className="absolute w-64"
                style={{ top: "20px", right: "20px" }}
            >
                <Selector items={languageSeelectorItems} value={editedSnippet.language} onChange={onLanguageChange}/>
            </div>
        </div>
    );
};

export default SnippetEditor;
