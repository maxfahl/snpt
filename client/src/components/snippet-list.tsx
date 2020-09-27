import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";
import { Snippet } from "../models/snippet";
import ListItem from "./list-item";
import SimpleButton from "./simple-button";

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

	const createSnippet = (e: MouseEvent) => {

	};

	const deleteSelectedSnippet = (e: MouseEvent) => {

	};

	return (<div className="snippet-list border-r border-gray-700 flex-1 flex flex-col">
		<div className="flex-1 flex flex-col overflow-auto">
			{ snippets.map(s => (
				<ListItem isSelected={ selectedSnippet === s.id }
						  onSelect={ onSnippetClick }
						  model={ s }
						  key={ s.id }/>
			)) }
		</div>
		<div className="h-10 relative flex">
			<SimpleButton onClick={ createSnippet } className="bg-blue-800"><span>+</span></SimpleButton>
			<SimpleButton onClick={ deleteSelectedSnippet } className="bg-blue-800"><span>-</span></SimpleButton>
		</div>
	</div>);
};

export default SnippetList;
