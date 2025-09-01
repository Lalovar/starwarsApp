<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use App\Models\Query; 

class PeopleByUIDController extends Controller
{
    public function search(Request $request, $uid)
    {
        if (empty($uid) || !is_numeric($uid)) {
            return response()->json(['error' => 'Valid UID parameter is required'], 400);
        }

        $start = microtime(true);

        try {
            $response = Http::get("https://www.swapi.tech/api/people/{$uid}");
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
                'resource'    => 'people',
                'duration_ms' => $duration,
                'success'     => $response->successful(),
                'device_type' => $deviceType,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['result']) && isset($data['result']['properties'])) {
                    $person = $data['result'];
                    $transformedResult = [
                        'name'        => $person['properties']['name'],
                        'birth_year'  => $person['properties']['birth_year'],
                        'gender'      => $person['properties']['gender'],
                        'eye_color'   => $person['properties']['eye_color'],
                        'hair_color'  => $person['properties']['hair_color'],
                        'height'      => $person['properties']['height'],
                        'mass'        => $person['properties']['mass'],
                        'films'       => $person['properties']['films'],
                        'uid'         => $person['uid'],
                    ];

                    return response()->json($transformedResult);
                }

                return response()->json(['error' => 'Person not found'], 404);
            }

            if ($response->status() === 404) {
                return response()->json(['error' => 'Person not found'], 404);
            }

            return response()->json(['error' => 'Failed to fetch data from SWAPI'], 500);
        } catch (\Exception $e) {
            $duration = (int)((microtime(true) - $start) * 1000);

            Query::create([
                'term'        => (string) $uid,
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
