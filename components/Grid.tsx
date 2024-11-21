import CatCard from "./CatCard";
import { CatData } from "../lib/types";

interface GridProps {
  catData: CatData[];
}

export default function Grid(props: GridProps) {
  return (
    <section className="w-full h-max grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {props.catData.map((cat) => (
        <CatCard key={cat.id} src={cat.url} />
      ))}
    </section>
  );
}
