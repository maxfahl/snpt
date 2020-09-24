import React, { FunctionComponent, Ref, useEffect, useRef } from 'react'
import { useOvermind } from "../overmind";
import produce from "immer";
import AceEditor from "react-ace";

const SnippetEditor: FunctionComponent = () => {
	const aceEditor: Ref<AceEditor> = useRef();
	const { state: { editedSnippet }, actions: { setEditedSnippet } } = useOvermind();

	useEffect(() => {
		const currentSession = aceEditor.current.editor.getSession() as any;
		const currentMode = currentSession.getMode() as any;

		let rules = currentSession.$mode.$highlightRules.getRules();
		for (let stateName in rules) {
			if (Object.prototype.hasOwnProperty.call(rules, stateName)) {
				rules[stateName].unshift({
					token: 'variable.other',
					regex: '\\{\\{\\{\\s*([A-z0-9_-]+)\\s*\\}\\}\\}'
				});
			}
		}

		currentMode.$tokenizer = null;
		currentSession.bgTokenizer.setTokenizer(currentSession.$mode.getTokenizer());
		currentSession.bgTokenizer.start(0);
	}, [aceEditor]);

	const onChange = code => {
		setEditedSnippet(produce(editedSnippet, draftState => {
			draftState.content = code;
			console.log(draftState.content);
		}));
	};

	// STUB
	// const findVariables = () => {
	// 	// \{\{\{\s*([A-z0-9_-]+)\s*\}\}\}
	// };

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
				onChange={ onChange }
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
