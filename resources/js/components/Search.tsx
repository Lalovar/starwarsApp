import React, { useState } from 'react';
import { boxStyles } from '../utils';

interface SearchProps {
    resource: 'people' | 'movies';
    onResourceChange: (r: 'people' | 'movies') => void;
    onSubmit: (query: string) => void;
    loading: boolean;
}

export const Search: React.FC<SearchProps> = ({ resource, onResourceChange, onSubmit, loading }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(searchQuery.trim());
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className={`h-full w-full max-w-sm text-sm ${boxStyles}`}
        >
            <fieldset>
                <legend className="font-semibold text-[var(--text-style-3)]">What are you searching for?</legend>

                <div className="mt-2.5 flex flex-row gap-2.5 font-bold">
                    <div className="flex flex-row items-center justify-center gap-[5px]">
                        <input type="radio" id="people" name="resource" checked={resource === 'people'} onChange={() => onResourceChange('people')} />
                        <label htmlFor="people">People</label>
                    </div>

                    <div className="ml-[15px] flex flex-row items-center justify-center gap-[5px]">
                        <input type="radio" id="movies" name="resource" checked={resource === 'movies'} onChange={() => onResourceChange('movies')} />
                        <label htmlFor="movies">Movies</label>
                    </div>
                </div>
            </fieldset>

            <div>
                <input
                    type="text"
                    id="searchQuery"
                    name="query"
                    className="mt-1.5 w-full rounded border-1 border-solid border-[var(--pinkish-grey)] bg-[#fff] px-2 py-1.5 font-bold text-[var(--text-style-3)] placeholder-[var(--pinkish-grey)] focus:border-[var(--text-style-3)] focus:outline-none"
                    placeholder={resource === 'people' ? 'e.g. Chewbaca, Yoda, Boba Fett' : 'e.g. A New Hope, Return of the Jedi'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <button
                type="submit"
                disabled={searchQuery.length === 0}
                className="mt-2.5 w-full rounded-xl border-solid border-[var(--green-teal)] bg-[var(--green-teal)] py-1.5 font-bold text-[#fff] disabled:border-[var(--pinkish-grey)] disabled:bg-[var(--pinkish-grey)]"
            >
                {loading ? 'SEARCHING...' : 'SEARCH'}
            </button>
        </form>
    );
};
