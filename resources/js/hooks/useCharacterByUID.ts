import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Character } from '../types';

const fetchCharacterByUID = async (uid: string): Promise<Character> => {
    const response = await fetch(`/api/searchByUID/people/${encodeURIComponent(uid)}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch character');
    }
    return response.json();
};

export const useCharacterByUID = (
    uid: string | undefined,
    options?: Omit<UseQueryOptions<Character, Error>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<Character, Error>({
        queryKey: ['character', uid],
        queryFn: () => fetchCharacterByUID(uid!),
        staleTime: 5 * 60 * 1000,
        enabled: !!uid,
        ...options,
    });
};
