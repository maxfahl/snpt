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
		isSelected && 'selected'
	];

	return (
		<div className={myClasses.join(' ')}
			  // background={isSelected ? 'tint2' : 'white'}
			  // padding={ majorScale(1) }
			  // borderBottom="muted"
			  onClick={ (e: MouseEvent) => onSelect(e, snippetGroup) }>
			<span className="text-xl">{ snippetGroup.name }</span>
		</div>
	);
};

export default SnippetGroupListItem;
