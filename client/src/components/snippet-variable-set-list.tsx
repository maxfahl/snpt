import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";
import ListItem from "./list-item";
import { SnippetVariableSet } from "../models/snippet-variable-set";
import SimpleButton from "./simple-button";

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

	const createVariable = (e: MouseEvent) => {

	};

	const deleteSelectedVariable = (e: MouseEvent) => {

	};

	// useEffect(() => {
	// 	console.log('SnippetVariableSetList useEffect[currentEditedSnippet]', editedSnippet);
	// }, [currentEditedSnippet]);


	return (
		<div className="w-56 border-r border-gray-700 flex flex-col">
			<div className="flex-1 flex flex-col overflow-auto">
				{ editedSnippet.snippetVariableSets.map((svs) => (
					<ListItem onSelect={ onVariableSetClick }
							  isSelected={ selected === svs.id }
							  model={ svs }
							  key={ svs.id }/>
				)) }
			</div>
			<div className="h-10 relative flex">
				<SimpleButton onClick={ createVariable } className="bg-blue-800"><span>+</span></SimpleButton>
				<SimpleButton onClick={ deleteSelectedVariable } className="bg-blue-800"><span>-</span></SimpleButton>
			</div>
		</div>
	);
};

export default SnippetVariableSetList;
