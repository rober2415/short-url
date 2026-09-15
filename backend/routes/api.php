<?php

use App\Http\Controllers\AnalyticController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

//Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/urls', [UrlController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/urls', [UrlController::class, 'index']);
    Route::get('/urls/{url}', [UrlController::class, 'show']);
    Route::put('/urls/{url}', [UrlController::class, 'update']);
    Route::delete('/urls/{url}', [UrlController::class, 'destroy']);

    Route::get('/analytics', [AnalyticController::class, 'index']);

    Route::get('/user', [UserController::class, 'profile']);

    Route::middleware(['role:admin|support'])->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::get('/users/{user}', [UserController::class, 'show']);
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::patch('/users/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);

        Route::get('/roles', [RoleController::class, 'index']);
        Route::post('/roles', [RoleController::class, 'store']);
        Route::get('/roles/{role}', [RoleController::class, 'show']);
        Route::put('/roles/{role}', [RoleController::class, 'update']);
        Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

        Route::get('/permissions', [PermissionController::class, 'index']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});
