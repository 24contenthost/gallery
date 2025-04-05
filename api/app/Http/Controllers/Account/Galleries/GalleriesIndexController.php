<?php
namespace App\Http\Controllers\Account\Galleries;

use App\Http\Controllers\Controller;
use App\Http\Resources\Gallery\GalleryResource;
use Illuminate\Http\Request;

class GalleriesIndexController extends Controller
{
    public function __invoke(Request $request)
    {
        $galleries = $request->user()->galleries()->latest()->get();
        return GalleryResource::collection($galleries);
    }
}
