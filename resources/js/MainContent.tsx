import React, { useState } from 'react';
import { Results, Search } from './components';
import { useStarWarsSearch } from './hooks/';
import { SearchResponse } from './types';

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
        <div className="flex flex-row flex-wrap justify-center gap-[15px]">
            <Search resource={resourceDraft} onResourceChange={setResourceDraft} onSubmit={handleSubmit} loading={isLoading} />
            <Results apiResponse={data as SearchResponse[] | []} resource={resourceDraft} loading={isLoading} error={error ? error.message : null} />
        </div>
    );
};
