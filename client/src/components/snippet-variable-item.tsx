import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import { SnippetVariable } from "../models/snippet-variable";
import { useOvermind } from "../overmind";

type SnippetVariableItemProps = {
	snippetVariable: SnippetVariable,
	runnable: boolean,
	onChange: (snippetVariable: SnippetVariable, newValue: string) => void;
}

const SnippetVariableItem: FunctionComponent<SnippetVariableItemProps> = ({ snippetVariable, runnable, onChange }) => {
	const [inputValue, setInputValue] = useState(snippetVariable.value);

	const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		onChange(snippetVariable, value);
	};

	return (
		<div className={ 'h-12 pl-4 relative flex items-center border-b border-gray-700 cursor-pointer transition-colors duration-100 flex' + (runnable ? '' : ' opacity-25') }>
			<div className="w-1/4">
				<span className="md:text-md lg:text-lg truncate">
					{ snippetVariable.key }
				</span>
			</div>
			<div className="flex-1 h-full">
				<input className="md:text-md lg:text-lg px-4 h-full w-full bg-gray-800 outline-none" type="text"
					   defaultValue={ inputValue } onInput={ onInputValueChange }/>
			</div>
		</div>
	);
};

export default SnippetVariableItem;
