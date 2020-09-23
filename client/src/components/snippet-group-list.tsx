import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react'
import SnippetGroupListItem from "./snippet-group-list-item";
import { useOvermind } from "../overmind";
import { SnippetGroup } from "../models/snippet-group";

const SnippetGroupList: FunctionComponent = () => {
	const [snippetGroups, setSnippetGroups] = useState<SnippetGroup[]>([]);
	const { state: { selectedSnippetGroup }, actions: { setSelectedSnippetGroup, getUserSnippetGroups } } = useOvermind();

	useEffect(() => {
		const fetchSnippetGroups = async () => {
			setSnippetGroups(await getUserSnippetGroups(1) as SnippetGroup[]);
		};
		fetchSnippetGroups();
	});

	const onGroupClick = (e: MouseEvent, sg: SnippetGroup) => {
		setSelectedSnippetGroup(sg.id);
	};

	return (<div className="snippet-group-list border-r border-gray-700 flex-1 flex flex-col">
		{ snippetGroups.map((sg) => (
			<SnippetGroupListItem onSelect={ onGroupClick }
								  isSelected={ selectedSnippetGroup === sg.id }
								  snippetGroup={ sg }
								  key={ sg.id }/>
		)) }
	</div>);
};

export default SnippetGroupList;
