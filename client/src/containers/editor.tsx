import React, { FunctionComponent, useEffect } from "react";
import { useOvermind } from "../overmind";

const Editor: FunctionComponent = () => {

	const { state: { selectedSnippet } } = useOvermind();

	useEffect(() => {

	}, [selectedSnippet]);

	return (<div id="editor" className="py-2 px-4 flex-1 flex-shrink-0">

	</div>);
};

export default Editor;
