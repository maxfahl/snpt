import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import { SnippetVariable } from "../models/snippet-variable";

type SnippetVariableItemProps = {
	snippetVariable: SnippetVariable
}

const SnippetVariableItem: FunctionComponent<SnippetVariableItemProps> = ({ snippetVariable }) => {
	const [inputValue, setInputValue] = useState(snippetVariable.value);

	const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="border-b border-gray-700 flex">
			<div className="py-2 px-4 w-1/4">
				<span className="md:text-md lg:text-lg truncate">
					{ snippetVariable.key }
				</span>
			</div>
			<div className="flex-1">
				<input className="md:text-md lg:text-lg px-4 h-full w-full bg-gray-800 outline-none" type="text"
					   defaultValue={ inputValue } onInput={ onInputValueChange }/>
			</div>
		</div>
	);
};

export default SnippetVariableItem;
