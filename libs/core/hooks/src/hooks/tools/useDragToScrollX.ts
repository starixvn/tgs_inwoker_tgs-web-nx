import { useCallback, useEffect, useRef } from "react";

/**
 * 處理X軸滑動問題
 */
export const useDragToScrollX = (
    elementRef: React.MutableRefObject<HTMLElement | null>,
) => {
    const positionOnClick = useRef({ elementScrollLeft: 0, mouseX: 0 });

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            const moveX = e.clientX - positionOnClick.current.mouseX;

            if(elementRef.current) {
                elementRef.current.scrollLeft = positionOnClick.current.elementScrollLeft - moveX;
            }
        },
        [elementRef],
    );

    const onMouseMoveFinish = useCallback(() => {
        if(elementRef.current){
            elementRef.current.removeEventListener("mousemove", onMouseMove);
            elementRef.current.removeEventListener("mouseup", onMouseMoveFinish);
            elementRef.current.removeEventListener("mouseleave", onMouseMoveFinish);
        }
    }, [elementRef, onMouseMove]);

    useEffect(() => {
        if (elementRef.current) {
            const element = elementRef.current;

            element.addEventListener("mousedown", (e) => {
                positionOnClick.current = {
                    elementScrollLeft: element.scrollLeft,
                    mouseX: e.clientX,
                };

                element.addEventListener("mousemove", onMouseMove);
                element.addEventListener("mouseup", onMouseMoveFinish);
                element.addEventListener("mouseleave", onMouseMoveFinish);
            });
        }
    }, [elementRef, onMouseMove, onMouseMoveFinish]);
};