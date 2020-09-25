import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";
import { Snippet } from "../models/snippet";
import ListItem from "./list-item";

const SnippetList: FunctionComponent = () => {
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const { state: { selectedSnippet, selectedSnippetGroup }, actions: { setSelectedSnippet, getSnippetGroupsSnippets } } = useOvermind();

	useEffect(() => {
		const fetchSnippetGroupSnippets = async () => {
			setSnippets(await getSnippetGroupsSnippets(selectedSnippetGroup));
		};
		if (!!selectedSnippetGroup)
			fetchSnippetGroupSnippets();
		else
			setSnippets([]);
	}, [selectedSnippetGroup]);

	const onSnippetClick = (e: MouseEvent, s: Snippet) => {
		setSelectedSnippet(s.id);
	};

	return (<div className="snippet-list border-r border-gray-700 flex-1 flex flex-col">
		{ snippets.map(s => (
			<ListItem isSelected={ selectedSnippet === s.id }
							 onSelect={ onSnippetClick }
							 model={ s }
							 key={ s.id }/>
		)) }
	</div>);
};

export default SnippetList;
