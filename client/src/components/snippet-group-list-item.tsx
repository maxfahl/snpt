import React, { FunctionComponent } from 'react'
import { Heading, majorScale, Pane } from "evergreen-ui";

type SnippetGroupListItemProps = {
	snippetGroup: any,
	isSelected: boolean,
	onSelect: (e: MouseEvent, sg: any) => void
}

const SnippetGroupListItem: FunctionComponent<SnippetGroupListItemProps> = ({ snippetGroup, isSelected, onSelect }) => {
	const myClasses = [
		'snippet-group-list-item',
		isSelected && 'selected'
	];

	return (
		<Pane className={myClasses.join(' ')}
			  background={isSelected ? 'tint2' : 'white'}
			  padding={ majorScale(1) }
			  borderBottom="muted"
			  onClick={ e => onSelect(e, snippetGroup) }>
			<Heading size={ 500 }>{ snippetGroup.name }</Heading>
		</Pane>
	);
};

export default SnippetGroupListItem;
