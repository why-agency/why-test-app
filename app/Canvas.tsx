"use client";

import { animationControls, motion, useAnimationControls, useDragControls } from "framer-motion";
import useDimensions from "./hooks/useDimensions";
import { cn } from "./lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface CanvasProps {
    children: ReactNode;
}

export default function Canvas(props: CanvasProps) {
    const { ref, dimensions } = useDimensions();
    const animationControls = useAnimationControls();

    const prevX = useRef(0);
    const prevY = useRef(0);
    const dragAnimating = useRef(false);
    const shouldReCenter = useRef(false);

    let distanceX = !!dimensions && dimensions.x / 2 - window.innerWidth / 2;
    let distanceY = !!dimensions && dimensions.y / 2 - window.innerHeight / 2;

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
            <motion.div style={getTransform()}>
                <motion.div
                    drag
                    animate={animationControls}
                    dragConstraints={getDragConstraints()}
                    onDragStart={() => (dragAnimating.current = true)}
                    onDragEnd={() => (dragAnimating.current = true)}
                >
                    <div
                        className="flex"
                        ref={ref}
                    >
                        {props.children}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
