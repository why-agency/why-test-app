"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CatDetailsProps {
  catId: string;
  onToggleOpen: () => void;
}

interface CatDetails {
  url: string;
  breeds: [
    {
      name: string;
      description: string;
      origin: string;
      life_span: number;
      temperament: string;
      wikipedia_url: string;
    }
  ];
}

export default function CatDetails({ catId, onToggleOpen }: CatDetailsProps) {
  const [cat, setCat] = useState<CatDetails>();

  useEffect(() => {
    async function getCatDetails() {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/${catId}`
      );
      const cat = await response.json();
      setCat(cat);
    }

    getCatDetails();
  }, [catId]);

  if (!cat) return null;

  const { name, description, origin, life_span, temperament, wikipedia_url } =
    cat.breeds[0];

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex items-end justify-center md:justify-end bg-slate-900/70">
      <div className="w-screen md:w-[500px] h-[70vh] md:h-screen bg-slate-900 overflow-auto relative">
        <button
          className="absolute top-5 right-5 text-xl text-white font-bold bg-slate-900 rounded-full w-10 h-10 flex justify-center items-center"
          onClick={onToggleOpen}
        >
          X
        </button>
        <div className="flex flex-col items-center">
          <Image
            src={cat.url}
            width={500}
            height={500}
            alt="A cat"
            className="object-cover w-full"
          />
          <div className="flex flex-col items-center px-5">
            <h2 className="text-xl text-gray-200 font-semibold mt-5">{name}</h2>
            <p className="text-md text-gray-300 py-5">{description}</p>
            <dl className="py-5 flex flex-col gap-5 self-start">
              <div>
                <dt className="text-gray-200 font-semibold">Origin</dt>
                <dd className="text-gray-300 text-sm">{origin}</dd>
              </div>

              <div>
                <dt className="text-gray-200 font-semibold">Life span</dt>
                <dd className="text-gray-300 text-sm">{life_span} years</dd>
              </div>

              <div>
                <dt className="text-gray-200 font-semibold">Temperament</dt>
                <dd className="text-gray-300 text-sm">{temperament}</dd>
              </div>

              <div>
                <dt className="text-gray-200 font-semibold">Wikipedia</dt>
                <dd className="text-gray-300 text-sm">
                  <a
                    href={wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {wikipedia_url}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
