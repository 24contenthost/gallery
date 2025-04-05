<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Account\Galleries\GalleryAttachImageController;
use App\Http\Controllers\Account\Galleries\GalleryDestroyController;
use App\Http\Controllers\Account\Galleries\GalleriesIndexController;
use App\Http\Controllers\Account\Galleries\GalleryDetachImageController;
use App\Http\Controllers\Account\Galleries\GalleryShowController;
use App\Http\Controllers\Account\Galleries\GalleryStoreController;
use App\Http\Controllers\Account\Galleries\GalleryUpdateController;
use App\Http\Controllers\Account\Images\ImageDestroyController;
use App\Http\Controllers\Account\Images\AccountImageShowController;
use App\Http\Controllers\Account\Images\ImagesIndexController;
use App\Http\Controllers\Account\Images\ImageUpdateController;
use App\Http\Controllers\Account\Images\ImagesUploadController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {

    Route::put('account', [AccountController::class, 'update']);

    Route::prefix('account/images')->group(function () {
        Route::get('/', ImagesIndexController::class);
        Route::post('/', ImagesUploadController::class);
        Route::put('{image}', ImageUpdateController::class);
        Route::delete('{image}', ImageDestroyController::class);
    });


    Route::prefix('account/galleries')->group(function () {
        Route::get('/', GalleriesIndexController::class);
        Route::post('/', GalleryStoreController::class);
        Route::get('{gallery}', GalleryShowController::class);
        Route::put('{gallery}', GalleryUpdateController::class);
        Route::delete('{gallery}', GalleryDestroyController::class);
        Route::post('{gallery}/attach-image/{image}', GalleryAttachImageController::class);
        Route::delete('{gallery}/detach-image/{image}', GalleryDetachImageController::class);

    });


    Route::get('/users/{id}', [UserProfileController::class, 'show']);
    Route::get('/users/{id}/galleries', [UserProfileController::class, 'getUserProfileGalleries']);
    Route::get('/users/{id}/images', [UserProfileController::class, 'getUserProfileImages']);
});
