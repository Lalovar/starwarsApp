<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use App\Models\Query;

class FilmsByUIDController extends Controller
{
    public function search(Request $request, $uid)
    {
        if (empty($uid) || !is_numeric($uid)) {
            return response()->json(['error' => 'Valid UID parameter is required'], 400);
        }

        $start = microtime(true);

        try {
            $response = Http::get("https://www.swapi.tech/api/films/{$uid}");
            $duration = (int)((microtime(true) - $start) * 1000);

            $ua = strtolower($request->userAgent());
            $deviceType = 'desktop';
            if (str_contains($ua, 'mobile')) {
                $deviceType = 'mobile';
            } elseif (str_contains($ua, 'tablet')) {
                $deviceType = 'tablet';
            }

            Query::create([
                'term'        => (string) $uid,
                'resource'    => 'films',
                'duration_ms' => $duration,
                'success'     => $response->successful(),
                'device_type' => $deviceType,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['result']) && isset($data['result']['properties'])) {
                    $film = $data['result'];
                    $transformedResult = [
                        'name'          => $film['properties']['title'],
                        'opening_crawl' => $film['properties']['opening_crawl'],
                        'characters'    => $film['properties']['characters'],
                        'uid'           => $film['uid'],
                    ];

                    return response()->json($transformedResult);
                }

                return response()->json(['error' => 'Film not found'], 404);
            }

            if ($response->status() === 404) {
                return response()->json(['error' => 'Film not found'], 404);
            }

            return response()->json(['error' => 'Failed to fetch data from SWAPI'], 500);
        } catch (\Exception $e) {
            $duration = (int)((microtime(true) - $start) * 1000);

            Query::create([
                'term'        => (string) $uid,
                'resource'    => 'films',
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
