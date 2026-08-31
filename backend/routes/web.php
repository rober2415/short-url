<?php

use App\Http\Controllers\UrlController;
use Illuminate\Support\Facades\Route;

Route::get('/{short_url}', [UrlController::class, 'redirect']);

Route::get('/', function () {
    return view('welcome');
});
