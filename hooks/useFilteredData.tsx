import { hasCommonElement } from "@/lib/utils";
import { CatData } from "@/types/types";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

export default function useFilteredData(initData: CatData[]) {
    const [activeBreeds, setActiveBreeds] = useQueryState("breeds", parseAsArrayOf(parseAsString));
    const [filteredData, setFilteredData] = useState(filterData(initData, activeBreeds));

    function filterData(data: CatData[], breedIds: string[] | null) {
        return !breedIds || !breedIds.length
            ? data
            : data.filter((cat: CatData) => {
                  return hasCommonElement(
                      cat.breeds.map((b) => b.id),
                      breedIds,
                  );
              });
    }

    function updateActiveBreeds(breedIds: string[] | null) {
        setActiveBreeds(breedIds);
        setFilteredData(filterData(initData, breedIds));
    }

    return { filteredData, activeBreeds, updateActiveBreeds };
}
