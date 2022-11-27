import React, { FC, useEffect, useRef, useState } from "react"

import { getCountries } from "../services/countriesService";
import Country from "../models/country";
import Color from "../models/color";
import Item from "../models/item";
import { getColors } from "../services/colorsService";
import StyledProps from "./props/styledProps";

type ItemData = Item & {
    countryId: number;
    colorId: number;
};

interface ItemFormProps extends StyledProps {
    item?: Item;
    onSent: () => void;
}

const ItemForm: FC<ItemFormProps> = ({ item, onSent, className, style }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [colors, setColors] = useState<Color[]>([]);

    const nameInput = useRef<HTMLInputElement>(null);

    const [formDisabled, setFormDisabled] = useState(true);

    const itemId = item?.id;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: insert data using api
        console.log(nameInput.current?.value);
        onSent();
    };

    useEffect(() => {
        (async () => {
            const [fetchedCountries, fetchedColors] = await Promise.all([getCountries(), getColors()]);
            setCountries(fetchedCountries);
            setColors(fetchedColors);
            setFormDisabled(false);
        })();
    }, []);

    // TODO: border bottom none, border radius bottom none, padding bottom none?
    return (
        <div className={className} style={style}>
            <form onSubmit={onSubmit}>
                <fieldset className="px-4 py-6 border-gray-100 border-x-2 border-t-2 rounded-t-sm">
                    <legend>{ item ? 'Edit' : 'New' } Item</legend>
                    <div className="flex gap-2 mb-3">
                        <div className="flex gap-1">
                            <label>ID</label>
                            <input className="w-10 px-2 border-gray-100 text-center border-2 rounded-sm focus:border-gray-300" disabled value={item?.id ?? '-'} />
                        </div>
                        <div className="flex gap-1 ml-auto">
                            <label>Active</label>
                            <input className="appearance-none w-7 h-7 p-1 border-gray-100 border-2 rounded-sm
                                focus:border-gray-300
                                before:block before:w-full before:h-full before:rounded-sm before:transition-all
                                checked:before:bg-black"
                                type="checkbox"
                                defaultChecked={item?.active} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label>Name</label>
                        <input ref={nameInput} className="px-2 py-1 border-gray-100 border-2 rounded-sm transition-all focus:border-gray-300" type="text" value={item?.name} />
                    </div>
                    <div className="flex gap-3 mb-3">
                        <div className="flex-1 flex flex-col">
                            <label>Quantity</label>
                            <input className="px-2 py-1 border-gray-100 border-2 rounded-sm transition-all focus:border-gray-300" type="number" min={0} value={item?.quantity} />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label>Country</label>
                            <select className="px-2 py-1 border-gray-100 border-2 rounded-sm transition-all focus:border-gray-300" value={item?.country.id}>
                                {countries.length ? countries.map(country => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                )) : (
                                    <option value="-1">-</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-3">Color</div>
                        <div className="flex gap-5 ml-2">
                            {colors.length ? colors.map(color => (
                                <div key={color.id} className="flex gap-1">
                                    <span className="inline-block w-5 h-5 rounded-full" style={{ backgroundColor: color.hex }}></span>
                                    <input className="w-4 accent-black" type="radio" name="color" value={color.id} defaultChecked={item?.color.id === color.id} />
                                </div>
                            )) : (
                                <>
                                    <div className="flex gap-1">
                                        <span>-</span>
                                        <input className="w-4 accent-black" type="radio" name="color" />
                                    </div>
                                    <div className="flex gap-1">
                                        <span>-</span>
                                        <input className="w-4 accent-black" type="radio" name="color" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </fieldset>
                <div className="flex">
                    <button className="flex-1 py-3 text-white font-semibold rounded-bl-sm bg-black transition-all 
                        active:bg-zinc-800
                        disabled:bg-zinc-600 disabled:active:bg-zinc-600" disabled={formDisabled}>SEND</button>
                    <button type="button" className="flex-1 py-3 border-gray-100 border-2 rounded-br-sm transition-all
                        active:bg-gray-100
                        disabled:text-gray-400 disabled:active:bg-white" disabled={formDisabled}>CANCEL</button>
                </div>
            </form>
        </div>
    );
};

export default ItemForm