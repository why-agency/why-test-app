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
      <>
        {data.map(cat => (
            <CatCard key={cat.id} src={cat.url} width={cat.width} height={cat.height} />
        ))}
      </>
    );
  };
  