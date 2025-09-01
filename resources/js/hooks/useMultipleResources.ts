import { useQueries, UseQueryResult } from '@tanstack/react-query';

interface FetchedItem {
    uid: string;
    value?: string;
}

interface SWAPIResponse {
    result: {
        uid: string;
        properties: {
            name?: string;
            title?: string;
        };
    };
}

const fetchResource = async (url: string): Promise<SWAPIResponse> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch resource');
    return res.json();
};

export const useMultipleResources = (urls: string[]) => {
    // Run all queries in parallel
    const queries = useQueries({
        queries: urls.map((url) => ({
            queryKey: ['swapi', url],
            queryFn: () => fetchResource(url),
            staleTime: 5 * 60 * 1000,
        })),
    }) as UseQueryResult<SWAPIResponse>[];

    // Wait until *all* queries are either success or error
    const allSettled = urls.length > 0 && queries.every((q) => q.isSuccess || q.isError);

    // When settled, build items only from successful queries
    const items: FetchedItem[] = allSettled
        ? (queries
              .map((q) => {
                  if (!q.data || q.isError) return null;
                  const data = q.data.result;
                  return {
                      uid: data.uid,
                      value: data.properties.name || data.properties.title,
                  };
              })
              .filter(Boolean) as FetchedItem[])
        : [];

    return {
        items,
        allSettled,
        isLoading: !allSettled && urls.length > 0,
        queries,
    };
};
