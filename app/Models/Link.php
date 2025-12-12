<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Link extends Model
{
    protected $fillable = ['folder_id', 'title', 'url', 'image', 'user_id', 'folderName'];
    protected $hidden = ['user_id'];
    protected $with = ['tags'];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'links_tags')->withTimestamps();
    }

    public function getFolderName()
    {
        return $this->folder->name ?? null;
    }
}
