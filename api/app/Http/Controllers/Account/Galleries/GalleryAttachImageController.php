<?php

namespace App\Http\Controllers\Account\Galleries;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\Image;
use Illuminate\Http\Request;

class GalleryAttachImageController extends Controller
{
    public function __invoke(Request $request, Gallery $gallery, Image $image)
    {
        $this->authorize('update', $gallery);
        $this->authorize('update', $image);

        $gallery->images()->syncWithoutDetaching([$image->id]);

        return response()->json(['message' => 'Image attached to gallery successfully']);
    }
}
