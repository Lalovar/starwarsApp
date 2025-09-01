<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\Api\PeopleByNameController;
use App\Http\Controllers\Api\FilmsByNameController;
use App\Http\Controllers\Api\FilmsByUIDController;
use App\Http\Controllers\Api\PeopleByUIDController;
use App\Http\Controllers\Api\StatsController;

Route::get('/hello', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::get('/searchByName/people', [PeopleByNameController::class, 'search']);
Route::get('/searchByUID/people/{uid}', [PeopleByUIDController::class, 'search']);
Route::get('/searchByName/films', [FilmsByNameController::class, 'search']);
Route::get('/searchByUID/films/{uid}', [FilmsByUIDController::class, 'search']);

Route::get('/stats', [StatsController::class, 'latest']);
Route::get('/stats/recompute', function () {
    try {
        Artisan::call('stats:compute');
        return response()->json(['message' => 'Stats recomputed successfully']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to recompute stats ' . $e->getMessage()], 500);
    }
});
