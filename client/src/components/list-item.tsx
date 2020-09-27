import React, { FunctionComponent, MouseEvent, RefObject, useState } from 'react'
import { NamedModel } from "../models/model";
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import * as _ from 'lodash';

const noop = () => {};

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
	const contentEditable: RefObject<HTMLSpanElement> = React.createRef();

	const doClick = (e: MouseEvent) => {
		if (doubleClick) {
			setDisabled(!disabled);
			const contentEditableCurrent = contentEditable.current;
			setTimeout(() => {
				contentEditableCurrent.focus();
				document.execCommand('selectAll',false,null)
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

	const onBlur = () => {
		setDisabled(true);
	};

	return (
		<div
			className={ 'h-10 px-4 relative flex items-center border-b border-gray-700 cursor-pointer transition-colors duration-100 flex' + (isSelected ? ' bg-gray-800' : '') }
			onClick={ onClick }>
			<ContentEditable
				innerRef={ contentEditable }
				html={ model.name } // innerHTML of the editable div
				disabled={ disabled }       // use true to disable editing
				onChange={ (e: ContentEditableEvent) => onTextChange(model, e.target.value.trim()) } // handle innerHTML change
				onBlur={onBlur}
				tagName="span" // Use a custom HTML tag (uses a div by default)
				className="flex-1 truncate"
			/>
			{/*<div className="absolute w-8 h-8 bg-gray-800">O</div>*/}
		</div>
	);
};

export default ListItem;
