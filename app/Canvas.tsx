"use client";

import { DragControls, animationControls, motion, useAnimationControls, useDragControls } from "framer-motion";
import useDimensions from "./hooks/useDimensions";
import { cn } from "./lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import Grid from "./Grid";

export interface CanvasProps {}

export default function Canvas(props: CanvasProps) {
    const { ref, dimensions, manualRemeasure } = useDimensions();
    const animationControls = useAnimationControls();
    const [key, setKey] = useState(0);

    const prevX = useRef(0);
    const prevY = useRef(0);
    const dragAnimating = useRef(false);

    let distanceX = !!dimensions && dimensions.x / 2 - window.innerWidth / 2;
    let distanceY = !!dimensions && dimensions.y / 2 - window.innerHeight / 2;

    const [forceCenter, setForceCenter] = useState(false);

    // Only for development/testing purpose
    // Simulation of animation behavior if dataset gets 'smaller' after filtering
    const [gridSmall, setGridSmall] = useState(false);

    function getDragConstraints() {
        if (!distanceX || !distanceY) {
            return;
        }

        return {
            top: -distanceY,
            right: distanceX,
            bottom: distanceY,
            left: -distanceX,
        };
    }

    function getTransform() {
        if (!distanceX || !distanceY) {
            return undefined;
        }
        return { x: -distanceX, y: -distanceY };
    }

    function handleContentChange() {
        setGridSmall((x) => !x);
        setTimeout(() => {
            console.log("remeasure");
            manualRemeasure();
            setForceCenter(true);
        });
    }

    function onResetEnd() {
        console.log("reset end");
        setKey((x) => x + 1);
        setForceCenter(false);
    }

    // useEffect(() => {
    //     if (!forceCenter) {
    //         return;
    //     }
    //     setKey((x) => x + 1);
    //     setForceCenter(false);
    // }, [forceCenter]);

    return (
        <motion.div className={cn("h-screen overflow-hidden", { invisible: !distanceX || !distanceY })}>
            <motion.div style={getTransform()}>
                <motion.div
                    key={`${key}`}
                    drag
                    dragConstraints={getDragConstraints()}
                    className={cn({ "!translate-x-0 !translate-y-0 transition-transform": forceCenter })}
                    onTransitionEnd={() => onResetEnd()}
                >
                    <div
                        className="flex"
                        ref={ref}
                    >
                        <Grid small={gridSmall} />
                    </div>
                </motion.div>
            </motion.div>
            <button
                className="fixed bottom-10 left-10 size-40 bg-lime-500"
                onClick={handleContentChange}
            >
                Filter
            </button>
        </motion.div>
    );
}
