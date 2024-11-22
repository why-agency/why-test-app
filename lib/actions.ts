"use server";

import { BreedStats, CatData } from "./types";

export async function getCats(breedId: string) {
  const url = `https://api.thecatapi.com/v1/images/search?limit=50${
    breedId ? "&breed_ids=" + breedId : ""
  }`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "" + process.env.NEXT_CAT_API_KEY,
    },
    cache: "no-store",
  });
  const data = (await res.json()) as CatData[];

  return data;
}

export async function getBreeds() {
  const res = await fetch("https://api.thecatapi.com/v1/breeds", {
    method: "GET",
  });
  const data = (await res.json()) as BreedStats[];

  return data;
}
