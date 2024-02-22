"use client";

import { useRef } from "react";
import Grid from "./Grid";
import { distance, motion } from "framer-motion";
import useDimensions from "./hooks/useDimensions";
import { cn } from "./lib/utils";

export interface DraggableGridProps {}

export default function DraggableGrid(props: DraggableGridProps) {
    const { ref, dimensions } = useDimensions();

    const distanceX = !!dimensions && dimensions.x / 2 - window.innerWidth / 2;
    const distanceY = !!dimensions && dimensions.y / 2 - window.innerHeight / 2;

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

    return (
        <motion.div className={cn("h-screen overflow-hidden", { invisible: !distanceX || !distanceY })}>
            <motion.div
                style={getTransform()}
                ref={ref}
            >
                <motion.div
                    drag
                    dragConstraints={getDragConstraints()}
                >
                    <div className="flex">
                        <Grid />
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
