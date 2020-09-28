import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { SnippetVariable } from "../models/snippet-variable";

type SnippetVariableItemProps = {
    snippetVariable: SnippetVariable;
    runnable: boolean;
    onChange: (snippetVariable: SnippetVariable, newValue: string) => void;
};

const SnippetVariableItem: FunctionComponent<SnippetVariableItemProps> = ({
    snippetVariable,
    runnable,
    onChange,
}) => {
    const [inputValue, setInputValue] = useState(snippetVariable.value);

    const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        onChange(snippetVariable, value);
    };

    return (
        <div
            className={
                "h-10 relative flex items-center border-b border-gray-700 transition-colors duration-100 flex" +
                (runnable ? "" : " opacity-25")
            }
        >
            <div className="w-56 h-full px-4 flex items-center border-r border-gray-700">
                <span className="md:text-sm lg:text-base truncate">
                    {snippetVariable.key}
                </span>
            </div>
            <div className="flex-1 h-full">
                <input
                    className="px-4 h-full w-full outline-none bg-gray-900"
                    type="text"
                    defaultValue={inputValue}
                    onInput={onInputValueChange}
                />
            </div>
        </div>
    );
};

export default SnippetVariableItem;
