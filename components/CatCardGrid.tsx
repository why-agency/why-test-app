import Grid from "./Grid";
import FilterList from "./FilterList"
import { getCats } from "../lib/actions";

interface CatCardGridProps {
  filter: any
}

export default async function CatCardGrid(props: CatCardGridProps) {
  const catData = await getCats(props.filter.filterBreed)

  return (
    <div className="flex gap-6 lg:max-w-screen-xl lg:mx-auto">
      <FilterList />
      <Grid catData={catData} />
    </div>

  );
};
