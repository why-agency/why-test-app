import Canvas from "./Canvas";
import Grid from "./Grid";

async function getData() {
    const key = "live_QuSvCn7Bhyz3IMvM5df0AWtkBml4pVsxDPkIib9zUE1fjx1zMGjCKQc3RtYX2EtR";
    const limit = "100";
    const breeds = "beng,abys,sava,norw";

    // &breed_ids=${breeds}
    // attach_image=1 <- should i use this?

    const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=100&breed_ids=${breeds}&order=ASC`, {
        headers: { "x-api-key": key },
        // next: { revalidate: 14400 }, // 4 hours
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
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
    const catData: CatData[] = await getData();

    return (
        <main>
            <Canvas catData={catData} />
        </main>
    );
}
