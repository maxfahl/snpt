import React, { FunctionComponent, useEffect } from 'react'
import { useOvermind } from "../overmind";

const SnippetRunner: FunctionComponent = () => {
	const {
		state: {
			editedSnippet,
		},
		// actions: {
		// 	setEditedSnippet,
		// 	updateSnippet,
		// 	setAvailableSnippetVariables,
		// },
	} = useOvermind();

	useEffect(() => {
		console.log(editedSnippet.snippetVariableSets);
	}, [editedSnippet.snippetVariableSets]);

	return (
		<div className="flex-1 flex-shrink-0">

		</div>
	);
};

export default SnippetRunner;
