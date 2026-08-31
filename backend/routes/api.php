<?php

use App\Http\Controllers\AnalyticController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/urls', [UrlController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/urls', [UrlController::class, 'index']);
    Route::get('/urls/{id}', [UrlController::class, 'show']);
    Route::put('/urls/{id}', [UrlController::class, 'update']);
    Route::delete('/urls/{id}', [UrlController::class, 'destroy']);

    Route::get('/analytics', [AnalyticController::class, 'index']);

    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user', [UserController::class, 'update']);
    Route::patch('/user', [UserController::class, 'update']);
    Route::delete('/user', [UserController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
