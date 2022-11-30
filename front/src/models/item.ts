import Color from "./color";
import Country from "./country";

class Item {
    id?: number;
    name: string;
    quantity: number;
    countryId: number;
    colorId: number;
    active: boolean;
    country?: Country;
    color?: Color;

    constructor(name: string, quantity: number, countryId: number, colorId: number, active: boolean, id?: number, country?: Country, color?: Color) {
        this.name = name;
        this.quantity = quantity;
        this.countryId = countryId;
        this.colorId = colorId;
        this.active = active;
        this.id = id;
        this.color = color;
        this.country = country;
    }
}

export default Item;