import React from 'react';
import { Character, Film } from '../types';

interface ResultsProps {
    apiResponse: Character[] | Film[] | [];
    loading: boolean;
    error: string | null;
}

export const Results: React.FC<ResultsProps> = ({ apiResponse, loading, error }) => {
    return (
        <div className="shadow-color-[var(--warm-grey-75)] min-h-[400px] w-full max-w-md bg-white px-6 py-4 text-sm shadow-sm">
            <Item isHeader={true} />
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && apiResponse?.length === 0 && <div>No results found</div>}
            {!loading && !error && apiResponse?.length > 0 && apiResponse.map((item) => <Item key={(item as Character).name || (item as Film).name} data={item} />)}
        </div>
    );
};

const Item = (props: { isHeader?: boolean, data?: Character | Film }) => {
    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <span className={"font-bold text-" + (props.isHeader ? "xl mb-3" : "lg")}>{props.isHeader ? 'Results' : props.data?.name}</span>
                {
                    !props.isHeader && (
                        <button
                            className='w-auto text-[#fff] font-bold px-4 py-1.5 my-2.5 text-sm
                            rounded-xl border-[var(--green-teal)] border-solid bg-[var(--green-teal)]'>
                            SEE DETAILS
                        </button>
                    )}
            </div>
            <div className='w-full h-[0.5px] bg-[var(--pinkish-grey)]'></div>
        </>
    )
};
