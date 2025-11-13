<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Kalnoy\Nestedset\NodeTrait;

class Folder extends Model
{
    use HasFactory, Notifiable;
    use NodeTrait;
    protected $fillable = [
        'name',
        'user_id',
        'parent_id',
        'public'
    ];

    protected $hidden = [
        'user_id'
    ];

    public function links(): HasMany
    {
        return $this->hasMany(Link::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'sidebar_folders', 'folder_id', 'user_id');
    }
}
