import { FC } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

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
            <input className="flex-1 px-2 border-gray-100 border-2 rounded-r-sm transition-all focus:border-gray-300" 
                type="text" 
                autoComplete="off" 
                placeholder={placeholder ?? 'Search'}
                onInput={e => onInput(e.currentTarget.value)}
            />
        </form>
    );
};

export default Search;