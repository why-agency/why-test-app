"use client";

import { motion, useAnimationControls, useDragControls } from "framer-motion";
import useDimensions from "./hooks/useDimensions";
import { cn } from "./lib/utils";
import { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import { CatData } from "./page";

export interface CanvasProps {
    catData: CatData[];
}

export default function Canvas(props: CanvasProps) {
    const { ref, dimensions, manualRemeasure } = useDimensions();
    const [key, setKey] = useState(0);

    const filteredData = props.catData.filter((x, index) => index % 3 === 0);
    const [buttonClicked, setButtonClicked] = useState(false);
    const dragContainerRef = useRef<HTMLDivElement>(null);

    const dragControls = useDragControls();
    const animationControls = useAnimationControls();

    const dragRef = useRef<HTMLDivElement>(null);

    function getContainerStyle() {
        if (!dimensions) {
            return undefined;
        }

        return {
            height: `${2 * dimensions.x - window.innerHeight}px`,
            width: `${2 * dimensions.y - window.innerWidth}px`,
        };
    }

    function handleButtonClick() {
        setButtonClicked((x) => !x);

        // Wait until Grid layout is finished.
        // TODO: better call this as a callback.
        setTimeout(() => {
            manualRemeasure();
        }, 1000);

        animationControls.start({ x: 0, y: 0 });
    }

    const [canvasStyle, setCanvasStyle] = useState<{ size?: string; transform?: string }>({ size: undefined, transform: undefined });
    useEffect(() => {
        const canvasSize = 10000;
        const x = `${-((canvasSize - window.innerWidth) / 2)}px`;
        const y = `${-((canvasSize - window.innerHeight) / 2)}px`;

        setCanvasStyle({
            size: `${canvasSize}px`,
            transform: `translate(${x}, ${y})`,
        });
    }, []);

    return (
        <div className={cn("h-screen overflow-hidden", { invisible: !dimensions })}>
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
                        key={`${key}`} // update key on resize to kill running drag animatons?
                        drag
                        dragConstraints={dragContainerRef}
                        dragControls={dragControls}
                        ref={dragRef}
                        animate={animationControls}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
                    >
                        <div
                            className="flex"
                            ref={ref}
                        >
                            <Grid catData={buttonClicked ? filteredData : props.catData} />
                        </div>
                    </motion.div>
                </div>
            </div>
            <button
                className="fixed bottom-10 left-10 size-40 bg-lime-500"
                onClick={handleButtonClick}
            >
                Filter
            </button>
        </div>
    );
}
