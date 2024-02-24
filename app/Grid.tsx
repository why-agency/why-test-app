"use client";

import { motion } from "framer-motion";
import { CatData } from "./page";
import Image from "next/image";

export interface GridProps {
    catData: CatData[];
}

export default function Grid(props: GridProps) {
    const numCols = Math.ceil(Math.sqrt(props.catData.length));
    const numRows = numCols;

    return (
        <div
            className="grid gap-16 p-16"
            style={{ gridTemplateRows: `repeat(${numRows}, auto)`, gridTemplateColumns: `repeat(${numCols}, auto)` }}
        >
            {props.catData.map((item) => (
                <motion.div
                    key={item.id}
                    className="size-60 overflow-hidden rounded-md"
                    layout
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
        </div>
    );
}
