<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'file_name', 'name'];

    public function galleries()
    {
        return $this->belongsToMany(Gallery::class, 'gallery_image')->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
