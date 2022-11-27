import { FC } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputText from "./common/InputText";

interface SearchProps {
    placeholder?: string
    onSearch: (query: string) => void;
}

const Search: FC<SearchProps> = ({ placeholder, onSearch }) => {
    const onInput = (query: string) => {
        onSearch(query);
    };

    // const onSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     onSearch(searchQuery);
    // };

    return (
        // onSubmit={onSubmit}
        <form className="flex">
            <span className="py-2 px-4 rounded-l-sm bg-gray-100">
                <MagnifyingGlassIcon className="w-5 h-5"></MagnifyingGlassIcon>
            </span>
            <InputText className="flex-1" placeholder={placeholder} onInput={onInput}></InputText>
        </form>
    );
};

export default Search;