import { useState } from "react";
import { cn } from "./lib/utils";

export interface GridProps {
    small: boolean;
}

export default function Grid(props: GridProps) {
    const numCols = props.small ? 6 : 12;
    const numRows = props.small ? 6 : 12;

    return (
        <div className="flex gap-8 p-16">
            {[...Array(numCols)].map((_, index) => (
                <div
                    key={index}
                    className={cn("flex shrink-0 flex-col gap-8", { "pt-20": index % 2 === 0 })}
                >
                    {[...Array(numRows)].map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="size-64 shrink-0 bg-gray-200"
                        >
                            <span className="cursor-pointer">
                                {index} / {rowIndex}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
