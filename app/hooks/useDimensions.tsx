import { MotionValue } from "framer-motion";
import { useState, useCallback, useLayoutEffect, RefObject, useRef, useEffect } from "react";

export type Dimensions =
    | {
          x: number;
          y: number;
      }
    | undefined;

export type ReturnType = {
    ref: (node: HTMLElement | null) => void;
    dimensions: Dimensions;
    manualRemeasure: () => Dimensions;
};

const DEBOUNCE_TIME_MS = 100;

export default function useDimensions(): ReturnType {
    const [node, setNode] = useState<HTMLElement | null>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const ref = useCallback((node: HTMLElement | null) => {
        if (node === null) {
            return;
        }

        setNode(node);
    }, []);

    const [dimensions, setDimensions] = useState<Dimensions>(undefined);

    const manualRemeasure = useCallback(() => {
        const dimensions = getDimensions(node);
        setDimensions(dimensions);
        return dimensions;
    }, [node]);

    function getDimensions(node: HTMLElement | null) {
        if (!node) {
            return;
        }

        return {
            x: node.scrollWidth,
            y: node.scrollHeight,
        };
    }

    useEffect(() => {
        function measure() {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
                setDimensions(getDimensions(node));
            }, DEBOUNCE_TIME_MS);
        }

        measure();
        window.addEventListener("resize", measure);

        return () => {
            window.removeEventListener("resize", measure);
        };
    }, [node]);

    return { ref, dimensions, manualRemeasure };
}
