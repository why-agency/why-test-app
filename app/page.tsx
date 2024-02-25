import Canvas from "./Canvas";
import { getData } from "../api/functions";
import { CatData } from "../types/types";
import CatGridMobile from "./CatGridMobile";
import RenderOnDevice from "./RenderOnDevice";

export default async function HomePage() {
    let catData: CatData[] = await getData();

    return (
        <main>
            <RenderOnDevice renderOn="desktop">
                <Canvas catData={catData} />
            </RenderOnDevice>

            <CatGridMobile
                catData={catData}
                className="md:hidden"
            />
        </main>
    );
}
