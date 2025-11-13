<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dashboard extends Model
{
    protected $fillable = [
        'url',
        'user_id',
        'title',
        'position',
        'image'
    ];

    protected $hidden = [
        'user_id'
    ];

    protected $casts = [
        'created_at' => 'date:Y-m-d',
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => date('Y-m-d', strtotime($value)),
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
