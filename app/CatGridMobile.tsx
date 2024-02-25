import Image from "next/image";
import { CatData } from "../types/types";
import { cn } from "@/lib/utils";
import CatOverlay from "./CatOverlay";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export interface CatGridMobileProps {
    catData: CatData[];
    className?: string;
}

export default function CatGridMobile(props: CatGridMobileProps) {
    return (
        <div className={cn("grid grid-cols-2 gap-6 p-6", props.className)}>
            {props.catData.map((item) => (
                <div
                    key={item.id}
                    className="aspect-square size-full overflow-hidden rounded-md bg-black md:size-60"
                >
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Image
                                src={item.url}
                                width={240}
                                height={240}
                                alt={`${item.breeds[0].name} cat`}
                                className={cn("size-full cursor-pointer object-cover")}
                            />
                        </DrawerTrigger>
                        <DrawerContent>
                            <CatOverlay data={item} />
                        </DrawerContent>
                    </Drawer>
                </div>
            ))}
        </div>
    );
}
