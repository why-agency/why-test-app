import { cn, filterData } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { CatData } from "@/types/types";
import { useState } from "react";

const filterBreeds = [
    { id: "beng", name: "Bengal" },
    { id: "abys", name: "Abyssinian" },
    { id: "norw", name: "Norwegian Forest Cat" },
    { id: "ragd", name: "Ragdoll" },
];

export interface FiltersProps {
    initiallyActiveBreeds: string[] | undefined;
    className?: string;
    fullData: CatData[];
    onDataFiltered: (data: CatData[]) => void;
}

export default function Filters(props: FiltersProps) {
    const [activeBreeds, setActiveBreeds] = useState<string[] | undefined>(props.initiallyActiveBreeds);
    const pathname = usePathname();

    function handleValueChange(breedIds: string[]) {
        const filteredData = filterData(props.fullData, breedIds);
        setActiveBreeds(breedIds);
        props.onDataFiltered(filteredData);
        const searchParams = new URLSearchParams({ breeds: JSON.stringify(breedIds) });
        const target = breedIds.length ? `${pathname}?${searchParams.toString()}` : pathname;
        window.history.pushState(null, "", target);
    }

    return (
        <div className={cn("pointer-events-none fixed bottom-10 flex w-full justify-center", props.className)}>
            <div className="pointer-events-auto  flex rounded-lg bg-neutral-200 p-1 shadow shadow-neutral-500">
                <ToggleGroup
                    type="multiple"
                    value={activeBreeds}
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
