// MainContent.tsx
import { useStarWarsSearch } from '@/hooks/useStarWarsSearch';
import React, { useState } from 'react';
import { AppBar, Results, Search } from './components';
import { Character, Film } from './types';

type Resource = 'people' | 'movies';

export const MainContent: React.FC = () => {
    const [resource, setResource] = useState<Resource>('people');
    const [resourceDraft, setResourceDraft] = useState<Resource>('people');
    const [submittedQuery, setSubmittedQuery] = useState('');

    const { data = [], isLoading, error } = useStarWarsSearch(resource, submittedQuery);

    const handleSubmit = (query: string) => {
        setResource(resourceDraft);
        setSubmittedQuery(query);
    };

    return (
        <div className="min-h-screen w-screen bg-[#ededed]">
            <AppBar />
            <div className="flex flex-row flex-wrap justify-center gap-[15px]">
                <Search resource={resourceDraft} onResourceChange={setResourceDraft} onSubmit={handleSubmit} />
                <Results apiResponse={data as Character[] | Film[] | []} loading={isLoading} error={error ? error.message : null} />
            </div>
        </div>
    );
};
