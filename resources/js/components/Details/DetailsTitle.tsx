import React from 'react';

export const DetailsTitle: React.FC<{ title?: string; isLoading: boolean }> = ({ title, isLoading }) => {
    return (
        <h1
            className={`text-xl font-bold transition-[filter,opacity] duration-200 ${
                isLoading ? 'animate-pulse opacity-70 blur-sm' : 'blur-0 opacity-100'
            }`}
            aria-busy={isLoading}
        >
            {isLoading ? 'Loading Title…' : (title ?? '')}
        </h1>
    );
};
