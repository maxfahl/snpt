import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect } from "react";
import { useOvermind } from "../overmind";
import { hasListItemParent } from "../utils/dom";

const StateManager: FunctionComponent<PropsWithChildren<any>> = ({
    children,
}) => {
    const {
        state: { currentListHighlight },
        actions: { setCurrentListHighlight },
    } = useOvermind();

    // const onDocumentMouseDown = useCallback(
    //     (e: MouseEvent) => {
    //         if (!!currentListHighlight && !hasListItemParent(e.target)) {
    //             setCurrentListHighlight(undefined);
    //         }
    //         console.log('onDocumentMouseDown');
    //     },
    //     [currentListHighlight]
    // );

    useEffect(() => {
        if (!!currentListHighlight) {
            const onDocumentMouseDown = (e: MouseEvent) => {
                if (!!currentListHighlight && !hasListItemParent(e.target))
                    setCurrentListHighlight(undefined);
            };

            document.addEventListener("mousedown", onDocumentMouseDown);
            return () => {
                document.removeEventListener("mousedown", onDocumentMouseDown);
            };
        }
    }, [currentListHighlight]);

    return children;
};

export default StateManager;
