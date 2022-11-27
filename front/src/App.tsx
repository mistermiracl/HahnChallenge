import { useState } from "react";

import ItemForm from './components/ItemForm';
import Search from './components/Search';
import ItemsGrid from './components/ItemsGrid';
import Item from './models/item';

function App() {
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
    const [filterCrit, setFilterCrit] = useState('');

    const onSearch = (query: string) => {
        console.log(query);
        setFilterCrit(query);
    };

    const onFormSent = () => {
        // TODO: refetch and repopulate grid
        // setItems(items => );
    };

    return (
        <div className="m-auto max-w-3xl">
            <h1 className="py-8 text-4xl font-bold italic text-center">Hahn Challenge</h1>
            <ItemForm className="mb-10" onSent={onFormSent}></ItemForm>
            <Search placeholder="Search by name" onSearch={onSearch}></Search>
            <ItemsGrid className="mb-12" filter={{ prop: 'name', crit: filterCrit }}></ItemsGrid>
        </div>
    );
};

export default App
