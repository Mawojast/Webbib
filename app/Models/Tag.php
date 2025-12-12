<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'pivot',
    ];
    public function links(): BelongsToMany
    {
        return $this->belongsToMany(Link::class, 'links_tags')->withTimestamps();
    }
}
