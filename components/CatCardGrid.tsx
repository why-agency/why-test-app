import CatCard from "./CatCard"

export type CatData = {
    id: string,
    url: string,
    width: number,
    height: number
}

export default async function CatCardGrid() {
    const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10", { method: 'GET' })
    const data = await res.json() as CatData[]

    return (
      <section className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map(cat => (
            <CatCard key={cat.id} src={cat.url} />
        ))}
      </section>
    );
  };
  