import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function hasCommonElement(array1: string[], array2: string[]) {
    return array1.some((item) => array2.includes(item));
}
