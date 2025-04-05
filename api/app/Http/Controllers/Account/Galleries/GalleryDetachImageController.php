<?php

namespace App\Http\Controllers\Account\Galleries;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\Image;
use Illuminate\Http\Request;

class GalleryDetachImageController extends Controller
{
    public function __invoke(Request $request, Gallery $gallery, Image $image)
    {
        $this->authorize('update', $gallery);
        $this->authorize('update', $image);

        $gallery->images()->detach($image->id);

        return response()->json(['message' => 'Image detached from gallery successfully']);
    }
}
