<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeopleByNameController;
use App\Http\Controllers\Api\FilmsByNameController;
use App\Http\Controllers\Api\FilmsByUIDController;
use App\Http\Controllers\Api\PeopleByUIDController;

Route::get('/hello', function () {
    return response()->json(['message' => 'API is working!']);
});
Route::get('/searchByName/people', [PeopleByNameController::class, 'search']);
Route::get('/searchByUID/people/{uid}', [PeopleByUIDController::class, 'search']);
Route::get('/searchByName/films', [FilmsByNameController::class, 'search']);
Route::get('/searchByUID/films/{uid}', [FilmsByUIDController::class, 'search']);
