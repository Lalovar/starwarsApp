<?php

use App\Models\Query;

test('query model has correct fillable attributes', function () {
    $query = new Query();
    
    expect($query->getFillable())->toBe([
        'term',
        'resource',
        'duration_ms',
        'success',
        'device_type',
    ]);
});

test('query model can be created with fillable attributes', function () {
    $queryData = [
        'term' => 'Luke Skywalker',
        'resource' => 'people',
        'duration_ms' => 150,
        'success' => true,
        'device_type' => 'desktop',
    ];
    
    $query = new Query($queryData);
    
    expect($query->term)->toBe('Luke Skywalker');
    expect($query->resource)->toBe('people');
    expect($query->duration_ms)->toBe(150);
    expect($query->success)->toBe(true);
    expect($query->device_type)->toBe('desktop');
});

test('query model uses has factory trait', function () {
    $query = new Query();
    
    expect(method_exists($query, 'factory'))->toBeTrue();
});
