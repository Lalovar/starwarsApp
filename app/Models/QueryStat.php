<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QueryStat extends Model
{
    protected $fillable = [
        'top_queries',
        'avg_duration',
        'popular_hour',
        'resource_mix',
        'total_queries',
        'error_rate',
        'slowest_queries',
        'top_devices',
        'computed_at',
    ];

    protected $casts = [
        'top_queries'     => 'array',
        'resource_mix'    => 'array',
        'slowest_queries' => 'array',
        'top_devices'     => 'array',
        'computed_at'     => 'datetime',
    ];
}
