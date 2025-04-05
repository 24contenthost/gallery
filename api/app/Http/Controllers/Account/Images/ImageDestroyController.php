<?php

namespace App\Http\Controllers\Account\Images;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Services\ImageService;
use Illuminate\Http\Request;

class ImageDestroyController extends Controller
{
    protected ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function __invoke(Request $request, Image $image)
    {
        $this->authorize('delete', $image);

        $this->imageService->deleteImage($image);

        return response()->json(['message' => 'Image deleted successfully']);
    }
}
