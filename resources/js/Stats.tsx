import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip as RTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useStats, useRecomputeStats } from './hooks/useStats';

type TopQuery = { term: string; count: number; percent: number };
type SlowQuery = { term: string; ms: number };

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-lg bg-white p-4 shadow-sm">
    <div className="mb-3 text-sm font-semibold text-gray-700">{title}</div>
    {children}
  </div>
);

const StatKpi: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="rounded-lg bg-white p-4 shadow-sm">
    <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
    <div className="mt-1 text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

export const StatsPage: React.FC = () => {
  const { data, isLoading, error, refetch, isFetching } = useStats();
  const recomputeMutation = useRecomputeStats();

  const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#a78bfa', '#ef4444', '#10b981', '#6366f1'];

  const computedAtLocal = data ? new Date(data.computed_at).toLocaleString() : '—';

  const handleRecompute = () => {
    recomputeMutation.mutate();
  };

  const resourceMixData =
    data ? Object.entries(data.resource_mix).map(([name, value]) => ({ name, value })) : [];

  const devicesData =
    data ? Object.entries(data.top_devices).map(([name, value]) => ({ name, value })) : [];

  const topQueriesData =
    data?.top_queries?.map((q) => ({ term: q.term, percent: q.percent, count: q.count })) ?? [];

  const slowestRows = data?.slowest_queries ?? [];

  return (
    <div className="min-h-screen w-full bg-[#ededed] p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-gray-900">Search Metrics</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Metrics computed at: <span className="font-semibold">{computedAtLocal}</span></span>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {isFetching ? 'Refreshing…' : 'Refresh'}
            </button>
            <button
              onClick={handleRecompute}
              disabled={recomputeMutation.isPending}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {recomputeMutation.isPending ? 'Recomputing…' : 'Recompute'}
            </button>
          </div>
        </div>

        {/* Loading / Error states */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg bg-gray-200" />
            ))}
          </div>
        )}
        {error && !isLoading && (
          <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            {(error as Error).message}
          </div>
        )}
        {recomputeMutation.isError && (
          <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            Failed to recompute stats: {(recomputeMutation.error as Error).message}
          </div>
        )}

        {/* KPIs */}
        {data && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatKpi label="Total Queries" value={data.total_queries} />
            <StatKpi label="Avg Duration (ms)" value={Math.round(data.avg_duration)} />
            <StatKpi label="Error Rate" value={`${data.error_rate}%`} />
            <StatKpi label="Popular Hour (UTC)" value={data.popular_hour ?? '—'} />
          </div>
        )}

        {/* Charts */}
        {data && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card title="Resource Mix">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceMixData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {resourceMixData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <RTooltip formatter={(v: number, n: string) => [`${v}%`, n]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Top Queries (by %)">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topQueriesData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="term" />
                    <YAxis unit="%" />
                    <RTooltip formatter={(v: number) => [`${v}%`, 'percent']} />
                    <Bar dataKey="percent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Devices">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={devicesData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {devicesData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <RTooltip formatter={(v: number, n: string) => [`${v}%`, n]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Slowest Queries (ms)">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-600">
                    <tr>
                      <th className="py-2">Term</th>
                      <th className="py-2">Duration (ms)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slowestRows.length === 0 && (
                      <tr>
                        <td colSpan={2} className="py-4 text-gray-500">No data</td>
                      </tr>
                    )}
                    {slowestRows.map((row, i) => (
                      <tr key={`${row.term}-${i}`} className="border-t">
                        <td className="py-2 font-mono">{row.term}</td>
                        <td className="py-2">{row.ms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPage;
