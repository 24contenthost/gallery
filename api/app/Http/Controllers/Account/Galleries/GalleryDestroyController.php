<?php

namespace App\Http\Controllers\Account\Galleries;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryDestroyController extends Controller
{
    public function __invoke(Request $request, Gallery $gallery)
    {
        $this->authorize('delete', $gallery);

        $gallery->delete();

        return response()->json(['message' => 'Gallery deleted successfully']);
    }
}
