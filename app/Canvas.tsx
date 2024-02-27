"use client";

import { motion, useAnimationControls, useDragControls } from "framer-motion";
import useDimensions from "../hooks/useDimensions";
import { useEffect, useRef, useState } from "react";
import CatGrid from "./CatGrid";
import Filters from "./Filters";
import { CatData } from "../types/types";
import { cn } from "@/lib/utils";
import useFilteredData from "@/hooks/useFilteredData";

export interface CanvasProps {
    catData: CatData[];
    className?: string;
}

// Size of the 'working surface'.
// Make sure this is big enough to fit the maximal possible (=unfiltered) amount of images.
const CANVAS_SIZE = 10000;
const RESIZE_DEBOUNCE_MS = 500;

export default function Canvas(props: CanvasProps) {
    const { ref, dimensions, manualRemeasure } = useDimensions();
    const [key, setKey] = useState(0);
    const { filteredData, activeBreeds, updateActiveBreeds } = useFilteredData(props.catData);
    const dragContainerRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();
    const animationControls = useAnimationControls();
    const dragRef = useRef<HTMLDivElement>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const [canvasStyle, setCanvasStyle] = useState<{ size?: string; transform?: string }>({ size: undefined, transform: undefined });
    const isDraggingRef = useRef<boolean>(false);

    useEffect(() => {
        function updateCanvasStyle() {
            const canvasSize = CANVAS_SIZE;
            const x = `${-((canvasSize - window.innerWidth) / 2)}px`;
            const y = `${-((canvasSize - window.innerHeight) / 2)}px`;

            setCanvasStyle({
                size: `${canvasSize}px`,
                transform: `translate(${x}, ${y})`,
            });
        }

        function onResize() {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
                setKey((x) => x + 1);
                updateCanvasStyle();
            }, RESIZE_DEBOUNCE_MS);
        }

        updateCanvasStyle();
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    function getContainerStyle() {
        if (!dimensions) {
            return undefined;
        }

        return {
            width: `${2 * dimensions.x - window.innerWidth}px`,
            height: `${2 * dimensions.y - window.innerHeight}px`,
        };
    }

    useEffect(() => {
        animationControls.start({ x: 0, y: 0 });
    }, [filteredData, animationControls]);

    return (
        <div className={cn("h-screen overflow-hidden", { invisible: !dimensions }, props.className)}>
            <div
                style={{
                    width: canvasStyle.size,
                    height: canvasStyle.size,
                    transform: canvasStyle.transform,
                }}
                className="flex items-center justify-center "
            >
                <div
                    className="flex items-center justify-center"
                    style={getContainerStyle()}
                    ref={dragContainerRef}
                >
                    <motion.div
                        key={`${key}`}
                        drag
                        dragConstraints={dragContainerRef}
                        dragControls={dragControls}
                        ref={dragRef}
                        animate={animationControls}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
                        onDragStart={() => (isDraggingRef.current = true)}
                        onDragEnd={() => (isDraggingRef.current = false)}
                        className="cursor-grab"
                    >
                        <div
                            className="flex"
                            ref={ref}
                        >
                            <CatGrid
                                catData={filteredData}
                                onLayoutAnimationComplete={() => manualRemeasure()}
                                isDraggingRef={isDraggingRef}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            <Filters
                className={"max-md:hidden"}
                updateActiveBreeds={updateActiveBreeds}
                activeBreeds={activeBreeds}
            />
        </div>
    );
}
