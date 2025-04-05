<?php

namespace App\Http\Controllers\Account\Galleries;

use App\Http\Controllers\Controller;

use App\Http\Requests\Account\Galleries\GalleryUpdateRequest;
use App\Http\Resources\Gallery\GalleryResource;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryUpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(GalleryUpdateRequest $request, Gallery $gallery)
    {
        $this->authorize('update', $gallery);

        $data = $request->validated();

        $gallery->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);

        return new GalleryResource($gallery);
    }
}
