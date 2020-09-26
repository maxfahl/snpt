import React, { FunctionComponent, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";
import * as _ from 'lodash';
import SnippetVariableItem from "./snippet-variable-item";

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

	useEffect(() => {
		const fetchSnippetVariables = async () => {
			const snippetVariables = await getSnippetVariables(selectedSnippetVariableSet);
			setSnippetVariables(snippetVariables);
		};

		if (!!selectedSnippetVariableSet) {
			if (previousVariableSet !== selectedSnippetVariableSet) {
				setListSnippetVariables(undefined);
				setSnippetVariables(undefined);
				fetchSnippetVariables();
				setPreviousVariableSet(selectedSnippetVariableSet)
			}
		}
	}, [selectedSnippetVariableSet]);

	useEffect(() => {
		const createAndFillSnippetVariables = async () => {
			const existingVariablesKeys = snippetVariables.map(sv => sv.key);
			const variableKeysToCreate = _.without(availableSnippetVariables, ...existingVariablesKeys) as string[];
			const variablesArray = variableKeysToCreate.map(varKey => {
				return { key: varKey, value: '' }
			});
			const addedSnippets = await createMultipleSnippetVariables({
					snippetVariableSetId: selectedSnippetVariableSet,
					variablesArray,
				},
			);
			setSnippetVariables([
				...snippetVariables,
				...addedSnippets,
			]);
		};
		if (!!snippetVariables && previousVariableSet === selectedSnippetVariableSet)
			createAndFillSnippetVariables();
	}, [availableSnippetVariables]);

	useEffect(() => {
		const buildListSnippetVariables = () => {
			setListSnippetVariables(snippetVariables);
		};
		buildListSnippetVariables();
	}, [snippetVariables]);

	return (
		<div className="flex-1 flex flex-col">
			{ listSnippetVariables && listSnippetVariables.map(sv => (
				<SnippetVariableItem key={ sv.id } snippetVariable={sv}/>
			)) }
		</div>
	);
};

export default SnippetVariablesEditor;
