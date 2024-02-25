import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function hasCommonElement(array1: string[], array2: string[]) {
    return array1.some((item) => array2.includes(item));
}

export function removeElementFromArray(array: string[], element: string): string[] {
    const index = array.indexOf(element);
    if (index === -1) {
        return array;
    }

    const ret = [...array];
    ret.splice(index, 1);
    return ret;
}
