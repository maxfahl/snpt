import React, { FunctionComponent, MouseEvent } from 'react'
import { NamedModel } from "../models/model";

type ListItemProps = {
	model: NamedModel,
	isSelected: boolean,
	onSelect: (e: MouseEvent, sg: NamedModel) => void
}

const ListItem: FunctionComponent<ListItemProps> = ({ model, isSelected, onSelect }) => {
	const myClasses = [
		'py-2',
		'px-4',
		'border-b',
		'border-gray-700',
		'cursor-pointer',
		'transition-colors',
		'duration-100',
		'flex',
	];

	if (isSelected)
		myClasses.push('bg-gray-800');

	return (
		<div className={ myClasses.join(' ') }
			 onClick={ (e: MouseEvent) => onSelect(e, model) }>
			<span className="md:text-md lg:text-lg flex-1 truncate">{ model.name }</span>
		</div>
	);
};

export default ListItem;
