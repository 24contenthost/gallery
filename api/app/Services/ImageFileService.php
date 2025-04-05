<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageFileService
{
    public function createPreview(UploadedFile $imageFile, string $fileName): void
    {
        $manager = new ImageManager( new Driver());

        $previewName = 'preview_' . $fileName;

        $previewPath = Storage::disk('images')->path($previewName);


        $interventionImage = $manager->read($imageFile);
        $interventionImage->scaleDown(480, null);

        $encoded = $interventionImage->toJpg();
        $encoded->save($previewPath);

    }

    public function storeImage(UploadedFile $imageFile): string
    {
        $fileName = md5(Carbon::now() . '_' . $imageFile->getClientOriginalName()) . '.' . $imageFile->getClientOriginalExtension();
        Storage::disk('images')->putFileAs('', $imageFile, $fileName);

        $this->createPreview($imageFile, $fileName);

        return $fileName;
    }

    public function deleteImageFiles(string $fileName): void
    {
        Storage::disk('images')->delete([$fileName, 'preview_' . $fileName]);
    }
}
