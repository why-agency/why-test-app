"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { CatData } from "./types";

export interface CatGridProps {
    catData: CatData[];
    onLayoutAnimationComplete: () => void;
}

export default function CatGrid(props: CatGridProps) {
    const numCols = Math.ceil(Math.sqrt(props.catData.length));
    const timeout = useRef<NodeJS.Timeout | null>(null);

    function handleLayoutComplete() {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            props.onLayoutAnimationComplete();
        }, 10);
    }

    return (
        <motion.div
            className="grid gap-16 p-16"
            style={{ gridTemplateColumns: `repeat(${numCols}, auto)` }}
            layoutRoot
            layout
        >
            {props.catData.map((item) => (
                <motion.div
                    key={item.id}
                    className="size-60 overflow-hidden rounded-md"
                    layout
                    onLayoutAnimationComplete={handleLayoutComplete}
                >
                    <Image
                        src={item.url}
                        width={240}
                        height={240}
                        alt={`${item.breeds[0].name} cat`}
                        className="size-full object-cover"
                        draggable={false}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
