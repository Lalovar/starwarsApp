import { useQuery } from '@tanstack/react-query';
import { Character } from '../types';

export const searchCharactersQuery = async (queryParam: string): Promise<Character[]> => {
  if (!queryParam.trim()) throw new Error('Query is required');

  const response = await fetch(`/api/search/people?name=${encodeURIComponent(queryParam)}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to search characters');
  }
  return response.json();
};

export const useSearchCharacters = (queryParam: string) => {
  return useQuery<Character[], Error>({
    queryKey: ['characters', queryParam],
    queryFn: () => searchCharactersQuery(queryParam),
    enabled: !!queryParam,       // only runs if query is non-empty
  });
};
