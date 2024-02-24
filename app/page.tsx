import Canvas from "./Canvas";
import { sortCatsById } from "./lib/utils";

async function getData() {
    const key = "live_QuSvCn7Bhyz3IMvM5df0AWtkBml4pVsxDPkIib9zUE1fjx1zMGjCKQc3RtYX2EtR";
    const order = "ASC";
    const limit = "100";
    const breeds = "beng,abys,norw,ragd";

    const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breeds}&order=${order}`, {
        headers: { "x-api-key": key },
        next: { revalidate: 14400 }, // 4 hours
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const catData: CatData[] = await res.json();
    return sortCatsById(catData);
}

export interface Breed {
    name: string;
    id: string;
}

export interface CatData {
    breeds: Breed[];
    id: string;
    url: string;
}

export default async function CatGrid() {
    let catData: CatData[] = await getData();

    return (
        <main>
            <Canvas catData={catData} />
        </main>
    );
}
