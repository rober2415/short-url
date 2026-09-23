<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Permission::class);
        $permissions = Permission::all();
        return response()->json($permissions, 200);
    }
}
