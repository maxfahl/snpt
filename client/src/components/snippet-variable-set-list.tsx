import React, { FunctionComponent, MouseEvent } from 'react'
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

	const onVariableSetClick = (e: MouseEvent, svs: SnippetVariableSet) => {
		onSelect(svs.id);
	};

	return (
		<div className="w-1/4 flex-shrink-0 border-r border-gray-700 flex flex-col">
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
