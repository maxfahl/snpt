import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import { useOvermind } from "../overmind";
import { SnippetGroup } from "../models/snippet-group";
import ListItem from "./list-item";
import SimpleButton from "./simple-button";

const SnippetGroupList: FunctionComponent = () => {
	const [snippetGroups, setSnippetGroups] = useState<SnippetGroup[]>([]);
	const { state: { selectedSnippetGroup }, actions: { setSelectedSnippetGroup, getUserSnippetGroups } } = useOvermind();

	useEffect(() => {
		const fetchSnippetGroups = async () => {
			setSnippetGroups(await getUserSnippetGroups(1) as SnippetGroup[]);
			// setSnippetGroups([Math.random()]);
			// console.log('?');
		};
		fetchSnippetGroups();
	}, []);

	const onGroupClick = (e: MouseEvent, sg: SnippetGroup) => {
		setSelectedSnippetGroup(sg.id);
	};

	const createGroup = () => {

	};

	const deleteSelectedGroup = () => {
		console.log('Deleting', selectedSnippetGroup);
	};

	return <div className="border-r border-gray-700 flex-1 flex flex-col">
		<div className="flex-1 flex flex-col overflow-auto">
			{ snippetGroups.map((sg) => (
				<ListItem onSelect={ onGroupClick }
						  isSelected={ selectedSnippetGroup === sg.id }
						  model={ sg }
						  key={ sg.id }/>
			)) }
		</div>
		<div className="h-10 relative flex">
			<SimpleButton onClick={ createGroup } className="bg-blue-800"><span>+</span></SimpleButton>
			<SimpleButton onClick={ deleteSelectedGroup } className="bg-blue-800"><span>-</span></SimpleButton>
		</div>
	</div>;
};

export default SnippetGroupList;
