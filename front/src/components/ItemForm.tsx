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
import { createItem, updateItem } from "../services/itemsService";

interface ItemFormProps extends StyledProps {
    item?: Item;
    setItem?: (item: Item | undefined) => void;
    onSent: () => void;
}

const ItemForm: FC<ItemFormProps> = ({ item, setItem, onSent, className, style }) => {
    const defaultFormItem: Partial<Item> = {
        name: '',
        quantity: 0,
        countryId: -1,
        colorId: -1,
        active: false
    };
    
    const [countries, setCountries] = useState<Country[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [formItem, setFormItem] = useState<Partial<Item>>(defaultFormItem);
    const [formDisabled, setFormDisabled] = useState(true);

    // TODO: the formItem should only hold the default values if there is no item, otherwise it should all be undefined and render directly from the item

    useEffect(() => {
        (async () => {
            const [fetchedCountries, fetchedColors] = await Promise.all([getCountries(), getColors()]);
            setCountries(fetchedCountries);
            setColors(fetchedColors);
            if(!item) {
                setDefaultValues(fetchedCountries, fetchedColors);
            }
            setFormDisabled(false);
        })();
    }, []);

    useEffect(() => {
        if(item) {
            clear(true);
            setFormItemPartial({
                id: item.id
            });
        }
    }, [item]);

    const setFormItemPartial = (itemFields: Partial<Item>) => {
        setFormItem(prevItem => (
            { ...prevItem, ...itemFields }
        ));
    };

    const setDefaultValues = (countries: Country[], colors: Color[]) => {
        setFormItemPartial(({
            ...defaultFormItem,
            countryId: countries?.[0]?.id ?? -1,
            colorId: colors?.[0]?.id ?? -1
        }));
    };

    const clear = (unset?: boolean) => {
        if(unset) {
            setFormItem({});
        } else {
            setDefaultValues(countries, colors);
        }
    };

    const reset = () => {
        if(setItem) setItem(undefined);
        clear();
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: insert data using api
        if(item) {
            await updateItem(formItem);
        } else {
            await createItem(formItem as Item);
        }
        reset();
        console.log(formItem);
        onSent();
    };

    const onCancel = () => {
        console.log(item);
        reset();
    };

    return (
        <div className={className} style={style}>
            <form onSubmit={onSubmit}>
                <fieldset className="px-4 py-6 border-gray-100 border-x-2 border-t-2 rounded-t-sm">
                    <legend className="text-xl font-semibold">{ item ? 'Edit Item' : 'New Item' }</legend>
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
                                checked={formItem.active ?? item?.active}
                                onChange={e => setFormItemPartial({ active: e.currentTarget.checked })} />
                        </div>
                    </div>
                    <div>
                        <InputText className="mb-3" label="Name"
                            value={formItem.name ?? item?.name}
                            onChange={val => setFormItemPartial({ name: val as string })} minLength={3} required />
                    </div>
                    <div className="flex gap-3 mb-3">
                        <InputNumber className="flex-1" label="Quantity" min={0}
                            value={formItem.quantity ?? item?.quantity}
                            onChange={val => setFormItemPartial({ quantity: val })} required />
                        <Select className="flex-1" label="Country"
                            value={formItem.countryId ?? item?.countryId}
                            onChange={val => setFormItemPartial({ countryId: parseInt(val) })}>
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
                            {colors.length ? colors.map((color) => (
                                <div key={color.id} className="flex gap-1">
                                    <span className="inline-block w-5 h-5 rounded-full" style={{ backgroundColor: color.hex }}></span>
                                    <input className="w-4 accent-black" type="radio" name="color" value={color.id}
                                        checked={color.id === (formItem.colorId ?? item?.colorId)}
                                        onChange={e => setFormItemPartial({ colorId: parseInt(e.currentTarget.value) })}/>
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
                        disabled:bg-zinc-600 disabled:active:bg-zinc-600"
                        disabled={formDisabled}>SEND</button>
                    <button type="button" className="flex-1 py-3 border-gray-100 border-2 rounded-br-sm transition-all
                        active:bg-gray-100
                        disabled:text-gray-400 disabled:active:bg-white"
                        disabled={formDisabled}
                        onClick={onCancel}>CANCEL</button>
                </div>
            </form>
        </div>
    );
};

export default ItemForm;