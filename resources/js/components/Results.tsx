import React from 'react';
import { Character, Film } from '../types';

export const Results: React.FC = () => {
    const a = [{ name: 'Bigsby' }, { name: 'Bubba' }, { name: 'Bubbles' }, { name: 'Biggy' }, { name: 'Biggles' }, { name: 'Biggy' }];


    return (
        <div className='w-full max-w-md text-sm px-6 py-4 min-h-[400px]
            bg-white shadow-color-[var(--warm-grey-75)] shadow-sm'>
            <Item isHeader={true} />
            {a.map((item) => (
                <Item isHeader={false} data={item as Character} />
            ))}
        </div>
    )
};

const Item = (props: { isHeader?: boolean, data?: Character | Film }) => {
    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <span className={"font-bold text-" + (props.isHeader ? "xl" : "lg")}>{props.isHeader ? 'Results' : props.data?.name}</span>
                {
                    props.isHeader === false && (
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
