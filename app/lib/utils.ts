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
