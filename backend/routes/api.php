<?php

use App\Http\Controllers\AnalyticController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/urls', [UrlController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/urls', [UrlController::class, 'index']);
    Route::get('/urls/{url}', [UrlController::class, 'show']);
    Route::put('/urls/{url}', [UrlController::class, 'update']);
    Route::delete('/urls/{url}', [UrlController::class, 'destroy']);

    Route::get('/analytics', [AnalyticController::class, 'index']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::patch('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
