<?php

namespace App\Http\Controllers\Account\Images;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\Images\ImagesUploadRequest;
use App\Http\Resources\Image\ImageResource;
use App\Services\ImageService;
use Illuminate\Support\Facades\Auth;

class ImagesUploadController extends Controller
{
    protected ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function __invoke(ImagesUploadRequest $request)
    {
        $data = $request->validated();

        $imageFiles = $data['images'];

        $images = [];
        foreach ($imageFiles as $imageFile) {
            $images[] = $this->imageService->createImage($imageFile, Auth::id());
        }

        return ImageResource::collection($images);
    }
}
