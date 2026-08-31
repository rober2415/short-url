<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display the authenticated user.
     */
    public function show(Request $request)
    {
        return response()->json($request->user(), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($request->user()->id)],
            'password' => 'nullable|string|min:8',
            'oldPassword' => 'nullable|string',
        ]);

        if (!empty($validatedData['password'])) {
            if (empty($validatedData['oldPassword']) || !Hash::check($validatedData['oldPassword'], $request->user()->password)) {
                return response()->json([
                    'message' => 'The old password is incorrect',
                ], 422);
            }
        }

        unset($validatedData['oldPassword']);

        if (empty($validatedData['password'])) {
            unset($validatedData['password']);
        }

        $request->user()->update($validatedData);

        return response()->json($request->user()->fresh(), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()?->delete();
        $user->delete();

        return response()->json(['message' => 'User successfully deleted'], 200);
    }
}
