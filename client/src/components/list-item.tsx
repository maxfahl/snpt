import React, { FunctionComponent, MouseEvent, RefObject, useEffect, useState } from 'react'
import { NamedModel } from "../models/model";
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import * as _ from 'lodash';

const noop = () => {
};

type ListItemProps = {
	model: NamedModel,
	isSelected: boolean,
	onSelect: (e: MouseEvent, sg: NamedModel) => void,
	onTextChange?: (model: NamedModel, text: string) => void
}

const ListItem: FunctionComponent<ListItemProps> = (
	{
		model,
		isSelected,
		onSelect,
		onTextChange = noop,
	},
) => {
	const [disabled, setDisabled] = useState(true);
	const [text, setText] = useState(model.name);

	const contentEditable: RefObject<HTMLSpanElement> = React.createRef();

	useEffect(() => {
		if (!disabled && contentEditable && contentEditable.current) {
			const element = contentEditable.current;
			const onKey = (e: KeyboardEvent) => {
				const code = e.code;
				if(code === 'Enter') {
					e.preventDefault();
					contentEditable.current.blur();
				}
			};
			element.addEventListener('keypress', onKey);
			return () => {
				element.removeEventListener('keypress', onKey);
			}
		}
	});

	const doClick = (e: MouseEvent) => {
		if (doubleClick) {
			setDisabled(!disabled);
			const contentEditableCurrent = contentEditable.current;
			setTimeout(() => {
				contentEditableCurrent.focus();
				document.execCommand('selectAll', false, null);
			}, 10)
		} else
			onSelect(e, model);
		doubleClick = undefined;
	};

	let doubleClick: boolean;
	let delayedClick: any;
	const onClick = (e: MouseEvent) => {
		if (!delayedClick)
			delayedClick = _.debounce(doClick.bind(this, e), 200);
		if (doubleClick !== undefined) {
			delayedClick.cancel();
			doubleClick = true;
			doClick(e);
		} else {
			delayedClick();
			doubleClick = false;
		}
	};

	let editedText = model.name; // Component will not re-render during typing.
	const intOnTextChange = (e: ContentEditableEvent) => {
		editedText = e.target.value;
	};

	const onBlur = () => {
		setDisabled(true);
		if (name !== editedText) {
			const newName =  editedText.substr(0).replace(/&nbsp;/gi, '').trim();
			setText(newName);
			onTextChange(model, newName);
		}
	};

	return (
		<div
			className={ 'h-10 px-4 relative flex items-center border-b border-gray-700 cursor-pointer transition-colors duration-100 flex' + (isSelected ? ' bg-gray-800' : '') }
			onClick={ onClick }>
			<ContentEditable
				innerRef={ contentEditable }
				html={ text }
				disabled={ disabled }
				onChange={ intOnTextChange }
				onBlur={ onBlur }
				tagName="span"
				className="flex-1 truncate"
			/>
		</div>
	);
};

export default ListItem;
