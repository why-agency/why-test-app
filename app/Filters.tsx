import { useState } from "react";
import { cn, hasCommonElement } from "@/lib/utils";
import { CatData } from "../types/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const filterBreeds = [
    { id: "beng", name: "Bengal" },
    { id: "abys", name: "Abyssinian" },
    { id: "norw", name: "Norwegian Forest Cat" },
    { id: "ragd", name: "Ragdoll" },
];

export interface FiltersProps {
    data: CatData[];
    onDataFiltered: (data: CatData[]) => void;
    className?: string;
}

export default function Filters(props: FiltersProps) {
    const [activeBreeds, setActiveBreeds] = useState<string[]>([]);

    function onBreedsChange(breedIds: string[]) {
        const filteredData = !breedIds.length
            ? props.data
            : props.data.filter((cat: CatData) => {
                  return hasCommonElement(
                      cat.breeds.map((b) => b.id),
                      breedIds,
                  );
              });
        setActiveBreeds(breedIds);
        props.onDataFiltered(filteredData);
    }

    return (
        <div className={cn("pointer-events-none fixed bottom-10 flex w-full justify-center", props.className)}>
            <div className="pointer-events-auto  flex rounded-lg bg-neutral-200 p-1 shadow shadow-neutral-500">
                <ToggleGroup
                    type="multiple"
                    value={activeBreeds}
                    onValueChange={(breedIds) => onBreedsChange(breedIds)}
                >
                    {filterBreeds.map((breed) => (
                        <ToggleGroupItem
                            key={breed.id}
                            value={breed.id}
                        >
                            {breed.name}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
        </div>
    );
}
