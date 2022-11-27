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
        }
    ]);
}