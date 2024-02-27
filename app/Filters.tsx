import { cn, hasCommonElement } from "@/lib/utils";
import { CatData } from "../types/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useEffect, useLayoutEffect, useState } from "react";

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
    const [activeBreeds, setActiveBreeds] = useQueryState("breeds", parseAsArrayOf(parseAsString));
    const [isFirstRender, setIsFirstRender] = useState(true);

    function filterData(data: CatData[], breedIds: string[]) {
        return !breedIds || !breedIds.length
            ? data
            : data.filter((cat: CatData) => {
                  return hasCommonElement(
                      cat.breeds.map((b) => b.id),
                      breedIds,
                  );
              });
    }

    function onBreedsChange(breedIds: string[]) {
        const filteredData = filterData(props.data, breedIds);
        const activeBreeds = !!breedIds && breedIds.length ? breedIds : null;
        setActiveBreeds(activeBreeds);
        props.onDataFiltered(filteredData);
    }

    useEffect(() => {
        if (!isFirstRender || !activeBreeds) {
            return;
        }
        setIsFirstRender(false);
        const filteredData = filterData(props.data, activeBreeds);
        props.onDataFiltered(filteredData);
    }, [activeBreeds, isFirstRender, props]);

    return (
        <div className={cn("pointer-events-none fixed bottom-10 flex w-full justify-center", props.className)}>
            <div className="pointer-events-auto  flex rounded-lg bg-neutral-200 p-1 shadow shadow-neutral-500">
                <ToggleGroup
                    type="multiple"
                    value={activeBreeds || []}
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
