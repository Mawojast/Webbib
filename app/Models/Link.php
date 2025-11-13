<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Link extends Model
{
    protected $fillable = ['folder_id', 'title', 'url', 'image'];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }
}
