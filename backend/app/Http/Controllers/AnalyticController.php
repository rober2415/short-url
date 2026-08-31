<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Analytic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnalyticController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::guard('sanctum')->user();

        if (! $user) {
            return response()->json([], 200);
        }

        $analytics = Analytic::whereHas('url', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('url:id,short_url,original_url')->latest()->get();

        return response()->json($analytics, 200);
    }
}
