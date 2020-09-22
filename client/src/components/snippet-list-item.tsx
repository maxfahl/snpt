import React, { FunctionComponent, MouseEvent } from 'react'
import { Snippet } from "../models/snippet";
import { SnippetGroup } from "../models/snippet-group";

type SnippetListItemProps = {
	snippet: Snippet,
	isSelected: boolean,
	onSelect: (e: MouseEvent, sg: SnippetGroup) => void
}

const SnippetListItem: FunctionComponent<SnippetListItemProps> = ({ snippet, isSelected, onSelect }) => {
	const myClasses = [
		'snippet-list-item',
		'py-2',
		'px-4',
		'cursor-pointer',
		'transition-colors',
		'duration-200',
		'flex'
	];

	if (isSelected)
		myClasses.push('bg-gray-800');

	return (
		<div className={myClasses.join(' ')}
			 onClick={ (e: MouseEvent) => onSelect(e, snippet) }>
			<span className="md:text-md lg:text-lg flex-1 truncate">{ snippet.name }</span>
		</div>
	);
};

export default SnippetListItem;
