<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Url;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UrlController extends Controller
{
    public function __construct(private readonly AnalyticsService $analyticsService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->hasPermissionTo('view-any-url')) {
            $urls = Url::with('user')->get();
        } else {
            $urls = $request->user()->urls()->get();
        }
        return response()->json($urls, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'original_url' => 'required|url'
        ]);

        do {
            $shortCode = Str::random(7);
        } while (Url::where('short_url', $shortCode)->exists());

        $url = Url::create([
            'original_url' => $validatedData['original_url'],
            'short_url'    => $shortCode,
            'user_id'      => Auth::guard('sanctum')->id(),
        ]);

        return response()->json($url, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Url $url)
    {
        $this->authorize('view', $url);

        return response()->json($url, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Url $url)
    {
        $this->authorize('update', $url);

        $validatedData = $request->validate([
            'original_url' => 'sometimes|required|url',
            'short_url'    => 'sometimes|required|string|unique:urls,short_url,' . $url->id,
        ]);

        $url->update($validatedData);

        return response()->json($url, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Url $url)
    {
        $this->authorize('delete', $url);

        $url->delete();

        return response()->json(['message' => 'URL succesfully deleted'], 200);
    }

    /**
     * Redirect the url.
     */
    public function redirect($short_url)
    {
        $url = Url::where('short_url', $short_url)->firstOrFail();

        $url->increment('click_count');

        $this->analyticsService->recordVisit($url);

        return redirect()->away($url->original_url);
    }
}
