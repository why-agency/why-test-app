import { CatData } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function hasCommonElement(array1: string[], array2: string[]) {
    return array1.some((item) => array2.includes(item));
}

export function filterData(data: CatData[], breedIds: string[] | undefined) {
    return !breedIds || !breedIds.length
        ? data
        : data.filter((cat: CatData) => {
              return hasCommonElement(
                  cat.breeds.map((b) => b.id),
                  breedIds,
              );
          });
}
