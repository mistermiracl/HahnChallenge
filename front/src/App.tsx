import { useState } from "react";

import ItemForm from './components/ItemForm';
import Search from './components/Search';
import ItemsGrid from './components/ItemsGrid';
import Item from './models/item';

function App() {
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [filterCrit, setFilterCrit] = useState('');

    const [refreshGrid, setRefreshGrid] = useState<boolean>()
    
    const onSearch = (query: string) => {
        console.log(query);
        setFilterCrit(query);
    };

    const onFormSent = () => {
        // TODO: refetch and repopulate grid
        setRefreshGrid(!refreshGrid);
    };

    return (
        <div className="m-auto max-w-3xl p-2">
            <h1 className="py-8 text-4xl font-bold italic text-center">Hahn Challenge</h1>
            <ItemForm className="mb-10" itemState={[selectedItem, setSelectedItem]} onSent={onFormSent} />
            <Search placeholder="Search by name" onSearch={onSearch} />
            <ItemsGrid className="mb-12" filter={{ prop: 'name', crit: filterCrit }} editItemState={[selectedItem, setSelectedItem]} refresh={refreshGrid} />
        </div>
    );
};

export default App
