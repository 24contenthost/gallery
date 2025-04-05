<?php

namespace App\Http\Resources\Image;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
            'id' => $this->id,
            'size' => Storage::disk('images')->size($this->file_name),
            'url' => Storage::disk('images')->url($this->file_name),
            'previewUrl' => Storage::disk('images')->url('preview_'.$this->file_name),
            'name' => $this->name,
        ];
    }
}
