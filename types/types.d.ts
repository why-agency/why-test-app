export type Breed = {
    name: string;
    id: string;
    description: string;
    wikipedia_url: string;
};

export type CatData = {
    breeds: Breed[];
    id: string;
    url: string;
};
