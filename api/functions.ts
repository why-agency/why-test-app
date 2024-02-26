import { CatData } from "../types/types";

function sortCatsById(data: CatData[]) {
    return data.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    });
}

export async function getData() {
    const key: string | undefined = process.env.NEXT_CAT_API_KEY;

    if (!key) {
        throw new Error("Key for api.thecatapi.com not found");
    }

    const order = "ASC";
    const limit = "100";
    const breeds = "beng,abys,norw,ragd";

    const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&order=${order}`, {
        headers: { "x-api-key": key, cache: "no-store" },
        // next: { revalidate: 14400 }, // 4 hours
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const catData: CatData[] = await res.json();
    return sortCatsById(catData);
}
