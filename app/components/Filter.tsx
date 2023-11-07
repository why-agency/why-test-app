"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps {
  id: string;
  name: string;
  selected?: boolean;
}

export default function Filter({ id, name, selected }: FilterProps) {
  const router = useRouter();
  const params = useSearchParams();

  function handleClick() {
    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      breed_ids: id,
      breed_name: name,
    };

    if (params?.get("breed_ids") === id) delete updatedQuery.breed_ids;

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }

  return (
    <li
      onClick={handleClick}
      className={`flex flex-col items-center justify-center border-2 p-1 rounded-md hover:text-neutral-100 transition cursor-pointer
    ${selected ? "border-gray-200" : "border-transparent"}
    ${selected ? "text-gray-200" : "text-neutral-300"}`}
    >
      <p>{name}</p>
    </li>
  );
}
