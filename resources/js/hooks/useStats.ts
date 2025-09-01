import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface StatsData {
  computed_at: string;
  total_queries: number;
  avg_duration: number;
  error_rate: number;
  popular_hour: number;
  resource_mix: {
    films: number;
    people: number;
  };
  top_devices: {
    [key: string]: number;
  };
  top_queries: Array<{
    term: string;
    count: number;
    percent: number;
  }>;
  slowest_queries: Array<{
    term: string;
    ms: number;
  }>;
}

const fetchStats = async (): Promise<StatsData> => {
  const response = await fetch('/api/stats');
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};

const recomputeStats = async (): Promise<{ message: string }> => {
  const response = await fetch('/api/stats/recompute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to recompute stats');
  }
  
  return response.json();
};

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useRecomputeStats = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: recomputeStats,
    onSuccess: () => {
      // Wait a bit for the job to process, then refetch
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['stats'] });
      }, 2000);
    },
  });
};
