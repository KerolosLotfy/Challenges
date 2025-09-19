export type objData = {
    name: string,
    topLevelDomain: string[],
    capital: string,
    subregion: string,
    region: string,
    population: number,
    nativeName: string,
    flag: string,
    languages: { name: string }[], // Array of language objects with a 'name' property
    currencies: { name: string }[], // Array of currency objects with a 'name' propertyme
    borders: string[],
    alpha3Code: string
}
