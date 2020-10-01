import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { useOvermind } from "../overmind";
import { motion, useAnimation } from "framer-motion";
import { isNodeOrChild } from "framer-motion/types/gestures/utils/is-node-or-child";
import { isDescendant } from "../utils/dom";

type SelectorProps = {
    items: SelectorItem[];
    value: string;
    onChange: (value) => void;
};

export type SelectorItem = {
    label: string;
    value: any;
};

const Selector: FunctionComponent<SelectorProps> = ({
    items,
    value,
    onChange,
}) => {
    const {
        state: {},
        actions: {},
    } = useOvermind();
    const [isOpen, setIsOpen] = useState(false);
    const [innerValue, setInnerValue] = useState<string>(value);
    const [selectedLabel, setSelectedLabel] = useState<string>();
    const animationControls = useAnimation();
    const selectorRef = useRef<HTMLDivElement>();
    const listRef = useRef<HTMLUListElement>();

    const onDocumentMouseDown = useCallback(
        (e: MouseEvent) => {
            if (!isDescendant(selectorRef.current, e.target)) {
                toggleOpen();
            }
        },
        [isOpen]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", onDocumentMouseDown);
            return () => {
                document.removeEventListener("mousedown", onDocumentMouseDown);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        const selItem = items.find((i) => i.value === value);
        if (selItem) setSelectedLabel(selItem.label);
        else setSelectedLabel(undefined);
    }, [innerValue]);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    useLayoutEffect(() => {
        if (listRef.current) {
            const selectedListItem = listRef.current.querySelector(
                `#selector-option-${value.toLowerCase()}`
            );
            if (selectedListItem) selectedListItem.scrollIntoView(true);
        }
    }, [value, listRef.current]);

    useEffect(() => {
        animationControls.start({
            opacity: isOpen ? 1 : 0,
            scaleY: isOpen ? 1 : 0,
            transition: {
                duration: 0.1,
                ease: "easeOut",
            },
        });
    }, [isOpen]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const onItemClick = (item: SelectorItem) => {
        setInnerValue(item.value);
        onChange(item.value);
        if (isOpen) toggleOpen();
    };

    const itemIsSelected = (item): boolean => {
        return innerValue === item.value;
    };

    return (
        <div className="space-y-1" ref={selectorRef}>
            <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                    <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                        className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5 cursor-pointer"
                        onClick={toggleOpen}
                    >
                        <span className="block truncate text-black">
                            {selectedLabel}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </button>
                </span>

                <motion.div
                    className="absolute mt-1 w-full rounded-md bg-white shadow-lg overflow-auto"
                    style={{
                        maxHeight: "200px",
                        opacity: 0,
                        pointerEvents: isOpen ? "auto" : "none",
                        transformOrigin: '50% 0'
                    }}
                    initial="hidden"
                    animate={animationControls}
                >
                    <ul
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-item-3"
                        className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                        ref={listRef}
                    >
                        {items.map((item) => (
                            <li
                                id={
                                    "selector-option-" +
                                    item.value.toLowerCase()
                                }
                                role="option"
                                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer"
                                key={item.value}
                                onClick={() =>
                                    !itemIsSelected(item) && onItemClick(item)
                                }
                            >
                                <span
                                    className={
                                        "font-normal block truncate" +
                                        (itemIsSelected(item)
                                            ? " text-black"
                                            : " text-gray-600")
                                    }
                                >
                                    {item.label}
                                </span>
                                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        style={{
                                            opacity: itemIsSelected(item)
                                                ? "1"
                                                : "0",
                                        }}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default Selector;
