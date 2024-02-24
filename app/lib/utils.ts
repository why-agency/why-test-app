import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CatData } from "../page";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sortCatsById(data: CatData[]) {
    return data.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    });
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
