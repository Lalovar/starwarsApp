<?php

use App\Models\QueryStat;

test('query stat model has correct fillable attributes', function () {
    $queryStat = new QueryStat();
    
    expect($queryStat->getFillable())->toBe([
        'top_queries',
        'avg_duration',
        'popular_hour',
        'resource_mix',
        'total_queries',
        'error_rate',
        'slowest_queries',
        'top_devices',
        'computed_at',
    ]);
});

test('query stat model has correct casts', function () {
    $queryStat = new QueryStat();
    
    expect($queryStat->getCasts())->toHaveKey('top_queries');
    expect($queryStat->getCasts())->toHaveKey('resource_mix');
    expect($queryStat->getCasts())->toHaveKey('slowest_queries');
    expect($queryStat->getCasts())->toHaveKey('top_devices');
    expect($queryStat->getCasts())->toHaveKey('computed_at');
    
    expect($queryStat->getCasts()['top_queries'])->toBe('array');
    expect($queryStat->getCasts()['resource_mix'])->toBe('array');
    expect($queryStat->getCasts()['slowest_queries'])->toBe('array');
    expect($queryStat->getCasts()['top_devices'])->toBe('array');
    expect($queryStat->getCasts()['computed_at'])->toBe('datetime');
});
