<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SidebarFolder extends Model
{
    protected $fillable = [
        'user_id',
        'folder_id',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'user_id'
    ];
}
