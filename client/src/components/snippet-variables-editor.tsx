import React, { FunctionComponent, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";

type SnippetVariablesEditorProps = {
	selectedSnippetVariableSet: number,
}

const SnippetVariablesEditor: FunctionComponent<SnippetVariablesEditorProps> = ({ selectedSnippetVariableSet }) => {
	const {
		state: {
			editedSnippet,
			availableSnippetVariables,
		},
		actions: {
			getSnippetVariables
		}
	} = useOvermind();
	const [previousVariableSet, setPreviousVariableSet] = useState();
	const [snippetVariables, setSnippetVariables] = useState();

	useEffect(() => {
		// console.log(`${ availableSnippetVariables.length } available variables for ${ selectedSnippetVariableSet }`);

		const fetchSnippetVariables = async() => {
			console.log('SnippetVariablesEditor fetchSnippetVariables');
			const snippetVariables = await getSnippetVariables(selectedSnippetVariableSet);
			setSnippetVariables(snippetVariables);
			createAndFillSnippetVariables();
		};

		const createAndFillSnippetVariables = async() => {
			console.log('SnippetVariablesEditor fillAndCreateVariables');
		};

		if (!!selectedSnippetVariableSet) {
			if (previousVariableSet !== selectedSnippetVariableSet) {
				fetchSnippetVariables();
				setPreviousVariableSet(selectedSnippetVariableSet)
			} else
				createAndFillSnippetVariables();
		}
	}, [selectedSnippetVariableSet, availableSnippetVariables]);

	return (
		<div className="flex-1">

		</div>
	);
};

export default SnippetVariablesEditor;
