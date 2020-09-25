import React, { FunctionComponent, useEffect } from 'react'
import { useOvermind } from "../overmind";

type SnippetVariablesEditorProps = {
	selectedSnippetVariableSet: number,
}

const SnippetVariablesEditor: FunctionComponent<SnippetVariablesEditorProps> = ({ selectedSnippetVariableSet }) => {
	const {
		state: {
			editedSnippet,
		},
	} = useOvermind();

	useEffect(() => {
		// console.log('selectedSnippetVariableSet change', selectedSnippetVariableSet);
	}, [selectedSnippetVariableSet]);

	return (
		<div className="flex-1">

		</div>
	);
};

export default SnippetVariablesEditor;
