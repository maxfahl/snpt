import React, { FunctionComponent, Ref, useEffect, useRef } from 'react'
import { useOvermind } from "../overmind";
import produce from "immer";
import AceEditor from "react-ace";
import { Snippet } from "../models/snippet";
import { matchAll } from "../utils/regex";
import { addVariableHighlight } from "../utils/ace";

const SnippetEditor: FunctionComponent = () => {
	const aceEditor: Ref<AceEditor> = useRef();
	const {
		state: {
			editedSnippet
		},
		actions: {
			setEditedSnippet,
			updateSnippet,
			setAvailableSnippetVariables
		}
	} = useOvermind();

	const saveSnippetChanges = (snippet) => {
		updateSnippet(
			{
				snippetId: editedSnippet.id,
				fields: {
					name: snippet.name,
					content: snippet.content,
				},
			},
		);
	};

	useEffect(() => {
		addVariableHighlight(aceEditor);
	}, [aceEditor]);

	const onEditorChange = code => {
		// const newState = produce<Snippet>(editedSnippet,draftState => {
		// 	draftState.content = code;
		// });
		const newState = {
			...editedSnippet,
			content: code
		};
		setEditedSnippet(newState);
		saveSnippetChanges(newState);
	};

	const updateAvailableSnipeptVariables = () => {
		const variables = matchAll(editedSnippet.content, /{{{\s*([A-z0-9_-]+)\s*}}}/g);
		setAvailableSnippetVariables(variables);
	};

	const onBlur = () => {
		updateAvailableSnipeptVariables();
	};

	updateAvailableSnipeptVariables();

	return (
		<div className="flex-1 flex-shrink-0 border-b border-gray-700 flex">
			<AceEditor
				ref={ aceEditor }
				width="100%"
				height="100%"
				value={ editedSnippet.content }
				mode="html"
				theme="solarized_dark"
				fontSize={ 16 }
				showPrintMargin={ false }
				debounceChangePeriod={ 500 }
				onChange={ onEditorChange }
				onBlur={ onBlur }
				name="editor"
				editorProps={ { $blockScrolling: false } }
				setOptions={ {
					useWorker: false,
					fontFamily: "Fira Code",
					// 	enableBasicAutocompletion: true,
					// 	enableLiveAutocompletion: true,
					// 	enableSnippets: true,
				} }
			/>
		</div>
	);
};

export default SnippetEditor;
