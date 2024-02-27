"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RefObject, useRef } from "react";
import { CatData } from "../types/types";
import { cn } from "@/lib/utils";
import CatOverlay from "./CatOverlay";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent } from "@/components/ui/dialog";

export interface CatGridProps {
    catData: CatData[];
    onLayoutAnimationComplete: () => void;
    isDraggingRef: RefObject<boolean>;
}

export default function CatGrid(props: CatGridProps) {
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const isDesktop = useIsDesktop();
    let numCols = isDesktop ? Math.ceil(Math.sqrt(props.catData.length)) : 2;

    function handleLayoutComplete() {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            props.onLayoutAnimationComplete();
        }, 10);
    }

    // Do not trigger ResponsiveDialog while dragging.
    function handleItemClick(e: React.MouseEvent) {
        if (!props.isDraggingRef.current) {
            return;
        }
        e.preventDefault();
    }

    return (
        <motion.div
            className="grid grid-cols-2 gap-8 p-8 md:gap-16 md:p-16"
            style={{ gridTemplateColumns: `repeat(${numCols}, auto)` }}
            layoutRoot
            layout
        >
            {props.catData.map((item) => (
                <motion.div
                    key={item.id}
                    className="size-32 overflow-hidden rounded-md md:size-60"
                    layout
                    onLayoutAnimationComplete={handleLayoutComplete}
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Image
                                src={item.url}
                                width={240}
                                height={240}
                                alt={`Image of a ${!!item.breeds?.length && item.breeds[0].name} cat`}
                                className={cn("size-full cursor-pointer object-cover")}
                                draggable={false}
                                onClick={handleItemClick}
                            />
                        </DialogTrigger>
                        <DialogContent className="overflow-auto sm:max-w-[500px] 2xl:max-w-[800px]">
                            <CatOverlay data={item} />
                        </DialogContent>
                    </Dialog>
                </motion.div>
            ))}
        </motion.div>
    );
}
