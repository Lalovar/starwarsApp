<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return response()->json(['message' => 'API is working!']);
});

Route::get('/characters', function () {
    return response()->json([
        'characters' => [
            ['id' => 1, 'name' => 'Luke Skywalker', 'type' => 'Jedi'],
            ['id' => 2, 'name' => 'Darth Vader', 'type' => 'Sith'],
            ['id' => 3, 'name' => 'Han Solo', 'type' => 'Smuggler'],
        ]
    ]);
});

Route::get('/planets', function () {
    return response()->json([
        'planets' => [
            ['id' => 1, 'name' => 'Tatooine', 'climate' => 'Desert'],
            ['id' => 2, 'name' => 'Hoth', 'climate' => 'Ice'],
            ['id' => 3, 'name' => 'Endor', 'climate' => 'Forest'],
        ]
    ]);
});
