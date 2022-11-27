import Color from "../models/color";
import Country from "../models/country";
import Item from "../models/item"

const itemsUrl = import.meta.env.BASE_URL 

const dummyItems: Item[] = [
    new Item('Pokeball', 2, new Country(1, 'Peru'), new Color(1, 'Red', '#ff0000'), true, 10),
    new Item('Masterball', 1, new Country(2, 'Bolivia'), new Color(2, 'Yellow', '#ffeb3b'), false, 11)
];

export function getItems(): Promise<Item[]> {
    return Promise.resolve(dummyItems);
}