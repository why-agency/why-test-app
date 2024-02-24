"use client";

import { motion } from "framer-motion";
import useDimensions from "./hooks/useDimensions";
import { cn } from "./lib/utils";
import { useRef, useState } from "react";
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
    const filteredData = props.catData.filter((x, index) => index % 3 === 0);
    const [buttonClicked, setButtonClicked] = useState(false);
    const called = useRef(false);

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
        if (called.current) {
            return;
        }

        called.current = true;
        if (!distanceX || !distanceY) {
            return undefined;
        }
        return { x: -distanceX, y: -distanceY };
    }

    function handleButtonClick() {
        setButtonClicked((x) => !x);

        setTimeout(() => {
            // console.log("remeasure");
            manualRemeasure();
            // setKey((x) => x + 1);

            // setForceCenter(true);
        }, 1000);
    }

    function onResetEnd() {
        console.log("reset end");
        setKey((x) => x + 1);
        setForceCenter(false);
    }

    const centerX = `${-((10000 - window.innerWidth) / 2)}px`;
    const centerY = `${-((10000 - window.innerHeight) / 2)}px`;

    return (
        <motion.div className={cn("h-screen overflow-hidden", { invisible: !distanceX || !distanceY })}>
            {/* use anmiate={} instead of style={}? */}
            <div
                style={{
                    width: "10000px",
                    height: "10000px",
                    transform: `translate(${centerX}, ${centerY})`,
                }}
                className="flex items-center justify-center"
            >
                <motion.div
                    key={`${key}`}
                    drag
                    dragConstraints={getDragConstraints()}
                    // className={cn({ "!translate-x-0 !translate-y-0 transition-transform": forceCenter })}
                    // onTransitionEnd={() => onResetEnd()}
                >
                    <div
                        className="flex"
                        ref={ref}
                    >
                        <Grid catData={buttonClicked ? filteredData : props.catData} />
                    </div>
                </motion.div>
            </div>
            <button
                className="fixed bottom-10 left-10 size-40 bg-lime-500"
                onClick={handleButtonClick}
            >
                Filter
            </button>
        </motion.div>
    );
}
