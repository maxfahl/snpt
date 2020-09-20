import React from 'react'
import { Heading, majorScale, Pane, Text } from "evergreen-ui";

function SnippetGroupListItem(props) {
	return (<Pane className="snippet-group-list-item" padding={majorScale(1)} borderBottom="muted">
		<Heading size={500}>{ props.snippetGroup.name }</Heading>
	</Pane>);
}

export default SnippetGroupListItem;
