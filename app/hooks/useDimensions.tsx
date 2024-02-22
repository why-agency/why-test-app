import { MotionValue } from "framer-motion";
import { useState, useCallback, useLayoutEffect, RefObject, useRef } from "react";

export type Dimensions =
    | {
          x: number;
          y: number;
      }
    | undefined;

export type ReturnType = {
    ref: (node: HTMLElement | null) => void;
    dimensions: Dimensions;
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

    useLayoutEffect(() => {
        function measure() {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
                if (!node) {
                    return;
                }
                const rect = node.getBoundingClientRect();
                setDimensions({
                    x: node.scrollWidth,
                    y: node.scrollHeight,
                });
            }, DEBOUNCE_TIME_MS);
        }

        measure();
        window.addEventListener("resize", measure);

        return () => {
            window.removeEventListener("resize", measure);
        };
    }, [node]);

    return { ref, dimensions };
}
