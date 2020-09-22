import React from 'react'
import { Heading, majorScale, Pane } from "evergreen-ui";

function SnippetGroupListItem(props) {
	const myClasses = [
		'snippet-group-list-item',
		props.isSelected && 'selected'
	];

	return (
		<Pane className={myClasses.join(' ')}
			  background={props.isSelected ? 'tint2' : 'white'}
			  padding={ majorScale(1) }
			  borderBottom="muted"
			  onClick={ e => props.onSelect(e, props.snippetGroup) }>
			<Heading size={ 500 }>{ props.snippetGroup.name }</Heading>
		</Pane>
	);
}

export default SnippetGroupListItem;
