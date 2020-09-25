import React, { FunctionComponent, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";
import SnippetVariableSetList from "./snippet-variable-set-list";
import SnippetVariablesEditor from "./snippet-variables-editor";

const SnippetFuwq: FunctionComponent = () => {
	const {
		state: {
			editedSnippet,
		},
	} = useOvermind();
	const [selectedVariableSet, setSelectedVariableSet] = useState();

	useEffect(() => {
		if (editedSnippet.snippetVariableSets.length)
			setSelectedVariableSet(editedSnippet.snippetVariableSets[0].id)
	}, [editedSnippet]);

	return (
		<div className="flex-1 flex-shrink-0 flex">
			<SnippetVariableSetList onSelect={ setSelectedVariableSet } selected={ selectedVariableSet }/>
			<SnippetVariablesEditor selectedSnippetVariableSet={ selectedVariableSet }/>
		</div>
	);
};

export default SnippetFuwq;
