import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../css/app.css';
import { useSearchCharacters } from './hooks/useSearchCharacters';
import { MainContent } from './MainContent';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
        },
    },
});

const AppContent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');

    const { data: characters, isLoading, error } = useSearchCharacters(submittedQuery);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmittedQuery(searchQuery);
    };

    return (
        // add tailwind classes for the div to occupy all the window 
        <div className="bg-[#ededed] w-screen h-screen">
            <form onSubmit={handleSearch}>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" disabled={isLoading}>Search</button>
            </form>
            {error && <div className="text-red-500">{error.message}</div>}
            {characters && characters.length > 0 && (
                <div>
                    {characters.map((character) => (
                        <div key={character.name}>{character.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MainContent />
        </QueryClientProvider>
    );
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
