import React, { FunctionComponent } from 'react'
import { useOvermind } from "../overmind";
import { copyToClipboard } from "../utils/clipboard";
import { useSpring, animated } from 'react-spring'

type SnippetRunnerProps = {}

const SnippetRunner: FunctionComponent<SnippetRunnerProps> = () => {
	const {
		state: {
			snippetRunnerContext,
		},
	} = useOvermind();
	// const props = useSpring({ opacity: 1, from: { opacity: 0 } });

	const copySnippet = () => {
		let content = snippetRunnerContext.code;
		let variableReg;
		snippetRunnerContext.variables.forEach(v => {
			variableReg = new RegExp(`\{\{\{\\s*${ v.key }\\s*\}\}\}`, 'gi');
			content = content.replace(variableReg, v.value);
		});
		copyToClipboard(content);
	};

	return (
		<div className="h-12 relative">
			<div onClick={ copySnippet }
				 className="md:text-md lg:text-lg absolute inset-0 flex items-center justify-center w-full border-none bg-blue-700 outline-none cursor-pointer">Copy
				snippet
			</div>
		</div>
	);
};

export default SnippetRunner;
