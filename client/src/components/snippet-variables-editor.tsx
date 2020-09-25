import React, { FunctionComponent, useEffect } from 'react'

type SnippetVariablesEditorProps = {
	selectedSnippetVariableSet: number,
}

const SnippetVariablesEditor: FunctionComponent<SnippetVariablesEditorProps> = ({ selectedSnippetVariableSet }) => {

	useEffect(() => {
		// console.log('selectedSnippetVariableSet change', selectedSnippetVariableSet);
	}, [selectedSnippetVariableSet]);

	return (
		<div className="flex-1">

		</div>
	);
};

export default SnippetVariablesEditor;
