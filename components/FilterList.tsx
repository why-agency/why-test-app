import BreedListBox from "./filters/BreedListBox"
import { getBreeds } from "@/lib/actions";


export default async function FilterList() {
  const breedData = await getBreeds()

  return (
    <div className="min-w-max hidden sm:block">
      <h2 className="mb-4">Filter by breed</h2>
      <BreedListBox breeds={breedData} />
    </div>
  );
}
