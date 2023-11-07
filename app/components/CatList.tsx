"use client";

import { useSearchParams } from "next/navigation";
import CatListItem from "./CatListItem";
import { useState, useEffect } from "react";

interface Cat {
  id: string;
  url: string;
  breeds?: Breed[];
}

interface Breed {
  temperament?: string;
}

const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY;

export default function CatList() {
  const params = useSearchParams();
  const currentQuery = params?.get("breed_ids");
  const currentQueryName = params?.get("breed_name");

  let url: string;

  if (currentQuery) {
    url = `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=${currentQuery}&api_key=${API_KEY}`;
  } else {
    url = `https://api.thecatapi.com/v1/images/search?limit=20&has_breeds=true&api_key=${API_KEY}`;
  }

  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchCats() {
      const response = await fetch(url);
      const cats = await response.json();
      setCats(cats);
    }

    fetchCats();
    setIsLoading(false);
  }, [currentQuery, url]);

  if (cats.length === 0) return null;
  const temperament = cats[0]?.breeds?.[0]?.temperament;

  return (
    <section className="flex flex-col">
      <h2 className="text-center py-5 md:text-left md:px-5 md:pt-10 text-xl font-semibold md:text-2xl text-gray-200">
        List of {currentQuery ? currentQueryName : "all"} cats
      </h2>
      {currentQuery && (
        <p className="text-center mb-5 md:px-5 md:text-left text-gray-300">
          {temperament}
        </p>
      )}
      <ul className="flex flex-wrap justify-center lg:justify-start gap-5 py-5 px-5 overflow-auto">
        {cats.map((cat: Cat) => (
          <CatListItem key={cat.id} cat={cat} />
        ))}
      </ul>
    </section>
  );
}
