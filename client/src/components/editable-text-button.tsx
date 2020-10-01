import React, {
    FunctionComponent,
    MouseEvent,
    RefObject,
    useEffect,
    useState,
} from "react";
import { NamedModel } from "../models/model";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import * as _ from "lodash";
import { motion } from "framer-motion";

const noop = () => {};

type EditableTextButtonProps = {
    model: NamedModel;
    isSelected: boolean;
    isHighlighted?: boolean;
    onSelect: (e: MouseEvent, sg: NamedModel) => void;
    onTextChange?: (model: NamedModel, text: string) => void;
    className?: string;
    hasChildren?: boolean;
};

const EditableTextButton: FunctionComponent<EditableTextButtonProps> = ({
    model,
    isSelected,
    isHighlighted = false,
    onSelect,
    onTextChange = noop,
    className,
    hasChildren = false,
}) => {
    const [disabled, setDisabled] = useState(true);
    const [text, setText] = useState(model.name);

    const contentEditable: RefObject<HTMLSpanElement> = React.createRef();

    useEffect(() => {
        if (!disabled && contentEditable && contentEditable.current) {
            const element = contentEditable.current;
            const onKey = (e: KeyboardEvent) => {
                const code = e.code;
                if (code === "Enter") {
                    e.preventDefault();
                    contentEditable.current.blur();
                }
            };
            element.addEventListener("keypress", onKey);
            return () => {
                element.removeEventListener("keypress", onKey);
            };
        }
    });

    const doClick = (e: MouseEvent) => {
        if (doubleClick) {
            setDisabled(!disabled);
            const contentEditableCurrent = contentEditable.current;
            setTimeout(() => {
                contentEditableCurrent.focus();
                document.execCommand("selectAll", false, null);
            }, 10);
        } else {
            onSelect(e, model);
        }
        doubleClick = undefined;
    };

    let doubleClick: boolean;
    let delayedClick: any;
    const onClick = (e: MouseEvent) => {
        doClick(e);
        // if (!delayedClick)
        //     delayedClick = _.debounce(doClick.bind(this, e), 200);
        // if (doubleClick !== undefined) {
        //     delayedClick.cancel();
        //     doubleClick = true;
        //     doClick(e);
        // } else {
        //     delayedClick();
        //     doubleClick = false;
        // }
    };

    let editedText = model.name; // Component will not re-render during typing.
    const intOnTextChange = (e: ContentEditableEvent) => {
        editedText = e.target.value;
    };

    const onBlur = () => {
        setDisabled(true);
        if (name !== editedText) {
            const newName = editedText
                .substr(0)
                .replace(/&nbsp;/gi, "")
                .trim();
            setText(newName);
            onTextChange(model, newName);
        }
    };

    const baseBackgroundColor = isSelected ? " bg-gray-800" : " bg-gray-900";
    const backgroundColor = isHighlighted ? " bg-gray-700" : baseBackgroundColor;
    return (
        <div
            className={
                "mt-1 mb-1 flex items-center pr-2 py-2 leading-5 rounded cursor-pointer transition-colors duration-300" +
                (className ? ` ${className}` : "") + backgroundColor
            }
            onClick={onClick}
        >
            {hasChildren ? (
                <motion.svg
                    animate={{ rotate: isSelected ? 90 : 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 50,
                        duration: 0.5,
                    }}
                    className="ml-1 mr-1 h-5 w-5"
                    viewBox="0 0 20 20"
                >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                </motion.svg>
            ) : null}
            <ContentEditable
                innerRef={contentEditable}
                html={text}
                disabled={disabled}
                onChange={intOnTextChange}
                onBlur={onBlur}
                tagName="span"
                className="text-md font-medium"
            />
        </div>
    );
};

export default EditableTextButton;
