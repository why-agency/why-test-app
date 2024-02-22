import { cn } from "./lib/utils";

const numCols = 14;
const numRows = 12;

export default function Grid() {
    return (
        <div className="flex gap-8 p-16">
            {[...Array(numCols)].map((_, index) => (
                <div
                    key={index}
                    className={cn("flex shrink-0 flex-col gap-8", { "pt-20": index % 2 === 0 })}
                >
                    {[...Array(numRows)].map((_, index) => (
                        <div
                            key={index}
                            className="size-64 shrink-0 bg-gray-200"
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
