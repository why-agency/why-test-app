import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const filterBreeds = [
    { id: "beng", name: "Bengal" },
    { id: "abys", name: "Abyssinian" },
    { id: "norw", name: "Norwegian Forest Cat" },
    { id: "ragd", name: "Ragdoll" },
];

export interface FiltersProps {
    activeBreeds: string[] | undefined;
    className?: string;
}

export default function Filters(props: FiltersProps) {
    const router = useRouter();
    const pathname = usePathname();

    function handleValueChange(breedIds: string[]) {
        const searchParams = new URLSearchParams({ breeds: JSON.stringify(breedIds) });
        const target = breedIds.length ? `${pathname}?${searchParams.toString()}` : pathname;
        router.push(target);
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
