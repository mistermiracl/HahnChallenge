import Color from "../models/color";
import Country from "../models/country";
import Item from "../models/item"

const itemsUrl = import.meta.env.BASE_URL 

const dummyItems: Item[] = [
    new Item('Pokeball', 2, 1, 1, true, 10, new Country(1, 'Peru'), new Color(1, 'Red', '#ff0000')),
    new Item('Masterball', 1, 2, 2, false, 11, new Country(2, 'Bolivia'), new Color(2, 'Yellow', '#ffeb3b'))
];

export function getItems(): Promise<Item[]> {
    return Promise.resolve([...dummyItems]);
}

export function createItem(item: Item) {
    item.id = dummyItems[dummyItems.length - 1].id! + 1;
    dummyItems.push(item);
    return Promise.resolve({ status: 'ok' });
}

export function updateItem(item: Partial<Item>) {
    const itemIndex = dummyItems.findIndex(dummy => dummy.id === item.id);
    dummyItems[itemIndex] = { ...dummyItems[itemIndex], ...item };
    return Promise.resolve({ status: 'ok' });
}

export function deleteItem(itemId: number) {
    const itemIndex = dummyItems.findIndex(dummy => dummy.id === itemId);
    dummyItems.splice(itemIndex, 1);
    return Promise.resolve({ status: 'ok' });
}