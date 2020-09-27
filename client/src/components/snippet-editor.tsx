import React, { FunctionComponent, Ref, useEffect, useRef, useState } from 'react'
import { useOvermind } from "../overmind";
import AceEditor from "react-ace";
import { matchAll } from "../utils/regex";
import { addVariableHighlight } from "../utils/ace";
import * as _ from 'lodash';

const SnippetEditor: FunctionComponent = () => {
	const aceEditor: Ref<AceEditor> = useRef();
	const {
		state: {
			editedSnippet,
		},
		actions: {
			setEditedSnippet,
			updateSnippet,
			setAvailableSnippetVariables,
		},
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
	const onEditorChange = code => {
		// const newState = produce<Snippet>(editedSnippet,draftState => {
		// 	draftState.content = code;
		// });
		const newState = {
			...editedSnippet,
			content: code,
		};
		setEditedSnippet(newState);
		saveSnippetChanges(newState);
	};

	const updateAvailableSnippetVariables = () => {
		const variables = matchAll(editedSnippet.content, /{{{\s*([A-z0-9_-]+)\s*}}}/g);
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
		<div className="border-b border-gray-700 flex" style={{ flex: '1 0 60%' }}>
			<AceEditor
				ref={ aceEditor }
				width="100%"
				height="100%"
				value={ editedSnippet.content }
				mode={ editedSnippet.language }
				theme="solarized_dark"
				fontSize={ 16 }
				showPrintMargin={ false }
				debounceChangePeriod={ 500 }
				onChange={ onEditorChange }
				onBlur={ onBlur }
				name="editor"
				editorProps={ { $blockScrolling: false } }
				setOptions={{
					useWorker: false,
					fontFamily: "Fira Code",
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					// enableSnippets: true,
				}}
			/>
		</div>
	);
};

export default SnippetEditor;
