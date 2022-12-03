import { FC, useEffect, useState } from "react";
import { XCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import Item from "../models/item";
import { deleteItem, getItems } from "../services/itemsService";
import StyledProps from "./props/styledProps";
import ChooseModal from "./common/ChooseModal";

interface ItemsGridProps extends StyledProps {
    filter?: {
        prop: string
        crit: string
    };
    refresh?: boolean;
    onEditItem?: (item: Item) => void;
}

const ItemsGrid: FC<ItemsGridProps> = ({ filter, refresh, onEditItem, className, style }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number>();
    
    useEffect(() => {
        populateGrid();
    }, [refresh]);

    const populateGrid = () => {
        return getItems().then(fetchedItems => setItems(fetchedItems));
    };

    const handleEditItem = (item: Item) => {
        setSelectedItemId(item.id);
        if(onEditItem) onEditItem(item);
    };

    const promptDeleteItem = (item: Item) => {
        setSelectedItemId(item.id);
        setShowDeleteModal(true);
    };

    const handleDeleteItem = async () => {
        if(selectedItemId) {
            await deleteItem(selectedItemId)
            populateGrid();
            setSelectedItemId(undefined);
        }
        setShowDeleteModal(false);
    };

    const handleCancelDeleteItem = () => {
        setSelectedItemId(undefined);
        setShowDeleteModal(false);
    };

    // TODO: highlight the row that is being edited
    return (
        <div className={className} style={style}>
            <table className="w-full border-gray-50 border-x-2">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th>Quantity</th>
                        <th>Country</th>
                        <th>Color</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length ? items.map(item => (
                        <tr key={item.id} className={`odd:bg-gray-100${selectedItemId === item.id ? ' border-x-2 border-x-black' : ''}`}>
                            <td className="py-2 text-center">{item.name}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-center">{item.country?.name}</td>
                            <td className="text-center">
                                <span className="align-middle inline-block w-5 h-5 rounded-full" style={{ backgroundColor: item.color?.hex }}></span>
                            </td>
                            <td className="text-center">
                                {item.active ? (
                                    <CheckCircleIcon className="inline-block w-6" />
                                ) : (
                                    <XCircleIcon className="inline-block w-6" />
                                )}
                            </td>
                            <td className="text-center">
                                <PencilSquareIcon className="inline-block mr-1 w-6 cursor-pointer transition-all active:text-gray-500" title="Edit"
                                    onClick={() => handleEditItem(item)} />
                                <TrashIcon className="inline-block mr-1 w-6 cursor-pointer transition-all active:text-gray-500" title="Delete"
                                    onClick={() => promptDeleteItem(item)} />
                            </td>
                        </tr>
                    )) :
                        <tr>
                            <td colSpan={5} className="h-24 text-center bg-gray-100">No data</td>
                        </tr>
                    }
                </tbody>
            </table>
            <ChooseModal show={showDeleteModal} onChoose={handleDeleteItem} onCancel={handleCancelDeleteItem} />
        </div>
    )
};

export default ItemsGrid;