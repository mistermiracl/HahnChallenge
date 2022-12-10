import Country from "../models/country";

const countriesUrl = import.meta.env.VITE_API_URL + '/countries';

export function getCountries(): Promise<Country[]> {
    return fetch(countriesUrl).then(res => res.json());
}