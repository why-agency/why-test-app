"use client";

import { motion } from "framer-motion";
import useDimensions from "./hooks/useDimensions";
import { cn } from "./lib/utils";
import { useState } from "react";
import Grid from "./Grid";
import { CatData } from "./page";

export interface CanvasProps {
    catData: CatData[];
}

export default function Canvas(props: CanvasProps) {
    const { ref, dimensions, manualRemeasure } = useDimensions();
    const [key, setKey] = useState(0);

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
        }, 200);
    }

    function onResetEnd() {
        console.log("reset end");
        setKey((x) => x + 1);
        setForceCenter(false);
    }

    return (
        <motion.div className={cn("h-screen overflow-hidden", { invisible: !distanceX || !distanceY })}>
            {/* use anmiate={} instead of style={}? */}
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
                        <Grid
                            small={gridSmall}
                            catData={props.catData}
                        />
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
