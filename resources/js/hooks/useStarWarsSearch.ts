// hooks/useStarWarsSearch.ts
import { Character, Film } from '@/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type AnyItem = Character | Film;
type Resource = 'people' | 'movies';

export const searchFilmsQuery = async (queryParam: string): Promise<Film[]> => {
    if (!queryParam.trim()) throw new Error('Query is required');

    const response = await fetch(`/api/search/films?title=${encodeURIComponent(queryParam)}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search films');
    }
    return response.json();
};

const searchCharactersQuery = async (query: string): Promise<Character[]> => {
    const res = await fetch(`/api/search/people?name=${encodeURIComponent(query)}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch characters');
    }
    return res.json();
};

export function useStarWarsSearch(
    resource: Resource,
    queryParam: string,
    options?: UseQueryOptions
) {
    return useQuery({
        queryKey: ['search', resource, queryParam],
        queryFn: async (): Promise<AnyItem[]> => {
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
