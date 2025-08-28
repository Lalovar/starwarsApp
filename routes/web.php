<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/api/health', function () {
    return response()->json(['status' => 'ok']);
});
