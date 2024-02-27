import Canvas from "./Canvas";
import { getData } from "../api/functions";
import { CatData } from "../types/types";
import CatGridMobile from "./CatGridMobile";
import RenderOnDevice from "./RenderOnDevice";

export interface HomePageProps {
    searchParams: { breeds: string | null };
}

export default async function HomePage(props: HomePageProps) {
    let catData: CatData[] = await getData();
    const filterBreeds = props.searchParams.breeds ? (JSON.parse(props.searchParams.breeds) as string[]) : undefined;

    return (
        <main>
            <RenderOnDevice renderOn="desktop">
                <Canvas
                    catData={catData}
                    filterBreeds={filterBreeds}
                />
            </RenderOnDevice>

            <RenderOnDevice renderOn="mobile">
                <CatGridMobile catData={catData} />
            </RenderOnDevice>
        </main>
    );
}
