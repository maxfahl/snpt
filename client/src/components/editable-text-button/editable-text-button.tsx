import React, {
    FunctionComponent,
    MouseEvent,
    RefObject,
    useEffect,
    useState,
} from "react";
import { NamedModel } from "../../models/model";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { motion } from "framer-motion";
import "./editable-text-button.css";

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

    // useEffect(() => {
    //     if (!disabled && contentEditable && contentEditable.current) {
    //         const element = contentEditable.current;
    //         const onKey = (e: KeyboardEvent) => {
    //             const code = e.code;
    //             if (code === "Enter") {
    //                 e.preventDefault();
    //                 contentEditable.current.blur();
    //             }
    //         };
    //         element.addEventListener("keypress", onKey);
    //         return () => {
    //             element.removeEventListener("keypress", onKey);
    //         };
    //     }
    // }, [disabled && contentEditable]);

    useEffect(() => {
        if (!disabled) {
            const contentEditableCurrent = contentEditable.current;
            setTimeout(() => {
                contentEditableCurrent.focus();
                document.execCommand("selectAll", false, null);
            }, 10);

            if (contentEditable && contentEditable.current) {
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
        }
    }, [disabled]);

    const onEditButtonClick = (e: MouseEvent) => {
        if (disabled) {
            e.stopPropagation();
            setDisabled(!disabled);
        }
    };

    const onClick = (e: MouseEvent) => {
        if (disabled) onSelect(e, model);
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
    const backgroundColor = isHighlighted
        ? " bg-gray-700"
        : baseBackgroundColor;
    return (
        <div
            className={
                "root mt-1 mb-1 flex items-center pr-2 py-2 leading-5 rounded transition-colors duration-300" +
                (className ? ` ${className}` : "") +
                backgroundColor +
                (disabled ? " cursor-pointer" : "")
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
                className="flex-1 text-md font-medium"
            />
            <div
                className={
                    "edit-button ml-1 mr-1 h-5 w-5 opacity-0 cursor-pointer"
                }
                onClick={onEditButtonClick}
                style={{
                    display: (disabled ? 'block' : 'none')
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </div>
        </div>
    );
};

export default EditableTextButton;
