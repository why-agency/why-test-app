import { useRef } from "react";

const numCols = 10;
const numRows = 12;

export interface GridProps {
    handleSizeChange?: (size: number) => void;
}

export default function Grid(props: GridProps) {
    return (
        <div className="flex gap-8 p-16">
            {[...Array(numCols)].map((_, index) => (
                <div
                    key={index}
                    className="flex shrink-0 flex-col gap-8"
                >
                    {[...Array(numRows)].map((_, index) => (
                        <div
                            className=""
                            key={index}
                        >
                            <div className="size-48 shrink-0 bg-gray-200 p-8"></div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
