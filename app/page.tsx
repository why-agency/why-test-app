import Canvas from "./Canvas";
import { getData } from "../api/functions";
import { CatData } from "./types";

export default async function HomePage() {
    let catData: CatData[] = await getData();

    console.log(catData[0]);

    return (
        <main>
            <Canvas catData={catData} />
        </main>
    );
}
