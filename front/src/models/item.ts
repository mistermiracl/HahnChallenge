import Color from "./color";
import Country from "./country";

class Item {
    id?: number;
    name: string;
    quantity: number;
    country: Country;
    color: Color;
    active: boolean;

    constructor(name: string, quantity: number, country: Country, color: Color, active: boolean, id?: number) {
        this.name = name;
        this.quantity = quantity;
        this.country = country;
        this.color = color;
        this.active = active;
        this.id = id;
    }
}

export default Item;