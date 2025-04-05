<?php

namespace App\Http\Controllers\Account\Images;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\Images\ImageUpdateRequest;
use App\Http\Resources\Image\ImageResource;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;

class ImageUpdateController extends Controller
{
    public function __invoke(ImageUpdateRequest $request, Image $image)
    {
        $this->authorize('update', $image);

        $data = $request->validated();

        $image->update([
            'name' => $data['name']
        ]);

        return new ImageResource($image);
    }
}
