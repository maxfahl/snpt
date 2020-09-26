import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";
import * as _ from 'lodash';
import { SnippetVariable } from "../models/snippet-variable";

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
			getSnippetVariables,
			createMultipleSnippetVariables,
		},
	} = useOvermind();
	const [previousVariableSet, setPreviousVariableSet] = useState();
	const [snippetVariables, setSnippetVariables] = useState();
	const [listSnippetVariables, setListSnippetVariables] = useState();
	// let fetchedSnippetVariables;

	useEffect(() => {

		const fetchSnippetVariables = async () => {
			// console.log('SnippetVariablesEditor fetchSnippetVariables');
			const snippetVariables = await getSnippetVariables(selectedSnippetVariableSet);
			await setSnippetVariables(snippetVariables);
		};

		const createAndFillSnippetVariables = async () => {
			if (!!snippetVariables) {
				const existingVariablesKeys = snippetVariables.map(sv => sv.key);
				const variableKeysToCreate = _.without(availableSnippetVariables, ...existingVariablesKeys) as string[];
				const variablesArray = variableKeysToCreate.map(varKey => {
					return { key: varKey }
				});
				// await createMultipleSnippetVariables({
				// 		snippetVariableSetId: selectedSnippetVariableSet,
				// 		variablesArray,
				// 	},
				// );
				setSnippetVariables([
					...snippetVariables,
					...variablesArray,
				]);
			}
		};

		if (!!selectedSnippetVariableSet) {
			if (previousVariableSet !== selectedSnippetVariableSet) {
				setSnippetVariables(undefined);
				fetchSnippetVariables();
				setPreviousVariableSet(selectedSnippetVariableSet)
			} else {
				createAndFillSnippetVariables();
			}
		}
	}, [selectedSnippetVariableSet, ª]);

	useEffect(() => {

	});

	useEffect(() => {
		const buildListSnippetVariables = () => {
			console.log('buildListSnipeptVariables from', snippetVariables);
		};
		buildListSnippetVariables();
	}, [snippetVariables]);

	return (
		<div className="flex-1">
			{/*{ snippetVariables }*/ }
		</div>
	);
};

export default SnippetVariablesEditor;
