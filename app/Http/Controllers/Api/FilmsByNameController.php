<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class FilmsByNameController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('title', '');

        if (empty($query)) {
            return response()->json(['error' => 'Title parameter is required'], 400);
        }

        try {
            $response = Http::get('https://www.swapi.tech/api/films', [
                'title' => $query
            ]);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['result']) && is_array($data['result'])) {
                    $transformedResults = array_map(function ($film) {
                        return [
                            'name'        => $film['properties']['title'],
                            'uid'          => $film['uid'],
                        ];
                    }, $data['result']);

                    return response()->json($transformedResults);
                }

                return response()->json([]);
            }

            return response()->json(['error' => 'Failed to fetch data from SWAPI'], 500);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error connecting to SWAPI: ' . $e->getMessage()
            ], 500);
        }
    }
}
