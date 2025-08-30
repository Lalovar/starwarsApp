<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class PeopleController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('name', '');

        if (empty($query)) {
            return response()->json(['error' => 'Name parameter is required'], 400);
        }

        try {
            $response = Http::get('https://www.swapi.tech/api/people/', [
                'name' => $query
            ]);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['result']) && is_array($data['result'])) {
                    $transformedResults = array_map(function ($character) {
                        return [
                            'name' => $character['properties']['name'],
                            'birth_year' => $character['properties']['birth_year'],
                            'gender' => $character['properties']['gender'],
                            'eye_color' => $character['properties']['eye_color'],
                            'hair_color' => $character['properties']['hair_color'],
                            'height' => $character['properties']['height'],
                            'mass' => $character['properties']['mass'],
                            'films' => $character['properties']['films']
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
