import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Film } from '../types';

const fetchFilmByUID = async (uid: string): Promise<Film> => {
    const response = await fetch(`/api/searchByUID/films/${encodeURIComponent(uid)}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch film');
    }
    return response.json();
};

export const useFilmByUID = (
    uid: string | undefined,
    options?: Omit<UseQueryOptions<Film, Error>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<Film, Error>({
        queryKey: ['film', uid],
        queryFn: () => fetchFilmByUID(uid!),
        staleTime: 5 * 60 * 1000,
        enabled: !!uid,
        ...options,
    });
};
