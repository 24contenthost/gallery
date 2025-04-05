<?php

namespace App\Http\Resources\UserProfile;

use App\Http\Resources\Gallery\GalleryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => $this->created_at->toISOString(),
            'galleries' => GalleryResource::collection($this->whenLoaded('galleries'))
        ];
    }
}
