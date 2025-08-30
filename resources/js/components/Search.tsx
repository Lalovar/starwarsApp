import React, { useState } from 'react';

export const Search: React.FC = () => {
    const [resource, setResource] = useState<'people' | 'movies'>('people');
    const [searchedValue, setSearchedValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (resource === 'people') {
            console.log(`Searching people: ${searchedValue}`);
            // TODO: call useSearchCharacters(query)
        } else {
            console.log(`Searching movies: ${searchedValue}`);
            // TODO: call useSearchMovies(query)
        }
    };

    return (
        <form
            role="search"
            onSubmit={handleSubmit}
            className='w-full max-w-xs text-sm p-4 h-[170px]
                bg-white shadow-color-[var(--warm-grey-75)] shadow-sm'>
            <fieldset>
                <legend className='text-[var(--text-style-3)] font-semibold'>
                    What are you searching for?
                </legend>

                <div className='mt-2.5 font-bold flex flex-row gap-2.5'>
                    <div className='flex flex-row gap-[5px] justify-center items-center'>
                        <input
                            type="radio"
                            id="people"
                            name="resource"
                            checked={resource === 'people'}
                            onChange={() => setResource('people')}
                        />
                        <label htmlFor="people">People</label>
                    </div>

                    <div className='flex flex-row gap-[5px] justify-center items-center ml-[15px]'>
                        <input
                            type="radio"
                            id="movies"
                            name="resource"
                            checked={resource === 'movies'}
                            onChange={() => setResource('movies')}
                        />
                        <label htmlFor="movies">Movies</label>
                    </div>
                </div>
            </fieldset>

            <div>
                <input
                    type="text"
                    id="searchQuery"
                    name="query"
                    className='w-full  mt-1.5 px-2 py-1.5
                        border-1 rounded border-[var(--pinkish-grey)] border-solid bg-[#fff]
                        font-bold text-[var(--text-style-3)]
                        focus:border-[var(--text-style-3)] focus:outline-none placeholder-[var(--pinkish-grey)]'
                    placeholder={resource === 'people' ? 'e.g. Chewbaca, Yoda, Boba Fett' : 'e.g. A New Hope'}
                    value={searchedValue}
                    onChange={(e) => setSearchedValue(e.target.value)}
                />
            </div>

            <button
                type="submit"
                disabled={searchedValue.length === 0}
                className='w-full mt-2.5 py-1.5
                rounded-xl border-[var(--green-teal)] border-solid bg-[var(--green-teal)]
                text-[#fff] font-bold
                disabled:bg-[var(--pinkish-grey)] disabled:border-[var(--pinkish-grey)]'>
                SEARCH
            </button>
        </form>
    );
};
