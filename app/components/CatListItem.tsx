"use client";

import Image from "next/image";
import CatDetails from "./CatDetails";
import { useState } from "react";

interface CatListItemProps {
  cat: {
    id: string;
    url: string;
  };
}

export default function CatListItem({ cat }: CatListItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  function toggleOpen() {
    setShowDetails(!showDetails);
  }

  return (
    <>
      <li className="cursor-pointer" onClick={toggleOpen}>
        <Image
          src={cat.url}
          width={300}
          height={250}
          alt="A cat"
          className="w-[300px] h-[250px] object-cover transition hover:scale-[1.05] rounded-md"
        />
      </li>
      {showDetails && <CatDetails catId={cat.id} onToggleOpen={toggleOpen} />}
    </>
  );
}
