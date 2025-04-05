<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\Gallery\GalleryResource;
use App\Http\Resources\Image\ImageResource;
use App\Http\Resources\UserProfile\UserProfileResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    /**
     * Display the specified user profile.
     */
    public function show($id)
    {
        $user = User::with('galleries')->findOrFail($id);
        return new UserProfileResource($user);
    }


    public function getUserProfileGalleries($id)
    {
        $user = User::with(['galleries', 'galleries.images'])->findOrFail($id);

        return response()->json([
            'profile' => new UserProfileResource($user),
            'galleries' => GalleryResource::collection($user->galleries),
        ]);
    }

    public function getUserProfileImages($id)
    {
        $user = User::with('images')->findOrFail($id);

        return response()->json([
            'profile' => new UserProfileResource($user),
            'images' => ImageResource::collection($user->photos),
        ]);
    }

}
