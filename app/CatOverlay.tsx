import Image from "next/image";
import { Breed, CatData } from "../types/types";
import resolveConfig from "tailwindcss/resolveConfig";
import config from "@/tailwind.config";

const fullConfig = resolveConfig(config);
const breakpoints = fullConfig.theme!.screens;

export interface CatOverlayProps {
    data: CatData;
}

const notFoundBreedData: Breed = {
    id: "",
    name: "Breed unknown",
    description: "The breed is unknown",
    wikipedia_url: "",
};

export default function CatOverlay(props: CatOverlayProps) {
    const breed = props.data.breeds?.length ? props.data.breeds[0] : notFoundBreedData;

    return (
        <div className="max-h-[80vh] p-4 max-md:text-sm ">
            <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <Image
                    src={props.data.url}
                    alt={`${breed.name} cat`}
                    fill={true}
                    className="object-cover object-[50%_15%]"
                    sizes={`(max-width: ${breakpoints.md}) 90vw, (max-width: ${breakpoints["2xl"]}) 300px, 400px`}
                />
            </div>
            <h2 className="pb-2 text-xl  md:text-2xl ">{breed.name}</h2>
            <p>{breed.description}</p>
            {!!breed.wikipedia_url && (
                <p className="pt-2">
                    <a
                        href={breed.wikipedia_url}
                        target="_blank"
                        className="text-neutral-600 underline underline-offset-2 hover:text-neutral-800"
                    >
                        Read more{" "}
                    </a>
                </p>
            )}
        </div>
    );
}
