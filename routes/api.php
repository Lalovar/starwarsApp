<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeopleController;
use App\Http\Controllers\Api\FilmsController;

Route::get('/hello', function () {
    return response()->json(['message' => 'API is working!']);
});
Route::get('/search/people', [PeopleController::class, 'search']);
Route::get('/search/films', [FilmsController::class, 'search']);
