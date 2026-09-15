<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Role::class);
        $roles = Role::with('permissions')->get();
        return response()->json($roles, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Role::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'required|array',
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'guard_name' => 'sanctum',
        ]);

        $role->givePermissionTo($validated['permissions']);

        $role->load('permissions');

        return response()->json([
            'message' => 'Role succesfully created',
            'role' => $role,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $this->authorize('view', Role::class);
        $role = Role::findOrFail($id);
        return response()->json($role, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $this->authorize('update', $role);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'sometimes|array',
        ]);

        $permissions = $validated['permissions'] ?? null;
        unset($validated['permissions']);

        $role->update($validated);

        if ($permissions !== null) {
            $role->syncPermissions($permissions);
        }

        return response()->json($role->fresh('permissions'), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('delete', Role::class);
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(['message' => 'Role successfully deleted'], 200);
    }
}
