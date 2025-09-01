import React from 'react';

export const AppBar: React.FC = () => {
    return (
        <div className="w-screen h-[40px] flex items-center justify-center bg-white shadow-color-[var(--green-teal)] shadow-xs">
            <p className="text-[18px] font-bold text-[var(--green-teal)]">
                SWStarter {/* Hot reload test */}
            </p>
        </div>
    )
};