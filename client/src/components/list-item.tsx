import React, { FunctionComponent, MouseEvent } from 'react'
import { NamedModel } from "../models/model";

type ListItemProps = {
	model: NamedModel,
	isSelected: boolean,
	onSelect: (e: MouseEvent, sg: NamedModel) => void
}

const ListItem: FunctionComponent<ListItemProps> = ({ model, isSelected, onSelect }) => {
	return (
		<div className={ 'h-10 px-4 relative flex items-center border-b border-gray-700 cursor-pointer transition-colors duration-100 flex' + (isSelected ? ' bg-gray-800' : '') }
			 onClick={ (e: MouseEvent) => onSelect(e, model) }>
			<span className="flex-1 truncate">{ model.name }</span>
		</div>
	);
};

export default ListItem;
