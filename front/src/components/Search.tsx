import { FC } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputText from "./common/InputText";

interface SearchProps {
    placeholder?: string
    onSearch: (query: string) => void;
}

const Search: FC<SearchProps> = ({ placeholder, onSearch }) => (
    <form className="flex">
        <span className="py-2 px-4 rounded-l-sm bg-gray-100">
            <MagnifyingGlassIcon className="w-5 h-5"></MagnifyingGlassIcon>
        </span>
        <InputText className="flex-1" placeholder={placeholder} onInput={val => onSearch(val as string)}></InputText>
    </form>
);

export default Search;