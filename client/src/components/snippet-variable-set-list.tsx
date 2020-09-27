import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";
import ListItem from "./list-item";
import { SnippetVariableSet } from "../models/snippet-variable-set";

type SnippetVariableSetListProps = {
	onSelect: (id: number) => void,
	selected: number
}

const SnippetVariableSetList: FunctionComponent<SnippetVariableSetListProps> = ({ onSelect, selected }) => {
	const {
		state: {
			editedSnippet,
		},
	} = useOvermind();
	// const [currentEditedSnippet, setCurrentEditedSnippet] = useState();

	const onVariableSetClick = (e: MouseEvent, svs: SnippetVariableSet) => {
		onSelect(svs.id);
	};

	// useEffect(() => {
	// 	console.log('SnippetVariableSetList useEffect[currentEditedSnippet]', editedSnippet);
	// }, [currentEditedSnippet]);


	return (
		<div className="w-56 border-r border-gray-700 flex flex-col">
			{ editedSnippet.snippetVariableSets.map((svs) => (
				<ListItem onSelect={ onVariableSetClick }
						  isSelected={ selected === svs.id }
						  model={ svs }
						  key={ svs.id }/>
			)) }
		</div>
	);
};

export default SnippetVariableSetList;
