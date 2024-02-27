import { cn, hasCommonElement } from "@/lib/utils";
import { CatData } from "../types/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

const filterBreeds = [
    { id: "beng", name: "Bengal" },
    { id: "abys", name: "Abyssinian" },
    { id: "norw", name: "Norwegian Forest Cat" },
    { id: "ragd", name: "Ragdoll" },
];

export interface FiltersProps {
    updateActiveBreeds: (breeds: string[] | null) => void;
    activeBreeds: string[] | null;
    className?: string;
}

export default function Filters(props: FiltersProps) {
    function handleValueChange(breedIds: string[]) {
        !!breedIds.length ? props.updateActiveBreeds(breedIds) : props.updateActiveBreeds(null);
    }

    return (
        <div className={cn("pointer-events-none fixed bottom-10 flex w-full justify-center", props.className)}>
            <div className="pointer-events-auto  flex rounded-lg bg-neutral-200 p-1 shadow shadow-neutral-500">
                <ToggleGroup
                    type="multiple"
                    value={props.activeBreeds || []}
                    onValueChange={handleValueChange}
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
