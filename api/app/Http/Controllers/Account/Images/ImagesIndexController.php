<?php


namespace App\Http\Controllers\Account\Images;

use App\Http\Controllers\Controller;
use App\Http\Resources\Image\ImageResource;
use Illuminate\Http\Request;

class ImagesIndexController extends Controller
{
    public function __invoke(Request $request)
    {
        $images = $request->user()->images()->latest()->get();
        return ImageResource::collection($images);
    }
}
