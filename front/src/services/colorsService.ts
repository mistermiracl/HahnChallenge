import Color from "../models/color";

export function getColors(): Promise<Color[]> {
    return Promise.resolve([
        {
            id: 1,
            name: 'Red',
            hex: '#ff0000'
        },
        {
            id: 2,
            name: 'Yellow',
            hex: '#ffeb3b'
        },
        {
            id: 3,
            name: 'Blue',
            hex: '#3f51b5'
        },
        {
            id: 4,
            name: 'Green',
            hex: '#4caf50'
        }
    ])
}