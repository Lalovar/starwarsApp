<?php

namespace App\Jobs;

use App\Models\Query;
use App\Models\QueryStat;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\DB;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ComputeQueryStatsJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        $total = Query::count();

        $avg = (float) (Query::avg('duration_ms') ?? 0);

        $top = Query::select('term', DB::raw('COUNT(*) as c'))
            ->groupBy('term')
            ->orderByDesc('c')
            ->limit(5)
            ->get();

        $topArr = $top->map(function ($row) use ($total) {
            $pct = $total ? round(($row->c / $total) * 100, 2) : 0;
            return ['term' => $row->term, 'count' => (int) $row->c, 'percent' => $pct];
        })->toArray();

        $resourceRows = Query::select('resource', DB::raw('COUNT(*) as c'))
            ->groupBy('resource')
            ->get();

        $resourceMix = [];
        foreach ($resourceRows as $r) {
            $resourceMix[$r->resource] = $total ? round(($r->c / $total) * 100, 2) : 0;
        }

        $errorCount = Query::where('success', false)->count();
        $errorRate  = $total ? round(($errorCount / $total) * 100, 2) : 0;

        $popular = Query::select(
                DB::raw("CAST(strftime('%H', created_at) AS INTEGER) as hour"),
                DB::raw('COUNT(*) as c')
            )
            ->groupBy('hour')
            ->orderByDesc('c')
            ->first();

        $popularHour = $popular ? (int) $popular->hour : null;

        $slow = Query::orderByDesc('duration_ms')
            ->limit(3)
            ->get(['term', 'duration_ms'])
            ->map(fn ($r) => ['term' => $r->term, 'ms' => (int) $r->duration_ms])
            ->toArray();

        $devices = Query::select('device_type', DB::raw('COUNT(*) as c'))
            ->groupBy('device_type')
            ->get();

        $topDevices = [];
        foreach ($devices as $d) {
            $key = $d->device_type ?: 'unknown';
            $topDevices[$key] = $total ? round(($d->c / $total) * 100, 2) : 0;
        }

        QueryStat::create([
            'top_queries'     => $topArr,
            'avg_duration'    => round($avg, 2),
            'popular_hour'    => $popularHour,
            'resource_mix'    => $resourceMix,
            'total_queries'   => $total,
            'error_rate'      => $errorRate,
            'slowest_queries' => $slow,
            'top_devices'     => $topDevices,
            'computed_at'     => now(),
        ]);
    }
}
