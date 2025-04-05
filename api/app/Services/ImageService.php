<?php

namespace App\Services;

use App\Models\Image;
use Illuminate\Http\UploadedFile;

class ImageService
{
    protected ImageFileService $imageFileService;

    public function __construct(ImageFileService $imageFileService)
    {
        $this->imageFileService = $imageFileService;
    }

    public function createImageForGallery(UploadedFile $imageFile, int $galleryId): Image
    {
        $fileName = $this->imageFileService->storeImage($imageFile);

        return Image::create([
            'gallery_id' => $galleryId,
            'file_name' => $fileName,
            'name' => $imageFile->getClientOriginalName(),
        ]);
    }

    public function createImage(UploadedFile $imageFile, int $userId): Image
    {

        $fileName = $this->imageFileService->storeImage($imageFile);
        return Image::create([
            'user_id' => $userId,
            'file_name' => $fileName,
            'name' => $imageFile->getClientOriginalName(),
        ]);
    }


    public function deleteImage(Image $image): void
    {
        $this->imageFileService->deleteImageFiles($image->file_name);
        $image->delete();
    }
}
