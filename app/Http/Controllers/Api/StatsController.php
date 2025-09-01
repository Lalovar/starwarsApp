<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QueryStat;

class StatsController extends Controller
{
    public function latest()
    {
        $stat = QueryStat::orderByDesc('computed_at')->first();

        if (!$stat) {
            return response()->json(['error' => 'Stats not ready yet'], 503);
        }

        return response()->json([
            'computed_at'     => $stat->computed_at?->toIso8601String(),
            'total_queries'   => $stat->total_queries,
            'avg_duration'    => $stat->avg_duration,
            'error_rate'      => $stat->error_rate,
            'popular_hour'    => $stat->popular_hour,
            'resource_mix'    => $stat->resource_mix,     // cast to array
            'top_devices'     => $stat->top_devices,      // cast to array
            'top_queries'     => $stat->top_queries,      // cast to array
            'slowest_queries' => $stat->slowest_queries,  // cast to array
        ]);
    }
}
