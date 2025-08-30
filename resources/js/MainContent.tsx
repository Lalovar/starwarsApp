import React from 'react';
import { AppBar, Results, Search } from './components';

export const MainContent: React.FC = () => {
    return (
        <div className="bg-[#ededed] min-h-screen w-screen">
            <AppBar />
            <div className='flex flex-row justify-center gap-[15px] flex-wrap'>
                <Search />
                <Results />
            </div>
        </div>
    )
};
