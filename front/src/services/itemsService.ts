import Item from "../models/item"

const itemsUrl = import.meta.env.VITE_API_URL + '/items'; 

export function getItems(): Promise<Item[]> {
    return fetch(itemsUrl).then(res => res.json());
}

export function createItem(item: Item) {
    return fetch(itemsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(res => res.json());
}

export function updateItem(id: number, item: Partial<Item>) {
    return fetch(itemsUrl + '/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(res => res.json());
}

export function deleteItem(itemId: number) {
    return fetch(itemsUrl + '/' + itemId, {
        method: 'DELETE',
    }).then(res => res.json());
}
