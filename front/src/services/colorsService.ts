import Color from "../models/color";

const colorsUrl = import.meta.env.VITE_API_URL + '/colors';

export function getColors(): Promise<Color[]> {
    return fetch(colorsUrl).then(res => res.json())
}