<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/api/health', function () {
    return response()->json(['status' => 'ok']);
});

// Catch all routes for React router (excluding API routes)
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');
