<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', User::class);
        $users = User::all();
        return response()->json($users, 200);
    }

    /**
     * Display the authenticated user's profile.
     */
    public function profile(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames(),
        ], 200);
    }
    /**
     * Display the authenticated user.
     */
    public function show(Request $request, User $user)
    {
        $this->authorize('view', $user);
        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $validatedData = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8',
            'oldPassword' => 'nullable|string',
        ]);

        if (!empty($validatedData['password'])) {
            if ($request->user()->id === $user->id) {
                if (empty($validatedData['oldPassword']) || !Hash::check($validatedData['oldPassword'], $user->password)) {
                    return response()->json([
                        'message' => 'The old password is incorrect',
                    ], 422);
                }
            }
        }

        unset($validatedData['oldPassword']);

        if (empty($validatedData['password'])) {
            unset($validatedData['password']);
        }

        $user->update($validatedData);
        return response()->json($user->fresh(), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user)
    {
        $this->authorize('delete', $user);

        if ($request->user()->id === $user->id) {
            $request->user()->currentAccessToken()->delete();
        } else {
            $user->tokens()->delete();
        }

        $user->delete();
        return response()->json(['message' => 'User successfully deleted'], 200);
    }
}
