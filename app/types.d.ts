export type Breed = {
    name: string;
    id: string;
};

export type CatData = {
    breeds: Breed[];
    id: string;
    url: string;
};
