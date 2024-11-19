import BreedListBox from "./filters/BreedListBox"

export type BreedStats = {
  id: string,
  name: string
}

export default async function FilterList() {
  const res = await fetch("https://api.thecatapi.com/v1/breeds", { method: "GET" })
  const data = (await res.json()) as BreedStats[]

  return (
    <div className="min-w-max">
      <h2 className="mb-4">Filter by breed</h2>
      <BreedListBox breeds={data} />
    </div>
  );
}
