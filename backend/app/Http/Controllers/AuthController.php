<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Registro de usuarios
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);

        $deviceName = $request->input('device_name') ?? $request->userAgent() ?? 'Unknown device';
        $expiresAt = now()->addMinutes(30);

        $accessToken = $user->createToken($deviceName, ['*'], $expiresAt);

        return response()->json([
            'message' => 'User succesfully created',
            'user' => $user,
            'token' => $accessToken->plainTextToken,
            'expires_at' => $expiresAt->toISOString(),
        ], 201);
    }

    /**
     * Login de usuarios
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Incorrect credentials',
            ], 401);
        }

        $deviceName = $request->input('device_name') ?? $request->userAgent() ?? 'Unknown device';
        $expiresAt = now()->addMinutes(30);

        $accessToken = $user->createToken($deviceName, ['*'], $expiresAt);

        return response()->json([
            'token' => $accessToken->plainTextToken,
            'expires_at' => $expiresAt->toISOString(),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ], 200);
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Closed session',
        ], 200);
    }
}
