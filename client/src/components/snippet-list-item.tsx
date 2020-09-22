import React from 'react'
import { Heading, majorScale, Pane } from "evergreen-ui";

function SnippetListItem(props) {
	const myClasses = [
		'snippet-list-item',
	];

	return (
		<Pane className={myClasses.join(' ')}
			  padding={ majorScale(1) }
			  borderBottom="muted">
			<Heading size={ 500 }>{ props.snippet.name }</Heading>
		</Pane>
	);
}

export default SnippetListItem;
