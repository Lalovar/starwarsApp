<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use App\Models\Query; 

class PeopleByNameController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('name', '');

        if (empty($query)) {
            return response()->json(['error' => 'Name parameter is required'], 400);
        }

        $start = microtime(true);

        try {
            $response = Http::get('https://www.swapi.tech/api/people/', [
                'name' => $query
            ]);

            $duration = (int) ((microtime(true) - $start) * 1000); // ms

            $ua = strtolower($request->userAgent());
            $deviceType = 'desktop';
            if (str_contains($ua, 'mobile')) {
                $deviceType = 'mobile';
            } elseif (str_contains($ua, 'tablet')) {
                $deviceType = 'tablet';
            }

            Query::create([
                'term'        => $query,
                'resource'    => 'people',
                'duration_ms' => $duration,
                'success'     => $response->successful(),
                'device_type' => $deviceType,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['result']) && is_array($data['result'])) {
                    $transformedResults = array_map(function ($character) {
                        return [
                            'name' => $character['properties']['name'],
                            'uid' => $character['uid'],
                        ];
                    }, $data['result']);

                    return response()->json($transformedResults);
                }

                return response()->json([]);
            }

            return response()->json(['error' => 'Failed to fetch data from SWAPI'], 500);
        } catch (\Exception $e) {
            $duration = (int) ((microtime(true) - $start) * 1000);

            Query::create([
                'term'        => $query,
                'resource'    => 'people',
                'duration_ms' => $duration,
                'success'     => false,
                'device_type' => 'unknown',
            ]);

            return response()->json([
                'error' => 'Error connecting to SWAPI: ' . $e->getMessage()
            ], 500);
        }
    }
}
