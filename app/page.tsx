import Canvas from "./Canvas";
import { getData } from "./api/functions";
import { CatData } from "./types";

export default async function CatGrid() {
    let catData: CatData[] = await getData();

    return (
        <main>
            <Canvas catData={catData} />
        </main>
    );
}
