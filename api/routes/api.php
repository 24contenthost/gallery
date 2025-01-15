<?php

use App\Http\Controllers\Account\AccountEditController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->patch('/edit-account', AccountEditController::class)->name('edit.account');;
