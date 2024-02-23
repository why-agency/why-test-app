"use client";

import { cn } from "./lib/utils";
import { motion } from "framer-motion";

export interface GridProps {
    small: boolean;
}

const dataFull: { id: number }[] = [...Array(100)].map((_, index) => {
    return {
        id: index,
    };
});

const dataFiltered = dataFull.filter((x) => x.id % 2 === 0);

export default function Grid(props: GridProps) {
    const data = props.small ? dataFiltered : dataFull;
    const numCols = Math.ceil(Math.sqrt(data.length));
    const numRows = numCols;

    return (
        <div
            className="grid gap-8 p-16"
            style={{ gridTemplateRows: `repeat(${numRows}, auto)`, gridTemplateColumns: `repeat(${numCols}, auto)` }}
        >
            {data.map((item) => (
                <div
                    key={item.id}
                    className="size-56 bg-gray-200"
                >
                    {item.id}
                </div>
            ))}
        </div>
    );
}
