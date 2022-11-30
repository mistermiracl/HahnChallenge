import Country from "../models/country";

export function getCountries(): Promise<Country[]> {
    return Promise.resolve([
        {
            id: 1,
            name: 'Peru'
        },
        {
            id: 2,
            name: 'Bolivia'
        },
        {
            id: 3,
            name: 'Colombia'
        },
        {
            id: 4,
            name: 'Brazil'
        },
        {
            id: 5,
            name: 'Ecuador'
        }
    ]);
}