import React, { FunctionComponent } from 'react'
import { Heading, majorScale, Pane } from "evergreen-ui";

type SnippetListItemProps = {
	snippet: any,
}

const SnippetListItem: FunctionComponent<SnippetListItemProps> = ({ snippet }) => {
	const myClasses = [
		'snippet-list-item',
	];

	return (
		<Pane className={myClasses.join(' ')}
			  padding={ majorScale(1) }
			  borderBottom="muted">
			<Heading size={ 500 }>{ snippet.name }</Heading>
		</Pane>
	);
}

export default SnippetListItem;
