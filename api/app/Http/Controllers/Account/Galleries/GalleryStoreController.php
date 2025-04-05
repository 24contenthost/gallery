<?php
namespace App\Http\Controllers\Account\Galleries;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\Galleries\GalleryStoreRequest;
use App\Http\Resources\Gallery\GalleryResource;
use App\Models\Gallery;
use Illuminate\Support\Facades\Auth;

class GalleryStoreController extends Controller
{
    public function __invoke(GalleryStoreRequest $request)
    {
        $data = $request->validated();

        $gallery = Gallery::create([
            'user_id' => Auth::id(),
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);

        return new GalleryResource($gallery);
    }
}
