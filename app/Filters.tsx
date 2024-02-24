import { useState } from "react";
import { CatData } from "./page";

export interface FiltersProps {
    data: CatData[];
    onDataFiltered: (data: CatData[]) => void;
}

export default function Filters(props: FiltersProps) {
    // const [filteredData, setFilteredData] = useState<CatData[]>(props.data);
    const [isFiltered, setIsFiltered] = useState(false);

    function filterByBreed(breedId: string) {
        if (isFiltered) {
            props.onDataFiltered(props.data);
            setIsFiltered(false);
            return;
        }

        setIsFiltered(true);
        const filteredData = props.data.filter((cat: CatData) => {
            return cat.breeds.map((breed) => breed.id).indexOf(breedId) !== -1;
        });
        props.onDataFiltered(filteredData);
    }

    return (
        <div className="fixed bottom-10 left-10 h-10">
            <button
                onClick={() => filterByBreed("beng")}
                className=" h-full bg-lime-500"
            >
                Filter for beng
            </button>
            <button
                onClick={() => filterByBreed("ragd")}
                className=" h-full bg-cyan-500"
            >
                Filter for ragd
            </button>
            <button
                onClick={() => filterByBreed("norw")}
                className="h-full bg-pink-500"
            >
                Filter for norw
            </button>
        </div>
    );
}
