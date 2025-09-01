import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate('/')} className="rounded-4xl bg-[var(--green-teal)] px-7 py-2 text-white text-xs font-bold ">
            BACK TO SEARCH
        </button>
    );
};
