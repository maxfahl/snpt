import React, { FunctionComponent, MouseEvent } from 'react'
import { SnippetGroup } from "../models/snippet-group";

type SnippetGroupListItemProps = {
	snippetGroup: SnippetGroup,
	isSelected: boolean,
	onSelect: (e: MouseEvent, sg: SnippetGroup) => void
}

const SnippetGroupListItem: FunctionComponent<SnippetGroupListItemProps> = ({ snippetGroup, isSelected, onSelect }) => {
	const myClasses = [
		'snippet-group-list-item',
		'py-2',
		'px-4',
		'border-b',
		'border-gray-700',
		'cursor-pointer',
		'transition-colors',
		'duration-100',
		'flex'
	];

	if (isSelected)
		myClasses.push('bg-gray-800');

	return (
		<div className={myClasses.join(' ')}
			  onClick={ (e: MouseEvent) => onSelect(e, snippetGroup) }>
			<span className="md:text-md lg:text-lg flex-1 truncate">{ snippetGroup.name }</span>
		</div>
	);
};

export default SnippetGroupListItem;
