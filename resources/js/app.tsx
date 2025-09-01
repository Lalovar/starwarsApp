import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainContent } from './MainContent';
import { AppBar, CharacterDetail, FilmDetail } from './components';
import '../css/app.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
        },
    },
});

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppBar />
                <div className="min-h-screen w-screen bg-[#ededed] pt-[20px]">
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/character/:uid" element={<CharacterDetail />} />
                        <Route path="/film/:uid" element={<FilmDetail />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
