"use client";

interface Breeds {
  id: string;
  name: string;
}

import { useEffect, useState } from "react";
import Filter from "./Filter";
import { useSearchParams } from "next/navigation";

export default function Sidebar() {
  const [breeds, setBreeds] = useState<Breeds[]>([]);

  const params = useSearchParams();
  const currentQuery = params?.get("breed_ids");

  useEffect(() => {
    async function getBreeds() {
      const response = await fetch(
        `https://api.thecatapi.com/v1/breeds/?limit=15`
      );
      const breeds = await response.json();
      setBreeds(breeds);
    }

    getBreeds();
  }, []);

  return (
    <aside className="md:min-w-[300px] lg:max-w-[300px] hidden md:block bg-slate-900 py-10 h-screen">
      <div className="px-3 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-center mb-5 text-gray-200">
          Filter by breed
        </h2>
        <ul className="flex flex-col gap-3">
          {breeds.map((breed) => (
            <Filter
              key={breed.id}
              id={breed.id}
              name={breed.name}
              selected={currentQuery === breed.id}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}
