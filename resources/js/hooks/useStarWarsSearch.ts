import { SearchResponse } from '@/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type Resource = 'people' | 'movies';

export const searchFilmsQuery = async (queryParam: string): Promise<SearchResponse[]> => {
    if (!queryParam.trim()) throw new Error('Query is required');

    const response = await fetch(`/api/searchByName/films?title=${encodeURIComponent(queryParam)}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search films');
    }
    return response.json();
};

const searchCharactersQuery = async (query: string): Promise<SearchResponse[]> => {
    const res = await fetch(`/api/searchByName/people?name=${encodeURIComponent(query)}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch characters');
    }
    return res.json();
};

export function useStarWarsSearch(resource: Resource, queryParam: string, options?: UseQueryOptions) {
    return useQuery({
        queryKey: ['search', resource, queryParam],
        queryFn: async (): Promise<SearchResponse[]> => {
            if (resource === 'people') {
                const r = await searchCharactersQuery(queryParam);
                return r;
            } else {
                const r = await searchFilmsQuery(queryParam);
                return r;
            }
        },
        enabled: !!queryParam,
        ...options,
    });
}
