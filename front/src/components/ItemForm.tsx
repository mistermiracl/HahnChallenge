import React, { FC, useEffect, useState } from "react"

import { getCountries } from "../services/countriesService";
import Country from "../models/country";
import Color from "../models/color";
import Item from "../models/item";
import { getColors } from "../services/colorsService";
import StyledProps from "./props/styledProps";
import InputText from "./common/InputText";
import Select from "./common/Select";
import InputNumber from "./common/InputNumber";

interface ItemFormProps extends StyledProps {
    item?: Item;
    onSent: () => void;
}

const ItemForm: FC<ItemFormProps> = ({ item, onSent, className, style }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [formDisabled, setFormDisabled] = useState(true);

    const [itemName, setItemName] = useState(item?.name);
    const [itemQty, setItemQty] = useState(item?.quantity);
    const [itemCountryId, setItemCountryId] = useState(item?.country.id);
    const [itemColorId, setItemColorId] = useState(item?.color.id);
    const [itemActive, setItemActive] = useState(item?.active || false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: insert data using api
        console.log(item?.id);
        console.log(itemName);
        console.log(itemQty);
        console.log(itemCountryId);
        console.log(itemColorId);
        console.log(itemActive);
        onSent();
    };

    useEffect(() => {
        (async () => {
            const [fetchedCountries, fetchedColors] = await Promise.all([getCountries(), getColors()]);
            setCountries(fetchedCountries);
            if(!itemCountryId) setItemCountryId(fetchedCountries?.[0].id);
            setColors(fetchedColors);
            if(!itemColorId) setItemColorId(fetchedColors?.[0].id);
            setFormDisabled(false);
        })();
    }, []);

    // TODO: border bottom none, border radius bottom none, padding bottom none?
    return (
        <div className={className} style={style}>
            <form onSubmit={onSubmit}>
                <fieldset className="px-4 py-6 border-gray-100 border-x-2 border-t-2 rounded-t-sm">
                    <legend>{ item ? 'Edit' : 'New' } Item</legend>
                    <div className="flex items-center gap-2 mb-3">
                        <InputText className="w-14" inputClassName="text-center" label="ID" disabled horizontal 
                            value={item?.id ?? '-'} />
                        <div className="flex gap-1 ml-auto">
                            <label>Active</label>
                            <input className="appearance-none w-7 h-7 p-1 border-gray-100 border-2 rounded-sm
                                focus:border-gray-300
                                before:block before:w-full before:h-full before:rounded-sm before:transition-all
                                checked:before:bg-black"
                                type="checkbox"
                                defaultChecked={item?.active}
                                onChange={e => setItemActive(e.currentTarget.checked)} />
                        </div>
                    </div>
                    <div>
                        <InputText className="mb-3" label="Name" value={item?.name} onChange={val => setItemName(val as string)} minLength={3} required />
                    </div>
                    <div className="flex gap-3 mb-3">
                        <InputNumber className="flex-1" label="Quantity" min={0} value={item?.quantity}
                            onChange={val => setItemQty(val)} required />
                        <Select className="flex-1" label="Country" value={item?.country.id}
                            onChange={val => setItemCountryId(parseInt(val))}>
                            {countries.length ? countries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            )) : (
                                <option value="-1">-</option>
                            )}
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-3">Color</div>
                        <div className="flex gap-5 ml-2">
                            {colors.length ? colors.map((color, index) => (
                                <div key={color.id} className="flex gap-1">
                                    <span className="inline-block w-5 h-5 rounded-full" style={{ backgroundColor: color.hex }}></span>
                                    <input className="w-4 accent-black" type="radio" name="color" value={color.id} defaultChecked={index === 0 || item?.color.id === color.id}
                                        onChange={e => setItemColorId(parseInt(e.currentTarget.value))}/>
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