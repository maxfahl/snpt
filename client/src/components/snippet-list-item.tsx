import React, { FunctionComponent } from 'react'
import { Snippet } from "../models/snippet";

type SnippetListItemProps = {
	snippet: Snippet,
}

const SnippetListItem: FunctionComponent<SnippetListItemProps> = ({ snippet }) => {
	const myClasses = [
		'snippet-list-item',
		'py-2',
		'px-4',
	];

	return (
		<div className={myClasses.join(' ')}>
			<span className="text-xl">{ snippet.name }</span>
		</div>
	);
};

export default SnippetListItem;
