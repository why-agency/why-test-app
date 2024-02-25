import { useState } from "react";
import { cn, hasCommonElement, removeElementFromArray } from "@/lib/utils";
import { CatData } from "./types";

const breeds = [
    { id: "beng", name: "Bengal" },
    { id: "abys", name: "Abyssinian" },
    { id: "norw", name: "Norwegian Forest Cat" },
    { id: "ragd", name: "Ragdoll" },
];

export interface FiltersProps {
    data: CatData[];
    onDataFiltered: (data: CatData[]) => void;
}

export default function Filters(props: FiltersProps) {
    const [activeBreeds, setActiveBreeds] = useState<string[]>([]);

    function filterByBreed(breedId: string) {
        const breedsUpdate: string[] = activeBreeds.includes(breedId)
            ? removeElementFromArray(activeBreeds, breedId)
            : [...activeBreeds, breedId];

        setActiveBreeds(breedsUpdate);

        if (!breedsUpdate.length) {
            props.onDataFiltered(props.data);
            return;
        }

        const filteredData = props.data.filter((cat: CatData) => {
            return hasCommonElement(
                cat.breeds.map((b) => b.id),
                breedsUpdate,
            );
        });
        props.onDataFiltered(filteredData);
    }

    function isActive(breedId: string) {
        if (!activeBreeds.length) {
            return true;
        }
        return activeBreeds.includes(breedId);
    }

    return (
        <div className="fixed bottom-10 left-10 flex h-10 gap-4">
            {breeds.map((breed) => (
                <button
                    key={breed.id}
                    onClick={() => filterByBreed(breed.id)}
                    className={cn("h-full bg-pink-500", { "bg-lime-500": isActive(breed.id) })}
                >
                    {breed.name}
                </button>
            ))}
        </div>
    );
}
