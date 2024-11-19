export type BreedStats = {
    id: string,
    name: string
}

export default async function FilterList() {
    const res = await fetch("https://api.thecatapi.com/v1/breeds", { method: 'GET' })
    const data = await res.json() as BreedStats[]

    return (
        <div>
            <h2>Filter by breed</h2>
            {data.map((breed, index) => (
                <div key={index}>{breed.name}</div>
            ))}
        </div>
    )
}